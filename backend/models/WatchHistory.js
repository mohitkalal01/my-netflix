const mongoose = require('mongoose');

const watchHistorySchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  movie: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Movie',
    required: true,
  },
  watchedAt: {
    type: Date,
    default: Date.now,
  },
  // You could add a progress field, e.g., to store how much was watched
  // progress: { type: Number, default: 0 } // e.g., in seconds or percentage
}, {
  timestamps: true,
});

// Create a compound index to ensure a user has only one entry per movie
watchHistorySchema.index({ user: 1, movie: 1 }, { unique: true });

const WatchHistory = mongoose.model('WatchHistory', watchHistorySchema);

module.exports = WatchHistory;
