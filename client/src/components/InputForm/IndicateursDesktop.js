import React from "react";

const Indicateurs = ({
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
    <section id='indicateurs' className='side-column ml-20 mr-20 mt-50'>
      <h3>
        <i className='fas fa-temperature-high header-i'></i>
        &nbsp;&nbsp;Indicateurs
      </h3>
      <div className='side-column-box jc-fc mt-10 pdg-20'>
        <div className='flex-column mb-10'>
          <h4>
            {/* <i className='fas fa-landmark fa-xs kpi-i'></i>&nbsp; */}
            Coût du projet :
          </h4>
          <h4 className='bold color-blue'>
            {parseInt(netVendeur) === 0
              ? "-"
              : sepSpace(coutProjet).toString() + " €"}
          </h4>
        </div>
        <div className='flex-column mb-10'>
          <h4>
            {/* <i className='fas fa-landmark fa-xs kpi-i'></i>&nbsp; */}
            Emprunt :
          </h4>
          <h4 className='bold color-blue'>
            {parseInt(netVendeur) === 0 || apport === ""
              ? "-"
              : sepSpace(emprunt).toString() + " €"}
          </h4>
        </div>
        <div className='flex-column mb-10'>
          <h4>
            {/* <i className='fas fa-landmark fa-xs kpi-i'></i>&nbsp; */}
            Mensualité :
          </h4>
          <h4 className='bold color-blue'>
            {parseInt(netVendeur) === 0 || apport === ""
              ? "-"
              : sepSpace(mensualite).toString() + " €"}
          </h4>
        </div>
        <div className='flex-column mb-10'>
          <h4>
            {/* <i className='fas fa-landmark fa-xs kpi-i'></i>&nbsp; */}
            Revenu annuel :
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
            {/* <i className='fas fa-landmark fa-xs kpi-i'></i>&nbsp; */}
            Rendement brut :
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
            {/* <i className='fas fa-landmark fa-xs kpi-i'></i>&nbsp; */}
            Rendement net :
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
    </section>
  );
};
export default Indicateurs;
