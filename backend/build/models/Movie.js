const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
  },
  posterUrl: {
    type: String,
    required: true,
  },
  videoUrl: {
    type: String,
    required: true,
  },
  genre: {
    type: String,
    required: true,
  },
  duration: {
    type: String,
    required: true,
  },
  year: {
    type: String,
    required: true,
  },
  isSeries: {
    type: Boolean,
    default: false,
  },
  // For future use if you add seasons and episodes
  // seasons: [{
  //   seasonNumber: Number,
  //   episodes: [{
  //     episodeNumber: Number,
  //     title: String,
  //     description: String,
  //     videoUrl: String,
  //     duration: String,
  //   }]
  // }]
}, {
  timestamps: true,
});

const Movie = mongoose.model('Movie', movieSchema);

module.exports = Movie;
