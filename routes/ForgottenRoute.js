const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const sgMail = require("@sendgrid/mail");

// import model
const User = require("../models/UserModel");

// @route    POST /forgotten
// @desc     Forgotten password
// @access   Public
router.post(
  "/",
  [check("email", "Format d'adresse e-mail non-valide").isEmail()],
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
            { msg: "L'adresse e-mail renseignée n'est liée à aucun compte" },
          ],
        });
        // if user found (matching email) :
      } else {
        // using Twilio SendGrid's v3 Node.js Library
        // send confirmation email
        sgMail.setApiKey(
          "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"
        );
        const msg = {
          to: user.email,
          from: "antoine.chardigny@essec.edu",
          subject: "Simulimo - Réinitialiser mon mot de passe",
          html: `
                <h3>Merci d'avoir crée votre compte. Pour l'activer, veuillez cliquer sur le lien ci-dessous </h3>
                <a href=${"http://localhost:3000/change-pwd/" + user.id}>
                  Réinitialiser mon mot de passe
                </a>
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
      };
    } catch (err) {
      // log the error and send to client a server error
      console.error(err.message);
      res.status(500).send("server error");
    }
  }
);

module.exports = router;
