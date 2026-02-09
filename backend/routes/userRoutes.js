const express = require('express');
const router = express.Router();
const {
  getUserProfile,
  updateUserProfile,
  getMyList,
  addToMyList,
  removeFromMyList,
  getWatchHistory,
  updateWatchHistory,
} = require('../controllers/userController');
const { protect } = require('../middlewares/authMiddleware');

// All these routes are protected
router.use(protect);

router.route('/profile')
  .get(getUserProfile)
  .put(updateUserProfile);

router.route('/mylist')
  .get(getMyList)
  .post(addToMyList);

router.delete('/mylist/:movieId', removeFromMyList);

router.route('/watch-history')
    .get(getWatchHistory)
    .post(updateWatchHistory);

module.exports = router;
