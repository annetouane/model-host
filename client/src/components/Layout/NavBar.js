import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import {
  mobileMenuToggle, // controle fenetre nav mobile - redux
  accountModalToggle, // controle fenetre mon compte - redux
  authToggle, // controle fenetre authentication - redux
  kpiMobileToggle, // controle fenetre indicateurs - redux
  modelModalToggle, // controle fenetre model - redux
  saveModalToggle, // controle fenetre save - redux
  landingToggle, // controle la landing
} from "../../actions/modals";

export const NavBar = ({
  isAuthenticated,
  authToggle,
  accountModalToggle,
  mobileMenuToggle,
  kpiMobileToggle,
  modelModalToggle,
  saveModalToggle,
  landingToggle,
  landingModal,
}) => {
  const [dimensions, setDimensions] = useState({
    width: window.innerWidth,
  });
  const { width } = dimensions;

  useEffect(() => {
    const debouncedHandleResize = function handleResize() {
      setDimensions({
        height: window.innerHeight,
        width: window.innerWidth,
      });
    };
    window.addEventListener("resize", debouncedHandleResize);
    return (_) => {
      window.removeEventListener("resize", debouncedHandleResize);
    };
  });

  const openAccount = () => {
    accountModalToggle(true);
  };

  const volver = () => {
    mobileMenuToggle(false); // ferme le menu mobile
    authToggle(false); // ferme la fenetre authentification
    accountModalToggle(false); // ferme la fenetre mon compte
    kpiMobileToggle(false); // ferme la fenetre indicateurs
    modelModalToggle(false); // ferme la fenetre model
    saveModalToggle(false); // ferme la fenetre save
  };

  return (
    <nav className='landing-nav'>
      <div className='flex-row ai-fc'>
        <button
          style={{ fontSize: "24px", fontWeight: "bold" }}
          onClick={() => {
            landingToggle(true);
            volver();
          }}
        >
          SIMULIMO
        </button>
      </div>
      {isAuthenticated && width > 1155 ? (
        <div>
          <ul>
            <li>
              {landingModal ? (
                <button onClick={() => landingToggle(false)}>
                  <span className='link'>
                    Simulateur&nbsp;<i className='fas fa-chart-bar'></i>
                  </span>
                </button>
              ) : (
                <button onClick={() => landingToggle(true)}>
                  <span className='link'>
                    Accueil&nbsp;<i class='fas fa-home'></i>
                  </span>
                </button>
              )}
            </li>
            <li>
              <button onClick={openAccount}>
                <span className='link'>
                  Mon Compte&nbsp;<i className='far fa-user-circle'></i>
                </span>
              </button>
            </li>
          </ul>
        </div>
      ) : !isAuthenticated && width > 1155 ? (
        <div>
          <ul>
            <li>
              {landingModal ? (
                <button onClick={() => landingToggle(false)}>
                  <span className='link'>
                    Simulateur&nbsp;<i className='fas fa-chart-bar'></i>
                  </span>
                </button>
              ) : (
                <button onClick={() => landingToggle(true)}>
                  <span className='link'>
                    Accueil&nbsp;<i class='fas fa-home'></i>
                  </span>
                </button>
              )}
            </li>
            <li>
              <button onClick={() => authToggle(true)}>
                <span className='link'>
                  S'identifier&nbsp;<i className='far fa-user-circle'></i>
                </span>
              </button>
            </li>
          </ul>
        </div>
      ) : (
        ""
      )}
    </nav>
  );
};

NavBar.propTypes = {
  isAuthenticated: PropTypes.bool,
  authToggle: PropTypes.func.isRequired,
  accountModalToggle: PropTypes.func.isRequired,
  kpiMobileToggle: PropTypes.func.isRequired,
  mobileMenuToggle: PropTypes.func.isRequired,
  modelModalToggle: PropTypes.func.isRequired,
  saveModalToggle: PropTypes.func.isRequired,
  landingToggle: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  landingModal: state.modals.landingModal,
});

export default connect(mapStateToProps, {
  authToggle,
  landingToggle,
  accountModalToggle,
  kpiMobileToggle,
  mobileMenuToggle,
  modelModalToggle,
  saveModalToggle,
})(NavBar);
