const express = require('express');
const {
  getMovies,
  getTrendingMovies,
  getMoviesByCategory,
  getFeaturedMovie,
  addMovie,
  updateMovie,
  deleteMovie,
} = require('../controllers/movie.controller');
const { protect, authorizeAdmin } = require('../middlewares/auth.middleware');
const router = express.Router();

// Public routes
router.get('/', getMovies);
router.get('/trending', getTrendingMovies);
router.get('/category/:categoryName', getMoviesByCategory);
router.get('/featured', getFeaturedMovie);

// Admin only routes (protected)
router.post('/', protect, authorizeAdmin, addMovie);
router.put('/:id', protect, authorizeAdmin, updateMovie);
router.delete('/:id', protect, authorizeAdmin, deleteMovie);

module.exports = router;
