const { check } = require("express-validator");
exports.validSignUp = [
  check("fname", "First Name is required")
    .notEmpty()
    .isLength({
      min: 4,
      max: 32,
    })
    .withMessage("name must be between 3 to 32 characters"),
  check("lname", "Last Name is required")
    .notEmpty()
    .isLength({
      min: 2,
      max: 32,
    })
    .withMessage("name must be between 2 to 32 characters"),
  check("email").isEmail().withMessage("Must be a valid email address"),
  check("password", "password is required").notEmpty(),
  check("password")
    .isLength({
      min: 4,
    })
    .withMessage("Password must contain at least 4 characters")
    .matches(/\d/)
    .withMessage("password must contain a number"),
];

exports.validLogin = [
  check("email").isEmail().withMessage("Must be a valid email address"),
  check("password", "password is required").notEmpty(),
  check("password")
    .isLength({
      min: 4,
    })
    .withMessage("Password must contain at least 4 characters")
    .matches(/\d/)
    .withMessage("password must contain a number"),
];

exports.forgotPasswordValidator = [
  check("email")
    .not()
    .isEmpty()
    .isEmail()
    .withMessage("Must be a valid email address"),
];

exports.resetPasswordValidator = [
  check("newPassword")
    .not()
    .isEmpty()
    .isLength({ min: 4 })
    .withMessage("Password must be at least  4 characters long"),
];

exports.createPostValidator = [
  check("originalName")
    .not()
    .isEmpty()
    .withMessage("Original name is required")
    .isLength({ min: 4 })
    .withMessage("Songs name must be at least  4 characters long"),
  check("genre")
    .not()
    .isEmpty()
    .withMessage("Music gerne should be declared"),
];

