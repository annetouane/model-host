import React from "react";

const IndicateursMobile = ({
  showModal,
  sepSpace,
  setClick,
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
  formCheck,
}) => {
  return (
    <section id='indicateurs' className='indicateurs-mobile'>
      <div style={{display: "flex", justifyContent: "space-between"}}>
        <h3>
          <i className='fas fa-temperature-high header-i'></i>
          &nbsp;&nbsp;Indicateurs
        </h3>
        <div onClick={() => setClick(false)}>
          <i className='fa fa-arrow-right fa-2x indicateurs-mobile-button'></i>
        </div>
      </div>
      <div className='flex-column mb-10'>
        <div className='info-button'>
          <h4>Coût du projet</h4>
          <i
            id='info-projet'
            onClick={showModal}
            class='fas fa-question-circle fa-lg'
          ></i>
        </div>
        <h4 className='bold color-blue'>
          {netVendeurCheck ? sepSpace(coutProjet).toString() + " €" : "-"}
        </h4>
      </div>
      <div className='flex-column mb-10'>
        <div className='info-button'>
          <h4>Emprunt</h4>
          <i
            id='info-emprunt'
            onClick={showModal}
            class='fas fa-question-circle fa-lg'
          ></i>
        </div>{" "}
        <h4 className='bold color-blue'>
          {netVendeurCheck && apportCheck
            ? sepSpace(emprunt).toString() + " €"
            : "-"}
        </h4>
      </div>
      <div className='flex-column mb-10'>
        <div className='info-button'>
          <h4>Mensualité</h4>
          <i
            id='info-mensualite'
            onClick={showModal}
            class='fas fa-question-circle fa-lg'
          ></i>
        </div>{" "}
        <h4 className='bold color-blue'>
          {netVendeurCheck && apportCheck
            ? sepSpace(mensualite).toString() + " €"
            : "-"}
        </h4>
      </div>
      <div className='flex-column mb-10'>
        <div className='info-button'>
          <h4>Revenu annuel</h4>
          <i
            id='info-revenu'
            onClick={showModal}
            class='fas fa-question-circle fa-lg'
          ></i>
        </div>{" "}
        <h4 className='bold color-blue'>
          {netVendeurCheck && apportCheck && loyerCheck
            ? sepSpace(revAnnuel).toString() + " €"
            : "-"}
        </h4>
      </div>
      <div className='flex-column mb-10'>
        <div className='info-button'>
          <h4>Rendement annuel brut</h4>
          <i
            id='info-rentabrute'
            onClick={showModal}
            class='fas fa-question-circle fa-lg'
          ></i>
        </div>{" "}
        <h4 className='bold color-blue'>
          {netVendeurCheck && apportCheck && loyerCheck
            ? rendementBrut.toString() + " %"
            : "-"}
        </h4>
      </div>
      <div className='flex-column mb-10'>
        <div className='info-button'>
          <h4>Résultat opérationnel</h4>
          <i
            id='info-noi'
            onClick={showModal}
            class='fas fa-question-circle fa-lg'
          ></i>
        </div>{" "}
        <h4 className='bold color-blue'>
          {netVendeurCheck && apportCheck && loyerCheck && chargesCheck
            ? sepSpace(netOperatingIncome).toString() + " €"
            : "-"}
        </h4>
      </div>
      <div className='flex-column mb-10' style={{ marginBottom: formCheck ? "60px" : "0" }}>
        <div className='info-button'>
          <h4>Trésorerie avant impôt</h4>
          <i
            id='info-treso-av-impot'
            onClick={showModal}
            class='fas fa-question-circle fa-lg'
          ></i>
        </div>{" "}
        <h4 className='bold color-blue'>
          {netVendeurCheck && apportCheck && loyerCheck && chargesCheck
            ? sepSpace(cashFlowAnnuel).toString() + " €"
            : "-"}
        </h4>
      </div>
    </section>
  );
};
export default IndicateursMobile;
