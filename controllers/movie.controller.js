const Movie = require('../models/Movie');
const asyncHandler = require('express-async-handler');

// @desc    Get all movies
// @route   GET /api/movies
// @access  Public
const getMovies = asyncHandler(async (req, res) => {
  const movies = await Movie.find({});
  res.status(200).json(movies);
});

// @desc    Get trending movies
// @route   GET /api/movies/trending
// @access  Public
const getTrendingMovies = asyncHandler(async (req, res) => {
  const trendingMovies = await Movie.find({ category: 'trending' });
  res.status(200).json(trendingMovies);
});

// @desc    Get movies by category
// @route   GET /api/movies/category/:categoryName
// @access  Public
const getMoviesByCategory = asyncHandler(async (req, res) => {
  const { categoryName } = req.params;
  const movies = await Movie.find({ category: categoryName });
  res.status(200).json(movies);
});

// @desc    Get one featured movie
// @route   GET /api/movies/featured
// @access  Public
const getFeaturedMovie = asyncHandler(async (req, res) => {
  const featuredMovie = await Movie.findOne({ isFeatured: true });
  if (featuredMovie) {
    res.status(200).json(featuredMovie);
  } else {
    res.status(404).json({ message: 'No featured movie found' });
  }
});

// @desc    Add a new movie
// @route   POST /api/movies
// @access  Admin
const addMovie = asyncHandler(async (req, res) => {
  const { title, description, category, thumbnail, videoUrl, isFeatured } = req.body;

  if (!title || !description || !category || !thumbnail || !videoUrl) {
    res.status(400);
    throw new Error('Please fill all required fields');
  }

  const movieExists = await Movie.findOne({ title });
  if (movieExists) {
    res.status(400);
    throw new Error('Movie with this title already exists');
  }

  const movie = await Movie.create({
    title,
    description,
    category,
    thumbnail,
    videoUrl,
    isFeatured: isFeatured || false,
  });

  res.status(201).json(movie);
});

// @desc    Update a movie
// @route   PUT /api/movies/:id
// @access  Admin
const updateMovie = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const movie = await Movie.findById(id);

  if (!movie) {
    res.status(404);
    throw new Error('Movie not found');
  }

  const updatedMovie = await Movie.findByIdAndUpdate(id, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(200).json(updatedMovie);
});

// @desc    Delete a movie
// @route   DELETE /api/movies/:id
// @access  Admin
const deleteMovie = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const movie = await Movie.findById(id);

  if (!movie) {
    res.status(404);
    throw new Error('Movie not found');
  }

  await movie.deleteOne();
  res.status(200).json({ message: 'Movie removed' });
});

module.exports = {
  getMovies,
  getTrendingMovies,
  getMoviesByCategory,
  getFeaturedMovie,
  addMovie,
  updateMovie,
  deleteMovie,
};
