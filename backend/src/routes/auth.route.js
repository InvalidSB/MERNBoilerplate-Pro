import express from "express"
const router = express.Router();

const {
  validSignUp,
  validLogin,
  forgotPasswordValidator,
  resetPasswordValidator,
} = require("../helpers/valid");

// load controllers
const {
  registerController,
  activationController,
  signinController,
  forgotPasswordController,
  resetPasswordController,
  googleController,
  facebookController,
} = require("../controllers/auth.controller.js");

router.post("/register", validSignUp, registerController);
router.post("/activation", activationController);
router.post("/login", validLogin, signinController);

// forgot reset password
router.put(
  "/forgotpassword",
  forgotPasswordValidator,
  forgotPasswordController
);
router.put("/resetpassword", resetPasswordValidator, resetPasswordController);

// Google and Facebook Login
// router.post("/googlelogin", googleController);
// router.post("/facebooklogin", facebookController);s

module.exports = router;
// http://localhost:3000/user/activate/
// http://localhost:3000/user/activate/