const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const config = require("config");
const jwt = require("jsonwebtoken");
const sgMail = require("@sendgrid/mail");

// import model
const User = require("../models/UserModel");

// @route    POST /signin
// @desc     Register user
// @access   Public
router.post(
  "/",
  [
    check("email", "Invalid email").isEmail(),
    check("password", "Please enter your password").exists(),
  ],
  async (req, res) => {
    // pass the req to validate its parameters
    const errors = validationResult(req);
    // if a field isn't valide
    if (!errors.isEmpty()) {
      // status 400 + array with errors
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;
    try {
      // check if user exists (true false)
      let user = await User.findOne({ email });

      // if user not found (matching email) : sends 400 and array with error message
      if (!user) {
        return res.status(400).json({
          errors: [{ msg: "Invalid credentials" }],
        });
      }

      const confirmed = user.confirmed;
      // if email not confirmed : sends 400 and error
      if (!confirmed) {
        return res
          .status(400)
          .json({ errors: [{ msg: "Please confirm your email adress" }] });
      }

      // user found in the DB:
      // compare the password in plain text from the request
      // to the encrypted password retrieved from the database
      const isMatch = await bcrypt.compare(password, user.password);

      // if no match (passwords don't match): sends 400 and array with error message
      if (!isMatch) {
        return res.status(400).json({
          errors: [{ msg: "Invalid credentials" }],
        });
      }
      // if password match :
      // generate JWT in which the user ID will be inserted
      const payload = {
        user: {
          id: user.id,
        },
      };
      // sign the token with the secret key
      jwt.sign(
        payload,
        config.get("jwtSecret"),
        { expiresIn: 3600 },
        // callback to get either an error or the token to be sent back to the client
        (err, token) => {
          // throw deliver error synchronously
          if (err) throw err;
          // sends the token to the client : user is authentificated
          res.json({ token });
        }
      );
    } catch (err) {
      // log the error and send to client a server error
      console.error(err.message);
      res.status(500).send("server error");
    }
  }
);
