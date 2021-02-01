import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
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
  passwordChange,
  landingToggle,
  landingModal,
  history,
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

  const resetClickAuth = () => {
    mobileMenuToggle(false); // ferme le menu mobile
    // kpiMobileToggle(false); // ferme la fenetre indicateurs
  };
  const resetClickAccueil = () => {
    mobileMenuToggle(false); // ferme le menu mobile
    // kpiMobileToggle(false); // ferme la fenetre indicateurs
  };
  const resetClickAccount = () => {
    mobileMenuToggle(false); // ferme le menu mobile
    // kpiMobileToggle(false); // ferme la fenetre indicateurs
  };
  const resetClickSimulateur = () => {
    mobileMenuToggle(false); // ferme le menu mobile
    // kpiMobileToggle(false); // ferme la fenetre indicateurs
  };

  // sur la page de changement de mdp si clic sur simulimo,
  // retourne a la racine et ouvre auth
  const onClicSimulimo = () => {
    if (passwordChange) {
      history.push("/");
      if (!isAuthenticated) {
        authToggle(true);
      }
    } else {
      landingToggle(true);
      resetClickAccueil();
    }
  };

  return (
    <nav className='landing-nav'>
      <div className='flex-row ai-fc'>
        <button
          style={{ fontSize: "24px", fontWeight: "bold" }}
          onClick={onClicSimulimo}
        >
          SIMULIMO
        </button>
      </div>
      {isAuthenticated && width > 1155 ? (
        <div>
          <ul>
            <li
              className={
                !passwordChange ? "not-display-buttons" : "display-buttons"
              }
            >
              <button onClick={onClicSimulimo}>
                <span className='link'>
                  Accueil&nbsp;<i className='fas fa-home'></i>
                </span>
              </button>
            </li>

            <li
              className={
                passwordChange ? "not-display-buttons" : "display-buttons"
              }
            >
              {landingModal ? (
                <button
                  onClick={() => {
                    landingToggle(false);
                    resetClickSimulateur();
                  }}
                >
                  <span className='link'>
                    Simulateur&nbsp;<i className='fas fa-chart-bar'></i>
                  </span>
                </button>
              ) : (
                <button
                  onClick={() => {
                    landingToggle(true);
                    resetClickAccueil();
                  }}
                >
                  <span className='link'>
                    Accueil&nbsp;<i className='fas fa-home'></i>
                  </span>
                </button>
              )}
            </li>
            <li
              className={
                passwordChange ? "not-display-buttons" : "display-buttons"
              }
            >
              <button
                onClick={() => {
                  openAccount();
                  resetClickAccount();
                }}
              >
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
            <li
              className={
                !passwordChange ? "not-display-buttons" : "display-buttons"
              }
            >
              <button onClick={onClicSimulimo}>
                <span className='link'>
                  Accueil&nbsp;<i className='fas fa-home'></i>
                </span>
              </button>
            </li>
            <li
              className={
                passwordChange ? "not-display-buttons" : "display-buttons"
              }
            >
              {landingModal ? (
                <button
                  onClick={() => {
                    landingToggle(false);
                    resetClickSimulateur();
                  }}
                >
                  <span className='link'>
                    Simulateur&nbsp;<i className='fas fa-chart-bar'></i>
                  </span>
                </button>
              ) : (
                <button
                  onClick={() => {
                    landingToggle(true);
                    resetClickAccueil();
                  }}
                >
                  <span className='link'>
                    Accueil&nbsp;<i className='fas fa-home'></i>
                  </span>
                </button>
              )}
            </li>
            <li
              className={
                passwordChange ? "not-display-buttons" : "display-buttons"
              }
            >
              <button
                onClick={() => {
                  authToggle(true);
                  resetClickAuth();
                }}
              >
                <span className='link'>
                  Connexion&nbsp;<i className='far fa-user-circle'></i>
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
  passwordChange: state.modals.passwordChange,
});

export default withRouter(
  connect(mapStateToProps, {
    authToggle,
    landingToggle,
    accountModalToggle,
    kpiMobileToggle,
    mobileMenuToggle,
    modelModalToggle,
    saveModalToggle,
  })(NavBar)
);
