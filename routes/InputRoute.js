// packages
const express = require("express");
const router = express.Router();
const LoanJS = require("loanjs");

// models
const InputForm = require("../models/InputModel");

// @route : POST /
// @description : post new project
// @ access : authentication (Public)
router.post("/", async (req, res) => {
  try {
    // create new input object
    const inputs = {
      user: req.body.user,
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

    const {
      user,
      nomProjet,
      ville,
      natureBien,
      typeAppartement,
      netVendeur,
      travaux,
      ammeublement,
      notaire,
      agence,
      duree,
      apport,
      interet,
      assurance,
      fraisBancaires,
      fraisCourtier,
      loyer,
      chargesLoc,
      occupation,
      fonciere,
      gestion,
      charges,
      pno,
      revInvest1,
      augInvest1,
      revInvest2,
      augInvest2,
      partFisc,
      sciIs,
      lmnpReel,
      lmnpMicro,
      nueReel,
      nueMicro,
      irl,
    } = inputs;

    const coutProjet =
      netVendeur +
      travaux +
      ammeublement +
      notaire * netVendeur +
      agence +
      fraisBancaires +
      fraisCourtier;
    const emprunt = coutProjet > apport ? coutProjet - apport : 0;

    let array = [];

    if (emprunt === 0) {
      for (let i = 1; i <= duree; i++) {
        const emptyObject = {
          capital: 0,
          interet: 0,
          assurance: 0,
          chargesFi: 0,
        };
        array.push(emptyObject);
      }
    } else {
      const loan = new LoanJS.Loan(
        emprunt, // emprunt
        duree * 12, // échéances
        interet * 100, // intérêt
        false // mensualité fixe
      );

      let loan1 = loan.installments.map((x) => {
        return {
          capital: x.capital,
          interet: x.interest,
          total: x.installment,
          assurance: (emprunt * assurance) / 12,
        };
      });

      while (loan1.length > 0) {
        const filteredArray = loan1.slice(0, 12);
        let transformToYear = filteredArray.reduce((acc, val) => ({
          capital: acc.capital + val.capital,
          interet: acc.interet + val.interet,
          assurance: acc.assurance + val.assurance,
          chargesFi: acc.interet + val.interet + acc.assurance + val.assurance,
        }));
        array.push(transformToYear);
        loan1.splice(0, 12);
      }
    }

    let capitalPrevious = 0;
    let sciLmnpPrevious = 0;
    let nuePrevious = 0;

    // define for each year : assurance, loyer, charges locataires, gestion locative, charges courantes,
    // taxe foncière, assurance PNO, amortissement : immeuble, travaux, ammeublement frais d'acquisition
    // frais de courtage : https://www.corrigetonimpot.fr/deduire-frais-courtier-des-loyers/
    // tronc commun à tous les régimes
    array.forEach((item, i) => {
      return (
        (item.annee = i + 1), // à mettre au début de chaque objet
        // cumul capital remboursé n-1
        (item.reimbursedCapital = capitalPrevious),
        (capitalPrevious = item.capital + item.reimbursedCapital),
        // revenu
        (item.loyer =
          item.annee == 1
            ? loyer * occupation
            : loyer * occupation * Math.pow(1 + irl, item.annee - 1)),
        // charges d'exploitation
        (item.chargesLocs =
          item.annee == 1
            ? chargesLoc
            : chargesLoc * Math.pow(1 + irl, item.annee - 1)),
        (item.gestionLoc =
          item.annee == 1
            ? gestion
            : gestion * Math.pow(1 + irl, item.annee - 1)),
        (item.chargesCour =
          item.annee == 1
            ? charges
            : charges * Math.pow(1 + irl, item.annee - 1)),
        (item.taxeFonc =
          item.annee == 1
            ? fonciere
            : fonciere * Math.pow(1 + irl, item.annee - 1)),
        (item.pno = pno), // à indexer ?
        (item.chargesExpl =
          item.gestionLoc + item.chargesCour + item.taxeFonc + item.pno),
        // NOI, leveraged NOI, profit before tax
        (item.netOpInc = item.loyer - item.chargesExpl),
        (item.leveragedNetOpInc =
          item.loyer - item.chargesExpl - item.chargesFi),
        (item.profitBeforeTax =
          item.loyer - item.chargesExpl - item.chargesFi - item.capital),
        // amortissement
        (item.amImmeuble = item.annee <= 30 ? (netVendeur * 0.9) / 30 : 0),
        (item.amTravaux = item.annee <= 10 ? travaux / 10 : 0),
        (item.amAmmeublement = item.annee <= 7 ? ammeublement / 7 : 0),
        (item.amFraisAcq =
          item.annee <= 30 ? (netVendeur * notaire + agence) / 30 : 0),
        (item.amTotal =
          item.amImmeuble +
          item.amTravaux +
          item.amAmmeublement +
          item.amFraisAcq),
        // calcul déficit foncier en sci à l'is et lmnp au réel
        (item.sciLmnpChargesDeduc =
          item.annee == 1
            ? item.chargesFi +
              item.chargesExpl +
              item.amImmeuble +
              item.amTravaux +
              item.amAmmeublement +
              item.amFraisAcq +
              fraisBancaires
            : item.chargesFi +
              item.chargesExpl +
              item.amImmeuble +
              item.amTravaux +
              item.amAmmeublement +
              item.amFraisAcq),
        (item.sciLmnpDefFoncier = sciLmnpPrevious),
        (sciLmnpPrevious =
          item.sciLmnpDefFoncier + item.sciLmnpChargesDeduc - item.loyer < 0
            ? 0
            : item.sciLmnpDefFoncier + item.sciLmnpChargesDeduc - item.loyer),
        // calcul déficit foncier en location nue au réel + déduction impôts revenu activité
        (item.nueReelDeducRevAct =
          item.annee == 1 &&
          travaux + item.chargesFi + item.chargesExpl - item.loyer >= 10700
            ? 10700
            : item.annee == 1 &&
              travaux + item.chargesFi + item.chargesExpl - item.loyer <
                10740 &&
              item.annee == 1 &&
              travaux + item.chargesFi + item.chargesExpl - item.loyer > 0
            ? travaux + item.chargesFi + item.chargesExpl - item.loyer
            : 0),
        (item.nueChargesDeduc =
          item.annee == 1
            ? item.chargesFi +
              item.chargesExpl +
              travaux -
              item.nueReelDeducRevAct
            : item.chargesFi + item.chargesExpl),
        (item.nueDefFoncier = nuePrevious),
        (nuePrevious =
          item.nueDefFoncier + item.nueChargesDeduc - item.loyer < 0
            ? 0
            : item.nueDefFoncier + item.nueChargesDeduc - item.loyer),
        // revenu d'activité imposable
        (item.revActImp =
          (revInvest1 * Math.pow(1 + augInvest1, item.annee - 1) +
            revInvest2 * Math.pow(1 + augInvest2, item.annee - 1)) *
          0.9),
        // A) calcul de l'impôt sur le revenu d'ACTIVITE - SANS part de quotien familial supplémentaires
        // a1 = quotien familial sans part de quotien familial supplémentaire (parts des enfants)
        // a2 = calcul de l'impôt sur le revenu par part fiscal
        // a3 = calcul de l'impôt total à payer
        (item.a1 = revInvest2 == 0 ? item.revActImp : item.revActImp / 2),
        (item.a2 =
          item.a1 < 10084
            ? 0
            : item.a1 > 10085 && item.a1 <= 25710
            ? (item.a1 - 10084) * 0.11
            : item.a1 > 25710 && item.a1 <= 73516
            ? (item.a1 - 25710) * 0.3 + 1721.06
            : item.a1 > 73516 && item.a1 <= 158122
            ? (item.a1 - 73516) * 0.41 + 16062.86
            : item.a1 > 158122
            ? (item.a1 - 158122) * 0.45 + 50751.32
            : 0),
        (item.a3 = revInvest2 == 0 ? item.a2 : item.a2 * 2),
        // plafonnement parts supplémentaires et revenu d'activité imposable
        (item.plafonnement =
          revInvest2 == 0
            ? ((partFisc - 1) / 0.25) * 784
            : ((partFisc - 2) / 0.25) * 784),
        // B) impôt sur le revenu d'ACTIVITE - AVEC parts de quotien familial supplémentaires
        // b1 = quotien familial avec parts de quotien familial supplémentaire (parts des enfants)
        // b2 = calcul de l'impôt sur le revenu pour chaque part fiscal
        // b3 = calcul de l'impôt total à payer
        (item.b1 = item.revActImp / partFisc),
        (item.b2 =
          item.b1 < 10084
            ? 0
            : item.b1 > 10085 && item.b1 <= 25710
            ? (item.b1 - 10084) * 0.11
            : item.b1 > 25710 && item.b1 <= 73516
            ? (item.b1 - 25710) * 0.3 + 1721.06
            : item.b1 > 73516 && item.b1 <= 158122
            ? (item.b1 - 73516) * 0.41 + 16062.86
            : item.b1 > 158122
            ? (item.b1 - 158122) * 0.45 + 50751.32
            : 0),
        (item.b3 = item.b2 * partFisc),
        // calcul impôts sur le revenu d'ACTIVITE en prennant en compte le plafonnement
        // de la réduction d'impot liée aux parts supplémentaire
        (item.impotRevAct =
          item.a3 - item.b3 > item.plafonnement
            ? item.a3 - item.plafonnement
            : item.b3),
        //*********************************************************************************************//
        // SCI IS *************************************************************************************//
        //*********************************************************************************************//

        (item.sciRevFoncImp =
          item.loyer - item.sciLmnpChargesDeduc - item.sciLmnpDefFoncier <= 0
            ? 0
            : item.loyer - item.sciLmnpChargesDeduc - item.sciLmnpDefFoncier),
        (item.sciImpRevFonc =
          item.sciRevFoncImp <= 38400
            ? item.sciRevFoncImp * 0.15
            : 38400 * 0.15 + (item.sciRevFoncImp - 38400) * 0.28),
        (item.sciIsCashFlowBeforeFlatTax =
          item.loyer -
          item.chargesFi -
          item.chargesExpl -
          item.sciImpRevFonc -
          item.capital),
        (item.sciIsCashFlowAfterFlatTax =
          item.sciIsCashFlowBeforeFlatTax > 0
            ? item.sciIsCashFlowBeforeFlatTax * 0.7
            : item.sciIsCashFlowBeforeFlatTax),
        (item.sciIsRoEBeforeFlatTax =
          item.annee == 1 && coutProjet > apport
            ? ((item.capital + item.sciIsCashFlowBeforeFlatTax) / apport) * 100
            : item.annee != 1 && coutProjet > apport
            ? ((item.capital + item.sciIsCashFlowBeforeFlatTax) /
                (apport + item.reimbursedCapital)) *
              100
            : (item.sciIsCashFlowBeforeFlatTax / coutProjet) * 100),
        (item.sciIsRoABeforeFlatTax =
          ((item.capital + item.sciIsCashFlowBeforeFlatTax) / coutProjet) *
          100),
        (item.sciIsRoEAfterFlatTax =
          item.annee == 1 && coutProjet > apport
            ? ((item.capital + item.sciIsCashFlowAfterFlatTax) / apport) * 100
            : item.annee != 1 && coutProjet > apport
            ? ((item.capital + item.sciIsCashFlowAfterFlatTax) /
                (apport + item.reimbursedCapital)) *
              100
            : (item.sciIsCashFlowAfterFlatTax / coutProjet) * 100),
        (item.sciIsRoAAfterFlatTax =
          ((item.capital + item.sciIsCashFlowAfterFlatTax) / coutProjet) * 100),
        //*********************************************************************************************//
        // LMNP Réel **********************************************************************************//
        //*********************************************************************************************//

        // revenu foncier imposable et revenu total (activité + foncier) imposable
        (item.lmnpReelRevFoncImp =
          item.loyer - item.sciLmnpChargesDeduc - item.sciLmnpDefFoncier <= 0
            ? 0
            : item.loyer - item.sciLmnpChargesDeduc - item.sciLmnpDefFoncier),
        (item.lmnpReelRevTotImp = item.revActImp + item.lmnpReelRevFoncImp),
        // C) impôt sur le d'ACTIVITE + FONCIER - SANS parts de quotien familial supplémentaires
        // C1 = quotien familial sans parts de quotien familial supplémentaire (parts des enfants)
        // C2 = calcul de l'impôt sur le revenu pour chaque part fiscal
        // C3 = calcul de l'impôt total à payer
        (item.lmnpReelC1 =
          revInvest2 == 0
            ? item.lmnpReelRevTotImp
            : item.lmnpReelRevTotImp / 2),
        (item.lmnpReelC2 =
          item.lmnpReelC1 < 10084
            ? 0
            : item.lmnpReelC1 > 10085 && item.lmnpReelC1 <= 25710
            ? (item.lmnpReelC1 - 10084) * 0.11
            : item.lmnpReelC1 > 25710 && item.lmnpReelC1 <= 73516
            ? (item.lmnpReelC1 - 25710) * 0.3 + 1721.06
            : item.lmnpReelC1 > 73516 && item.lmnpReelC1 <= 158122
            ? (item.lmnpReelC1 - 73516) * 0.41 + 16062.86
            : item.lmnpReelC1 > 158122
            ? (item.lmnpReelC1 - 158122) * 0.45 + 50751.32
            : 0),
        (item.lmnpReelC3 =
          revInvest2 == 0 ? item.lmnpReelC2 : item.lmnpReelC2 * 2),
        // D) impôt sur le d'ACTIVITE + FONCIER - SANS parts de quotien familial supplémentaires
        // d1 = quotien familial sans parts de quotien familial supplémentaire (parts des enfants)
        // d2 = calcul de l'impôt sur le revenu pour chaque part fiscal
        // d3 = calcul de l'impôt total à payer
        (item.lmnpReelD1 = item.lmnpReelRevTotImp / partFisc),
        (item.lmnpReelD2 =
          item.lmnpReelC1 < 10084
            ? 0
            : item.lmnpReelD1 > 10085 && item.lmnpReelD1 <= 25710
            ? (item.lmnpReelD1 - 10084) * 0.11
            : item.lmnpReelD1 > 25710 && item.lmnpReelD1 <= 73516
            ? (item.lmnpReelD1 - 25710) * 0.3 + 1721.06
            : item.lmnpReelD1 > 73516 && item.lmnpReelD1 <= 158122
            ? (item.lmnpReelD1 - 73516) * 0.41 + 16062.86
            : item.lmnpReelD1 > 158122
            ? (item.lmnpReelD1 - 158122) * 0.45 + 50751.32
            : 0),
        (item.lmnpReelD3 = item.lmnpReelD2 * partFisc),
        // calcul impôts sur le revenu d'ACTIVITE en prennant en compte le plafonnement
        // de la réduction d'impot liée aux parts supplémentaire
        (item.lmnpReelImpotRevTot =
          item.lmnpReelC3 - item.lmnpReelD3 > item.plafonnement
            ? item.lmnpReelC3 - item.plafonnement
            : item.lmnpReelD3),
        (item.lmnpReelCotSoc = item.lmnpReelRevFoncImp * 0.172),
        (item.lmnpReelImpRevFonc =
          item.lmnpReelImpotRevTot + item.lmnpReelCotSoc - item.impotRevAct),
        (item.lmnpReelCashFlowNet =
          item.loyer -
          item.chargesFi -
          item.chargesExpl -
          item.lmnpReelImpRevFonc -
          item.capital),
        (item.lmnpReelRoE =
          item.annee == 1 && coutProjet > apport
            ? ((item.capital + item.lmnpReelCashFlowNet) / apport) * 100
            : item.annee != 1 && coutProjet > apport
            ? ((item.capital + item.lmnpReelCashFlowNet) /
                (apport + item.reimbursedCapital)) *
              100
            : (item.lmnpReelCashFlowNet / coutProjet) * 100),
        (item.lmnpReelRoA =
          ((item.capital + item.lmnpReelCashFlowNet) / coutProjet) * 100),
        //*********************************************************************************************//
        // LMNP Micro *********************************************************************************//
        //*********************************************************************************************//

        // revenu foncier imposable et revenu total (activité + foncier) imposable
        (item.lmnpMicroRevFoncImp = item.loyer * 0.5),
        (item.lmnpMicroRevTotImp = item.revActImp + item.lmnpMicroRevFoncImp),
        // C) impôt sur le d'ACTIVITE + FONCIER - SANS parts de quotien familial supplémentaires
        // C1 = quotien familial sans parts de quotien familial supplémentaire (parts des enfants)
        // C2 = calcul de l'impôt sur le revenu pour chaque part fiscal
        // C3 = calcul de l'impôt total à payer
        (item.lmnpMicroC1 =
          revInvest2 == 0
            ? item.lmnpMicroRevTotImp
            : item.lmnpMicroRevTotImp / 2),
        (item.lmnpMicroC2 =
          item.lmnpMicroC1 < 10084
            ? 0
            : item.lmnpMicroC1 > 10085 && item.lmnpMicroC1 <= 25710
            ? (item.lmnpMicroC1 - 10084) * 0.11
            : item.lmnpMicroC1 > 25710 && item.lmnpMicroC1 <= 73516
            ? (item.lmnpMicroC1 - 25710) * 0.3 + 1721.06
            : item.lmnpMicroC1 > 73516 && item.lmnpMicroC1 <= 158122
            ? (item.lmnpMicroC1 - 73516) * 0.41 + 16062.86
            : item.lmnpMicroC1 > 158122
            ? (item.lmnpMicroC1 - 158122) * 0.45 + 50751.32
            : 0),
        (item.lmnpMicroC3 =
          revInvest2 == 0 ? item.lmnpMicroC2 : item.lmnpMicroC2 * 2),
        // D) impôt sur le d'ACTIVITE + FONCIER - SANS parts de quotien familial supplémentaires
        // d1 = quotien familial sans parts de quotien familial supplémentaire (parts des enfants)
        // d2 = calcul de l'impôt sur le revenu pour chaque part fiscal
        // d3 = calcul de l'impôt total à payer
        (item.lmnpMicroD1 = item.lmnpMicroRevTotImp / partFisc),
        (item.lmnpMicroD2 =
          item.lmnpMicroD1 < 10084
            ? 0
            : item.lmnpMicroD1 > 10085 && item.lmnpMicroD1 <= 25710
            ? (item.lmnpMicroD1 - 10084) * 0.11
            : item.lmnpMicroD1 > 25710 && item.lmnpMicroD1 <= 73516
            ? (item.lmnpMicroD1 - 25710) * 0.3 + 1721.06
            : item.lmnpMicroD1 > 73516 && item.lmnpMicroD1 <= 158122
            ? (item.lmnpMicroD1 - 73516) * 0.41 + 16062.86
            : item.lmnpMicroD1 > 158122
            ? (item.lmnpMicroD1 - 158122) * 0.45 + 50751.32
            : 0),
        (item.lmnpMicroD3 = item.lmnpMicroD2 * partFisc),
        // calcul impôts sur le revenu d'ACTIVITE en prennant en compte le plafonnement
        // de la réduction d'impot liée aux parts supplémentaire
        (item.lmnpMicroImpotRevTot =
          item.lmnpMicroC3 - item.lmnpMicroD3 > item.plafonnement
            ? item.lmnpMicroC3 - item.plafonnement
            : item.lmnpMicroD3),
        (item.lmnpMicroCotSoc = item.lmnpMicroRevFoncImp * 0.172),
        (item.lmnpMicroImpRevFonc =
          item.lmnpMicroImpotRevTot + item.lmnpMicroCotSoc - item.impotRevAct),
        (item.lmnpMicroCashFlowNet =
          item.loyer -
          item.chargesFi -
          item.chargesExpl -
          item.lmnpMicroImpRevFonc -
          item.capital),
        (item.lmnpMicroRoE =
          item.annee == 1 && coutProjet > apport
            ? ((item.capital + item.lmnpMicroCashFlowNet) / apport) * 100
            : item.annee != 1 && coutProjet > apport
            ? ((item.capital + item.lmnpMicroCashFlowNet) /
                (apport + item.reimbursedCapital)) *
              100
            : (item.lmnpMicroCashFlowNet / coutProjet) * 100),
        (item.lmnpMicroRoA =
          ((item.capital + item.lmnpMicroCashFlowNet) / coutProjet) * 100),
        //*********************************************************************************************//
        // Nue Réel ***********************************************************************************//
        //*********************************************************************************************//

        // revenu foncier imposable et revenu total (activité + foncier) imposable
        (item.nueReelRevFoncImp =
          item.loyer - item.nueChargesDeduc - item.nueDefFoncier <= 0
            ? 0
            : item.loyer - item.nueChargesDeduc - item.nueDefFoncier),
        (item.nueReelRevTotImp =
          item.revActImp + item.nueReelRevFoncImp - item.nueReelDeducRevAct),
        // C) impôt sur le d'ACTIVITE + FONCIER - SANS parts de quotien familial supplémentaires
        // C1 = quotien familial sans parts de quotien familial supplémentaire (parts des enfants)
        // C2 = calcul de l'impôt sur le revenu pour chaque part fiscal
        // C3 = calcul de l'impôt total à payer
        (item.nueReelC1 =
          revInvest2 == 0 ? item.nueReelRevTotImp : item.nueReelRevTotImp / 2),
        (item.nueReelC2 =
          item.nueReelC1 < 10084
            ? 0
            : item.nueReelC1 > 10085 && item.nueReelC1 <= 25710
            ? (item.nueReelC1 - 10084) * 0.11
            : item.nueReelC1 > 25710 && item.nueReelC1 <= 73516
            ? (item.nueReelC1 - 25710) * 0.3 + 1721.06
            : item.nueReelC1 > 73516 && item.nueReelC1 <= 158122
            ? (item.nueReelC1 - 73516) * 0.41 + 16062.86
            : item.nueReelC1 > 158122
            ? (item.nueReelC1 - 158122) * 0.45 + 50751.32
            : 0),
        (item.nueReelC3 =
          revInvest2 == 0 ? item.nueReelC2 : item.nueReelC2 * 2),
        // D) impôt sur le d'ACTIVITE + FONCIER - SANS parts de quotien familial supplémentaires
        // d1 = quotien familial sans parts de quotien familial supplémentaire (parts des enfants)
        // d2 = calcul de l'impôt sur le revenu pour chaque part fiscal
        // d3 = calcul de l'impôt total à payer
        (item.nueReelD1 = item.nueReelRevTotImp / partFisc),
        (item.nueReelD2 =
          item.nueReelD1 < 10084
            ? 0
            : item.nueReelD1 > 10085 && item.nueReelD1 <= 25710
            ? (item.nueReelD1 - 10084) * 0.11
            : item.nueReelD1 > 25710 && item.nueReelD1 <= 73516
            ? (item.nueReelD1 - 25710) * 0.3 + 1721.06
            : item.nueReelD1 > 73516 && item.nueReelD1 <= 158122
            ? (item.nueReelD1 - 73516) * 0.41 + 16062.86
            : item.nueReelD1 > 158122
            ? (item.nueReelD1 - 158122) * 0.45 + 50751.32
            : 0),
        (item.nueReelD3 = item.nueReelD2 * partFisc),
        // calcul impôts sur le revenu d'ACTIVITE en prennant en compte le plafonnement
        // de la réduction d'impot liée aux parts supplémentaire
        (item.nueReelImpotRevTot =
          item.nueReelC3 - item.nueReelD3 > item.plafonnement
            ? item.nueReelC3 - item.plafonnement
            : item.nueReelD3),
        (item.nueReelCotSoc = item.nueReelRevFoncImp * 0.172),
        (item.nueReelImpRevFonc =
          item.nueReelImpotRevTot + item.nueReelCotSoc - item.impotRevAct >= 0
            ? item.nueReelImpotRevTot + item.nueReelCotSoc - item.impotRevAct
            : 0),
        (item.nueReelReducImpRevAct =
          item.nueReelDeducRevAct != 0
            ? item.impotRevAct - item.nueReelImpotRevTot
            : 0),
        (item.nueReelCashFlowNet =
          item.loyer +
          item.nueReelReducImpRevAct -
          item.chargesFi -
          item.chargesExpl -
          item.nueReelImpRevFonc -
          item.capital),
        (item.nueReelRoE =
          item.annee == 1 && coutProjet > apport
            ? ((item.capital + item.nueReelCashFlowNet) / apport) * 100
            : item.annee != 1 && coutProjet > apport
            ? ((item.capital + item.nueReelCashFlowNet) /
                (apport + item.reimbursedCapital)) *
              100
            : (item.nueReelCashFlowNet / coutProjet) * 100),
        (item.nueReelRoA =
          ((item.capital + item.nueReelCashFlowNet) / coutProjet) * 100),
        //*********************************************************************************************//
        // Nue Micro **********************************************************************************//
        //*********************************************************************************************//

        // revenu foncier imposable et revenu total (activité + foncier) imposable
        (item.nueMicroRevFoncImp = item.loyer * 0.7),
        (item.nueMicroRevTotImp = item.nueMicroRevFoncImp + item.revActImp),
        // C) impôt sur le d'ACTIVITE + FONCIER - SANS parts de quotien familial supplémentaires
        // C1 = quotien familial sans parts de quotien familial supplémentaire (parts des enfants)
        // C2 = calcul de l'impôt sur le revenu pour chaque part fiscal
        // C3 = calcul de l'impôt total à payer
        (item.nueMicroC1 =
          revInvest2 == 0
            ? item.nueMicroRevTotImp
            : item.nueMicroRevTotImp / 2),
        (item.nueMicroC2 =
          item.nueMicroC1 < 10084
            ? 0
            : item.nueMicroC1 > 10085 && item.nueMicroC1 <= 25710
            ? (item.nueMicroC1 - 10084) * 0.11
            : item.nueMicroC1 > 25710 && item.nueMicroC1 <= 73516
            ? (item.nueMicroC1 - 25710) * 0.3 + 1721.06
            : item.nueMicroC1 > 73516 && item.nueMicroC1 <= 158122
            ? (item.nueMicroC1 - 73516) * 0.41 + 16062.86
            : item.nueMicroC1 > 158122
            ? (item.nueMicroC1 - 158122) * 0.45 + 50751.32
            : 0),
        (item.nueMicroC3 =
          revInvest2 == 0 ? item.nueMicroC2 : item.nueMicroC2 * 2),
        // D) impôt sur le d'ACTIVITE + FONCIER - SANS parts de quotien familial supplémentaires
        // d1 = quotien familial sans parts de quotien familial supplémentaire (parts des enfants)
        // d2 = calcul de l'impôt sur le revenu pour chaque part fiscal
        // d3 = calcul de l'impôt total à payer
        (item.nueMicroD1 = item.nueMicroRevTotImp / partFisc),
        (item.nueMicroD2 =
          item.nueMicroD1 < 10084
            ? 0
            : item.nueMicroD1 > 10085 && item.nueMicroD1 <= 25710
            ? (item.nueMicroD1 - 10084) * 0.11
            : item.nueMicroD1 > 25710 && item.nueMicroD1 <= 73516
            ? (item.nueMicroD1 - 25710) * 0.3 + 1721.06
            : item.nueMicroD1 > 73516 && item.nueMicroD1 <= 158122
            ? (item.nueMicroD1 - 73516) * 0.41 + 16062.86
            : item.nueMicroD1 > 158122
            ? (item.nueMicroD1 - 158122) * 0.45 + 50751.32
            : 0),
        (item.nueMicroD3 = item.nueMicroD2 * partFisc),
        // calcul impôts sur le revenu d'ACTIVITE en prennant en compte le plafonnement
        // de la réduction d'impot liée aux parts supplémentaire
        (item.nueMicroImpotRevTot =
          item.nueMicroC3 - item.nueMicroD3 > item.plafonnement
            ? item.nueMicroC3 - item.plafonnement
            : item.nueMicroD3),
        (item.nueMicroCotSoc = item.nueMicroRevFoncImp * 0.172),
        (item.nueMicroImpRevFonc =
          item.nueMicroImpotRevTot + item.nueMicroCotSoc - item.impotRevAct >= 0
            ? item.nueMicroImpotRevTot + item.nueMicroCotSoc - item.impotRevAct
            : 0),
        (item.nueMicroCashFlowNet =
          item.loyer -
          item.chargesFi -
          item.chargesExpl -
          item.nueMicroImpRevFonc -
          item.capital),
        (item.nueMicroRoE =
          item.annee == 1 && coutProjet > apport
            ? ((item.capital + item.nueMicroCashFlowNet) / apport) * 100
            : item.annee != 1 && coutProjet > apport
            ? ((item.capital + item.nueMicroCashFlowNet) /
                (apport + item.reimbursedCapital)) *
              100
            : (item.nueMicroCashFlowNet / coutProjet) * 100),
        (item.nueMicroRoA =
          ((item.capital + item.nueMicroCashFlowNet) / coutProjet) * 100)
      );
    });

    console.log(inputs);
    console.log(req.body.idProjet);
    // si un ID reçue dans req -> cherche si le projet existe pour checker l'ID reçue
    if (req.body.idProjet) {
      // const checkProjet = await InputForm.find({ _id: req.body.idProjet });
      // // return res.status(400).send({ msg: "Utilisateur introuvable" });
      // // si projet existe (array not empty) -> update
      // if (checkProjet.lenght > 0) {
      //   console.log(checkProjet);
      ["nomProjet", "ville", "natureBien", "typeAppartement"].forEach(
        (e) => delete inputs[e]
      );
      console.log(inputs);
      await InputForm.findByIdAndUpdate(
        { _id: req.body.idProjet },
        {
          $set: inputs,
        }
      );
      console.log("update");
      res.json(array);
      // } else {
      // // assign inputs to the model
      // newInputs = InputForm(inputs);
      // // create new project
      // await newInputs.save();
      // res.json(array);
      // console.log("create 1");
    } else {
      // assign inputs to the model
      newInputs = InputForm(inputs);
      // create new project
      await newInputs.save();
      res.json(array);
      console.log("create");
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
