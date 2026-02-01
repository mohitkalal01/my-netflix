const Movie = require("../models/Movie");
const cloudinary = require("../config/cloudinary");
const fs = require("fs");
const asyncHandler = require("express-async-handler");

// GET ALL MOVIES
exports.getAllMovies = asyncHandler(async (req, res) => {
  const movies = await Movie.find();
  res.json(movies);
});

// GET MOVIE BY ID
exports.getMovieById = asyncHandler(async (req, res) => {
  const movie = await Movie.findById(req.params.id);
  if (!movie) {
    res.status(404);
    throw new Error("Movie not found");
  }
  res.json(movie);
});

// GET TRENDING MOVIES
exports.getTrendingMovies = asyncHandler(async (req, res) => {
  const movies = await Movie.find({ isTrending: true });
  res.json(movies);
});

// GET FEATURED MOVIE (BANNER)
exports.getFeaturedMovie = asyncHandler(async (req, res) => {
  const movie = await Movie.findOne({ isFeatured: true });
  res.json(movie);
});

// GET MOVIES BY CATEGORY / LANGUAGE
exports.getMoviesByFilter = asyncHandler(async (req, res) => {
  const { category, language } = req.query;

  const filter = {};
  if (category) filter.category = category;
  if (language) filter.language = language;

  const movies = await Movie.find(filter);
  res.json(movies);
});

// ADD MOVIE (ADMIN)
exports.addMovie = asyncHandler(async (req, res) => {
  const { title, description, category, language, genre, isTrending, isFeatured } =
    req.body;

  // Check if files are uploaded
  if (!req.files || !req.files.thumbnail || !req.files.video) {
    res.status(400);
    throw new Error("Thumbnail and Video are required");
  }

  const thumbnailFile = req.files.thumbnail[0];
  const videoFile = req.files.video[0];

  // Upload Thumbnail to Cloudinary
  const thumbnailUpload = await cloudinary.uploader.upload(thumbnailFile.path, {
    folder: "netflix-clone/thumbnails",
  });

  // Upload Video to Cloudinary
  const videoUpload = await cloudinary.uploader.upload(videoFile.path, {
    resource_type: "video",
    folder: "netflix-clone/videos",
  });

  // Create Movie in DB
  const movie = new Movie({
    title,
    description,
    category,
    language,
    genre,
    thumbnail: thumbnailUpload.secure_url,
    thumbnailPublicId: thumbnailUpload.public_id,
    videoUrl: videoUpload.secure_url,
    videoPublicId: videoUpload.public_id,
    isTrending: isTrending === "true", // convert string to boolean
    isFeatured: isFeatured === "true", // convert string to boolean
  });

  const createdMovie = await movie.save();

  // Remove local temp files
  fs.unlinkSync(thumbnailFile.path);
  fs.unlinkSync(videoFile.path);

  res.status(201).json(createdMovie);
});

// DELETE MOVIE (ADMIN)
exports.deleteMovie = asyncHandler(async (req, res) => {
  const movie = await Movie.findById(req.params.id);
  if (!movie) {
    res.status(404);
    throw new Error("Movie not found");
  }

  // Delete from Cloudinary
  await cloudinary.uploader.destroy(movie.thumbnailPublicId);
  await cloudinary.uploader.destroy(movie.videoPublicId, { resource_type: "video" });

  await Movie.deleteOne({ _id: req.params.id });

  res.json({ message: "Movie removed" });
});


