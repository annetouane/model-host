// packages
import React, { useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Finance from "financejs";

// components
import Projet from "./Projet";
import Financement from "./Financement";
import Revenu from "./Revenu";
import Charges from "./Charges";
import Foyer from "./Foyer";
import Regime from "./Regime";
import Indicateurs from "./Indicateurs";
import SideNav from "./SideNav";
import Footer from "./Footer";
import modalEmail from "./modalEmail";

// actions
import { postInputForm, postEmail } from "../../actions/formData";

export const InputKpi = ({ postInputForm, postEmail }) => {
  // init form state
  const [formData, setFormData] = useState({
    type: "",
    codePostal: "",
    netVendeur: 0,
    travaux: 0,
    ammeublement: 0,
    notaire: 0.075,
    agence: 0.05,
    duree: 20,
    apport: "",
    interet: 0.012,
    assurance: 0.001,
    loyer: 0,
    chargesLoc: 0,
    occupation: 11,
    fonciere: 0,
    gestion: 0,
    charges: 0,
    pno: 0,
    revInvest1: 0,
    augInvest1: 0.01,
    revInvest2: 0,
    augInvest2: 0.01,
    invCouple: true,
    partFisc: 1,
    sciIs: false,
    lmnpReel: false,
    lmnpMicro: false,
    lmpReel: false,
    lmpMicro: false,
    nueReel: false,
    nueMicro: false,
    irl: 0.01,
  });

  // destructure state
  const {
    netVendeur,
    travaux,
    ammeublement,
    notaire,
    agence,
    duree,
    apport,
    interet,
    assurance,
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
    invCouple,
    // partFisc,
    irl,
    sciIs,
    lmnpReel,
    lmnpMicro,
    lmpReel,
    lmpMicro,
    nueReel,
    nueMicro,
  } = formData;

  const [userEmail, setEmail] = useState({
    emailModal: "",
    emailFooter: "",
  });

  const { emailModal, emailFooter } = userEmail;

  const onChangeEmail = (e) => {
    setEmail({ ...userEmail, [e.target.name]: e.target.value });
  };

  const [modal, setModal] = useState(false);

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onChangeRegime = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.checked });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (formData) {
      postInputForm(formData);
    } else {
      console.log("error");
      // setAlert("Start time can't be superieur to end time", "red");
    }
    setModal(true);
  };

  const onSubmitEmail = async (e) => {
    e.preventDefault();
    if (userEmail) {
      postEmail(userEmail);
    } else {
      console.log("error");
      // setAlert("Start time can't be superieur to end time", "red");
    }
    setEmail({ emailModal: "", emailFooter: "" });
    setModal(false);
  };

  // side navigation -----------------------------------------------------------------------------------------
  const scrollTo = (e, id) => {
    e.preventDefault();
    const anchor = document.querySelector(id);
    anchor.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  // calcul de indicateurs ---------------------------------------------------------------------------------
  const finance = new Finance();

  const coutProjet =
    parseInt(netVendeur) +
    parseInt(travaux) +
    parseInt(ammeublement) +
    parseInt(netVendeur) * notaire +
    parseInt(netVendeur) * agence;

  const emprunt = parseInt(coutProjet) - parseInt(apport);

  const mensualite =
    finance.AM(emprunt, interet * 100, parseInt(duree) * 12, 1) +
    (emprunt * assurance) / 12;

  const revAnnuel = parseInt(loyer) * parseInt(occupation);

  const rendementBrut =
    Math.round(
      ((parseInt(revAnnuel) / parseInt(coutProjet)) * 100 + Number.EPSILON) *
        100
    ) / 100;

  const cashFlowAnnuel =
    revAnnuel -
    (mensualite * 12 +
      parseInt(fonciere) +
      parseInt(charges) +
      parseInt(gestion) +
      parseInt(pno));

  const valeurFinale = parseInt(netVendeur) + parseInt(travaux);

  const rendementNet =
    Math.round(
      (((cashFlowAnnuel + valeurFinale / duree) / coutProjet) * 100 +
        Number.EPSILON) *
        100
    ) / 100;

  const sepSpace = (value) => {
    return Math.round(value)
      .toString()
      .replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  };

  // display / hide blocks
  const netVendeurCheck = parseInt(netVendeur) !== 0;
  const apportCheck = apport !== "";
  const loyerCheck = parseInt(loyer) !== 0;
  const chargesCheck =
    parseInt(charges) !== 0 ||
    parseInt(fonciere) !== 0 ||
    parseInt(gestion) !== 0 ||
    parseInt(pno) !== 0;
  const foyerCheck = parseInt(revInvest1) !== 0;
  const regimeCheck =
    sciIs !== false ||
    lmnpReel !== false ||
    lmnpMicro !== false ||
    lmpReel !== false ||
    lmpMicro !== false ||
    nueReel !== false ||
    nueMicro !== false;
  const formCheck =
    netVendeurCheck &&
    apportCheck &&
    loyerCheck &&
    chargesCheck &&
    foyerCheck &&
    regimeCheck;

  return (
    <div>
      <modalEmail
        onSubmitEmail={onSubmitEmail}
        onChangeEmail={onChangeEmail}
        setModal={setModal}
        modal={modal}
        emailFooter={emailModal}
      />

      {/* main page */}
      <div className='flex-row'>
        <Indicateurs
          sepSpace={sepSpace}
          netVendeur={netVendeur}
          apport={apport}
          loyer={loyer}
          coutProjet={coutProjet}
          emprunt={emprunt}
          mensualite={mensualite}
          revAnnuel={revAnnuel}
          rendementBrut={rendementBrut}
          rendementNet={rendementNet}
        />

        <div style={{ width: "100%" }}>
          <Projet
            onChange={onChange}
            sepSpace={sepSpace}
            netVendeur={netVendeur}
            travaux={travaux}
            ammeublement={ammeublement}
            notaire={notaire}
            agence={agence}
          />

          <Financement
            onChange={onChange}
            duree={duree}
            apport={apport}
            interet={interet}
            assurance={assurance}
          />

          <Revenu
            onChange={onChange}
            sepSpace={sepSpace}
            loyer={loyer}
            chargesLoc={chargesLoc}
            occupation={occupation}
          />

          <Charges
            onChange={onChange}
            sepSpace={sepSpace}
            fonciere={fonciere}
            gestion={gestion}
            charges={charges}
            pno={pno}
          />

          <Foyer
            onChange={onChange}
            onChangeRegime={onChangeRegime}
            sepSpace={sepSpace}
            revInvest1={revInvest1}
            augInvest1={augInvest1}
            revInvest2={revInvest2}
            augInvest2={augInvest2}
            invCouple={invCouple}
          />

          <Regime
            onChange={onChange}
            onChangeRegime={onChangeRegime}
            irl={irl}
          />
        </div>

        <SideNav
          onSubmit={onSubmit}
          scrollTo={scrollTo}
          netVendeurCheck={netVendeurCheck}
          apportCheck={apportCheck}
          loyerCheck={loyerCheck}
          chargesCheck={chargesCheck}
          foyerCheck={foyerCheck}
          regimeCheck={regimeCheck}
          formCheck={formCheck}
        />
      </div>

      <Footer
        onSubmitEmail={onSubmitEmail}
        onChangeEmail={onChangeEmail}
        emailFooter={emailFooter}
      />
    </div>
  );
};

// declare/define the type of props
InputKpi.propTypes = {
  postInputForm: PropTypes.func.isRequired,
  postEmail: PropTypes.func.isRequired,
};

export default connect(null, { postInputForm, postEmail })(InputKpi);
