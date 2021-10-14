
const express = require("express");
const router = express.Router();

const {
  requireSignin
} = require("../controllers/auth.controller");
const {
  readController,
  updateController,
} = require("../controllers/user.controller");

router.get("/:id", requireSignin, readController);
router.put("/update", requireSignin, updateController);


module.exports = router;
