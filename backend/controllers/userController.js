const User = require("../models/User");
const WatchHistory = require("../models/WatchHistory");
const asyncHandler = require("express-async-handler");

// @desc    Get user profile
// @route   GET /api/users/me
// @access  Private
exports.getMe = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id).select("-password");
  res.json(user);
});

// @desc    Update watch progress
// @route   POST /api/users/watch-progress
// @access  Private
exports.updateWatchProgress = asyncHandler(async (req, res) => {
  const { movieId, progress, duration } = req.body;
  const userId = req.user.id;

  if (progress / duration >= 0.95) {
    await WatchHistory.findOneAndDelete({ user: userId, movie: movieId });
    res.status(200).json({ message: "Movie finished and removed from history" });
  } else {
    const history = await WatchHistory.findOneAndUpdate(
      { user: userId, movie: movieId },
      { progress, duration },
      { new: true, upsert: true }
    );
    res.status(200).json(history);
  }
});

// @desc    Get continue watching list
// @route   GET /api/users/continue-watching
// @access  Private
exports.getContinueWatching = asyncHandler(async (req, res) => {
  const userId = req.user.id;
  const history = await WatchHistory.find({ user: userId })
    .populate("movie")
    .sort({ updatedAt: -1 });

  res.json(history);
});

