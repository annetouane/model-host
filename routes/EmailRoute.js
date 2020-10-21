const express = require("express");
const router = express.Router();
// const { check, validationResult } = require("express-validator");

// const auth = require("../middleware/auth");

const UserEmail = require("../models/EmailModel");

// @route : POST /
// @description : post new activity
// @ access : authentication (Public)
router.post("/", async (req, res) => {
  // const errors = validationResult(req);
  // if (!errors.isEmpty()) {
  //   return res.status(400).json({ errors: errors.array() });
  // }
  try {
    console.log(req.body);

    let userEmail = {
      emailModal: req.body.emailModal,
      emailFooter: req.body.emailFooter,
    };

    newEmail = UserEmail(userEmail);
    const response = await newEmail.save();
    res.json(response);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
