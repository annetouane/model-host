const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
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
      "Veuillez choisir un mot de passe comportant 8 caractères minimum"
    ).isLength({ min: 8 }),
    check("condition", "Merci d'accepter les conditions d'utilisation").isIn([true]),
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
    const { email, password, condition } = req.body;
    try {
      // check if user exists (value or null)
      let user = await User.findOne({ email });
      // if user found (matching email) : sends 400 and array with error message
      if (user) {
        return res.status(400).json({
          msg: "Adresse e-mail déjà utilisée",
        });
        // if user isn't found :
      } else {
        // create a new user using the User model
        user = new User({
          email,
          password,
          condition,
        });

        // encrypt the password (bcrypt) : create the salt (object to hash)
        const salt = await bcrypt.genSalt(10);
        // hash the password
        user.password = await bcrypt.hash(password, salt);

        // save the user to the DB
        await user.save();

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
          subject: "Simulimo - activation de votre compte",
          html: `
                <h3>Merci d'avoir crée votre compte. Pour l'activer, merci de cliquer sur le lien ci-dessous </h3>
                <a href=${"http://localhost:5000/confirmation/" + user.id}>
                  Activer mon compte
                </a>
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
      }
    } catch (err) {
      // log the error and send to client a server error
      console.error(err.message);
      res.status(500).send("server error");
    }
  }
);

module.exports = router;
