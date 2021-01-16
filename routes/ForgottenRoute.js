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
  console.log(req.body);
  try {
    // check if user exists (value or null)
    const user = await User.findOne({ email: req.body.email });
    console.log(user);
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
          res.json({
            msg: `Un lien de réinitialisation a été envoyé à : ${user.email}`,
            color: "green",
          });
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

// @route    POST /forgotten/:id
// @desc     New password
// @access   Public
router.post("/:id", async (req, res) => {
  // check that id has a mongoDB format
  const id = req.params.id;
  if (!id.match(/^[0-9a-fA-F]{24}$/)) {
    return res
      .status(400)
      .send({ msg: "Utilisateur introuvable", color: "red" });
  }

  const stringifiedArray = {
    newPassword: String(req.body.newPassword),
  };
  const { newPassword } = stringifiedArray;

  // check if user exists (true false)
  let user = await User.findOne({ _id: id });

  console.log(user);

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
    await User.findByIdAndUpdate({ _id: id }, { $set: { password: password } });
    res.send({
      msg: "Votre mot de passe a été modifié avec succès",
      color: "green",
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("server error");
  }
});

module.exports = router;
