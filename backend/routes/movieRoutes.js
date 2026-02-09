const express = require('express');
const router = express.Router();
const {
  getMovies,
  getMovieById,
  createMovie,
  updateMovie,
  deleteMovie,
  getFeaturedMovie,
} = require('../controllers/movieController');
const { protect, admin } = require('../middlewares/authMiddleware');

// Public routes
router.get('/', getMovies);
router.get('/featured', getFeaturedMovie); // Make sure this is before '/:id'
router.get('/:id', getMovieById);


// Admin routes
router.post('/', protect, admin, createMovie);
router.put('/:id', protect, admin, updateMovie);
router.delete('/:id', protect, admin, deleteMovie);

module.exports = router;
