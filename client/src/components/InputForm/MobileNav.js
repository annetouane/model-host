import React from "react";
import { Fragment } from "react";

const MobileNav = ({
  onSubmit,
  showModal,
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
  formCheck,
  toggleMobileNav,
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


    // <div className='mobile-nav'>
    //   <button
    //     onClick={() => {
    //       setMobileDisplay({
    //         displayProjet: true,
    //         displayFinancement: false,
    //         displayRevenu: false,
    //         displayCharges: false,
    //         displayFoyer: false,
    //         displayRegime: false,
    //       });
    //       volver();
    //     }}
    //   >
    //     <i
    //       className={
    //         netVendeurCheck && displayProjet
    //           ? "fas fa-landmark fa-2x mobile-nav-i-selected-valid"
    //           : displayProjet
    //           ? "fas fa-landmark fa-2x mobile-nav-i-selected"
    //           : netVendeurCheck
    //           ? "fas fa-landmark fa-2x mobile-nav-i-valid"
    //           : "fas fa-landmark fa-2x mobile-nav-i"
    //       }
    //     ></i>
    //   </button>
    //   <button
    //     onClick={() => {
    //       setMobileDisplay({
    //         displayProjet: false,
    //         displayFinancement: true,
    //         displayRevenu: false,
    //         displayCharges: false,
    //         displayFoyer: false,
    //         displayRegime: false,
    //       });
    //       volver();
    //     }}
    //   >
    //     <i
    //       className={
    //         apportCheck && displayFinancement
    //           ? "fas fa-piggy-bank fa-2x mobile-nav-i-selected-valid"
    //           : displayFinancement
    //           ? "fas fa-piggy-bank fa-2x mobile-nav-i-selected"
    //           : apportCheck
    //           ? "fas fa-piggy-bank fa-2x mobile-nav-i-valid"
    //           : "fas fa-piggy-bank fa-2x mobile-nav-i"
    //       }
    //     ></i>
    //   </button>
    //   <button
    //     onClick={() => {
    //       setMobileDisplay({
    //         displayProjet: false,
    //         displayFinancement: false,
    //         displayRevenu: true,
    //         displayCharges: false,
    //         displayFoyer: false,
    //         displayRegime: false,
    //       });
    //       volver();
    //     }}
    //   >
    //     <i
    //       className={
    //         loyerCheck && displayRevenu
    //           ? "fas fa-hand-holding-usd fa-2x mobile-nav-i-selected-valid"
    //           : displayRevenu
    //           ? "fas fa-hand-holding-usd fa-2x mobile-nav-i-selected"
    //           : loyerCheck
    //           ? "fas fa-hand-holding-usd fa-2x mobile-nav-i-valid"
    //           : "fas fa-hand-holding-usd fa-2x mobile-nav-i"
    //       }
    //     ></i>
    //   </button>
    //   <button
    //     onClick={() => {
    //       setMobileDisplay({
    //         displayProjet: false,
    //         displayFinancement: false,
    //         displayRevenu: false,
    //         displayCharges: true,
    //         displayFoyer: false,
    //         displayRegime: false,
    //       });
    //       volver();
    //     }}
    //   >
    //     <i
    //       className={
    //         chargesCheck && displayCharges
    //           ? "fas fa-weight-hanging fa-2x mobile-nav-i-selected-valid"
    //           : displayCharges
    //           ? "fas fa-weight-hanging fa-2x mobile-nav-i-selected"
    //           : chargesCheck
    //           ? "fas fa-weight-hanging fa-2x mobile-nav-i-valid"
    //           : "fas fa-weight-hanging fa-2x mobile-nav-i"
    //       }
    //     ></i>
    //   </button>
    //   <button
    //     onClick={() => {
    //       setMobileDisplay({
    //         displayProjet: false,
    //         displayFinancement: false,
    //         displayRevenu: false,
    //         displayCharges: false,
    //         displayFoyer: true,
    //         displayRegime: false,
    //       });
    //       volver();
    //     }}
    //   >
    //     <i
    //       className={
    //         foyerCheck && displayFoyer
    //           ? "fas fa-house-user fa-2x mobile-nav-i-selected-valid"
    //           : displayFoyer
    //           ? "fas fa-house-user fa-2x mobile-nav-i-selected"
    //           : foyerCheck
    //           ? "fas fa-house-user fa-2x mobile-nav-i-valid"
    //           : "fas fa-house-user fa-2x mobile-nav-i"
    //       }
    //     ></i>
    //   </button>
    //   <button
    //     onClick={() => {
    //       setMobileDisplay({
    //         displayProjet: false,
    //         displayFinancement: false,
    //         displayRevenu: false,
    //         displayCharges: false,
    //         displayFoyer: false,
    //         displayRegime: true,
    //       });
    //       volver();
    //     }}
    //   >
    //     <i
    //       className={
    //         regimeCheck && displayRegime
    //           ? "fas fa-balance-scale fa-2x mobile-nav-i-selected-valid"
    //           : displayRegime
    //           ? "fas fa-balance-scale fa-2x mobile-nav-i-selected"
    //           : regimeCheck
    //           ? "fas fa-balance-scale fa-2x mobile-nav-i-valid"
    //           : "fas fa-balance-scale fa-2x mobile-nav-i"
    //       }
    //     ></i>
    //   </button>
    // </div>
  );
};
export default MobileNav;
