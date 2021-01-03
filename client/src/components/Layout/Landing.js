// components
import React from "react";
// import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

// actions
import { landingToggle } from "../../actions/modals";

// icons
import title from "../../img/rocket.svg";
import simple from "../../img/add.svg";
import teach from "../../img/open-book.svg";
import analytics from "../../img/analytics.svg";
import save from "../../img/floppy-disk.svg";
import devices from "../../img/devices.png";

const Landing = ({ landingModal, landingToggle, width }) => {
  return (
    <section className={landingModal ? "landing-page" : "auth-modal-none"}>
      <div className='background'>
        <div className='landing-line'></div>
        <div className='landing-header'>
          {width > 770 ? (
            <h3>
              L’outil qui calcule la rentabilité après impôts de votre
              investissement locatif
              <img src={title} alt='x' />
            </h3>
          ) : (
            <h3>
              L’outil pour calculer la rentabilité après impôts de votre
              investissement locatif
              <img src={title} alt='x' />
            </h3>
          )}
        </div>
        <div className='landing-page-body'>
          <div className='landing-benefits'>
            <div className='landing-benefits-group'>
              <div className='landing-benefits-box'>
                <img src={simple} alt='x' />
                <p>
                  Saisir en toute simplicité les paramètres décrivant votre
                  projet
                </p>
              </div>
              <div className='landing-benefits-box'>
                <img src={teach} alt='x' />
                <p>
                  Consulter du contenu pédagogique tout au long de la saisie
                </p>
              </div>
            </div>
            <div className='landing-benefits-group'>
              <div className='landing-benefits-box'>
                <img src={analytics} alt='x' />
                <p>
                  Obtenir la rentabilité après impôts selon différents régimes
                  fiscaux
                </p>
              </div>
              <div className='landing-benefits-box'>
                <img src={save} alt='x' />
                <p>
                  Enregistrer les différents projets étudiés dans votre compte
                  client
                </p>
              </div>
            </div>
            <button onClick={() => landingToggle(false)}>Commencer</button>
          </div>
          <div className='landing-devices'>
            <img src={devices} alt='x' />
          </div>
        </div>
      </div>
    </section>
  );
};

Landing.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  landingModal: PropTypes.bool.isRequired,
  landingToggle: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  landingModal: state.modals.landingModal,
});

export default connect(mapStateToProps, { landingToggle })(Landing);
