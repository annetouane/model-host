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
  width,
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
      <div className='side-column-box' style={{ padding: width > 1125 ? "20px" : "10px" }}>
        <div className='kpi-item'>
          <div className='info-button'>
            <h4>Coût du projet</h4>
            <button 
              id='info-projet' 
              onClick={showModal}
              className='question-mark'
            >?</button>            
          </div>
          <h4 className='bold color-blue'>
            {netVendeurCheck ? sepSpace(coutProjet).toString() + " €" : "-"}
          </h4>
        </div>
        <div className='kpi-item'>
          <div className='info-button'>
            <h4>Emprunt</h4>
            <button 
              id='info-emprunt' 
              onClick={showModal}
              className='question-mark'
            >?</button>        
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
            <button 
              id='info-mensualite' 
              onClick={showModal}
              className='question-mark'
            >?</button>        
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
            <button 
              id='info-revenu' 
              onClick={showModal}
              className='question-mark'
            >?</button>        
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
            <button 
              id='info-rentabrute' 
              onClick={showModal}
              className='question-mark'
            >?</button>        
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
            <button 
              id='info-noi' 
              onClick={showModal}
              className='question-mark'
            >?</button>        
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
            <button 
              id='info-treso-av-impot'
              onClick={showModal}
              className='question-mark'
            >?</button>                    
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
