const express = require("express");
const router = express.Router();

// import model
const User = require("../models/UserModel");

// Email account confirmation
router.get("/:id", async (req, res) => {
  // check that id has a mongoDB format
  const id = req.params.id;
  if (!id.match(/^[0-9a-fA-F]{24}$/)) {
    return res.status(400).json({
      msg: "Cet utilisateur n'existe pas",
    });
  } else {
    try {
      // check that user exists
      const user = await User.findOne({ _id: id });
      if (!user) {
        return res.status(400).json({
          msg: "Cet utilisateur n'existe pas",
        });
      } else {
        // set confirm to true and sends the redirection form
        await User.findByIdAndUpdate(user.id, { $set: { confirmed: true } });
        res.render("contact");
      }
    } catch (err) {
      console.error(err.message);
      res.status(500).send({ msg: "Service indisponible", color: "red" });
    }
  }
});

module.exports = router;
