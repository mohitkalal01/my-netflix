const { validationResult, body } = require("express-validator");

const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

const registerValidation = [
  body("username", "Username is required").not().isEmpty(),
  body("email", "Please include a valid email").isEmail(),
  body(
    "password",
    "Please enter a password with 6 or more characters"
  ).isLength({ min: 6 }),
  handleValidationErrors,
];

const loginValidation = [
  body("email", "Please include a valid email").isEmail(),
  body("password", "Password is required").exists(),
  handleValidationErrors,
];

const addMovieValidation = [
  body("title", "Title is required").not().isEmpty(),
  body("description", "Description is required").not().isEmpty(),
  body("category", "Category is required").isIn(["bollywood", "hollywood", "series"]),
  body("language", "Language is required").isIn(["hindi", "english"]),
  body("genre", "Genre is required").not().isEmpty(),
  handleValidationErrors,
];

module.exports = {
  registerValidation,
  loginValidation,
  addMovieValidation,
};

