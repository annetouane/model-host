const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");

// import model
const User = require("../models/UserModel");

// @route    GET /
// @desc     Get user by token (authentication endpoint)
// @access   Private
router.delete("/", auth, async (req, res) => {
  try {
    await User.deleteOne({ _id: req.user.id });
    res.send("Votre compte a bien été supprimé");
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Service indisponible");
  }
});

module.exports = router;
