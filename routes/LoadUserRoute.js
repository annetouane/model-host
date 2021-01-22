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
      "-password -confirmed -condition -date"
    );
    const projects = await InputForm.find({
      $and: [{ user: user.id }, { nomProjet: { $ne: "" } }],
    });
    res.json({ user, projects });
  } catch (err) {
    console.error(err.message);
    res.status(500).send({ msg: "Utilisateur introuvable", color: "red" });
  }
});

module.exports = router;
