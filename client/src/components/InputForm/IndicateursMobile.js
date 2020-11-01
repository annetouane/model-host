import React from "react";

const IndicateursMobile = ({
  sepSpace,
  netVendeurCheck,
  apportCheck,
  loyerCheck,
  chargesCheck,
  coutProjet,
  emprunt,
  mensualite,
  revAnnuel,
  rendementBrut,
  rendementNet,
  cashFlowAnnuel,
}) => {
  return (
    <section id='indicateurs' className='indicateurs-mobile'>
      <h3>
        <i className='fas fa-temperature-high header-i'></i>
        &nbsp;&nbsp;Indicateurs
      </h3>
      <div className='flex-column mb-10'>
        <h4>Coût du projet :</h4>
        <h4 className='bold color-blue'>
          {netVendeurCheck ? sepSpace(coutProjet).toString() + " €" : "-"}
        </h4>
      </div>
      <div className='flex-column mb-10'>
        <h4>Emprunt :</h4>
        <h4 className='bold color-blue'>
          {netVendeurCheck && apportCheck
            ? sepSpace(emprunt).toString() + " €"
            : "-"}
        </h4>
      </div>
      <div className='flex-column mb-10'>
        <h4>Mensualité :</h4>
        <h4 className='bold color-blue'>
          {netVendeurCheck && apportCheck
            ? sepSpace(mensualite).toString() + " €"
            : "-"}
        </h4>
      </div>
      <div className='flex-column mb-10'>
        <h4>Revenu annuel :</h4>
        <h4 className='bold color-blue'>
          {netVendeurCheck && apportCheck && loyerCheck
            ? sepSpace(revAnnuel).toString() + " €"
            : "-"}
        </h4>
      </div>
      <div className='flex-column mb-10'>
        <h4>Rendement annuel brut :</h4>
        <h4 className='bold color-blue'>
          {netVendeurCheck && apportCheck && loyerCheck
            ? rendementBrut.toString() + " %"
            : "-"}
        </h4>
      </div>
      <div className='flex-column mb-10'>
        <h4>Rendement annuel net :</h4>
        <h4 className='bold color-blue'>
          {netVendeurCheck && apportCheck && loyerCheck && chargesCheck
            ? rendementNet.toString() + " %"
            : "-"}
        </h4>
      </div>
      <div className='flex-column mb-10'>
        <h4>Cash-flow avant impôt :</h4>
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
