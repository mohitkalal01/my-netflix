import { useParams, Link, useLocation } from 'react-router-dom';
import { ArrowLeftIcon } from '@heroicons/react/24/solid';
import { useEffect, useState, useRef } from 'react';
import { getMovieById } from '../services/movieApi';
import { updateWatchProgress } from '../services/userApi';
import { Spinner } from '../components/Loader';
import ErrorState from '../components/ErrorState';
import { throttle } from 'lodash';

interface Movie {
  _id: string;
  title: string;
  videoUrl: string;
  thumbnail?: string;
  posterUrl?: string;
}

const Watch = () => {
  const { id } = useParams();
  const location = useLocation();
  const [movie, setMovie] = useState<Movie | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [showControls, setShowControls] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);
  const controlsTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const updateProgressThrottled = useRef(
    throttle((movieId: string, currentTime: number, duration: number) => {
      if (duration < 60 || currentTime / duration > 0.98) return;
      updateWatchProgress(movieId, currentTime, duration);
    }, 15000)
  ).current;

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const movieData = await getMovieById(id);
        setMovie(movieData);
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    };
    fetchMovie();
  }, [id]);

  useEffect(() => {
    const videoElement = videoRef.current;
    if (!videoElement) return;

    const handleTimeUpdate = () => {
      if (id) {
        updateProgressThrottled(
          id,
          videoElement.currentTime,
          videoElement.duration
        );
      }
    };

    const handleLoadedMetadata = () => {
      const { resumeTime } = (location.state as { resumeTime?: number }) || {};
      if (resumeTime) {
        videoElement.currentTime = resumeTime;
      }
      videoElement.play().catch(() => {
        // Autoplay might be blocked, that's okay
      });
    };

    videoElement.addEventListener('loadedmetadata', handleLoadedMetadata);
    videoElement.addEventListener('timeupdate', handleTimeUpdate);

    return () => {
      videoElement.removeEventListener('loadedmetadata', handleLoadedMetadata);
      videoElement.removeEventListener('timeupdate', handleTimeUpdate);
      updateProgressThrottled.cancel();
    };
  }, [id, location.state, updateProgressThrottled]);

  // Auto-hide controls on touch devices
  const handleInteraction = () => {
    setShowControls(true);
    if (controlsTimeoutRef.current) {
      clearTimeout(controlsTimeoutRef.current);
    }
    controlsTimeoutRef.current = setTimeout(() => {
      setShowControls(false);
    }, 3000);
  };

  useEffect(() => {
    return () => {
      if (controlsTimeoutRef.current) {
        clearTimeout(controlsTimeoutRef.current);
      }
    };
  }, []);

  if (loading) {
    return (
      <div className="bg-black h-screen w-screen flex items-center justify-center safe-area-top safe-area-bottom">
        <Spinner />
      </div>
    );
  }

  if (error || !movie) {
    return (
      <div className="bg-black h-screen w-screen flex flex-col items-center justify-center safe-area-top safe-area-bottom">
        <ErrorState message="Could not load video." />
        <Link to="/" className="mt-4 text-white hover:text-brand-red touch-target">
          Go back home
        </Link>
      </div>
    );
  }

  const isThirdPartyVideo = (url: string) => {
    return /youtube\.com|youtu\.be|vimeo\.com/.test(url);
  };

  const getEmbedUrl = (url: string) => {
    // Convert YouTube watch URLs to embed URLs
    if (url.includes('youtube.com/watch')) {
      const videoId = new URL(url).searchParams.get('v');
      return `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`;
    }
    if (url.includes('youtu.be/')) {
      const videoId = url.split('youtu.be/')[1]?.split('?')[0];
      return `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`;
    }
    // Already an embed URL or add autoplay
    if (url.includes('/embed/')) {
      return url.includes('?') ? url : `${url}?autoplay=1&rel=0`;
    }
    return url;
  };

  const renderVideoPlayer = () => {
    if (!movie.videoUrl) {
      return (
        <div className="flex items-center justify-center h-full">
          <ErrorState message="Video not available." />
        </div>
      );
    }

    if (isThirdPartyVideo(movie.videoUrl)) {
      return (
        <iframe
          className="w-full h-full"
          src={getEmbedUrl(movie.videoUrl)}
          title={movie.title}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
          allowFullScreen
        />
      );
    }

    return (
      <video
        ref={videoRef}
        className="w-full h-full object-contain bg-black"
        controls
        playsInline
        poster={movie.thumbnail || movie.posterUrl}
      >
        <source src={movie.videoUrl} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    );
  };

  return (
    <div
      className="fixed inset-0 bg-black z-50"
      onClick={handleInteraction}
      onTouchStart={handleInteraction}
    >
      {/* Back Button - Auto-hide on mobile */}
      <Link
        to="/"
        className={`absolute top-4 left-4 z-50 flex items-center space-x-2 text-white 
          hover:text-brand-red transition-all touch-target safe-area-top
          ${showControls ? 'opacity-100' : 'opacity-0 pointer-events-none'}
          md:opacity-100 md:pointer-events-auto`}
      >
        <ArrowLeftIcon className="h-6 w-6 md:h-8 md:w-8" />
        <span className="font-bold hidden sm:inline">Back to Home</span>
      </Link>

      {/* Movie Title - Mobile */}
      <div
        className={`absolute top-4 left-16 right-4 z-40 safe-area-top
          ${showControls ? 'opacity-100' : 'opacity-0'}
          md:hidden transition-opacity`}
      >
        <h1 className="text-white text-sm font-semibold truncate">{movie.title}</h1>
      </div>

      {/* Video Player Container */}
      <div className="h-full w-full flex items-center justify-center">
        {renderVideoPlayer()}
      </div>
    </div>
  );
};

export default Watch;
