import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import MainLayout from '../components/MainLayout';
import { getMoviesByFilter } from '../services/movieApi';
import { SkeletonRow } from '../components/Loader';
import MovieRow from '../components/MovieRow';
import ErrorState from '../components/ErrorState';

const categories = ['All', 'Action', 'Comedy', 'Drama', 'Horror', 'Sci-Fi', 'Thriller'];
const languages = ['All', 'English', 'Hindi', 'Spanish', 'French'];

const SearchResults = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const searchTerm = queryParams.get('q') || '';
  const categoryFilter = queryParams.get('category') || 'All';
  const languageFilter = queryParams.get('language') || 'All';

  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const updateFilters = useCallback((newCategory, newLanguage) => {
    const newQueryParams = new URLSearchParams();
    if (searchTerm) newQueryParams.set('q', searchTerm);
    if (newCategory && newCategory !== 'All') newQueryParams.set('category', newCategory);
    if (newLanguage && newLanguage !== 'All') newQueryParams.set('language', newLanguage);
    navigate(`/search?${newQueryParams.toString()}`);
  }, [searchTerm, navigate]);

  const handleCategoryChange = (e) => {
    updateFilters(e.target.value, languageFilter);
  };

  const handleLanguageChange = (e) => {
    updateFilters(categoryFilter, e.target.value);
  };

  useEffect(() => {
    const fetchResults = async () => {
      setLoading(true);
      setError(null);
      try {
        const params = {};
        if (searchTerm) params.search = searchTerm;
        if (categoryFilter && categoryFilter !== 'All') params.category = categoryFilter;
        if (languageFilter && languageFilter !== 'All') params.language = languageFilter;

        const data = await getMoviesByFilter(params);
        setSearchResults(data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, [searchTerm, categoryFilter, languageFilter]);

  const movies = useMemo(() => searchResults.filter(movie => !movie.isSeries), [searchResults]);
  const tvShows = useMemo(() => searchResults.filter(movie => movie.isSeries), [searchResults]);

  if (loading) {
    return (
      <MainLayout>
        <div className="container mx-auto px-4 py-8 pt-24">
          <SkeletonRow title="Searching..." />
          <SkeletonRow />
        </div>
      </MainLayout>
    );
  }

  if (error) {
    return (
      <MainLayout>
        <div className="container mx-auto px-4 py-8 pt-24">
          <ErrorState message="Failed to load search results." />
        </div>
      </MainLayout>
    );
  }

  const hasResults = movies.length > 0 || tvShows.length > 0;

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8 pt-24 text-white">
        <h1 className="text-3xl font-bold mb-6">
          Search Results for "{searchTerm}"
          {categoryFilter !== 'All' && ` in ${categoryFilter}`}
          {languageFilter !== 'All' && ` (${languageFilter})`}
        </h1>

        <div className="flex flex-wrap gap-4 mb-8">
          {/* Category Filter */}
          <div className="flex items-center space-x-2">
            <label htmlFor="category-filter" className="text-lg">Category:</label>
            <select
              id="category-filter"
              className="bg-gray-800 text-white rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand-red"
              value={categoryFilter}
              onChange={handleCategoryChange}
            >
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          {/* Language Filter */}
          <div className="flex items-center space-x-2">
            <label htmlFor="language-filter" className="text-lg">Language:</label>
            <select
              id="language-filter"
              className="bg-gray-800 text-white rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand-red"
              value={languageFilter}
              onChange={handleLanguageChange}
            >
              {languages.map(lang => (
                <option key={lang} value={lang}>{lang}</option>
              ))}
            </select>
          </div>
        </div>

        {!hasResults && (
          <div className="text-center text-gray-400 text-lg">
            No results found for your search and filter criteria.
          </div>
        )}

        {movies.length > 0 && (
          <MovieRow title="Movies" movies={movies} />
        )}

        {tvShows.length > 0 && (
          <MovieRow title="TV Shows" movies={tvShows} />
        )}
      </div>
    </MainLayout>
  );
};

export default SearchResults;
