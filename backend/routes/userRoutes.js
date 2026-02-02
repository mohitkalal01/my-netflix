const express = require("express");
const router = express.Router();
const {
  getMe,
  updateWatchProgress,
  getContinueWatching,
  getMyList,
  addToMyList,
  removeFromMyList,
} = require("../controllers/userController");
const authMiddleware = require("../middlewares/authMiddleware");

router.get("/me", authMiddleware, getMe);
router.post("/watch-progress", authMiddleware, updateWatchProgress);
router.get("/continue-watching", authMiddleware, getContinueWatching);

router.route("/my-list").get(authMiddleware, getMyList).post(authMiddleware, addToMyList);
router.delete("/my-list/:movieId", authMiddleware, removeFromMyList);

module.exports = router;

