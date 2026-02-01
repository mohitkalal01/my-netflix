import { useMemo } from 'react';
import Hero from '../components/Hero';
import MovieRow from '../components/MovieRow';
import { getAllMovies } from '../services/movieApi';
import { SkeletonHero, SkeletonRow } from '../components/Loader';
import ErrorState from '../components/ErrorState';
import useFetch from '../hooks/useFetch';

const TvShows = () => {
  const { data: movies, loading, error } = useFetch(getAllMovies);

  const {
    featuredShow,
    crimeShows,
    hindiTvShows,
    englishTvShows,
  } = useMemo(() => {
    if (!Array.isArray(movies)) {
      return {
        featuredShow: null,
        crimeShows: [],
        hindiTvShows: [],
        englishTvShows: [],
      };
    }

    // Only TV Shows
    const tvShowsOnly = movies.filter(
      (movie) => movie.isSeries === true
    );

    // Featured TV Show
    const featuredShow =
      tvShowsOnly.length > 0
        ? tvShowsOnly[Math.floor(Math.random() * tvShowsOnly.length)]
        : null;

    // Case-insensitive safe filters
    const crimeShows = tvShowsOnly.filter(
      (movie) => movie.category?.toLowerCase() === 'crime'
    );

    const hindiTvShows = tvShowsOnly.filter(
      (movie) => movie.language?.toLowerCase() === 'hindi'
    );

    const englishTvShows = tvShowsOnly.filter(
      (movie) => movie.language?.toLowerCase() === 'english'
    );

    return {
      featuredShow,
      crimeShows,
      hindiTvShows,
      englishTvShows,
    };
  }, [movies]);

  // Loading state
  if (loading) {
    return (
      <>
        <SkeletonHero />
        <div className="my-8"><SkeletonRow /></div>
        <div className="my-8"><SkeletonRow /></div>
        <div className="my-8"><SkeletonRow /></div>
      </>
    );
  }

  // Error state
  if (error) {
    return (
      <ErrorState message="Failed to load TV shows. Please try again later." />
    );
  }

  return (
    <div className="overflow-x-hidden">
      {/* HERO BANNER */}
      {featuredShow && <Hero movie={featuredShow} />}

      {/* CATEGORY ROWS */}
      {crimeShows.length > 0 && (
        <MovieRow title="Crime Shows" movies={crimeShows} />
      )}

      {hindiTvShows.length > 0 && (
        <MovieRow title="Hindi TV Shows" movies={hindiTvShows} />
      )}

      {englishTvShows.length > 0 && (
        <MovieRow title="English TV Shows" movies={englishTvShows} />
      )}
    </div>
  );
};

export default TvShows;
