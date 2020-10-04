// packages
import React, { useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

// components
import Projet from "./Projet";
import Financement from "./Financement";
import Revenu from "./Revenu";
import Charges from "./Charges";
import Regime from "./Regime";
import Foyer from "./Foyer";
import SideNav from "./SideNav";
import Finance from "financejs";

// actions
import { postInputForm } from "../../actions/formData";

export const InputKpi = ({ postInputForm }) => {
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
    partFisc: 1,
    sciIs: null,
    lmnpReel: null,
    lmnpMicro: null,
    lmpReel: null,
    lmpMicro: null,
    nueReel: null,
    nueMicro: null,
    irl: 0.01,
  });

  const onSubmit = async (e) => {
    e.preventDefault();
    if (formData) {
      postInputForm(formData);
    } else {
      console.log("error");
      // setAlert("Start time can't be superieur to end time", "red");
    }
  };

  const finance = new Finance();

  const kpiData = (name, value) => {
    setFormData({ ...formData, [name]: value });
  };

  const sepSpace = (value) => {
    return Math.round(value)
      .toString()
      .replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  };

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
    occupation,
    fonciere,
    gestion,
    charges,
    pno,
    revInvest1,
  } = formData;

  const coutProjet =
    parseInt(netVendeur) +
    parseInt(travaux) +
    parseInt(ammeublement) +
    parseInt(netVendeur) * notaire +
    parseInt(netVendeur) * agence;
  const emprunt = parseInt(coutProjet) - parseInt(apport);

  const mensualite =
    finance.AM(parseInt(emprunt), interet, parseInt(duree) * 12, 1) +
    parseInt(emprunt) * assurance;

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

  return (
    <div>
      <div className='flex-row'>
        <div className='side-column mr-20 mt-50'>
          <h3>
            <i className='fas fa-temperature-high header-i'></i>
            &nbsp;&nbsp;Indicateurs
          </h3>
          <div className='side-column-box jc-fc mt-10 pdg-20'>
            <div className='flex-column mb-10'>
              <h4>
                <i className='fas fa-landmark fa-xs kpi-i'></i>&nbsp;Coût du
                projet :
              </h4>
              <h4 className='bold color-blue'>
                {parseInt(netVendeur) === 0
                  ? "-"
                  : sepSpace(coutProjet).toString() + " €"}
              </h4>
            </div>
            <div className='flex-column mb-10'>
              <h4>
                <i className='fas fa-landmark fa-xs kpi-i'></i>&nbsp;Emprunt :
              </h4>
              <h4 className='bold color-blue'>
                {parseInt(netVendeur) === 0 || apport === ""
                  ? "-"
                  : sepSpace(emprunt).toString() + " €"}
              </h4>
            </div>
            <div className='flex-column mb-10'>
              <h4>
                <i className='fas fa-landmark fa-xs kpi-i'></i>&nbsp;Mensualité
                :
              </h4>
              <h4 className='bold color-blue'>
                {parseInt(netVendeur) === 0 || apport === ""
                  ? "-"
                  : sepSpace(mensualite).toString() + " €"}
              </h4>
            </div>
            <div className='flex-column mb-10'>
              <h4>
                <i className='fas fa-landmark fa-xs kpi-i'></i>&nbsp;Revenu
                annuel :
              </h4>
              <h4 className='bold color-blue'>
                {parseInt(netVendeur) === 0 ||
                apport === "" ||
                parseInt(loyer) === 0
                  ? "-"
                  : sepSpace(revAnnuel).toString() + " €"}
              </h4>
            </div>
            <div className='flex-column mb-10'>
              <h4>
                <i className='fas fa-landmark fa-xs kpi-i'></i>&nbsp;Rendement
                brut :
              </h4>
              <h4 className='bold color-blue'>
                {parseInt(netVendeur) === 0 ||
                apport === "" ||
                parseInt(loyer) === 0
                  ? "-"
                  : rendementBrut.toString() + " %"}
              </h4>
            </div>
            <div className='flex-column mb-10'>
              <h4>
                <i className='fas fa-landmark fa-xs kpi-i'></i>&nbsp;Rendement
                net :
              </h4>
              <h4 className='bold color-blue'>
                {parseInt(netVendeur) === 0 ||
                apport === "" ||
                parseInt(loyer) === 0
                  ? //   parseInt(charges) !== 0 ||
                    // parseInt(gestion) !== 0 ||
                    // parseInt(fonciere) !== 0 ||
                    // parseInt(pno) !== 0
                    "-"
                  : rendementNet.toString() + " %"}
              </h4>
            </div>
          </div>
          <button type='submit' onClick={onSubmit}>
            SUBMIT
          </button>
        </div>
        <div style={{ width: "100%" }}>
          <Projet kpiData={kpiData} />
          <div style={{ display: parseInt(netVendeur) === 0 && "none" }}>
            <Financement kpiData={kpiData} />
          </div>
          <div
            style={{
              display: (parseInt(netVendeur) === 0 || apport === "") && "none",
            }}
          >
            <Revenu kpiData={kpiData} />
          </div>
          <div
            style={{
              display:
                (parseInt(netVendeur) === 0 ||
                  apport === "" ||
                  parseInt(loyer) === 0) &&
                "none",
            }}
          >
            <Charges kpiData={kpiData} />
          </div>
          <div
            style={{
              display:
                (parseInt(netVendeur) === 0 ||
                  apport === "" ||
                  parseInt(loyer) === 0) &&
                "none",
            }}
          >
            <Foyer kpiData={kpiData} />
          </div>
          <div
            style={{
              display:
                (parseInt(netVendeur) === 0 ||
                  apport === "" ||
                  parseInt(loyer) === 0 ||
                  parseInt(revInvest1) === 0) &&
                "none",
            }}
          >
            <Regime kpiData={kpiData} />
          </div>
        </div>
        <SideNav />
      </div>
      <div
        className='footer'
        style={{ display: parseInt(netVendeur) === 0 && "none" }}
      ></div>
    </div>
  );
};

// declare/define the type of props
InputKpi.propTypes = {
  postInputForm: PropTypes.func.isRequired,
};

export default connect(null, { postInputForm })(InputKpi);
