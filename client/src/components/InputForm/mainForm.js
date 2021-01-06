// packages
import React, { useState, useEffect, Fragment } from "react";
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
import Footer from "./Footer";
import InfoModal from "./InfoModal";
import MobileNavButton from "./MobileNavButton";
import MobileTitle from "./MobileTitle";
import ButtonModelMobile from "./ButtonModelMobile";
import AuthModalComplete from "../auth/AuthModalComplete";
import SaveModal from "./SaveModal";
import Modelisation from "../dashboards/Modelisation";
import AccountModal from "../auth/AccountModal";
import Landing from "../Layout/Landing";

// actions
import {
  storeParams,
  postInputForm,
  postEmail,
  deleteProject,
  saveToReducer,
  updateToReducer,
} from "../../actions/formData";
import { register, login } from "../../actions/auth";
import {
  authToggle,
  saveModalClic,
  saveModalToggle,
  modelModalClic,
  modelModalToggle,
  mobileMenuToggle,
  landingToggle,
  accountModalToggle,
} from "../../actions/modals";
import { setAlert } from "../../actions/alert";

export const MainForm = ({
  storeParams,
  postInputForm,
  postEmail,
  isAuthenticated,
  register,
  login,
  authToggle,
  saveModalClic,
  saveModalToggle,
  modelModalClic,
  modelModalToggle,
  detectSave,
  detectModel,
  userInfo,
  kpiMobile,
  landingModal,
  mobileMenuToggle,
  landingToggle,
  deleteProject,
  setAlert,
  projects,
  accountModalToggle,
}) => {
  const [dimensions, setDimensions] = useState({
    width: window.innerWidth,
  });
  const { width } = dimensions;

  // const [inputSaved, setIinputSaved ] = useState(false);

  // pagination mobile
  const [mobileDisplayTab, setMobileDisplayTab] = useState(0);

  // pagination project
  const [projectDisplayTab, setProjectDisplayTab] = useState(0);

  // init form state
  const [formData, setFormData] = useState({
    idProjet: "",
    user: "",
    nomProjet: "",
    ville: "",
    natureBien: "",
    typeAppartement: "",
    netVendeur: 300000,
    travaux: 0,
    ammeublement: 0,
    notaire: 0.075,
    agence: 0,
    duree: 20,
    apport: 30000,
    interet: 1.2,
    assurance: 0.1,
    fraisBancaires: 0,
    fraisCourtier: 0,
    loyer: 2000,
    chargesLoc: 0,
    occupation: 11,
    fonciere: 30000,
    gestion: 0,
    charges: 0,
    pno: 0,
    revInvest1: 30000,
    augInvest1: 0.01,
    revInvest2: 0,
    augInvest2: 0.01,
    partFisc: 1,
    sciIs: true,
    lmnpReel: false,
    lmnpMicro: false,
    nueReel: false,
    nueMicro: false,
    irl: 1,
  });

  // destructure form
  const {
    idProjet,
    ville,
    natureBien,
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
  const [emailFooter, setEmailFooter] = useState({ eFooter: "" });
  const { eFooter } = emailFooter;

  // onChange functions ---------------------------------------------------------------------------------
  const onChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: parseInt(
        e.target.value.replace("€", "").replaceAll(" ", "")
      ),
    });
  };

  const onChangeDecimals = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: parseFloat(
        e.target.value.replace("%", "").replaceAll(" ", "")
      ),
    });
  };

  const onChangeRegime = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.checked });
  };

  const onChangeEmailFooter = (e) => {
    setEmailFooter({ eFooter: e.target.value });
  };

  const onChangeString = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const getProjectToUpdate = (id) => {
    setFormData({ ...formData, idProjet: id });
  };

  // side navigation -----------------------------------------------------------------------------------------
  const scrollTo = (e, id) => {
    e.preventDefault();
    landingToggle(false);
    mobileMenuToggle(false);
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
    parseInt(agence) +
    parseInt(fraisBancaires) +
    parseInt(fraisCourtier);

  const emprunt =
    parseInt(apport) > parseInt(coutProjet)
      ? 0
      : parseInt(coutProjet) - parseInt(apport);

  const mensualite =
    finance.AM(emprunt, interet, parseInt(duree) * 12, 1) +
    (emprunt * assurance) / 100 / 12;

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

  // rules form checking
  const netVendeurCheck = parseInt(netVendeur) !== 0;
  const apportCheck = !isNaN(parseInt(apport));
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

  // mobile - add border on scroll
  const [scrollTop, setScrollTop] = useState(true);

  useEffect(() => {
    // detect scroll
    window.onscroll = function () {
      if (window.pageYOffset !== 0) {
        setScrollTop(false);
      }
      if (window.pageYOffset === 0) {
        setScrollTop(true);
      }
    };
    // update the reducer asynchronously with the new values of the form
    storeParams(formData);

    // // alert user before leaving the page
    // if (inputSaved) {
    //   window.addEventListener('beforeunload',  alertUser)
    // };

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
      // window.removeEventListener('beforeunload', alertUser)
    };
  });

  // focus on the field when clicking edit
  const focusMethod = function getFocus(id) {
    document.getElementById(id).focus();
  };

  // saving form *******************************************************************************

  // open alert window
  // const alertUser = e => {
  //   e.preventDefault()
  //   e.returnValue = ''
  // }

  const onSave = (e) => {
    e.preventDefault();
    mobileMenuToggle(false);
    saveModalClic(true); // detect clic sur save
    if (isAuthenticated) {
      // if user logged
      saveModalToggle(true); // ouvre save modal
    } else {
      authToggle(true); // sinon ouvre auth modal
    }
  };

  const onCreateProject = (e) => {
    e.preventDefault();
    postInputForm(formData, userInfo._id); // post input to db
    saveToReducer(formData);
    getProjectToUpdate(""); // set "" for project id
    // to do : dispatch to reducer list of projects
  };

  const onUpdateProject = (e) => {
    e.preventDefault();
    postInputForm(formData, userInfo._id); // post input to db
    updateToReducer(formData);
    getProjectToUpdate(""); // set "" for project id
    // to do : dispatch to reducer list of projects
  };

  const onDeleteProject = (e) => {
    e.preventDefault();
    // si authentifié et projet a été sélectionné dans le formulaire :
    if (isAuthenticated && idProjet !== "") {
      deleteProject(idProjet);
      getProjectToUpdate(""); // reset selected project ID
    } else {
      setAlert("Merci de sélectionner un projet à supprimer", "orange", 3000);
    }
  };

  // modélisation fiscale *******************************************************************************
  const onFisc = (e) => {
    e.preventDefault();
    mobileMenuToggle(false);
    modelModalClic(true); // detect clic sur model
    if (isAuthenticated) {
      // if user logged
      postInputForm(formData, userInfo._id); // submit input to db
      modelModalToggle(true); // open modelisation fiscale
    } else {
      authToggle(true); // sinon ouvre auth modal
    }
  };

  // sign up *******************************************************************************
  const [signUp, setSignUp] = useState({
    emailSignUp: "",
    passwordSignUp: "",
    condition: false,
  });
  const { emailSignUp, passwordSignUp, condition } = signUp;

  const onChangeSignUp = (e) => {
    setSignUp({ ...signUp, [e.target.name]: e.target.value });
  };
  const onChangeConditionSignUp = (e) => {
    setSignUp({ ...signUp, [e.target.name]: e.target.checked });
  };

  const onSignUp = (e) => {
    e.preventDefault();
    register(signUp, formData, detectSave, detectModel);
  };

  // sign in *******************************************************************************
  const [signIn, setSignIn] = useState({
    emailSignIn: "",
    passwordSignIn: "",
  });
  const { emailSignIn, passwordSignIn } = signIn;

  const onChangeSignIn = (e) => {
    setSignIn({ ...signIn, [e.target.name]: e.target.value });
  };

  const onSignIn = (e) => {
    e.preventDefault();
    login(signIn, formData, detectSave, detectModel);
  };

  // Submit email ---------------------------------------------------------------------------------
  const onSubmitEmail = async (e) => {
    e.preventDefault();
    if (eFooter) {
      postEmail(eFooter);
      setClickFooter(true);
    } else {
      console.log("nada");
    }
    setEmailFooter({ eFooter: "" });
  };

  // visualise model sauvegardé
  const onVisualise = (e) => {
    e.preventDefault();
    const project = projects.find((x) => x._id === idProjet);
    setFormData({
      ...formData,
      nomProjet: project.nomProjet,
      ville: project.ville,
      natureBien: project.natureBien,
      typeAppartement: project.typeAppartement,
      netVendeur: project.netVendeur,
      travaux: project.travaux,
      ammeublement: project.ammeublement,
      notaire: project.notaire,
      agence: project.agence,
      duree: project.duree,
      apport: project.apport,
      interet: project.interet * 100,
      assurance: project.assurance * 100,
      fraisBancaires: project.fraisBancaires,
      fraisCourtier: project.fraisCourtier,
      loyer: project.loyer,
      chargesLoc: project.chargesLoc,
      occupation: project.occupation,
      fonciere: project.fonciere,
      gestion: project.gestion,
      charges: project.charges,
      pno: project.pno,
      revInvest1: project.revInvest1,
      augInvest1: project.augInvest1,
      revInvest2: project.revInvest2,
      augInvest2: project.augInvest2,
      partFisc: project.partFisc,
      sciIs: project.sciIs,
      lmnpReel: project.lmnpReel,
      lmnpMicro: project.lmnpMicro,
      nueReel: project.nueReel,
      nueMicro: project.nueMicro,
      irl: project.irl * 100,
    });
    accountModalToggle(false); // ferme la fenetre account
    landingToggle(false); // va au simulateur
    getProjectToUpdate(""); // reset selected project ID
  };

  return (
    <Fragment>
      {/* landing window */}
      <Landing width={width} />

      {/* authentication window */}
      <AuthModalComplete
        onChangeSignUp={onChangeSignUp}
        onChangeConditionSignUp={onChangeConditionSignUp}
        onChangeSignIn={onChangeSignIn}
        onSignUp={onSignUp}
        onSignIn={onSignIn}
        setSignUp={setSignUp}
        setSignIn={setSignIn}
        emailSignUp={emailSignUp}
        passwordSignUp={passwordSignUp}
        condition={condition}
        emailSignIn={emailSignIn}
        passwordSignIn={passwordSignIn}
        width={width}
      />

      {/* account window */}
      <AccountModal
        projectDisplayTab={projectDisplayTab}
        setProjectDisplayTab={setProjectDisplayTab}
        getProjectToUpdate={getProjectToUpdate}
        onDeleteProject={onDeleteProject}
        onVisualise={onVisualise}
      />

      {/* save window */}
      <SaveModal
        onChangeString={onChangeString}
        onCreateProject={onCreateProject}
        onUpdateProject={onUpdateProject}
        getProjectToUpdate={getProjectToUpdate}
        ville={ville}
        natureBien={natureBien}
        width={width}
      />

      {/* Modélisation fiscale */}
      <Modelisation />

      {/* information windows */}
      {displayInfoModal ? (
        <InfoModal
          idContent={idContent}
          setDisplayInfoModal={setDisplayInfoModal}
        />
      ) : (
        ""
      )}

      {width < 770 ? (
        <MobileTitle
          mobileDisplayTab={mobileDisplayTab}
          scrollTop={scrollTop}
        />
      ) : (
        ""
      )}

      {width <= 1155 ? <MobileNavButton /> : ""}

      {width <= 1155 ? (
        <MobileNav
          setMobileDisplayTab={setMobileDisplayTab}
          setDisplayInfoModal={setDisplayInfoModal}
          scrollTo={scrollTo}
          netVendeurCheck={netVendeurCheck}
          apportCheck={apportCheck}
          loyerCheck={loyerCheck}
          chargesCheck={chargesCheck}
          foyerCheck={foyerCheck}
          regimeCheck={regimeCheck}
          width={width}
        />
      ) : (
        ""
      )}

      {width <= 1155 && !landingModal ? (
        <ButtonModelMobile
          formCheck={formCheck}
          onSave={onSave}
          onFisc={onFisc}
        />
      ) : (
        ""
      )}

      {/* main page */}
      <div className='form-container'>
        {width <= 950 ? (
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
            width={width}
            rendementBrut={rendementBrut}
            netOperatingIncome={netOperatingIncome}
            cashFlowAnnuel={cashFlowAnnuel}
          />
        )}

        {width < 770 && kpiMobile ? (
          <IndicateursMobile
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

        <div
          style={{
            margin: width < 770 ? "0" : "0 15px",
            width: width < 770 ? "100%" : "",
          }}
        >
          {width >= 770 || (width <= 770 && mobileDisplayTab === 0) ? (
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
          {width >= 770 || (width <= 770 && mobileDisplayTab === 1) ? (
            <Financement
              onChange={onChange}
              showModal={showModal}
              sepSpace={sepSpace}
              setMobileDisplayTab={setMobileDisplayTab}
              onChangeDecimals={onChangeDecimals}
              focusMethod={focusMethod}
              netVendeur={netVendeur}
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

          {width >= 770 || (width <= 770 && mobileDisplayTab === 2) ? (
            <Revenu
              onChange={onChange}
              showModal={showModal}
              sepSpace={sepSpace}
              setMobileDisplayTab={setMobileDisplayTab}
              focusMethod={focusMethod}
              onChangeDecimals={onChangeDecimals}
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

          {width >= 770 || (width <= 770 && mobileDisplayTab === 3) ? (
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
              chargesLoc={chargesLoc}
              pno={pno}
              width={width}
              formCheck={formCheck}
            />
          ) : (
            ""
          )}

          {width >= 770 ? (
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
          ) : width <= 770 && mobileDisplayTab === 4 ? (
            <FoyerMobile
              onChange={onChange}
              onChangeRegime={onChangeRegime}
              showModal={showModal}
              sepSpace={sepSpace}
              setMobileDisplayTab={setMobileDisplayTab}
              onChangeDecimals={onChangeDecimals}
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

          {width >= 770 || (width <= 770 && mobileDisplayTab === 5) ? (
            <Regime
              onChange={onChange}
              onChangeRegime={onChangeRegime}
              showModal={showModal}
              setMobileDisplayTab={setMobileDisplayTab}
              onChangeDecimals={onChangeDecimals}
              focusMethod={focusMethod}
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

        {width <= 1155 ? (
          ""
        ) : (
          <SideNav
            showModal={showModal}
            scrollTo={scrollTo}
            onSave={onSave}
            onFisc={onFisc}
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
      {width >= 1155 ? (
        <Footer
          onSubmitEmail={onSubmitEmail}
          onChangeEmailFooter={onChangeEmailFooter}
          clickFooter={clickFooter}
          eFooter={eFooter}
        />
      ) : (
        ""
      )}
    </Fragment>
  );
};

MainForm.propTypes = {
  storeParams: PropTypes.func.isRequired,
  postInputForm: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired,
  login: PropTypes.func.isRequired,
  postEmail: PropTypes.func.isRequired,
  authToggle: PropTypes.func.isRequired,
  saveModalClic: PropTypes.func.isRequired,
  saveModalToggle: PropTypes.func.isRequired,
  modelModalClic: PropTypes.func.isRequired,
  modelModalToggle: PropTypes.func.isRequired,
  landingToggle: PropTypes.func.isRequired,
  accountModalToggle: PropTypes.func.isRequired,
  setAlert: PropTypes.func.isRequired,
  detectSave: PropTypes.bool.isRequired,
  detectModel: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  userInfo: state.auth.user,
  detectSave: state.modals.detectSave,
  detectModel: state.modals.detectModel,
  kpiMobile: state.modals.kpiMobile,
  landingModal: state.modals.landingModal,
  projects: state.modelData.projects,
});

export default connect(mapStateToProps, {
  storeParams,
  postInputForm,
  postEmail,
  register,
  login,
  authToggle,
  saveModalClic,
  saveModalToggle,
  modelModalClic,
  modelModalToggle,
  mobileMenuToggle,
  landingToggle,
  deleteProject,
  setAlert,
  accountModalToggle,
})(MainForm);
