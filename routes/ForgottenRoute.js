const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const config = require("config");
const authToken = config.get("authToken");
const accountSid = config.get("accountSid");
const serviceSid = config.get("serviceSid");
const client = require("twilio")(accountSid, authToken);

// import model
const User = require("../models/UserModel");

// @route    POST /forgotten
// @desc     Forgotten password
// @access   Public
router.post("/", async (req, res) => {
  console.log(req.body);
  // format mobile
  const countryCode = "+33";
  const mobile = countryCode.concat("", req.body.mobile.slice(1));
  console.log(mobile);
  try {
    // check if user exists (value or null)
    const user = await User.findOne({ mobile: mobile });
    console.log(user);
    // if user isn't found : sends 400 and array with error message
    if (!user) {
      return res
        .status(400)
        .json({ msg: "Utilisateur introuvable", color: "red" });
      // if user found (matching email)
    } else {
      // mobile and email don't exist send the code via sms
      const sms = await client.verify
        .services(serviceSid) // assign the service id
        .verifications.create({
          to: mobile,
          channel: "sms",
        });
      console.log(sms);
      // sends back user id and mobile to the server
      res.json({
        id: user._id,
      });
    }
  } catch (err) {
    // log the error and send to client a server error
    console.error(err.message);
    res.status(500).send("Service indisponible");
  }
});

// @route    POST /forgotten/:id
// @desc     New password
// @access   Public
router.post("/reset", async (req, res) => {
  console.log(req.body);
  const { id, newPassword, mobileRecover, codeSms } = req.body;

  // transform password en string pour hashage
  const stringifiedArray = {
    newPasswordStg: String(newPassword),
  };
  const { newPasswordStg } = stringifiedArray;

  // format mobile
  const countryCode = "+33";
  const mobile = countryCode.concat("", mobileRecover.slice(1));
  console.log(mobile);

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
    // verifiy the code
    const sms2 = await client.verify
      .services(serviceSid)
      .verificationChecks.create({
        // create request
        to: mobile,
        code: codeSms,
      });
    console.log(sms2);
    // si le code est validé :
    if (sms2.valid) {
      // encrypt the password (bcrypt) : create the salt (object to hash)
      const salt = await bcrypt.genSalt(10);
      // hash the password
      const password = await bcrypt.hash(newPasswordStg, salt);
      await User.findByIdAndUpdate(
        { _id: id },
        { $set: { password: password } }
      );
      res.send({
        msg:
          "Votre mot de passe a été modifié. Merci de retourner à l'accueil pour vous identifier",
        color: "green",
      });
    } else {
      res.status(401).send({
        msg: "Code non-valide",
        color: "red",
      });
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send({ msg: "Service indisponible", color: "red" });
  }
});

module.exports = router;
