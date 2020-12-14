const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");

// import model
const User = require("../models/UserModel");

// @route    GET /
// @desc     Get user by token (authentication endpoint)
// @access   Private
router.get("/", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select(
      "-password -confirmed -condition"
    );
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;