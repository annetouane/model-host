// components
import React from "react";
// import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { landingToggle } from "../../actions/auth"

// icons
import title from "../../img/rocket.svg"
import simple from "../../img/add.svg"
import teach from "../../img/open-book.svg"
import analytics from "../../img/analytics.svg"
import save from "../../img/floppy-disk.svg"
import devices from "../../img/devices.png"
import desktop from "../../img/desktop.PNG"
import mobile from "../../img/mobile.PNG"
import tablet from "../../img/tablet.PNG"

const Landing = ({ landingModal, landingToggle }) => {

  return (
    <section className={landingModal ? "background landing-page" : 'auth-modal-none'}>
      {/* <AuthModalLanding/> */}
      <div className="landing-line"></div>
      <div className="landing-header">
        <h3>L’outil pour calculer la rentabilité après impôts de votre investissement locatif</h3>
        <img src={title} alt='x' />
      </div>
      <div className="landing-page-body">
        <div className="landing-benefits">
            <div className="landing-benefits-group">
              <div className="landing-benefits-box">
                <img src={simple} alt='x' />
                <p>Saisir en toute simplicité les paramètres décrivant mon projet</p>
              </div>
              <div className="landing-benefits-box">
                <img src={teach} alt='x' />
                <p>Consulter du contenu pédagogique tout au long de la saisie</p>
              </div>
            </div>
            <div className="landing-benefits-group">
              <div className="landing-benefits-box">
                <img src={analytics} alt='x' />
                <p>Obtenir la rentabilité après impôts selon différents régimes fiscaux</p>
              </div>
              <div className="landing-benefits-box">
                <img style={{ width: "50px" }} src={save} alt='x' />
                <p>Enregistrer les différents projets étudiés dans votre compte client</p>
              </div>
            </div>
          <button onClick={() => landingToggle(false)}>Commencer</button>
        </div>
        <div className="landing-devices">
          <img className='landing-devices-desktop' src={desktop} alt='x' />
            <img className='landing-devices-tablet' src={tablet} alt='x' />
            <img className='landing-devices-mobile' src={mobile} alt='x' />
        </div>
      </div>
    </section>
  );
};

Landing.propTypes = {
  isAuthenticated: PropTypes.bool,
  landingModal: PropTypes.bool,
  landingToggle: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  landingModal: state.auth.landingModal,
});

export default connect(mapStateToProps, { landingToggle })(Landing);
