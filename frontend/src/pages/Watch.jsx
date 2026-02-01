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
    <div className="relative h-screen w-screen bg-black text-white">
      <Link
        to="/"
        className="absolute top-4 left-4 z-50 flex items-center space-x-2 text-white hover:text-brand-red transition-colors"
      >
        <ArrowLeftIcon className="h-8 w-8" />
        <span className="font-bold">Back to Home</span>
      </Link>
      <div className="relative h-2/3 md:h-3/4 lg:h-4/5 w-full">
        {renderVideoPlayer()}
      </div>

      <div
        className="relative w-full p-4 md:p-8 bg-cover bg-center"
        style={{ backgroundImage: `url(${movie.thumbnail})` }}
      >
        <div className="absolute inset-0  from-black via-black/70 to-transparent"></div>
        <div className="relative z-10 max-w-4xl mx-auto">
          <h1 className="text-3xl md:text-5xl font-bold mb-4">{movie.title}</h1>
          <p className="text-lg text-gray-300 mb-6">{movie.description}</p>
          <div className="flex flex-wrap gap-2">
            <span className="bg-brand-red text-white text-sm font-semibold px-3 py-1 rounded-full">
              {movie.genre}
            </span>
            <span className="bg-gray-700 text-white text-sm font-semibold px-3 py-1 rounded-full">
              {movie.language}
            </span>
            <span className="bg-gray-700 text-white text-sm font-semibold px-3 py-1 rounded-full">
              {new Date(movie.createdAt).getFullYear()}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Watch;
