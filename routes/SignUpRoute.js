// package
const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const config = require("config");
const authToken = config.get("authToken");
const accountSid = config.get("accountSid");
const serviceSid = config.get("serviceSid");
const client = require("twilio")(accountSid, authToken);
const jwt = require("jsonwebtoken");
// const sgMail = require("@sendgrid/mail");

// import model
const User = require("../models/UserModel");

// @route    POST /signup/check
// @desc     check if registrable user
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

  // format mobile
  const countryCode = "+33";
  const mobile = countryCode.concat("", mobileSignUp.slice(1));
  console.log(mobile);

  try {
    // check if email exists
    let userEmail = await User.findOne({ email: emailSignUp });
    let userMobile = await User.findOne({ mobile: mobile });

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
          to: mobile,
          channel: "sms",
        });

      // sends back validation to the server
      res.json({
        msg: "ok",
      });
    }
  } catch (err) {
    // log the error and send to client a server error
    console.error(err.message);
    res.status(500).send("Service indisponible");
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
  const countryCode = "+33";
  const mobile = countryCode.concat("", mobileSignUp.slice(1));
  console.log(mobile);
  try {
    // verifiy the code
    const sms2 = await client.verify
      .services(serviceSid)
      .verificationChecks.create({
        // create request
        to: mobile,
        code: codeSms,
      });
    // si le code est validé :
    if (sms2.valid) {
      // create a new user using the User model
      user = new User({
        email: emailSignUp,
        mobile: mobile,
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
          // sends the token to the client
          res.json({ token });
        }
      );
    } else {
      res.status(401).send({
        msg: "Code non-valide",
        color: "red",
      });
    }
  } catch (err) {
    // log the error and send to client a server error
    console.error(err.message);
    res.status(500).send("Service indisponible");
  }
});

module.exports = router;
