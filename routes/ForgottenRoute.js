const express = require("express");
const router = express.Router();
// const { check, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const sgMail = require("@sendgrid/mail");

// import model
const User = require("../models/UserModel");

// @route    POST /forgotten
// @desc     Forgotten password
// @access   Public
router.post("/", async (req, res) => {
  // destructure req.body
  const { email } = req.body;
  try {
    // check if user exists (value or null)
    let user = await User.findOne({ email });
    console.log({ user });
    // if user isn't found : sends 400 and array with error message
    if (!user) {
      return res.status(400).json({ msg: "Utilisateur introuvable" });
      // if user found (matching email)
    } else {
      // send confirmation email
      sgMail.setApiKey(
        "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"
      );
      const msg = {
        to: user.email,
        from: "antoine.chardigny@essec.edu",
        subject: "Simulimo - Réinitialiser mon mot de passe",
        html: `
                <h3>Pour réinitialiser votre mot de passe, veuillez cliquer sur le lien ci-dessous </h3>
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
    }
  } catch (err) {
    // log the error and send to client a server error
    console.error(err.message);
    res.status(500).send("server error");
  }
});

module.exports = router;

// @route    POST /forgotten/:id
// @desc     New password
// @access   Public
router.post("/:id", async (req, res) => {
  console.log(req.body);
  const stringifiedArray = {
    newPassword: String(req.body.newPassword),
    confirmNewPassword: String(req.body.confirmNewPassword),
  };
  const { newPassword, confirmNewPassword } = stringifiedArray;

  if (newPassword !== confirmNewPassword) {
    return res.status(400).send({
      msg: "Les mots de passe ne correspondent pas",
      color: "red",
    });
  }
  // check if user exists (true false)
  let user = await User.findOne({ _id: req.params.id });

  // if user not found (matching email) : sends 400 and array with error message
  if (!user) {
    return res.status(400).send({
      msg: "Utilisateur introuvable",
      color: "red",
    });
  }
  try {
    // encrypt the password (bcrypt) : create the salt (object to hash)
    const salt = await bcrypt.genSalt(10);
    // hash the password
    const password = await bcrypt.hash(newPassword, salt);
    await User.findByIdAndUpdate(
      { _id: req.user.id },
      { $set: { password: password } }
    );
    res.send({
      msg: "Votre mot de passe a été modifié avec succès",
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("server error");
  }
});
