const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// create schema
const InputFormSchema = Schema({
  type: {
    type: String,
  },
  codePostal: {
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
  lmpReel: {
    type: String,
  },
  lmpMicro: {
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

module.exports = InputForm = mongoose.model("inputform", InputFormSchema);
