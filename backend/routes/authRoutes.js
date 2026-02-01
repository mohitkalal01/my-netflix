const express = require("express");
const { register, login } = require("../controllers/authController");
const {
  registerValidation,
  loginValidation,
} = require("../middlewares/validationMiddleware");

const router = express.Router();

router.post("/register", registerValidation, register);
router.post("/login", loginValidation, login);

module.exports = router;
