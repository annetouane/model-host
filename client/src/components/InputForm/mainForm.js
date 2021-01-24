// packages
import React, { useState, useEffect, Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Finance from "financejs";
import { withRouter } from "react-router";
import jwt from "jwt-decode";

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
import AlerteStrip from "../Layout/AlerteStrip";
// import Spinner from "../Layout/Spinner";

// actions
import {
  storeParams,
  getModelData,
  createProject,
  updateProject,
  postEmail,
  deleteProject,
  removeUserParams,
} from "../../actions/formData";
import {
  registerCheck,
  register,
  login,
  loadUser,
  authError,
} from "../../actions/auth";
import {
  authToggle,
  saveModalClic,
  saveModalToggle,
  modelModalClic,
  modelModalToggle,
  mobileMenuToggle,
  landingToggle,
  accountModalToggle,
  passwordChangePage,
} from "../../actions/modals";
import { setAlert, setAlertStrip } from "../../actions/alert";

export const MainForm = ({
  storeParams,
  removeUserParams,
  authError,
  passwordChangePage, // a voir
  getModelData,
  createProject,
  updateProject,
  postEmail,
  isAuthenticated,
  register,
  login,
  authToggle,
  saveModalClic,
  saveModalToggle,
  modelModalClic,
  detectSave,
  detectModel,
  kpiMobile,
  landingModal,
  mobileMenuToggle,
  landingToggle,
  deleteProject,
  setAlert,
  projects,
  accountModalToggle,
  saveModal,
  accountModal,
  currentModel,
  loadUser,
  history,
  registerCheck,
  setAlertStrip,
  // loading,
}) => {
  const [dimensions, setDimensions] = useState({
    width: window.innerWidth,
  });
  const { width } = dimensions;

  // pagination mobile
  const [mobileDisplayTab, setMobileDisplayTab] = useState(0);

  // pagination project
  const [projectDisplayTab, setProjectDisplayTab] = useState(0);

  // // init form state
  // const [formData, setFormData] = useState({
  //   idProjet: "",
  //   user: "",
  //   nomProjet: "",
  //   ville: "",
  //   natureBien: "",
  //   typeAppartement: "",
  //   netVendeur: 300000,
  //   travaux: 50000,
  //   ammeublement: 5000,
  //   notaire: 0.075,
  //   agence: 20000,
  //   duree: 25,
  //   apport: 30000,
  //   interet: 1.5,
  //   assurance: 0.2,
  //   fraisBancaires: 3000,
  //   fraisCourtier: 3000,
  //   loyer: 2000,
  //   chargesLoc: 2100,
  //   occupation: 11,
  //   fonciere: 2130,
  //   gestion: 1830,
  //   charges: 2200,
  //   pno: 500,
  //   revInvest1: 30000,
  //   augInvest1: 0.04,
  //   revInvest2: 30000,
  //   augInvest2: 0.08,
  //   partFisc: 2.5,
  //   sciIs: true,
  //   lmnpReel: false,
  //   lmnpMicro: false,
  //   nueReel: false,
  //   nueMicro: false,
  //   irl: 1.5,
  // });

  // init form state
  const [formData, setFormData] = useState({
    idProjet: "",
    user: "",
    nomProjet: "",
    ville: "",
    natureBien: "",
    typeAppartement: "",
    netVendeur: 0,
    travaux: 0,
    ammeublement: 0,
    notaire: 0.075,
    agence: 0,
    duree: 20,
    apport: "",
    interet: 0,
    assurance: 0,
    fraisBancaires: 0,
    fraisCourtier: 0,
    loyer: 0,
    chargesLoc: 0,
    occupation: 0,
    fonciere: 0,
    gestion: 0,
    charges: 0,
    pno: 0,
    revInvest1: 0,
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
    nomProjet,
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
    irl,
    sciIs,
    lmnpReel,
    lmnpMicro,
    nueReel,
    nueMicro,
  } = formData;

  // main state onChange functions ---------------------------------------------------------------------------------
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

  const onChangeString = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // get id and project name du composant dans la fenetre accountModal
  const getProjectToUpdate = (id, projectName) => {
    setFormData({ ...formData, idProjet: id, nomProjet: projectName });
  };

  // une fois un projet sauvegardé / effacé / mis à jour
  const cleanSaveForm = () => {
    setFormData({
      ...formData,
      idProjet: "",
      nomProjet: "",
      ville: "",
      natureBien: "",
      typeAppartement: "",
    });
  };

  // modal user email
  const [emailFooter, setEmailFooter] = useState({ eFooter: "" });
  const { eFooter } = emailFooter;

  const onChangeEmailFooter = (e) => {
    setEmailFooter({ eFooter: e.target.value });
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
    // inform the reducer about the current page
    const url = history.location.pathname;
    if (
      !url.includes("change-pwd") ||
      !url.includes("forgotten-pwd") ||
      !url.includes("404")
    ) {
      passwordChangePage(false);
    }
  }, [history, passwordChangePage]);

  // open alert window
  const alertUser = (e) => {
    e.preventDefault();
    e.returnValue = "";
  };

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

    // window.addEventListener("beforeunload", alertUser);

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
      // window.removeEventListener("beforeunload", alertUser);
    };
  });

  // focus on the field when clicking edit
  const focusMethod = function getFocus(id) {
    document.getElementById(id).focus();
  };

  // saving form *******************************************************************************

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

  // si pas de token lorsque clic sur bouton d'action
  // -> alert + remove user information from reducer + auth modal
  const noTokenFound = () => {
    setAlertStrip(
      "Merci de vous identifier de nouveau pour effectuer cette opération",
      "red",
      "red",
      3000
    );
    authToggle(true);
    removeUserParams();
    authError();
  };

  const onCreateProject = (e) => {
    e.preventDefault();
    resetAuthState();
    let token = localStorage.getItem("token");
    // si absence de token
    if (!token) {
      saveModalToggle(false);
      noTokenFound();
    } else {
      createProject(formData); // post input to db
      cleanSaveForm(); // reset les champs du formulaire de sauvegarde
    }
  };

  const onUpdateProject = (e) => {
    e.preventDefault();
    resetAuthState();
    let token = localStorage.getItem("token");
    // si absence de token dans local storage
    if (!token) {
      saveModalToggle(false);
      noTokenFound();
    } else {
      updateProject(formData); // post input to db
      cleanSaveForm(); // reset les champs du formulaire de sauvegarde
    }
  };

  const onDeleteProject = (e) => {
    e.preventDefault();
    resetAuthState();
    let token = localStorage.getItem("token");
    // si absence de token dans local storage
    if (!token) {
      accountModalToggle(false); // ferme mon compte
      noTokenFound();
      // si un projet a été sélectionné dans le formulaire
    } else if (idProjet !== "") {
      deleteProject(idProjet); // passe l'id du projet a supprimer
      cleanSaveForm(); // reset les champs du formulaire de sauvegarde
    } else {
      // si aucun projet sélectionné dans le formulaire
      setAlert("Merci de sélectionner un projet à supprimer", "orange", 3000);
    }
  };

  // modélisation fiscale *******************************************************************************
  const onFisc = (e) => {
    e.preventDefault();
    resetAuthState();
    mobileMenuToggle(false); // si mobile, ferme le menu de navigation
    let token = localStorage.getItem("token");
    // si absence de token dans local storage
    if (!token) {
      modelModalToggle(false);
      authToggle(true);
      // si authentifié
    } else if (isAuthenticated) {
      getModelData(formData); // submit input to db
      modelModalClic(true); // detect clic sur model
      modelModalToggle(true); // ouvre modal model
    } else {
      authToggle(true); // sinon ouvre auth modal
    }
  };

  // sign up *******************************************************************************
  const [signUp, setSignUp] = useState({
    emailSignUp: "",
    mobileSignUp: "",
    passwordSignUp: "",
    confirmPassword: "",
    condition: false,
    codeSms: "",
  });
  const {
    emailSignUp,
    mobileSignUp,
    passwordSignUp,
    confirmPassword,
    condition,
    codeSms,
  } = signUp;

  const onChangeSignUp = (e) => {
    setSignUp({ ...signUp, [e.target.name]: e.target.value });
  };
  const onChangeConditionSignUp = (e) => {
    setSignUp({ ...signUp, [e.target.name]: e.target.checked });
  };

  // check if account can be created according to provided credentials
  const onCheckAccountCreation = (e) => {
    e.preventDefault();
    if (!/^\d+$/.test(mobileSignUp)) {
      setAlert("Merci de saisir uniquement des chiffres", "red", 3000);
    } else if (
      !mobileSignUp.startsWith("06") &&
      !mobileSignUp.startsWith("07")
    ) {
      setAlert(
        "Merci d'indiquer un numéro de mobile (06/07xxxxxxxx)",
        "red",
        3000
      );
    } else if (mobileSignUp.length !== 10) {
      setAlert("Merci d'indiquer un mobile sur 10 chiffres", "red", 3000);
    } else {
      registerCheck(signUp);
    }
  };

  // create account if SMS code is validated
  const onSignUp = (e) => {
    e.preventDefault();
    register(signUp, formData);
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
  const resetAuthState = () => {
    setSignUp({
      emailSignUp: "",
      mobileSignUp: "",
      passwordSignUp: "",
      confirmPassword: "",
      condition: false,
    });
    setSignIn({
      emailSignIn: "",
      passwordSignIn: "",
    });
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
    resetAuthState();
    let token = localStorage.getItem("token");
    // si absence de token dans local storage
    if (!token) {
      accountModalToggle(false); // ferme mon compte window
      noTokenFound();
    } else {
      let token = localStorage.getItem("token");
      const { exp } = jwt(token);
      // Refresh the token a minute early to avoid latency issues
      const expirationTime = exp * 1000 - 60000;
      // si token expiré
      if (Date.now() >= expirationTime) {
        loadUser(); // efface les paramètres auth et model data
        setAlertStrip(
          "Merci de vous identifier de nouveau pour effectuer cette opération",
          "red",
          "red",
          3000
        );
        accountModalToggle(false); // ferme fenetre mon compte
        authToggle(true); // ouvre modal auth
      } else {
        // §§§§§§§§§§§\\\\\\\\\\!!!!!!!!!/////////////§§§§§§§§§§§§
        // PARTIE A SECURISEE SI ALTERATION TOKEN
        // ENVOYER ID PROJET AU SERVEUR, AUTH TOKEN, RENVOI PROJET
        if (nomProjet === "") {
          setAlert(
            "Merci de sélectionner un projet à visualiser",
            "orange",
            3000
          );
          // sinon, update le local state avec le reducer
        } else {
          loadUser(); // efface les paramètres auth et model data
          const project = projects.find((x) => x._id === idProjet);
          setFormData({
            ...formData,
            idProjet: "",
            nomProjet: "",
            ville: "",
            natureBien: "",
            typeAppartement: "",
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
          storeParams(project); // store params to the reducer
        }
      }
    }
  };

  return (
    <Fragment>
      {/* {loading ? <Spinner /> : ""} */}
      {/* landing window */}
      <Landing width={width} />

      {/* bandeau alert */}
      <AlerteStrip />

      {/* authentication window */}
      <AuthModalComplete
        onChangeSignUp={onChangeSignUp}
        onChangeConditionSignUp={onChangeConditionSignUp}
        onChangeSignIn={onChangeSignIn}
        onCheckAccountCreation={onCheckAccountCreation}
        onSignUp={onSignUp}
        onSignIn={onSignIn}
        setSignUp={setSignUp}
        setSignIn={setSignIn}
        emailSignUp={emailSignUp}
        mobileSignUp={mobileSignUp}
        passwordSignUp={passwordSignUp}
        confirmPassword={confirmPassword}
        condition={condition}
        codeSms={codeSms}
        emailSignIn={emailSignIn}
        passwordSignIn={passwordSignIn}
        width={width}
      />

      {/* account window */}
      {accountModal ? (
        <AccountModal
          projectDisplayTab={projectDisplayTab}
          setProjectDisplayTab={setProjectDisplayTab}
          getProjectToUpdate={getProjectToUpdate}
          onDeleteProject={onDeleteProject}
          noTokenFound={noTokenFound}
          onVisualise={onVisualise}
          setSignUp={setSignUp}
          setSignIn={setSignIn}
        />
      ) : (
        ""
      )}

      {/* save window */}
      {saveModal ? (
        <SaveModal
          onChangeString={onChangeString}
          onCreateProject={onCreateProject}
          onUpdateProject={onUpdateProject}
          getProjectToUpdate={getProjectToUpdate}
          cleanSaveForm={cleanSaveForm}
          nomProjet={nomProjet}
          natureBien={natureBien}
          typeAppartement={typeAppartement}
          width={width}
        />
      ) : (
        ""
      )}

      {/* Modélisation fiscale */}
      {currentModel.length > 0 ? (
        <Modelisation
          sepSpace={sepSpace}
          sciIs={sciIs}
          lmnpReel={lmnpReel}
          lmnpMicro={lmnpMicro}
          nueReel={nueReel}
          nueMicro={nueMicro}
          duree={duree}
        />
      ) : (
        ""
      )}

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
          netVendeur={netVendeur}
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
  authError: PropTypes.func.isRequired,
  setAlertStrip: PropTypes.func.isRequired,
  removeUserParams: PropTypes.func.isRequired,
  getModelData: PropTypes.func.isRequired,
  loadUser: PropTypes.func.isRequired,
  createProject: PropTypes.func.isRequired,
  updateProject: PropTypes.func.isRequired,
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
  registerCheck: PropTypes.func.isRequired,
  setAlert: PropTypes.func.isRequired,
  detectSave: PropTypes.bool.isRequired,
  detectModel: PropTypes.bool.isRequired,
  saveModal: PropTypes.bool.isRequired,
  accountModal: PropTypes.bool.isRequired,
  currentModel: PropTypes.array,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  // loading: state.auth.loading,
  detectSave: state.modals.detectSave,
  detectModel: state.modals.detectModel,
  kpiMobile: state.modals.kpiMobile,
  landingModal: state.modals.landingModal,
  saveModal: state.modals.saveModal,
  accountModal: state.modals.accountModal,
  projects: state.modelData.projects,
  currentModel: state.modelData.currentModel,
});

export default withRouter(
  connect(mapStateToProps, {
    passwordChangePage,
    storeParams,
    getModelData,
    createProject,
    updateProject,
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
    loadUser,
    removeUserParams,
    registerCheck,
    setAlertStrip,
    authError,
  })(MainForm)
);
