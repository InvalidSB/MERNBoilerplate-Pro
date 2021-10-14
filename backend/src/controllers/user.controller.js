const User = require("../models/auth.model");
const expressJwt = require("express-jwt");

exports.readController = (req, res) => {
  const userId = req.params.id;
  User.findById(userId).exec((err, user) => {
    if (err || !user) {
      return res.status(400).json({
        error: "User not found",
      });
    }
    user.hashed_password = undefined;
    user.salt = undefined;
    res.json(user);
  });
};
exports.updateController = (req, res) => {
  const {
    fname,
    lname,
    Bio,
    ProfilePic,
    password,
    DateOfBirth,
    Gender,
    Location,
  } = req.body;
  const { Country, City, Street } = Location;
  // console.log(Location)
  User.findOne({ _id: req.user._id }, (err, user) => {
    if (err || !user) {
      return res.status(400).json({
        error: "User not found",
      });
    }
    if (!fname) {
      return res.status(400).json({
        error: "First Name is required",
      });
    } else {
      user.fname = fname;
    }
    if (!lname) {
      return res.status(400).json({
        error: "Last Name is required",
      });
    } else {
      user.lname = lname;
    }

    if (password) {
      if (password.length < 4) {
        return res.status(400).json({
          error: "Password should be min 4 characters long",
        });
      } else {
        user.password = password;
      }
    }

    if (Bio) {
      if (Bio.length > 150) {
        return res.status(400).json({
          error: "User's Bio should be less than 150 characters long",
        });
      } else {
        user.Bio = Bio;
      }
    }
    if (ProfilePic) {
      if (ProfilePic.length > 200) {
        return res.status(400).json({
          error: "User's Pics should be less than 200 characters long",
        });
      } else {
        user.ProfilePic = ProfilePic;
      }
    }
    if (Location) {
      if (ProfilePic.length < 3) {
        return res.status(400).json({
          error: "Users Country should be more than 3 characters long",
        });
      } else {
        user.Location = Location;
      }
    }
   
   
    if (DateOfBirth) {
      if (ProfilePic.length < 6) {
        return res.status(400).json({
          error:
            "User's Date of Birthdate should be More than 6 characters long",
        });
      } else {
        user.DateOfBirth = 1 / 1 / 2000;
      }
    }
    if (Gender) {
      if (ProfilePic.length < 1) {
        return res.status(400).json({
          error: "User's Gender should be Mentioned ",
        });
      } else {
        user.Gender = Gender;
      }
    }

    user.save((err, updatedUser) => {
      if (err) {
        console.log("USER UPDATE ERROR", err);
        return res.status(400).json({
          error: "User update failed",
        });
      }
      updatedUser.hashed_password = undefined;
      updatedUser.salt = undefined;
      res.json(updatedUser);
    });
  });
};




  