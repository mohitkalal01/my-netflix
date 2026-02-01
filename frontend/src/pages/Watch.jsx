import { useParams, Link, useLocation } from 'react-router-dom';
import { ArrowLeftIcon } from '@heroicons/react/24/solid';
import { useEffect, useState, useRef } from 'react';
import { getMovieById } from '../services/movieApi';
import { updateWatchProgress } from '../services/userApi';
import { Spinner } from '../components/Loader';
import ErrorState from '../components/ErrorState';
import { throttle } from 'lodash';

const Watch = () => {
  const { id } = useParams();
  const location = useLocation();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const videoRef = useRef(null);

  const updateProgressThrottled = useRef(
    throttle((movieId, currentTime, duration) => {
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
        setError(err);
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
      updateProgressThrottled(
        id,
        videoElement.currentTime,
        videoElement.duration
      );
    };

    const handleLoadedMetadata = () => {
      const { resumeTime } = location.state || {};
      if (resumeTime) {
        videoElement.currentTime = resumeTime;
      }
      videoElement.play();
    };

    videoElement.addEventListener('loadedmetadata', handleLoadedMetadata);
    videoElement.addEventListener('timeupdate', handleTimeUpdate);

    return () => {
      videoElement.removeEventListener('loadedmetadata', handleLoadedMetadata);
      videoElement.removeEventListener('timeupdate', handleTimeUpdate);
      updateProgressThrottled.cancel();
    };
  }, [id, location.state, updateProgressThrottled]);

  if (loading) {
    return (
      <div className="bg-black h-screen w-screen flex items-center justify-center">
        <Spinner />
      </div>
    );
  }

  if (error || !movie) {
    return (
        <div className="bg-black h-screen w-screen flex flex-col items-center justify-center">
            <ErrorState message="Could not load video." />
            <Link to="/" className="mt-4 text-white hover:text-brand-red">
                Go back home
            </Link>
      </div>
    );
  }

  const isThirdPartyVideo = (url) => {
    return /youtube\.com|youtu\.be|vimeo\.com/.test(url);
  }

  const renderVideoPlayer = () => {
    if (!movie.videoUrl) {
      return <ErrorState message="Video not available." />;
    }

    if (isThirdPartyVideo(movie.videoUrl)) {
      return (
        <iframe
          className="w-full h-full"
          src={`${movie.videoUrl}?autoplay=1`}
          title="Movie Player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      );
    }

    return (
      <video ref={videoRef} className="w-full h-full" controls>
        <source src={movie.videoUrl} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    );
  };

  return (
    <div className="h-screen w-screen bg-black">
      <Link
        to="/"
        className="absolute top-4 left-4 z-50 flex items-center space-x-2 text-white hover:text-brand-red transition-colors"
      >
        <ArrowLeftIcon className="h-8 w-8" />
        <span className="font-bold">Back to Home</span>
      </Link>
      <div className="h-full w-full">
        {renderVideoPlayer()}
      </div>
    </div>
  );
};

export default Watch;
