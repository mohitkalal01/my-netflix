const mongoose = require("mongoose");

const MovieSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },

    // Bollywood / Hollywood / Web Series
    category: {
      type: String,
      required: true,
      enum: ["bollywood", "hollywood", "series"],
    },

    // Hindi / English
    language: {
      type: String,
      required: true,
      enum: ["hindi", "english"],
    },

    genre: {
      type: String,
      required: true, // action, comedy, thriller
    },

    thumbnail: {
      type: String,
      required: true,
    },
    thumbnailPublicId: {
      type: String,
      required: true,
    },

    videoUrl: {
      type: String,
      required: true,
    },
    videoPublicId: {
      type: String,
      required: true,
    },

    isTrending: {
      type: Boolean,
      default: false,
    },

    isFeatured: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Movie", MovieSchema);

