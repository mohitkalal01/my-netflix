import { useMemo } from 'react';
import Hero from '../components/Hero';
import MovieRow from '../components/MovieRow';
import { SkeletonHero, SkeletonRow } from '../components/Loader';
import { getAllMovies } from '../services/movieApi';
import useFetch from '../hooks/useFetch';
import ErrorState from '../components/ErrorState';

const Movies = () => {
  const { data: movies, loading, error } = useFetch(getAllMovies);

  const {
    featuredMovie,
    actionMovies,
    comedyMovies,
    horrorMovies,
    hindiMovies,
    englishMovies,
  } = useMemo(() => {
    if (!Array.isArray(movies)) {
      return {
        featuredMovie: null,
        actionMovies: [],
        comedyMovies: [],
        horrorMovies: [],
        hindiMovies: [],
        englishMovies: [],
      };
    }

    const moviesOnly = movies.filter(m => !m.isSeries);

    const featuredMovie =
      moviesOnly[Math.floor(Math.random() * moviesOnly.length)] || null;

    return {
      featuredMovie,
      actionMovies: moviesOnly.filter(
        m => m.category?.toLowerCase() === 'action'
      ),
      comedyMovies: moviesOnly.filter(
        m => m.category?.toLowerCase() === 'comedy'
      ),
      horrorMovies: moviesOnly.filter(
        m => m.category?.toLowerCase() === 'horror'
      ),
      hindiMovies: moviesOnly.filter(
        m => m.language?.toLowerCase() === 'hindi'
      ),
      englishMovies: moviesOnly.filter(
        m => m.language?.toLowerCase() === 'english'
      ),
    };
  }, [movies]);

  if (loading) {
    return (
      <>
        <SkeletonHero />
        <SkeletonRow />
        <SkeletonRow />
        <SkeletonRow />
      </>
    );
  }

  if (error) {
    return <ErrorState message="Failed to load movies." />;
  }

  return (
    <div className="bg-black text-white overflow-x-hidden">
      {/* HERO */}
      {featuredMovie && <Hero movie={featuredMovie} />}

      {/* ROWS – SAME AS HOME PAGE */}
      <div className="relative z-10 -mt-32 space-y-12 pb-24">
        {actionMovies.length > 0 && (
          <MovieRow title="Action Movies" movies={actionMovies} />
        )}

        {comedyMovies.length > 0 && (
          <MovieRow title="Comedy Movies" movies={comedyMovies} />
        )}

        {horrorMovies.length > 0 && (
          <MovieRow title="Horror Movies" movies={horrorMovies} />
        )}

        {hindiMovies.length > 0 && (
          <MovieRow title="Hindi Movies" movies={hindiMovies} />
        )}

        {englishMovies.length > 0 && (
          <MovieRow title="English Movies" movies={englishMovies} />
        )}
      </div>
    </div>
  );
};

export default Movies;
