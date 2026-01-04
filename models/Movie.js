const mongoose = require('mongoose');

const MovieSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique: true, // Assuming movie titles should be unique
  },
  description: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
    enum: ['trending', 'popular', 'action', 'comedy', 'horror', 'romance', 'sci-fi', 'drama', 'thriller', 'animation', 'documentary'], // Added more categories
  },
  thumbnail: {
    type: String, // URL to image
    required: true,
  },
  videoUrl: {
    type: String, // URL to streaming video
    required: true,
  },
  isFeatured: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Movie', MovieSchema);
