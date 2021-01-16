// package
const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
// const sgMail = require("@sendgrid/mail");
const config = require("config");
const authToken = config.get("authToken");
const accountSid = config.get("accountSid");
const serviceSid = config.get("serviceSid");

const client = require("twilio")(accountSid, authToken);

// import model
const User = require("../models/UserModel");

// @route    POST /signup
// @desc     Register user
// @access   Public
router.post("/check", async (req, res) => {
  console.log(req.body);
  const { emailSignUp, mobileSignUp, passwordSignUp } = req.body;
  // valide longueur mot de passe
  if (passwordSignUp.length < 8) {
    return res.status(401).send({
      msg: "Merci de choisir un mot de passe sur 8 caractères minimum",
      color: "red",
    });
  }
  try {
    // check if email exists
    let userEmail = await User.findOne({ email: emailSignUp });
    let userMobile = await User.findOne({ mobile: mobileSignUp });

    // if user found : sends 400 and array with error message
    if (userEmail) {
      res.status(401).send({
        msg: "Adresse e-mail déjà utilisée",
        color: "red",
      });
    } else if (userMobile) {
      // check if mobile exists
      // if user found : sends 400 and array with error message
      res.status(401).send({
        msg: "Numéro de mobile déjà utilisée",
        color: "red",
      });
    } else {
      // mobile and email don't exist send the code via sms
      const sms = await client.verify
        .services(serviceSid) // assign the service id
        .verifications.create({
          // create request
          to: "+33760585827",
          channel: "sms",
        });
      console.log(sms); // ok

      // sends back validation to the server
      res.json({
        msg: `Un code d'activation vous a été envoyé au ${mobileSignUp}.`,
      });
    }
  } catch (err) {
    // log the error and send to client a server error
    console.error(err.message);
    res.status(500).send("server error");
  }
});

// @route    POST /signup
// @desc     Register user
// @access   Public
router.post("/", async (req, res) => {
  console.log(req.body);
  // destructure req
  const {
    emailSignUp,
    mobileSignUp,
    passwordSignUp,
    condition,
    codeSms,
  } = req.body;
  try {
    // verifiy the code
    const sms2 = await client.verify
      .services(serviceSid)
      .verificationChecks.create({
        // create request
        to: "+33760585827",
        code: codeSms,
      });
    console.log(sms2);
    // si le code est validé :
    if ((sms2.statut = "approved")) {
      // create a new user using the User model
      user = new User({
        email: emailSignUp,
        mobile: mobileSignUp,
        password: "",
        condition: condition,
        code: codeSms,
      });

      // encrypt the password (bcrypt) : create the salt (object to hash)
      const salt = await bcrypt.genSalt(10);
      // hash the password
      user.password = await bcrypt.hash(passwordSignUp, salt);

      // save the user to the DB
      await user.save();
      // sends back user to the server
      res.json({
        id: user._id,
      });
    } else {
      res.status(401).send({
        msg: "Code non-valide",
        color: "red",
      });
    }
  } catch (err) {
    // log the error and send to client a server error
    console.error(err.message);
    res.status(500).send("server error");
  }
});

module.exports = router;
