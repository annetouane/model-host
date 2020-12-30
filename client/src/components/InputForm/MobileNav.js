// packages
import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

// actions
import { authToggle, landingToggle } from "../../actions/auth"

const MobileNav = ({
  setMobileDisplayTab,
  setToggleMobileNav,
  setClick,
  setModal,
  setDisplayInfoModal,
  netVendeurCheck,
  apportCheck,
  loyerCheck,
  chargesCheck,
  foyerCheck,
  regimeCheck,
  toggleMobileNav,
  authToggle,
  landingToggle,
}) => {

  const volver = () => {
    setClick(false);
    setModal(false);
    setDisplayInfoModal(false);
    setToggleMobileNav(!toggleMobileNav)
  };

  return (
    <Fragment>
    {toggleMobileNav ? 
    <nav className='mobile-nav'>
      <div className='mobile-nav-box'>
        <button onClick={() => landingToggle(false)}>
          <span className='link'>
            Simulateur&nbsp;<i className="fas fa-chart-bar"></i>
          </span>
        </button>

        <button 
          onClick={() => authToggle(true)}
          >
          <span className='link'>
            S'identifier&nbsp;<i className="far fa-user-circle"></i>
          </span>
        </button>
        
        {/* projet */}
        <div
          className='mobile-nav-item'
        >
          {netVendeurCheck ?
            <i className='far fa-check-circle fa-lg section-complete'></i> 
            : <i className='far fa-times-circle fa-lg section-uncomplete'></i>}
          <button
            type='button'
            className='mobile-nav-link mobile-side-nav-text'
            onClick={() => {
              setMobileDisplayTab(0);
              volver();
          }}
          >  
            Projet
          </button>
          <i className='far fa-times-circle mobile-nav-dummie'></i>
        </div>

        {/* financement */}
        <div
          className='mobile-nav-item'
        >
          {apportCheck ?
            <i className='far fa-check-circle fa-lg section-complete' ></i> 
            : <i className='far fa-times-circle fa-lg section-uncomplete'></i>}
          <button
            type='button'
            className='mobile-nav-link mobile-side-nav-text'
            onClick={() => {
              setMobileDisplayTab(1);
              volver();
            }}
          >
            Financement
          </button>
          <i className='far fa-times-circle mobile-nav-dummie'></i>
        </div>

        {/* revenu */}
        <div
          className='mobile-nav-item'
        >
          {loyerCheck ?
            <i className='far fa-check-circle fa-lg section-complete' ></i> 
            : <i className='far fa-times-circle fa-lg section-uncomplete'></i>}
          <button
            type='button'
            className='mobile-nav-link mobile-side-nav-text'
            onClick={() => {
              setMobileDisplayTab(2);
              volver();
            }}
          >
            Revenu
          </button>
          <i className='far fa-times-circle mobile-nav-dummie'></i>
        </div>

        {/* charges */}
        <div
          className='mobile-nav-item'
        >
          {chargesCheck ?
            <i className='far fa-check-circle fa-lg section-complete' ></i> 
            : <i className='far fa-times-circle fa-lg section-uncomplete'></i>}
          <button
            type='button'
            className='mobile-nav-link mobile-side-nav-text'
            onClick={() => {
              setMobileDisplayTab(3);
              volver();
            }}       
          >
            Charges
          </button>
          <i className='far fa-times-circle mobile-nav-dummie'></i>
        </div>

        {/* foyer */}
        <div
          className='mobile-nav-item'
        >
          {foyerCheck ?
            <i className='far fa-check-circle fa-lg section-complete' ></i> 
            : <i className='far fa-times-circle fa-lg section-uncomplete'></i>}
          <button
            type='button'
            className='mobile-nav-link mobile-side-nav-text'
            onClick={() => {
              setMobileDisplayTab(4);
              volver();
            }}            
          >
            Foyer
          </button>
          <i className='far fa-times-circle mobile-nav-dummie'></i>
        </div>

        {/* régime */}
        <div
          className='mobile-nav-item'
        >
          {regimeCheck ?
            <i className='far fa-check-circle fa-lg section-complete' ></i> 
            : <i className='far fa-times-circle fa-lg section-uncomplete'></i>}
          <button
            type='button'
            className='mobile-nav-link mobile-side-nav-text'
            onClick={() => {
              setMobileDisplayTab(5);
              volver();
            }}            
          >
            Régime
          </button>
          <i className='far fa-times-circle mobile-nav-dummie'></i>
        </div>
        
        {/* Indicateur button */}
        <div className='mobile-kpi-button'>
          <button
            type='button'
            onClick={() => setClick(true)}
          >
            Voir les indicateurs
          </button>
          <i className='fas fa-temperature-high fa-lg' />
        </div>
      </div>
    </nav>
    : ""}
    </Fragment>
  );
};

// MobileNav.propTypes = {
  
// };

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  detectSave: state.auth.detectSave,
  detectModel: state.auth.detectModel,
});

export default connect(mapStateToProps, { authToggle, landingToggle })(MobileNav);
