const express = require("express");
const router = express.Router();
const {
  getAllMovies,
  getMovieById,
  getTrendingMovies,
  getFeaturedMovie,
  getMoviesByFilter,
  addMovie,
  deleteMovie,
} = require("../controllers/movieController");
const {
  addMovieValidation,
} = require("../middlewares/validationMiddleware");

const auth = require("../middlewares/authMiddleware");
const admin = require("../middlewares/adminMiddleware");

// PUBLIC ROUTES
router.get("/", getAllMovies);
router.get("/trending", getTrendingMovies);
router.get("/featured", getFeaturedMovie);
router.get("/filter", getMoviesByFilter);
router.get("/:id", getMovieById);

// ADMIN ROUTE
const upload = require("../middlewares/uploadMiddleware");

router.post(
  "/",
  auth,
  admin,
  upload.fields([
    { name: "thumbnail", maxCount: 1 },
    { name: "video", maxCount: 1 },
  ]),
  addMovieValidation,
  addMovie
);

router.delete("/:id", auth, admin, deleteMovie);

module.exports = router;
