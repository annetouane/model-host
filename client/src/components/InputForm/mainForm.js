// packages
import React, { useState, useEffect } from "react";
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
// import ModalEmail from "./ModalEmail";

// actions
import { postInputForm, postEmail } from "../../actions/formData";

export const InputKpi = ({ postInputForm, postEmail }) => {
  const [dimensions, setDimensions] = useState({
    height: window.innerHeight,
    width: window.innerWidth,
  });

  useEffect(() => {
    // set the windows dimensions on render
    // prevent function execution more than once per minute
    const debouncedHandleResize = function handleResize() {
      setDimensions({
        height: window.innerHeight,
        width: window.innerWidth,
      });
    };
    // resize triggered whenever the screen size changes
    window.addEventListener("resize", debouncedHandleResize);
    return (_) => {
      // remove event to avoid app freeze and allows f° exec max once per second
      window.removeEventListener("resize", debouncedHandleResize);
    };
  });

  const [mobileDisplay, setMobileDisplay] = useState({
    displayProjet: true,
    displayFinancement: false,
    displayRevenu: false,
    displayCharges: false,
    displayFoyer: false,
    displayRegime: false,
  });

  const {
    displayProjet,
    displayFinancement,
    displayRevenu,
    displayCharges,
    displayFoyer,
    displayRegime,
  } = mobileDisplay;

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

  // destructure form
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

  const [modal, setModal] = useState(false);

  // onChange functions ---------------------------------------------------------------------------------
  const onChangeEmail = (e) => {
    setEmail({ ...userEmail, [e.target.name]: e.target.value });
  };

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
      {dimensions.width < 560 ? (
        <div className='mobile-nav'>
          <button
            onClick={() =>
              setMobileDisplay({
                displayProjet: true,
                displayFinancement: false,
                displayRevenu: false,
                displayCharges: false,
                displayFoyer: false,
                displayRegime: false,
              })
            }
          >
            <i className='fas fa-landmark header-i'></i>
          </button>
          <button
            onClick={() =>
              setMobileDisplay({
                displayProjet: false,
                displayFinancement: true,
                displayRevenu: false,
                displayCharges: false,
                displayFoyer: false,
                displayRegime: false,
              })
            }
          >
            <i className='fas fa-piggy-bank header-i'></i>
          </button>
          <button
            onClick={() =>
              setMobileDisplay({
                displayProjet: false,
                displayFinancement: false,
                displayRevenu: true,
                displayCharges: false,
                displayFoyer: false,
                displayRegime: false,
              })
            }
          >
            <i className='fas fa-hand-holding-usd header-i'></i>
          </button>
          <button
            onClick={() =>
              setMobileDisplay({
                displayProjet: false,
                displayFinancement: false,
                displayRevenu: false,
                displayCharges: true,
                displayFoyer: false,
                displayRegime: false,
              })
            }
          >
            <i className='fas fa-house-user header-i'></i>
          </button>
          <button
            onClick={() =>
              setMobileDisplay({
                displayProjet: false,
                displayFinancement: false,
                displayRevenu: false,
                displayCharges: false,
                displayFoyer: true,
                displayRegime: false,
              })
            }
          >
            <i className='fas fa-weight-hanging header-i'></i>
          </button>
          <button
            onClick={() =>
              setMobileDisplay({
                displayProjet: false,
                displayFinancement: false,
                displayRevenu: false,
                displayCharges: false,
                displayFoyer: false,
                displayRegime: true,
              })
            }
          >
            <i className='fas fa-balance-scale header-i'></i>
          </button>
        </div>
      ) : (
        ""
      )}
      {/* <ModalEmail
        onSubmitEmail={onSubmitEmail}
        onChangeEmail={onChangeEmail}
        setModal={setModal}
        modal={modal}
        emailFooter={emailModal}
      /> */}

      {/* main page */}
      <div className='flex-row'>
        {dimensions.width < 560 ? (
          ""
        ) : (
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
        )}

        <div style={{ width: "100%" }}>
          {dimensions.width > 560 ||
          (dimensions.width < 560 && displayProjet) ? (
            <Projet
              onChange={onChange}
              sepSpace={sepSpace}
              netVendeur={netVendeur}
              travaux={travaux}
              ammeublement={ammeublement}
              notaire={notaire}
              agence={agence}
            />
          ) : (
            ""
          )}
          {dimensions.width > 560 ||
          (dimensions.width < 560 && displayFinancement) ? (
            <Financement
              onChange={onChange}
              duree={duree}
              apport={apport}
              interet={interet}
              assurance={assurance}
            />
          ) : (
            ""
          )}

          {dimensions.width > 560 ||
          (dimensions.width < 560 && displayRevenu) ? (
            <Revenu
              onChange={onChange}
              sepSpace={sepSpace}
              loyer={loyer}
              chargesLoc={chargesLoc}
              occupation={occupation}
            />
          ) : (
            ""
          )}

          {dimensions.width > 560 ||
          (dimensions.width < 560 && displayCharges) ? (
            <Charges
              onChange={onChange}
              sepSpace={sepSpace}
              fonciere={fonciere}
              gestion={gestion}
              charges={charges}
              pno={pno}
            />
          ) : (
            ""
          )}

          {dimensions.width > 560 ||
          (dimensions.width < 560 && displayFoyer) ? (
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
          ) : (
            ""
          )}

          {dimensions.width > 560 ||
          (dimensions.width < 560 && displayRegime) ? (
            <Regime
              onChange={onChange}
              onChangeRegime={onChangeRegime}
              irl={irl}
            />
          ) : (
            ""
          )}
        </div>
        {dimensions.width < 560 ? (
          ""
        ) : (
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
        )}
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
