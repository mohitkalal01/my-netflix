const mongoose = require("mongoose");

const WatchHistorySchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    movie: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Movie",
      required: true,
    },
    progress: {
      type: Number, // in seconds
      required: true,
    },
    duration: {
      type: Number, // in seconds
      required: true,
    },
  },
  { timestamps: true }
);

// Ensure one record per user per movie
WatchHistorySchema.index({ user: 1, movie: 1 }, { unique: true });

module.exports = mongoose.model("WatchHistory", WatchHistorySchema);
