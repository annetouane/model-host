import React from "react";

const IndicateursMobile = ({
  setClick,
  sepSpace,
  netVendeur,
  apport,
  loyer,
  coutProjet,
  emprunt,
  mensualite,
  revAnnuel,
  rendementBrut,
  rendementNet,
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
          {parseInt(netVendeur) === 0
            ? "-"
            : sepSpace(coutProjet).toString() + " €"}
        </h4>
      </div>
      <div className='flex-column mb-10'>
        <h4>Emprunt :</h4>
        <h4 className='bold color-blue'>
          {parseInt(netVendeur) === 0 || apport === ""
            ? "-"
            : sepSpace(emprunt).toString() + " €"}
        </h4>
      </div>
      <div className='flex-column mb-10'>
        <h4>Mensualité :</h4>
        <h4 className='bold color-blue'>
          {parseInt(netVendeur) === 0 || apport === ""
            ? "-"
            : sepSpace(mensualite).toString() + " €"}
        </h4>
      </div>
      <div className='flex-column mb-10'>
        <h4>Revenu annuel :</h4>
        <h4 className='bold color-blue'>
          {parseInt(netVendeur) === 0 || apport === "" || parseInt(loyer) === 0
            ? "-"
            : sepSpace(revAnnuel).toString() + " €"}
        </h4>
      </div>
      <div className='flex-column mb-10'>
        <h4>Rendement brut :</h4>
        <h4 className='bold color-blue'>
          {parseInt(netVendeur) === 0 || apport === "" || parseInt(loyer) === 0
            ? "-"
            : rendementBrut.toString() + " %"}
        </h4>
      </div>
      <div className='flex-column mb-10'>
        <h4>Rendement net :</h4>
        <h4 className='bold color-blue'>
          {parseInt(netVendeur) === 0 || apport === "" || parseInt(loyer) === 0
            ? //   parseInt(charges) !== 0 ||
              // parseInt(gestion) !== 0 ||
              // parseInt(fonciere) !== 0 ||
              // parseInt(pno) !== 0
              "-"
            : rendementNet.toString() + " %"}
        </h4>
      </div>
    </section>
  );
};
export default IndicateursMobile;
