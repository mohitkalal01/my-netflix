const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");

exports.register = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;

  const exist = await User.findOne({ email });
  if (exist) {
    res.status(400);
    throw new Error("User already exists");
  }

  const user = await User.create({ username, email, password });

  if (user) {
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN }
    );
    res.status(201).json({ token, user: { id: user._id, username: user.username } });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

exports.login = asyncHandler(async (req, res) => {
  console.log("Login request body:", req.body);
  const { email, password } = req.body;

  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    res.status(400);
    throw new Error("Invalid credentials");
  }
  const match = await bcrypt.compare(password, user.password);
  if (!match) {
    res.status(400);
    throw new Error("Invalid credentials");
  }
  const token = jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN }
  );

  res.json({ token, user: { id: user._id, username: user.username } });
});

