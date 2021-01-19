const express = require("express");
const router = express.Router();
// const { check, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const config = require("config");
const jwt = require("jsonwebtoken");

// import model
const User = require("../models/UserModel");
const InputForm = require("../models/InputModel");

// @route    POST /signin
// @desc     Register user
// @access   Public
router.post("/", async (req, res) => {
  const { emailSignIn, passwordSignIn } = req.body;
  const countryCode = "+33";
  const mobile = emailSignIn.includes("@")
    ? ""
    : countryCode.concat("", emailSignIn.slice(1));
  console.log(mobile);
  try {
    // check if user exists (true false)
    let user = await User.findOne({
      $or: [{ email: emailSignIn }, { mobile: mobile }],
    });

    // if user not found (matching email) : sends 400 and array with error message
    if (!user) {
      return res.status(400).send({
        msg: "Vos identifiants sont incorrects",
        color: "red",
      });
    }

    // compare the password in plain text from the request
    // to the encrypted password retrieved from the database
    const isMatch = await bcrypt.compare(passwordSignIn, user.password);

    // check if password match
    if (!isMatch) {
      return res.status(400).send({
        msg: "Vos identifiants sont incorrects",
        color: "red",
      });
    }

    // // check if email not confirmed
    // const confirmed = user.confirmed;
    // if (!confirmed) {
    //   return res.status(401).send({
    //     msg:
    //       "Pour accéder à votre compte, merci de cliquer sur le lien d'activation qui vous a été adressé par email",
    //     color: "orange",
    //   });
    // }

    // if password match
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
        // sends the token to the client : user is authenticated
        res.json({ token });
      }
    );
  } catch (err) {
    // log the error and send to client a server error
    console.error(err.message);
    res.status(500).send("Service indisponible");
  }
});

module.exports = router;
