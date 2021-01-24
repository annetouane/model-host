// packages
const express = require("express");
const router = express.Router();

// middleware
const auth = require("../middleware/auth");

// models
const InputForm = require("../models/InputModel");

// @route : POST /
// @description : post new project
// @ access : authentication (Public)
router.post("/", auth, async (req, res) => {
  try {
    // create new input object
    const inputs = {
      user: req.user.id,
      nomProjet: req.body.nomProjet,
      ville: req.body.ville,
      natureBien: req.body.natureBien,
      typeAppartement: req.body.typeAppartement,
      netVendeur: parseInt(req.body.netVendeur),
      travaux: parseInt(req.body.travaux),
      ammeublement: parseInt(req.body.ammeublement),
      notaire: parseFloat(req.body.notaire),
      agence: parseInt(req.body.agence),
      duree: parseInt(req.body.duree),
      apport: req.body.apport !== "" ? parseInt(req.body.apport) : 0, // si apport is null replace by 0
      interet: parseFloat(req.body.interet) / 100,
      assurance: parseFloat(req.body.assurance) / 100,
      fraisBancaires: parseInt(req.body.fraisBancaires),
      fraisCourtier: parseInt(req.body.fraisCourtier),
      loyer: parseInt(req.body.loyer),
      chargesLoc: parseInt(req.body.chargesLoc),
      occupation: req.body.occupation,
      fonciere: parseInt(req.body.fonciere),
      gestion: parseInt(req.body.gestion),
      charges: parseInt(req.body.charges),
      pno: parseInt(req.body.pno),
      revInvest1: parseInt(req.body.revInvest1),
      augInvest1: parseFloat(req.body.augInvest1),
      revInvest2: parseInt(req.body.revInvest2),
      augInvest2: parseFloat(req.body.augInvest2),
      partFisc: parseFloat(req.body.partFisc),
      sciIs: req.body.sciIs,
      lmnpReel: req.body.lmnpReel,
      lmnpMicro: req.body.lmnpMicro,
      nueReel: req.body.nueReel,
      nueMicro: req.body.nueMicro,
      irl: parseFloat(req.body.irl) / 100,
    };

    const { user, nomProjet } = inputs;

    // cherche si nom projet existe pour cet utilisateur
    const projectNameCheck = await InputForm.find({
      $and: [{ user: user }, { nomProjet: nomProjet }],
    });
    console.log(projectNameCheck);
    // si projet exist return error
    if (projectNameCheck.length > 0) {
      return res
        .status(400)
        .send({ msg: "Ce nom de projet existe déjà", color: "red" });

      // Si nom de projet n'existe pas pour ce user, insert to db
    } else {
      console.log("create");
      // assign inputs to the model
      newInputs = InputForm(inputs);
      // create new project
      await newInputs.save();

      // renvoi la liste de projet au front pour update le reducer
      const newProjectList = await InputForm.find({
        $and: [{ user: user }, { nomProjet: { $ne: "" } }],
      });

      res.json({
        newProjectList,
        msg: "Projet sauvegardé",
        color: "green",
      });
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send({ msg: "Service indisponible", color: "red" });
  }
});

// router.post("/first", async (req, res) => {
//   try {
//     // create new input object
//     const inputs = {
//       user: req.body.user,
//       nomProjet: req.body.nomProjet,
//       ville: req.body.ville,
//       natureBien: req.body.natureBien,
//       typeAppartement: req.body.typeAppartement,
//       netVendeur: parseInt(req.body.netVendeur),
//       travaux: parseInt(req.body.travaux),
//       ammeublement: parseInt(req.body.ammeublement),
//       notaire: parseFloat(req.body.notaire),
//       agence: parseInt(req.body.agence),
//       duree: parseInt(req.body.duree),
//       apport: parseInt(req.body.apport),
//       interet: parseFloat(req.body.interet) / 100,
//       assurance: parseFloat(req.body.assurance) / 100,
//       fraisBancaires: parseInt(req.body.fraisBancaires),
//       fraisCourtier: parseInt(req.body.fraisCourtier),
//       loyer: parseInt(req.body.loyer),
//       chargesLoc: parseInt(req.body.chargesLoc),
//       occupation: req.body.occupation,
//       fonciere: parseInt(req.body.fonciere),
//       gestion: parseInt(req.body.gestion),
//       charges: parseInt(req.body.charges),
//       pno: parseInt(req.body.pno),
//       revInvest1: parseInt(req.body.revInvest1),
//       augInvest1: parseFloat(req.body.augInvest1),
//       revInvest2: parseInt(req.body.revInvest2),
//       augInvest2: parseFloat(req.body.augInvest2),
//       partFisc: parseFloat(req.body.partFisc),
//       sciIs: req.body.sciIs,
//       lmnpReel: req.body.lmnpReel,
//       lmnpMicro: req.body.lmnpMicro,
//       nueReel: req.body.nueReel,
//       nueMicro: req.body.nueMicro,
//       irl: parseFloat(req.body.irl) / 100,
//     };

//     // assign inputs to the model
//     newInputs = InputForm(inputs);
//     // create new project
//     await newInputs.save();
//   } catch (err) {
//     console.error(err.message);
//     res.status(500).send("Service indisponible");
//   }
// });

module.exports = router;
