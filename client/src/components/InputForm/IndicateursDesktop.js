import React from "react";

const Indicateurs = ({
  sepSpace,
  showModal,
  netVendeurCheck,
  apportCheck,
  loyerCheck,
  chargesCheck,
  coutProjet,
  emprunt,
  mensualite,
  revAnnuel,
  rendementBrut,
  netOperatingIncome,
  cashFlowAnnuel,
}) => {
  return (
    <section id='indicateurs' className='side-column ml-20 mt-50'>
      <h3>
        <i className='fas fa-temperature-high header-i'></i>
        &nbsp;&nbsp;Indicateurs
      </h3>
      <div className='side-column-box'>
        <div className='kpi-item'>
          <div className='info-button'>
            <h4>Coût du projet</h4>
            <i
              id='info-projet'
              onClick={showModal}
              className='fas fa-question-circle'
            ></i>
          </div>
          <h4 className='bold color-blue'>
            {netVendeurCheck ? sepSpace(coutProjet).toString() + " €" : "-"}
          </h4>
        </div>
        <div className='kpi-item'>
          <div className='info-button'>
            <h4>Emprunt</h4>
            <i
              id='info-emprunt'
              onClick={showModal}
              className='fas fa-question-circle'
            ></i>
          </div>
          <h4 className='bold color-blue'>
            {netVendeurCheck && apportCheck
              ? sepSpace(emprunt).toString() + " €"
              : "-"}
          </h4>
        </div>
        <div className='kpi-item'>
          <div className='info-button'>
            <h4>Mensualité</h4>
            <i
              id='info-mensualite'
              onClick={showModal}
              className='fas fa-question-circle'
            ></i>
          </div>{" "}
          <h4 className='bold color-blue'>
            {netVendeurCheck && apportCheck
              ? sepSpace(mensualite).toString() + " €"
              : "-"}
          </h4>
        </div>
        <div className='kpi-item'>
          <div className='info-button'>
            <h4>Revenu annuel</h4>
            <i
              id='info-revenu'
              onClick={showModal}
              className='fas fa-question-circle'
            ></i>
          </div>{" "}
          <h4 className='bold color-blue'>
            {netVendeurCheck && apportCheck && loyerCheck
              ? sepSpace(revAnnuel).toString() + " €"
              : "-"}
          </h4>
        </div>
        <div className='kpi-item'>
          <div className='info-button'>
            <h4>Rendement annuel brut</h4>
            <i
              id='info-rentabrute'
              onClick={showModal}
              className='fas fa-question-circle'
            ></i>
          </div>{" "}
          <h4 className='bold color-blue'>
            {netVendeurCheck && apportCheck && loyerCheck
              ? rendementBrut.toString() + " %"
              : "-"}
          </h4>
        </div>
        <div className='kpi-item'>
          <div className='info-button'>
            <h4>Résultat opérationnel</h4>
            <i
              id='info-noi'
              onClick={showModal}
              className='fas fa-question-circle'
            ></i>
          </div>{" "}
          <h4 className='bold color-blue'>
            {netVendeurCheck && apportCheck && loyerCheck && chargesCheck
              ? sepSpace(netOperatingIncome).toString() + " €"
              : "-"}
          </h4>
        </div>
        <div className='kpi-item'>
          <div className='info-button'>
            <h4>Trésorerie avant impôt</h4>
            <i
              id='info-treso-av-impot'
              onClick={showModal}
              className='fas fa-question-circle'
            ></i>
          </div>{" "}
          <h4 className='bold color-blue'>
            {netVendeurCheck && apportCheck && loyerCheck && chargesCheck
              ? sepSpace(cashFlowAnnuel).toString() + " €"
              : "-"}
          </h4>
        </div>
      </div>
    </section>
  );
};
export default Indicateurs;
