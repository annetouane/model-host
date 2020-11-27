const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const config = require("config");
const jwt = require("jsonwebtoken");
const sgMail = require("@sendgrid/mail");

// import model
const User = require("../models/UserModel");

// @route    POST /signup
// @desc     Register user
// @access   Public
router.post(
  "/",
  [
    check("email", "Ceci n'est pas un format d'adresse email valide").isEmail(),
    check(
      "password",
      "Veuillez choisir un mot de passe comportant 6 caractères minimum"
    ).isLength({ min: 6 }),
    // check("condition", "Accepter les conditions d'utilisation").isIn([true]),
  ],
  async (req, res) => {
    // pass the req to validate its parameters
    const errors = validationResult(req);
    // if a field isn't validate
    if (!errors.isEmpty()) {
      // status 400 + array with errors
      return res.status(400).json({ errors: errors.array() });
    }

    // destructure req.body
    const { email, password } = req.body;
    try {
      // check if user exists (value or null)
      let user = await User.findOne({ email });
      // if user found (matching email) : sends 400 and array with error message
      if (user) {
        return res.status(400).json({
          errors: [{ msg: "Adresse email déjà utilisée" }],
        });
        // if user isn't found :
      } else {
        // create a new user using the User model
        user = new User({
          email,
          password,
          // condition,
        });

        // encrypt the password (bcrypt) : create the salt (object to hash)
        const salt = await bcrypt.genSalt(10);
        // hash the password
        user.password = await bcrypt.hash(password, salt);

        // save the user to the DB
        await user.save();

        // // generate JWT in which the user ID will be inserted
        // const payload = {
        //   user: {
        //     id: user.id,
        //   },
        // };
        // // sign the token with the secret key
        // jwt.sign(
        //   payload,
        //   config.get("jwtSecret"),
        //   { expiresIn: 3600 }, // expire date (in seconds, set to 3600 for prod)
        //   // callback to get either an error or the token to be sent back to the client
        //   (err, token) => {
        //     // throw deliver error synchronously
        //     if (err) throw err;
        res.json({
          email: user.email,
        });

        // using Twilio SendGrid's v3 Node.js Library
        // send confirmation email
        sgMail.setApiKey(
          "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"
        );
        const msg = {
          to: user.email,
          from: "antoine.chardigny@essec.edu",
          subject: "Validation compte",
          html: `
                <h1>Merci d'avoir crée votre compte</h1>
                <h3>Veuillez cliquer sur le lien ci-dessous pour valider votre compte</h3>
                <p>
                  Lien: ${"http://localhost:5000/confirmation/" + user.id}
                </p>
                <h3>A bientôt</h3>`,
        };
        sgMail
          .send(msg)
          .then(() => {
            console.log("Message sent");
          })
          .catch((error) => {
            console.log(error.response.body);
          });
        // }); JWT
      }
    } catch (err) {
      // log the error and send to client a server error
      console.error(err.message);
      res.status(500).send("server error");
    }
  }
);

module.exports = router;
