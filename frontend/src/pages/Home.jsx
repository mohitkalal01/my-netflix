import { useMemo, useContext } from 'react';
import Hero from '../components/Hero';
import MovieRow from '../components/MovieRow';
import ContinueWatchingRow from '../components/ContinueWatchingRow';
import { getAllMovies } from '../services/movieApi';
import { SkeletonHero, SkeletonRow } from '../components/Loader';
import ErrorState from '../components/ErrorState';
import useFetch from '../hooks/useFetch';
import AuthContext from '../context/AuthContext';

const Home = () => {
  const { data: movies, loading, error } = useFetch(getAllMovies);
  const { user } = useContext(AuthContext);

  const {
    featuredMovie,
    comedyMovies,
    horrorMovies,
    hindiMovies,
    englishMovies,
  } = useMemo(() => {
    if (!movies) {
      return {
        featuredMovie: null,
        comedyMovies: [],
        horrorMovies: [],
        hindiMovies: [],
        englishMovies: [],
      };
    }

    const moviesOnly = movies.filter(movie => !movie.isSeries);

    const featuredMovie = moviesOnly.length > 0 ? moviesOnly[Math.floor(Math.random() * moviesOnly.length)] : null;

    const comedyMovies = moviesOnly.filter(
      (movie) => movie.category === 'Comedy'
    );
    const horrorMovies = moviesOnly.filter(
      (movie) => movie.category === 'Horror'
    );
    const hindiMovies = moviesOnly.filter(
      (movie) => movie.language === 'Hindi'
    );
    const englishMovies = moviesOnly.filter(
      (movie) => movie.language === 'English'
    );

    return {
      featuredMovie,
      comedyMovies,
      horrorMovies,
      hindiMovies,
      englishMovies,
    };
  }, [movies]);

  if (loading) {
    return (
      <>
        <SkeletonHero />
        <div className="my-8">
          <SkeletonRow />
        </div>
        <div className="my-8">
          <SkeletonRow />
        </div>
        <div className="my-8">
          <SkeletonRow />
        </div>
      </>
    );
  }

  if (error) {
    return <ErrorState message="Failed to load movies. Please try again later." />;
  }

  return (
    <div className="overflow-x-hidden">
      <Hero movie={featuredMovie} />
      <div className="relative z-10 -mt-32 space-y-12 pb-24 px-4 sm:px-6 lg:px-8">
        {user && <ContinueWatchingRow />}
        <MovieRow title="Comedy Movies" movies={comedyMovies} />
        <MovieRow title="Horror Movies" movies={horrorMovies} />
        <MovieRow title="Hindi Movies" movies={hindiMovies} />
        <MovieRow title="English Movies" movies={englishMovies} />
      </div>
    </div>
  );
};

export default Home;