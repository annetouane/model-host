const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");

// import model
const User = require("../models/UserModel");
const InputForm = require("../models/InputModel");

// @route    GET /
// @desc     Get user by token (authentication endpoint)
// @access   Private
router.delete("/", auth, async (req, res) => {
  console.log("delete");
  try {
    await User.deleteOne({ _id: req.user.id });
    await InputForm.deleteMany({ user: req.user.id });
    res.send("Votre compte a bien été supprimé");
  } catch (err) {
    console.error(err.message);
    res.status(500).send({ msg: "Service indisponible", color: "red" });
  }
});

module.exports = router;
