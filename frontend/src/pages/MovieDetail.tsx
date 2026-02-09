import { useParams, Link } from 'react-router-dom';
import { useEffect, useState, useContext } from 'react';
import { getMovieById } from '../services/movieApi';
import { Spinner } from '../components/Loader';
import ErrorState from '../components/ErrorState';
import { PlayIcon, PlusIcon, CheckIcon } from '@heroicons/react/24/solid';
import AuthContext from '../context/AuthContext';

interface Movie {
  _id: string;
  title: string;
  description: string;
  // Support both field naming conventions
  posterUrl?: string;
  thumbnail?: string;
  videoUrl: string;
  genre?: string;
  category?: string;
  duration?: string;
  year?: string;
  language?: string;
  isSeries: boolean;
}

const MovieDetail = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState<Movie | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { myList, addToMyListContext, removeFromMyListContext } = useContext(AuthContext);

  const isInMyList = myList.some((m) => m._id === id);

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        setLoading(true);
        const data = await getMovieById(id);
        setMovie(data);
      } catch (err: any) {
        setError(err.response?.data?.message || 'Failed to load movie details');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchMovie();
    }
  }, [id]);

  const handleMyListClick = () => {
    if (!movie) return;

    if (isInMyList) {
      removeFromMyListContext(movie._id);
    } else {
      addToMyListContext({
        _id: movie._id,
        title: movie.title,
        thumbnail: movie.posterUrl || movie.thumbnail || '',
      });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-brand-black flex items-center justify-center">
        <Spinner />
      </div>
    );
  }

  if (error || !movie) {
    return (
      <div className="min-h-screen bg-brand-black flex flex-col items-center justify-center">
        <ErrorState message={error || 'Movie not found'} />
        <Link to="/" className="mt-4 text-white hover:text-brand-red">
          Go back home
        </Link>
      </div>
    );
  }

  // Handle both field naming conventions from DB
  const posterImage = movie.posterUrl || movie.thumbnail || '';
  const genreText = movie.genre || movie.category || 'Unknown';

  return (
    <div className="min-h-screen bg-brand-black">
      {/* Hero Section with Backdrop */}
      <div className="relative h-[70vh] w-full">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img
            src={posterImage}
            alt={movie.title}
            className="w-full h-full object-cover"
          />
          {/* Gradient Overlays */}
          <div className="absolute inset-0 bg-gradient-to-t from-brand-black via-brand-black/60 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-brand-black via-transparent to-transparent" />
        </div>

        {/* Content */}
        <div className="absolute bottom-0 left-0 right-0 px-4 sm:px-6 lg:px-16 pb-16">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
            {movie.title}
          </h1>

          <div className="flex items-center space-x-4 text-gray-300 mb-4">
            {movie.year && <span className="text-green-500 font-semibold">{movie.year}</span>}
            {movie.duration && <span>{movie.duration}</span>}
            {movie.language && <span>{movie.language}</span>}
            <span className="px-2 py-0.5 border border-gray-500 text-sm">{genreText}</span>
            {movie.isSeries && (
              <span className="px-2 py-0.5 bg-brand-red text-white text-sm rounded">Series</span>
            )}
          </div>

          <p className="text-gray-300 text-lg max-w-2xl mb-6 line-clamp-3">
            {movie.description}
          </p>

          {/* Action Buttons */}
          <div className="flex items-center space-x-4">
            <Link
              to={`/watch/${movie._id}`}
              className="flex items-center space-x-2 bg-white text-black font-bold px-8 py-3 rounded hover:bg-gray-200 transition-colors"
            >
              <PlayIcon className="h-6 w-6" />
              <span>Play</span>
            </Link>

            <button
              onClick={handleMyListClick}
              className="flex items-center space-x-2 bg-gray-500/70 text-white font-bold px-6 py-3 rounded hover:bg-gray-500 transition-colors"
            >
              {isInMyList ? (
                <>
                  <CheckIcon className="h-6 w-6" />
                  <span>In My List</span>
                </>
              ) : (
                <>
                  <PlusIcon className="h-6 w-6" />
                  <span>My List</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Details Section */}
      <div className="px-4 sm:px-6 lg:px-16 py-8">
        <h2 className="text-2xl font-bold text-white mb-4">About {movie.title}</h2>
        <p className="text-gray-400 max-w-4xl">
          {movie.description}
        </p>

        <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
          <div>
            <span className="text-gray-500">Genre:</span>
            <span className="text-white ml-2">{genreText}</span>
          </div>
          {movie.year && (
            <div>
              <span className="text-gray-500">Year:</span>
              <span className="text-white ml-2">{movie.year}</span>
            </div>
          )}
          {movie.duration && (
            <div>
              <span className="text-gray-500">Duration:</span>
              <span className="text-white ml-2">{movie.duration}</span>
            </div>
          )}
          {movie.language && (
            <div>
              <span className="text-gray-500">Language:</span>
              <span className="text-white ml-2">{movie.language}</span>
            </div>
          )}
          <div>
            <span className="text-gray-500">Type:</span>
            <span className="text-white ml-2">{movie.isSeries ? 'TV Series' : 'Movie'}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetail;
