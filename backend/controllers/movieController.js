const Movie = require('../models/Movie');
const WatchHistory = require('../models/WatchHistory');
const asyncHandler = require('express-async-handler');

// @desc    Fetch all movies
// @route   GET /api/movies
// @access  Public
const getMovies = asyncHandler(async (req, res) => {
  const movies = await Movie.find({});
  res.json(movies);
});

// @desc    Fetch single movie by ID
// @route   GET /api/movies/:id
// @access  Public
const getMovieById = asyncHandler(async (req, res) => {
  const movie = await Movie.findById(req.params.id);

  if (movie) {
    res.json(movie);
  } else {
    res.status(404);
    throw new Error('Movie not found');
  }
});

// @desc    Create a movie
// @route   POST /api/movies
// @access  Private/Admin
const createMovie = asyncHandler(async (req, res) => {
    const { title, description, posterUrl, videoUrl, genre, duration, year, isSeries } = req.body;

    const movie = new Movie({
        title,
        description,
        posterUrl,
        videoUrl,
        genre,
        duration,
        year,
        isSeries,
    });

    const createdMovie = await movie.save();
    res.status(201).json(createdMovie);
});


// @desc    Update a movie
// @route   PUT /api/movies/:id
// @access  Private/Admin
const updateMovie = asyncHandler(async (req, res) => {
  const { title, description, posterUrl, videoUrl, genre, duration, year, isSeries } = req.body;

  const movie = await Movie.findById(req.params.id);

  if (movie) {
    movie.title = title || movie.title;
    movie.description = description || movie.description;
    movie.posterUrl = posterUrl || movie.posterUrl;
    movie.videoUrl = videoUrl || movie.videoUrl;
    movie.genre = genre || movie.genre;
    movie.duration = duration || movie.duration;
    movie.year = year || movie.year;
    movie.isSeries = isSeries === undefined ? movie.isSeries : isSeries;

    const updatedMovie = await movie.save();
    res.json(updatedMovie);
  } else {
    res.status(404);
    throw new Error('Movie not found');
  }
});

// @desc    Delete a movie
// @route   DELETE /api/movies/:id
// @access  Private/Admin
const deleteMovie = asyncHandler(async (req, res) => {
  const movie = await Movie.findById(req.params.id);

  if (movie) {
    await movie.deleteOne();
    res.json({ message: 'Movie removed' });
  } else {
    res.status(404);
    throw new Error('Movie not found');
  }
});

// @desc    Get random featured movie/series for Hero banner
// @route   GET /api/movies/featured
// @access  Public
const getFeaturedMovie = asyncHandler(async (req, res) => {
    const count = await Movie.countDocuments();
    const random = Math.floor(Math.random() * count);
    const featuredMovie = await Movie.findOne().skip(random);
    res.json(featuredMovie);
});


module.exports = {
  getMovies,
  getMovieById,
  createMovie,
  updateMovie,
  deleteMovie,
  getFeaturedMovie,
};
