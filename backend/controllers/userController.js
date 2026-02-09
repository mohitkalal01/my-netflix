const User = require('../models/User');
const Movie = require('../models/Movie');
const WatchHistory = require('../models/WatchHistory');
const asyncHandler = require('express-async-handler');

// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private
const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    res.json({
      _id: user._id,
      username: user.username,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

// @desc    Update user profile
// @route   PUT /api/users/profile
// @access  Private
const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    user.username = req.body.username || user.username;
    user.email = req.body.email || user.email;
    if (req.body.password) {
      user.password = req.body.password;
    }

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      username: updatedUser.username,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
    });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

// @desc    Get user's list
// @route   GET /api/users/mylist
// @access  Private
const getMyList = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id).populate('myList');
  if (user) {
    res.json(user.myList);
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

// @desc    Add movie to user's list
// @route   POST /api/users/mylist
// @access  Private
const addToMyList = asyncHandler(async (req, res) => {
  const { movieId } = req.body;
  const user = await User.findById(req.user._id);
  const movie = await Movie.findById(movieId);

  if (user && movie) {
    if (user.myList.includes(movieId)) {
      res.status(400);
      throw new Error('Movie already in list');
    }
    user.myList.push(movieId);
    await user.save();

    // Return the updated populated list
    const updatedUser = await User.findById(req.user._id).populate('myList');
    res.status(201).json(updatedUser.myList);
  } else {
    res.status(404);
    throw new Error('User or Movie not found');
  }
});

// @desc    Remove movie from user's list
// @route   DELETE /api/users/mylist/:movieId
// @access  Private
const removeFromMyList = asyncHandler(async (req, res) => {
  const { movieId } = req.params;
  const user = await User.findById(req.user._id);

  if (user) {
    user.myList = user.myList.filter((id) => id.toString() !== movieId);
    await user.save();

    // Return the updated populated list
    const updatedUser = await User.findById(req.user._id).populate('myList');
    res.json(updatedUser.myList);
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

// @desc    Get user's watch history (Continue Watching)
// @route   GET /api/users/watch-history
// @access  Private
const getWatchHistory = asyncHandler(async (req, res) => {
  const history = await WatchHistory.find({ user: req.user._id })
    .sort({ watchedAt: -1 })
    .populate('movie')
    .limit(10); // Get latest 10 watched items

  res.json(history.map(item => item.movie)); // Return only the movie details
});


// @desc    Add to or update watch history
// @route   POST /api/users/watch-history
// @access  Private
const updateWatchHistory = asyncHandler(async (req, res) => {
  const { movieId } = req.body;

  // Use findOneAndUpdate with upsert to create or update the history entry
  const historyEntry = await WatchHistory.findOneAndUpdate(
    { user: req.user._id, movie: movieId },
    { watchedAt: Date.now() }, // Update the timestamp
    { new: true, upsert: true } // Return the new/updated doc, and create if it doesn't exist
  );

  res.status(201).json(historyEntry);
});


module.exports = {
  getUserProfile,
  updateUserProfile,
  getMyList,
  addToMyList,
  removeFromMyList,
  getWatchHistory,
  updateWatchHistory,
};