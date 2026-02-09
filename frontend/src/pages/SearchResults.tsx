import { useState, useEffect, useMemo, useCallback, ChangeEvent } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import MainLayout from '../components/MainLayout';
import { getMoviesByFilter } from '../services/movieApi';
import { SkeletonRow } from '../components/Loader';
import MovieCard from '../components/MovieCard';
import ErrorState from '../components/ErrorState';
import { MagnifyingGlassIcon, XMarkIcon } from '@heroicons/react/24/solid';

const categories = ['All', 'Action', 'Comedy', 'Drama', 'Horror', 'Sci-Fi', 'Thriller'];
const languages = ['All', 'English', 'Hindi', 'Spanish', 'French'];

interface Movie {
  _id: string;
  title: string;
  thumbnail?: string;
  isSeries?: boolean;
}

const SearchResults = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const searchTerm = queryParams.get('q') || '';
  const categoryFilter = queryParams.get('category') || 'All';
  const languageFilter = queryParams.get('language') || 'All';

  const [localSearchTerm, setLocalSearchTerm] = useState(searchTerm);
  const [searchResults, setSearchResults] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const updateFilters = useCallback((query: string, newCategory: string, newLanguage: string) => {
    const newQueryParams = new URLSearchParams();
    if (query) newQueryParams.set('q', query);
    if (newCategory && newCategory !== 'All') newQueryParams.set('category', newCategory);
    if (newLanguage && newLanguage !== 'All') newQueryParams.set('language', newLanguage);
    navigate(`/search?${newQueryParams.toString()}`, { replace: true });
  }, [navigate]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateFilters(localSearchTerm, categoryFilter, languageFilter);
  };

  const handleCategoryChange = (e: ChangeEvent<HTMLSelectElement>) => {
    updateFilters(searchTerm, e.target.value, languageFilter);
  };

  const handleLanguageChange = (e: ChangeEvent<HTMLSelectElement>) => {
    updateFilters(searchTerm, categoryFilter, e.target.value);
  };

  const clearSearch = () => {
    setLocalSearchTerm('');
    navigate('/search', { replace: true });
  };

  useEffect(() => {
    setLocalSearchTerm(searchTerm);
  }, [searchTerm]);

  useEffect(() => {
    const fetchResults = async () => {
      setLoading(true);
      setError(null);
      try {
        const params: Record<string, string> = {};
        if (searchTerm) params.search = searchTerm;
        if (categoryFilter && categoryFilter !== 'All') params.category = categoryFilter;
        if (languageFilter && languageFilter !== 'All') params.language = languageFilter;

        const data = await getMoviesByFilter(params);
        setSearchResults(data);
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, [searchTerm, categoryFilter, languageFilter]);

  const movies = useMemo(() => searchResults.filter(movie => !movie.isSeries), [searchResults]);
  const tvShows = useMemo(() => searchResults.filter(movie => movie.isSeries), [searchResults]);
  const hasResults = movies.length > 0 || tvShows.length > 0;

  return (
    <MainLayout>
      <div className="min-h-screen pt-16 md:pt-20">
        {/* Mobile Search Header */}
        <div className="sticky top-16 md:top-20 z-40 bg-brand-black/95 backdrop-blur-sm border-b border-gray-800">
          <div className="container-mobile py-3">
            {/* Search Input */}
            <form onSubmit={handleSearchSubmit} className="relative">
              <input
                type="text"
                placeholder="Search movies and TV shows..."
                value={localSearchTerm}
                onChange={(e) => setLocalSearchTerm(e.target.value)}
                className="w-full pl-10 pr-10 py-3 rounded-lg bg-gray-800 text-white placeholder-gray-400 
                  focus:outline-none focus:ring-2 focus:ring-brand-red 
                  text-base"
              />
              <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              {localSearchTerm && (
                <button
                  type="button"
                  onClick={clearSearch}
                  className="absolute right-3 top-1/2 -translate-y-1/2 touch-target"
                >
                  <XMarkIcon className="h-5 w-5 text-gray-400" />
                </button>
              )}
            </form>

            {/* Filters - Horizontal scroll on mobile */}
            <div className="flex gap-3 mt-3 overflow-x-auto scrollbar-hide pb-1">
              <select
                value={categoryFilter}
                onChange={handleCategoryChange}
                className="flex-shrink-0 bg-gray-800 text-white text-sm rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand-red"
              >
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>

              <select
                value={languageFilter}
                onChange={handleLanguageChange}
                className="flex-shrink-0 bg-gray-800 text-white text-sm rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand-red"
              >
                {languages.map(lang => (
                  <option key={lang} value={lang}>{lang}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Results */}
        <div className="container-mobile py-4">
          {searchTerm && (
            <h2 className="text-lg md:text-xl font-semibold text-white mb-4">
              Results for "{searchTerm}"
              {categoryFilter !== 'All' && <span className="text-gray-400"> in {categoryFilter}</span>}
            </h2>
          )}

          {loading && (
            <div className="space-y-6">
              <SkeletonRow />
              <SkeletonRow />
            </div>
          )}

          {error && <ErrorState message="Failed to load search results." />}

          {!loading && !error && !hasResults && (
            <div className="text-center py-12">
              <p className="text-gray-400 text-lg">
                {searchTerm
                  ? `No results found for "${searchTerm}"`
                  : 'Start typing to search for movies and TV shows'
                }
              </p>
            </div>
          )}

          {!loading && !error && hasResults && (
            <>
              {movies.length > 0 && (
                <div className="mb-8">
                  <h3 className="text-lg font-semibold text-white mb-3">Movies ({movies.length})</h3>
                  <div className="movie-grid">
                    {movies.map((movie) => (
                      <MovieCard key={movie._id} movie={movie} />
                    ))}
                  </div>
                </div>
              )}

              {tvShows.length > 0 && (
                <div className="mb-8">
                  <h3 className="text-lg font-semibold text-white mb-3">TV Shows ({tvShows.length})</h3>
                  <div className="movie-grid">
                    {tvShows.map((movie) => (
                      <MovieCard key={movie._id} movie={movie} />
                    ))}
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </MainLayout>
  );
};

export default SearchResults;
