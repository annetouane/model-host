const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const config = require("config");
const jwt = require("jsonwebtoken");
const sgMail = require("@sendgrid/mail");

// import model
const User = require("../models/UserModel");

// @route    POST /forgotten
// @desc     Forgotten password
// @access   Public
router.post(
  "/forgotten",
  [check("email", "Ceci n'est pas un format d'adresse email valide").isEmail()],
  async (req, res) => {
    // pass the req to validate its parameters
    const errors = validationResult(req);
    // if a field isn't validate
    if (!errors.isEmpty()) {
      // status 400 + array with errors
      return res.status(400).json({ errors: errors.array() });
    }

    // destructure req.body
    const { email } = req.body;
    try {
      // check if user exists (value or null)
      let user = await User.findOne({ email });
      console.log({ user });
      // if user isn't found : sends 400 and array with error message
      if (!user) {
        return res.status(400).json({
          errors: [
            { msg: "L'adresse email renseignée n'est liée à aucun compte" },
          ],
        });
        // if user found (matching email) :
      } else {
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

        console.log(user.id);
        // using Twilio SendGrid's v3 Node.js Library
        // send confirmation email
        sgMail.setApiKey(
          "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"
        );
        const msg = {
          to: user.email,
          from: "antoine.chardigny@essec.edu",
          subject: "Mot de passe oublié",
          html: `
                <h1>Mot de passe oublié</h1>
                <h3>Veuillez cliquer sur le lien ci-dessous pour réinitialiser votre mot de passe</h3>
                <p>
                  Lien: ${"http://localhost:3000/forgotten/" + user.id}
                </p>
                <h3>A bientôt</h3>`,
        };
        sgMail
          .send(msg)
          .then(() => {
            res.json({ msg: "Message sent" });
          })
          .catch((error) => {
            console.log(error.response.body);
          });
        //   });
      }
    } catch (err) {
      // log the error and send to client a server error
      console.error(err.message);
      res.status(500).send("server error");
    }
  }
);

// @route    POST /forgotten/:token
// @desc     New password
// @access   Private
router.post(
  "/forgotten/:id",
  [
    check(
      "password",
      "Veuillez choisir un mot de passe comportant 6 caractères minimum"
    ).isLength({ min: 6 }),
  ],
  async (req, res) => {
    // pass the req to validate its parameters
    const errors = validationResult(req);
    // if a field isn't validate
    if (!errors.isEmpty()) {
      // status 400 + array with errors
      return res.status(400).json({ errors: errors.array() });
    }
    // check that id has a mongoDB format
    const id = req.params.id;
    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({
        errors: [{ msg: "Utilisateur introuvable" }],
      });
    } else {
      try {
        // check that user exists
        const user = await User.findOne({ _id: id });
        if (!user) {
          return res.status(400).json({
            errors: [{ msg: "Utilisateur introuvable" }],
          });
        } else {
          // encrypt the password (bcrypt) : create the salt (object to hash)
          const salt = await bcrypt.genSalt(10);
          // hash the password
          newPassword = await bcrypt.hash(req.body.password, salt);
          await User.findByIdAndUpdate(user.id, {
            $set: { password: newPassword },
          });
          res.json({
            msg: "Votre mot de passe a été modifié avec succès",
            redirect: true,
          });
        }
      } catch (err) {
        console.error(err.message);
        res.status(500).send("server error");
      }
    }
  }
);

module.exports = router;
