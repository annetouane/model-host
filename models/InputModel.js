const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// create schema
const InputFormSchema = Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: true,
  },
  idProjet: {
    type: String,
  },
  nomProjet: {
    type: String,
  },
  ville: {
    type: String,
  },
  natureBien: {
    type: String,
  },
  typeAppartement: {
    type: String,
  },
  netVendeur: {
    type: Number,
    required: true,
  },
  travaux: {
    type: Number,
  },
  ammeublement: {
    type: Number,
  },
  notaire: {
    type: Number,
  },
  agence: {
    type: Number,
  },
  duree: {
    type: Number,
  },
  apport: {
    type: Number,
    required: true,
  },
  interet: {
    type: Number,
  },
  assurance: {
    type: Number,
  },
  fraisBancaires: {
    type: Number,
  },
  fraisCourtier: {
    type: Number,
  },
  loyer: {
    type: Number,
    required: true,
  },
  chargesLoc: {
    type: Number,
  },
  occupation: {
    type: Number,
  },
  fonciere: {
    type: Number,
  },
  gestion: {
    type: Number,
  },
  chargesLoc: {
    type: Number,
  },
  pno: {
    type: Number,
  },
  revInvest1: {
    type: Number,
    required: true,
  },
  augInvest1: {
    type: Number,
  },
  revInvest2: {
    type: Number,
  },
  augInvest2: {
    type: Number,
  },
  partFisc: {
    type: Number,
  },
  sciIs: {
    type: String,
  },
  lmnpReel: {
    type: String,
  },
  lmnpMicro: {
    type: String,
  },
  nueReel: {
    type: String,
  },
  nueMicro: {
    type: String,
  },
  irl: {
    type: Number,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

// InputFormSchema.index({
//   type: 1,
//   codePostal: 1,
//   netVendeur: 1,
//   travaux: 1,
//   ammeublement: 1,
//   notaire: 1,
//   agence: 1,
//   duree: 1,
//   apport: 1,
//   interet: 1,
//   assurance: 1,
//   loyer: 1,
//   chargesLoc: 1,
//   occupation: 1,
//   fonciere: 1,
//   gestion: 1,
//   chargesLoc: 1,
//   pno: 1,
//   revInvest1: 1,
//   augInvest1: 1,
//   revInvest2: 1,
//   augInvest2: 1,
//   invCouple: 1,
//   partFisc: 1,
//   sciIs: 1,
//   lmnpReel: 1,
//   lmnpMicro: 1,
//   lmpReel: 1,
//   lmpMicro: 1,
//   nueReel: 1,
//   nueMicro: 1,
//   irl: 1,
//     },
//   { unique: true }
//   );

module.exports = InputForm = mongoose.model("inputform", InputFormSchema);
