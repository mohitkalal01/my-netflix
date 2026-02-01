const express = require("express");
const router = express.Router();
const {
  getMe,
  updateWatchProgress,
  getContinueWatching,
} = require("../controllers/userController");
const authMiddleware = require("../middlewares/authMiddleware");

router.get("/me", authMiddleware, getMe);
router.post("/watch-progress", authMiddleware, updateWatchProgress);
router.get("/continue-watching", authMiddleware, getContinueWatching);

module.exports = router;

