const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");

// @route    POST /forgotten/:token
// @desc     New password
// @access   Private
router.post(
    "/:id",
    [
      check(
        "password",
        "Veuillez choisir un mot de passe comportant 8 caractères minimum"
      ).isLength({ min: 8 }),
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
  