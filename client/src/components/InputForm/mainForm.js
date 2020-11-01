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
import FoyerDesktop from "./FoyerDesktop";
import FoyerMobile from "./FoyerMobile";
import Regime from "./Regime";
import IndicateursDesktop from "./IndicateursDesktop";
import IndicateursMobile from "./IndicateursMobile";
import IndicateursButton from "./IndicateursButton";
import SideNav from "./SideNav";
import MobileNav from "./MobileNav";
import ModalEmail from "./modalEmail";
import ButtonModelMobile from "./ButtonModelMobile";
import Footer from "./Footer";
import InfoModal from "./InfoModal";

// actions
import { postInputForm, postEmail } from "../../actions/formData";

export const MainForm = ({ postInputForm, postEmail }) => {
  const [dimensions, setDimensions] = useState({
    width: window.innerWidth,
  });
  const { width } = dimensions;

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
    irl,
    sciIs,
    lmnpReel,
    lmnpMicro,
    nueReel,
    nueMicro,
  } = formData;

  // modal user email
  const [emailModal, setEmailModal] = useState({ eModal: "" });
  const [emailFooter, setEmailFooter] = useState({ eFooter: "" });
  const { eModal } = emailModal;
  const { eFooter } = emailFooter;
  const [modal, setModal] = useState(false);

  // mobile menu
  const [click, setClick] = useState(false);

  // onChange functions ---------------------------------------------------------------------------------
  const onChangeEmailModal = (e) => {
    setEmailModal({ eModal: e.target.value });
  };
  const onChangeEmailFooter = (e) => {
    setEmailFooter({ eFooter: e.target.value });
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
    setClick(false);
  };

  const onSubmitEmail = async (e) => {
    e.preventDefault();
    if (emailModal) {
      postEmail(emailModal);
    } else if (emailFooter) {
      postEmail(emailFooter);
    } else {
      console.log("error");
    }
    setEmailModal("");
    setEmailFooter("");
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

  // display / hide
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
    nueReel !== false ||
    nueMicro !== false;
  const formCheck =
    netVendeurCheck &&
    apportCheck &&
    loyerCheck &&
    chargesCheck &&
    foyerCheck &&
    regimeCheck;

  // information modal
  const [displayInfoModal, setDisplayInfoModal] = useState(false);
  const [contentInfoModal, setContentInfoModal] = useState({ idContent: null });
  const { idContent } = contentInfoModal;

  const showModal = (e) => {
    setDisplayInfoModal(true);
    setContentInfoModal({ idContent: e.target.id });
    console.log(e.target.id);
  };

  return (
    <div>
      {/* <InfoModal /> */}
      {displayInfoModal ? (
        <InfoModal
          idContent={idContent}
          setDisplayInfoModal={setDisplayInfoModal}
        />
      ) : (
        ""
      )}

      {width < 760 ? (
        <MobileNav
          setMobileDisplay={setMobileDisplay}
          setClick={setClick}
          setModal={setModal}
          mobileDisplay={mobileDisplay}
          netVendeurCheck={netVendeurCheck}
          apportCheck={apportCheck}
          loyerCheck={loyerCheck}
          chargesCheck={chargesCheck}
          foyerCheck={foyerCheck}
          regimeCheck={regimeCheck}
        />
      ) : (
        ""
      )}

      <ModalEmail
        onSubmitEmail={onSubmitEmail}
        onChangeEmailModal={onChangeEmailModal}
        setModal={setModal}
        modal={modal}
        emailModal={eModal}
        width={width}
      />

      {/* main page */}
      <div className='form-container'>
        {width < 760 ? (
          ""
        ) : (
          <IndicateursDesktop
            sepSpace={sepSpace}
            showModal={showModal}
            netVendeurCheck={netVendeurCheck}
            apportCheck={apportCheck}
            loyerCheck={loyerCheck}
            chargesCheck={chargesCheck}
            coutProjet={coutProjet}
            emprunt={emprunt}
            mensualite={mensualite}
            revAnnuel={revAnnuel}
            rendementBrut={rendementBrut}
            rendementNet={rendementNet}
            cashFlowAnnuel={cashFlowAnnuel}
          />
        )}

        {width < 760 ? (
          <ButtonModelMobile onSubmit={onSubmit} formCheck={formCheck} />
        ) : (
          ""
        )}

        {width < 760 ? (
          <IndicateursButton setClick={setClick} click={click} />
        ) : (
          ""
        )}

        {width < 760 && click ? (
          <IndicateursMobile
            setClick={setClick}
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
            cashFlowAnnuel={cashFlowAnnuel}
          />
        ) : (
          ""
        )}

        <div style={{ width: "100%" }}>
          {width > 760 || (width < 760 && displayProjet) ? (
            <Projet
              onChange={onChange}
              showModal={showModal}
              sepSpace={sepSpace}
              netVendeur={netVendeur}
              travaux={travaux}
              ammeublement={ammeublement}
              notaire={notaire}
              agence={agence}
              width={width}
              idContent={idContent}
            />
          ) : (
            ""
          )}
          {width > 760 || (width < 760 && displayFinancement) ? (
            <Financement
              onChange={onChange}
              showModal={showModal}
              duree={duree}
              apport={apport}
              interet={interet}
              assurance={assurance}
              width={width}
            />
          ) : (
            ""
          )}

          {width > 760 || (width < 760 && displayRevenu) ? (
            <Revenu
              onChange={onChange}
              showModal={showModal}
              sepSpace={sepSpace}
              loyer={loyer}
              chargesLoc={chargesLoc}
              occupation={occupation}
              width={width}
            />
          ) : (
            ""
          )}

          {width > 760 || (width < 760 && displayCharges) ? (
            <Charges
              onChange={onChange}
              showModal={showModal}
              sepSpace={sepSpace}
              fonciere={fonciere}
              gestion={gestion}
              charges={charges}
              pno={pno}
              width={width}
            />
          ) : (
            ""
          )}

          {width > 760 ? (
            <FoyerDesktop
              onChange={onChange}
              onChangeRegime={onChangeRegime}
              showModal={showModal}
              sepSpace={sepSpace}
              revInvest1={revInvest1}
              augInvest1={augInvest1}
              revInvest2={revInvest2}
              augInvest2={augInvest2}
              invCouple={invCouple}
              width={width}
            />
          ) : width < 760 && displayFoyer ? (
            <FoyerMobile
              onChange={onChange}
              onChangeRegime={onChangeRegime}
              showModal={showModal}
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

          {width > 760 || (width < 760 && displayRegime) ? (
            <Regime
              onChange={onChange}
              onChangeRegime={onChangeRegime}
              showModal={showModal}
              sciIs={sciIs}
              lmnpReel={lmnpReel}
              lmnpMicro={lmnpMicro}
              nueReel={nueReel}
              nueMicro={nueMicro}
              irl={irl}
              width={width}
            />
          ) : (
            ""
          )}
        </div>
        {width < 760 ? (
          ""
        ) : (
          <SideNav
            onSubmit={onSubmit}
            scrollTo={scrollTo}
            showModal={showModal}
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
      {width > 760 ? (
        <Footer
          onSubmitEmail={onSubmitEmail}
          onChangeEmailFooter={onChangeEmailFooter}
          emailFooter={eFooter}
        />
      ) : (
        ""
      )}
    </div>
  );
};

// declare/define the type of props
MainForm.propTypes = {
  postInputForm: PropTypes.func.isRequired,
  postEmail: PropTypes.func.isRequired,
};

export default connect(null, { postInputForm, postEmail })(MainForm);
