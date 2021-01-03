// packages
import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

// actions
import {
  authToggle,
  landingToggle,
  accountModalToggle,
  mobileMenuToggle,
  kpiMobileToggle,
} from "../../actions/modals";

const MobileNav = ({
  setMobileDisplayTab, // changement d'onglet (projet, financement ...) - redux
  setDisplayInfoModal, // controle fenêtre information - redux
  mobileMenuToggle, // controle fenetre nav mobile - redux
  accountModalToggle, // controle fenetre mon compte - redux
  authToggle, // controle fenetre authentication - redux
  kpiMobileToggle, // controle fenetre indicateurs - redux
  netVendeurCheck, // bool - local
  apportCheck, // bool - local
  loyerCheck, // bool - local
  chargesCheck, // bool - local
  foyerCheck, // bool - local
  regimeCheck, // bool - local
  landingToggle, // bool - redux
  isAuthenticated, // bool - redux
  landingModal, // bool - redux
  mobileMenu, // bool - redux
  width,
  scrollTo,
}) => {
  const volver = () => {
    mobileMenuToggle(false); // ferme mobile menu
    setDisplayInfoModal(false); // ferme modal informations
  };

  const openAccount = () => {
    accountModalToggle(true);
    volver();
  };

  const openIndicateurs = () => {
    kpiMobileToggle(true);
  };

  return (
    <Fragment>
      {mobileMenu ? (
        <nav className={width < 770 ? "mobile-nav" : "mobile-nav-tablet"}>
          {/* {!landingModal ? ( */}
          <div className='mobile-nav-box'>
            {/* projet */}
            <div
              className='mobile-nav-item'
              style={{
                borderRadius: width > 770 && width < 1155 ? "5px 0 0 0" : "0",
              }}
            >
              {netVendeurCheck ? (
                <i className='far fa-check-circle fa-lg section-complete'></i>
              ) : (
                <i className='far fa-times-circle fa-lg section-uncomplete'></i>
              )}
              <button
                type='button'
                className='mobile-nav-link mobile-side-nav-text'
                onClick={
                  width < 770
                    ? () => {
                        setMobileDisplayTab(0);
                        volver();
                      }
                    : (e) => scrollTo(e, "#projet")
                }
              >
                Projet
              </button>
              <i className='far fa-times-circle mobile-nav-dummie'></i>
            </div>

            {/* financement */}
            <div className='mobile-nav-item'>
              {apportCheck ? (
                <i className='far fa-check-circle fa-lg section-complete'></i>
              ) : (
                <i className='far fa-times-circle fa-lg section-uncomplete'></i>
              )}
              <button
                type='button'
                className='mobile-nav-link mobile-side-nav-text'
                onClick={
                  width < 770
                    ? () => {
                        setMobileDisplayTab(1);
                        volver();
                      }
                    : (e) => scrollTo(e, "#financement")
                }
              >
                Financement
              </button>
              <i className='far fa-times-circle mobile-nav-dummie'></i>
            </div>

            {/* revenu */}
            <div className='mobile-nav-item'>
              {loyerCheck ? (
                <i className='far fa-check-circle fa-lg section-complete'></i>
              ) : (
                <i className='far fa-times-circle fa-lg section-uncomplete'></i>
              )}
              <button
                type='button'
                className='mobile-nav-link mobile-side-nav-text'
                onClick={
                  width < 770
                    ? () => {
                        setMobileDisplayTab(2);
                        volver();
                      }
                    : (e) => scrollTo(e, "#revenu")
                }
              >
                Revenu
              </button>
              <i className='far fa-times-circle mobile-nav-dummie'></i>
            </div>

            {/* charges */}
            <div className='mobile-nav-item'>
              {chargesCheck ? (
                <i className='far fa-check-circle fa-lg section-complete'></i>
              ) : (
                <i className='far fa-times-circle fa-lg section-uncomplete'></i>
              )}
              <button
                type='button'
                className='mobile-nav-link mobile-side-nav-text'
                onClick={
                  width < 770
                    ? () => {
                        setMobileDisplayTab(3);
                        volver();
                      }
                    : (e) => scrollTo(e, "#charges")
                }
              >
                Charges
              </button>
              <i className='far fa-times-circle mobile-nav-dummie'></i>
            </div>

            {/* foyer */}
            <div className='mobile-nav-item'>
              {foyerCheck ? (
                <i className='far fa-check-circle fa-lg section-complete'></i>
              ) : (
                <i className='far fa-times-circle fa-lg section-uncomplete'></i>
              )}
              <button
                type='button'
                className='mobile-nav-link mobile-side-nav-text'
                onClick={
                  width < 770
                    ? () => {
                        setMobileDisplayTab(4);
                        volver();
                      }
                    : (e) => scrollTo(e, "#foyer")
                }
              >
                Foyer
              </button>
              <i className='far fa-times-circle mobile-nav-dummie'></i>
            </div>

            {/* régime */}
            <div className='mobile-nav-item'>
              {regimeCheck ? (
                <i className='far fa-check-circle fa-lg section-complete'></i>
              ) : (
                <i className='far fa-times-circle fa-lg section-uncomplete'></i>
              )}
              <button
                type='button'
                className='mobile-nav-link mobile-side-nav-text'
                onClick={
                  width < 770
                    ? () => {
                        setMobileDisplayTab(2);
                        volver();
                      }
                    : (e) => scrollTo(e, "#regime")
                }
              >
                Régime
              </button>
              <i className='far fa-times-circle mobile-nav-dummie'></i>
            </div>

            {/* Indicateur button */}
            {width < 770 ? (
              <div className='mobile-kpi-button'>
                <button type='button' onClick={openIndicateurs}>
                  Voir les indicateurs
                </button>
                <i className='fas fa-temperature-high fa-lg' />
              </div>
            ) : (
              ""
            )}
          </div>

          {!landingModal ? (
            <div className='mobile-kpi-button'>
              <button
                onClick={() => {
                  landingToggle(true);
                  volver();
                }}
              >
                <span className='link'>
                  Accueil&nbsp;<i className='fas fa-home'></i>
                </span>
              </button>
            </div>
          ) : (
            <div className='mobile-kpi-button'>
              <button
                onClick={() => {
                  landingToggle(false);
                  volver();
                }}
              >
                <span className='link'>
                  Simulateur&nbsp;<i className='fas fa-chart-bar'></i>
                </span>
              </button>
            </div>
          )}

          {isAuthenticated ? (
            <div
              className='mobile-kpi-button'
              style={{
                borderBottom: width > 770 && width < 1155 && "none",
              }}
            >
              <button
                onClick={() => {
                  openAccount();
                  volver();
                }}
              >
                <span className='link'>
                  Mon Compte&nbsp;<i className='far fa-user-circle'></i>
                </span>
              </button>
            </div>
          ) : (
            <div
              className='mobile-kpi-button'
              style={{
                borderBottom: width > 770 && width < 1155 && "none",
              }}
            >
              <button
                onClick={() => {
                  authToggle(true);
                  volver();
                }}
              >
                <span className='link'>
                  S'identifier&nbsp;<i className='far fa-user-circle'></i>
                </span>
              </button>
            </div>
          )}
        </nav>
      ) : (
        ""
      )}
    </Fragment>
  );
};

MobileNav.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  detectSave: PropTypes.bool.isRequired,
  detectModel: PropTypes.bool.isRequired,
  landingModal: PropTypes.bool.isRequired,
  mobileMenu: PropTypes.bool.isRequired,
  authToggle: PropTypes.func.isRequired,
  landingToggle: PropTypes.func.isRequired,
  accountModalToggle: PropTypes.func.isRequired,
  kpiMobileToggle: PropTypes.func.isRequired,
  mobileMenuToggle: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  detectSave: state.modals.detectSave,
  detectModel: state.modals.detectModel,
  landingModal: state.modals.landingModal,
  mobileMenu: state.modals.mobileMenu,
});

export default connect(mapStateToProps, {
  authToggle,
  landingToggle,
  accountModalToggle,
  kpiMobileToggle,
  mobileMenuToggle,
})(MobileNav);
