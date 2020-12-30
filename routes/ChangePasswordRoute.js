const express = require("express");
const router = express.Router();
// const { check, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const auth = require("../middleware/auth");

// import model
const User = require("../models/UserModel");

// @route    POST /forgotten/:token
// @desc     New password
// @access   Private
router.post("/", auth, async (req, res) => {
    console.log(req.body)
    const stringifiedArray = {
      oldPassword: String(req.body.oldPassword),
      newPassword: String(req.body.newPassWord),
    }
    const { oldPassword,newPassword } = stringifiedArray
    
    // check if user exists (true false)
    let user = await User.findOne({ _id: req.user.id });
    
    // if user not found (matching email) : sends 400 and array with error message
    if (!user) {
      return res.status(400).send({
        msg: "Utilisateur introuvable",
        color: "red",
      });
    };

    // compare the password in plain text from the request
    // to the encrypted password retrieved from the database
    const isMatch = await bcrypt.compare(oldPassword, user.password);
    // check if password match
    if (!isMatch) {
      return res.status(400).send({
        msg: "Ancien mot de passe incorrect",
        color: "red",
      });
    } else {
        try {
          // encrypt the password (bcrypt) : create the salt (object to hash)
          const salt = await bcrypt.genSalt(10);
          // hash the password
          const password = await bcrypt.hash(newPassword, salt);
          await User.findByIdAndUpdate({ _id: req.user.id }, { $set: { password: password }});
          res.send({
            msg: "Votre mot de passe a été modifié avec succès",
          });
        } catch (err) {
        console.error(err.message);
        res.status(500).send("server error");
        }
      }
    }
  );

module.exports = router;