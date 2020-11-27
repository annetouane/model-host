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
import SideNav from "./SideNav";
import MobileNav from "./MobileNav";
import ModalEmail from "./modalEmail";
import Footer from "./Footer";
import InfoModal from "./InfoModal";
import MobileNavButton from "./MobileNavButton";
import MobileTitle from "./MobileTitle"
import ButtonModelMobile from "./ButtonModelMobile";
// import Modelisation from "../dashboards/Modelisation"

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

  const [mobileDisplayTab, setMobileDisplayTab] = useState(0)

  // init form state
  const [formData, setFormData] = useState({
    netVendeur: 0,
    travaux: 0,
    ammeublement: 0,
    notaire: 0.075,
    agence: 0.05,
    duree: 20,
    apport: "",
    interet: 0.012,
    assurance: 0.001,
    fraisBancaires: 0,
    fraisCourtier: 0,
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
    irl,
    sciIs,
    lmnpReel,
    lmnpMicro,
    nueReel,
    nueMicro,
  } = formData;

  // modal user email
  const [emailModal, setEmailModal] = useState({ eModal: "" });
  const { eModal } = emailModal;

  const [emailFooter, setEmailFooter] = useState({ eFooter: "" });
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
    setFormData({ ...formData, [e.target.name]: parseInt(e.target.value.replace("€", "").replaceAll(" ", "")) });
  };

  const onChangeDecimals = (e) => {
    setFormData({ ...formData, [e.target.name]: parseFloat(e.target.value) });
  };

  const onChangeRegime = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.checked });
  };

  // Submit functions ---------------------------------------------------------------------------------
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
    if (eModal) {
      postEmail(eModal);
    } else if (eFooter) {
      postEmail(eFooter);
      setClickFooter(true)
    } else {
      console.log("nada");
    }
    setEmailModal({ eModal: "" });
    setEmailFooter({ eFooter: "" });
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
    parseInt(netVendeur) * agence +
    parseInt(fraisBancaires) +
    parseInt(fraisCourtier);

  const emprunt = parseInt(apport) > parseInt(coutProjet) ? 0 : parseInt(coutProjet) - parseInt(apport);

  const mensualite =
    finance.AM(emprunt, interet * 100, parseInt(duree) * 12, 1) +
    (emprunt * assurance) / 12;

  const revAnnuel = parseInt(loyer) * parseInt(occupation);

  const rendementBrut =
    Math.round(
      ((parseInt(revAnnuel) / parseInt(coutProjet)) * 100 + Number.EPSILON) *
        100
    ) / 100;

  const netOperatingIncome =
  revAnnuel -
    (parseInt(fonciere) +
    parseInt(charges) +
    parseInt(gestion) +
    parseInt(pno));

  const cashFlowAnnuel =
    revAnnuel -
    (mensualite * 12 +
      parseInt(fonciere) +
      parseInt(charges) +
      parseInt(gestion) +
      parseInt(pno));

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
  };

  // clic footer
  const [clickFooter, setClickFooter] = useState(false);

  // show - hide mobile nav
  const [toggleMobileNav, setToggleMobileNav] = useState(false);

  // add border on scroll
  const [scrollTop, setScrollTop] = useState(true);

  useEffect(() => {
    window.onscroll = function() {
      if(window.pageYOffset !== 0) {
        setScrollTop(false)
      }
      if(window.pageYOffset === 0) {
        setScrollTop(true)
      }
    };
  });

  // focus on edit
  const focusMethod = function getFocus(id) {           
    document.getElementById(id).focus();
  }

  return (
    <div >

      {/* model modal */}
      {/* <Modelisation /> */}

      {/* <InfoModal /> */}
      {displayInfoModal ? (
        <InfoModal
          idContent={idContent}
          setDisplayInfoModal={setDisplayInfoModal}
        />
      ) : (
        ""
      )}

      
      {width < 770 ?
        <MobileTitle 
          mobileDisplayTab={mobileDisplayTab}
          scrollTop={scrollTop}
        />
      : ""} 

      {width < 770 && !modal ?
        <MobileNavButton 
          setToggleMobileNav={setToggleMobileNav}
          toggleMobileNav={toggleMobileNav}
          netVendeurCheck={netVendeurCheck}
          /> : ""}
     

      {width < 770 ? (
        <MobileNav
          setMobileDisplayTab={setMobileDisplayTab}
          setClick={setClick}
          setModal={setModal}
          setDisplayInfoModal={setDisplayInfoModal}
          setToggleMobileNav={setToggleMobileNav}
          toggleMobileNav={toggleMobileNav}
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
        eModal={eModal}
        width={width}
      />

      {width < 770 ?
        <ButtonModelMobile 
          onSubmit={onSubmit}
          formCheck={formCheck}
          modal={modal}
        /> : ""}

      {/* main page */}
      <div className='form-container'>
        {width < 1000 ? (
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
            netOperatingIncome={netOperatingIncome}
            cashFlowAnnuel={cashFlowAnnuel}
          />
        )}

        {width < 1000 && click ? (
          <IndicateursMobile
            setClick={setClick}
            showModal={showModal}
            sepSpace={sepSpace}
            netVendeurCheck={netVendeurCheck}
            apportCheck={apportCheck}
            loyerCheck={loyerCheck}
            chargesCheck={chargesCheck}
            netVendeur={netVendeur}
            apport={apport}
            loyer={loyer}
            coutProjet={coutProjet}
            emprunt={emprunt}
            mensualite={mensualite}
            revAnnuel={revAnnuel}
            rendementBrut={rendementBrut}
            netOperatingIncome={netOperatingIncome}
            cashFlowAnnuel={cashFlowAnnuel}
            formCheck={formCheck}
          />
        ) : (
          ""
        )}

        <div style={{ width: "100%", margin: width < 770 ? "0" : "0 20px" }}>
          {width > 770 || (width < 770 && mobileDisplayTab === 0) ? (
            <Projet
              onChange={onChange}
              showModal={showModal}
              sepSpace={sepSpace}
              setMobileDisplayTab={setMobileDisplayTab}
              focusMethod={focusMethod}
              onChangeDecimals={onChangeDecimals}
              mobileDisplayTab={mobileDisplayTab}
              netVendeur={netVendeur}
              travaux={travaux}
              ammeublement={ammeublement}
              notaire={notaire}
              agence={agence}
              width={width}
              formCheck={formCheck}
            />
          ) : (
            ""
          )}
          {width > 770 || (width < 770 && mobileDisplayTab === 1) ? (
            <Financement
              onChange={onChange}
              showModal={showModal}
              sepSpace={sepSpace}
              setMobileDisplayTab={setMobileDisplayTab}
              onChangeDecimals={onChangeDecimals}
              focusMethod={focusMethod}
              mobileDisplayTab={mobileDisplayTab}
              duree={duree}
              apport={apport}
              interet={interet}
              assurance={assurance}
              coutProjet={coutProjet}
              emprunt={emprunt}
              fraisBancaires={fraisBancaires}
              fraisCourtier={fraisCourtier}
              width={width}
              formCheck={formCheck}
            />
          ) : (
            ""
          )}

          {width > 770 || (width < 770 && mobileDisplayTab === 2) ? (
            <Revenu
              onChange={onChange}
              showModal={showModal}
              sepSpace={sepSpace}
              setMobileDisplayTab={setMobileDisplayTab}
              focusMethod={focusMethod}
              mobileDisplayTab={mobileDisplayTab}
              loyer={loyer}
              chargesLoc={chargesLoc}
              occupation={occupation}
              width={width}
              formCheck={formCheck}
            />
          ) : (
            ""
          )}

          {width > 770 || (width < 770 && mobileDisplayTab === 3) ? (
            <Charges
              onChange={onChange}
              showModal={showModal}
              sepSpace={sepSpace}
              setMobileDisplayTab={setMobileDisplayTab}
              focusMethod={focusMethod}
              mobileDisplayTab={mobileDisplayTab}
              revAnnuel={revAnnuel}
              fonciere={fonciere}
              gestion={gestion}
              charges={charges}
              pno={pno}
              width={width}
              formCheck={formCheck}
            />
          ) : (
            ""
          )}

          {width > 770 ? (
            <FoyerDesktop
              onChange={onChange}
              onChangeRegime={onChangeRegime}
              showModal={showModal}
              sepSpace={sepSpace}
              focusMethod={focusMethod}
              onChangeDecimals={onChangeDecimals}
              revInvest1={revInvest1}
              augInvest1={augInvest1}
              revInvest2={revInvest2}
              augInvest2={augInvest2}
              width={width}
            />
          ) : width < 770 && mobileDisplayTab === 4 ? (
            <FoyerMobile
              onChange={onChange}
              onChangeRegime={onChangeRegime}
              showModal={showModal}
              sepSpace={sepSpace}
              setMobileDisplayTab={setMobileDisplayTab}
              focusMethod={focusMethod}
              mobileDisplayTab={mobileDisplayTab}
              revInvest1={revInvest1}
              augInvest1={augInvest1}
              revInvest2={revInvest2}
              augInvest2={augInvest2}
              width={width}
              formCheck={formCheck}
            />
          ) : (
            ""
          )}

          {width > 770 || (width < 770 && mobileDisplayTab === 5) ? (
            <Regime
              onChange={onChange}
              onChangeRegime={onChangeRegime}
              showModal={showModal}
              setMobileDisplayTab={setMobileDisplayTab}
              onChangeDecimals={onChangeDecimals}
              mobileDisplayTab={mobileDisplayTab}
              sciIs={sciIs}
              lmnpReel={lmnpReel}
              lmnpMicro={lmnpMicro}
              nueReel={nueReel}
              nueMicro={nueMicro}
              irl={irl}
              width={width}
              formCheck={formCheck}
            />
          ) : (
            ""
          )}
        </div>

        {width < 770 ? (
          ""
        ) : (
          <SideNav
            onSubmit={onSubmit}
            showModal={showModal}
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
      {width > 770 ? (
        <Footer
          onSubmitEmail={onSubmitEmail}
          onChangeEmailFooter={onChangeEmailFooter}
          clickFooter={clickFooter}
          eFooter={eFooter}
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
