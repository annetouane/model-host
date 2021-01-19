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
  console.log("update", req.body);
  try {
    // create new input object
    const inputs = {
      user: "",
      nomProjet: "",
      ville: "",
      natureBien: "",
      typeAppartement: "",
      netVendeur: parseInt(req.body.netVendeur),
      travaux: parseInt(req.body.travaux),
      ammeublement: parseInt(req.body.ammeublement),
      notaire: parseFloat(req.body.notaire),
      agence: parseInt(req.body.agence),
      duree: parseInt(req.body.duree),
      apport: parseInt(req.body.apport),
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

    // si un ID reçue dans req -> cherche le projet par ID pour l'update, update du reducer avec reponse
    // cherche si id existe pour cet utilisateur
    const projectIdCheck = await InputForm.find({
      $and: [{ user: user }, { _id: req.body.idProjet }],
    });
    if (projectIdCheck.length < 0) {
      return res
        .status(400)
        .send({ msg: "Ce nom de projet n'existe pas", color: "red" });
      // si le projet existe
    } else {
      // retire la description du projet de inputs pour ne pas updater ces champs par ""
      ["nomProjet", "ville", "natureBien", "typeAppartement"].forEach(
        (e) => delete inputs[e]
      );
      // update project (less 4 fields above) and return updated document
      await InputForm.findByIdAndUpdate(
        { _id: req.body.idProjet },
        {
          $set: inputs,
        },
        {
          new: true,
        }
      );
      // renvoi la liste de projet au front pour update le reducer
      const newProjectList = await InputForm.find({
        $and: [{ user: user }, { nomProjet: { $ne: "" } }],
      });
      res.json({
        newProjectList,
        msg: "Le projet a bien été mis à jour",
        color: "green",
      });
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Service indisponible");
  }
});

module.exports = router;
