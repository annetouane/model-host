const express = require("express");
const router = express.Router();
// const { check, validationResult } = require("express-validator");

// const auth = require("../middleware/auth");

const InputForm = require("../models/InputModel");

// @route : POST /
// @description : post new activity
// @ access : authentication (Public)
router.post("/", async (req, res) => {
  // const errors = validationResult(req);
  // if (!errors.isEmpty()) {
  //   return res.status(400).json({ errors: errors.array() });
  // }
  try {
    console.log(req.body);

    let inputs = {
      type: req.body.type,
      codePostal: req.body.codePostal,
      netVendeur: req.body.netVendeur,
      travaux: req.body.travaux,
      ammeublement: req.body.ammeublement,
      notaire: req.body.notaire,
      agence: req.body.agence,
      duree: req.body.duree,
      apport: req.body.apport,
      interet: req.body.interet,
      assurance: req.body.assurance,
      loyer: req.body.loyer,
      chargesLoc: req.body.chargesLoc,
      occupation: req.body.occupation,
      fonciere: req.body.fonciere,
      gestion: req.body.gestion,
      charges: req.body.charges,
      pno: req.body.pno,
      revInvest1: req.body.revInvest1,
      augInvest1: req.body.augInvest1,
      revInvest2: req.body.revInvest2,
      augInvest2: req.body.augInvest2,
      invCouple: req.body.invCouple,
      partFisc: req.body.partFisc,
      sciIs: req.body.sciIs,
      lmnpReel: req.body.lmnpReel,
      lmnpMicro: req.body.lmnpMicro,
      lmpReel: req.body.lmpReel,
      lmpMicro: req.body.lmpMicro,
      nueReel: req.body.nueReel,
      nueMicro: req.body.nueMicro,
      irl: req.body.irl,
    };

    newInputs = InputForm(inputs);
    const response = await newInputs.save();
    res.json(response);
    // handle unique combination error
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
