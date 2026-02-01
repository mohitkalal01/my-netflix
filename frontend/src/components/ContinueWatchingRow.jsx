import { useEffect, useState } from 'react';
import { getContinueWatching } from '../services/userApi';
import MovieRow from './MovieRow';
import { useAuth } from '../context/AuthContext';
import { Spinner } from './Loader';

const ContinueWatchingRow = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    if (!user) {
      setLoading(false);
      return;
    }

    const fetchContinueWatching = async () => {
      try {
        const data = await getContinueWatching();
        // The API returns objects with `movie` and `watched` properties.
        // We need to pass the movie data and the progress to the MovieCard.
        const moviesWithProgress = data.map(item => ({
          ...item.movie, // Spread the movie details (title, thumbnail, etc.)
          progress: item.watched, // Add the progress object { currentTime, duration }
        }));
        setMovies(moviesWithProgress);
      } catch (error) {
        console.error("Failed to fetch continue watching list:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchContinueWatching();
  }, [user]);

  if (!user || movies.length === 0) {
    return null;
  }
  
  if (loading) {
    return (
    <SkeletonRow />
    )
  }


  return (
    <MovieRow
      title="Continue Watching"
      movies={movies}
      isContinueWatching={true}
    />
  );
};

export default ContinueWatchingRow;