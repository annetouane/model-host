import React from "react";

const MobileNav = ({
  setMobileDisplay,
  setClick,
  setModal,
  mobileDisplay,
  setDisplayInfoModal,
  netVendeurCheck,
  apportCheck,
  loyerCheck,
  chargesCheck,
  foyerCheck,
  regimeCheck,
}) => {
  const {
    displayProjet,
    displayFinancement,
    displayRevenu,
    displayCharges,
    displayFoyer,
    displayRegime,
  } = mobileDisplay;

  const volver = () => {
    setClick(false);
    setModal(false);
    setDisplayInfoModal(false);
  };

  return (
    <div className='mobile-nav'>
      <button
        onClick={() => {
          setMobileDisplay({
            displayProjet: true,
            displayFinancement: false,
            displayRevenu: false,
            displayCharges: false,
            displayFoyer: false,
            displayRegime: false,
          });
          volver();
        }}
      >
        <i
          className={
            netVendeurCheck && displayProjet
              ? "fas fa-landmark fa-2x mobile-nav-i-selected-valid"
              : displayProjet
              ? "fas fa-landmark fa-2x mobile-nav-i-selected"
              : netVendeurCheck
              ? "fas fa-landmark fa-2x mobile-nav-i-valid"
              : "fas fa-landmark fa-2x mobile-nav-i"
          }
        ></i>
      </button>
      <button
        onClick={() => {
          setMobileDisplay({
            displayProjet: false,
            displayFinancement: true,
            displayRevenu: false,
            displayCharges: false,
            displayFoyer: false,
            displayRegime: false,
          });
          volver();
        }}
      >
        <i
          className={
            apportCheck && displayFinancement
              ? "fas fa-piggy-bank fa-2x mobile-nav-i-selected-valid"
              : displayFinancement
              ? "fas fa-piggy-bank fa-2x mobile-nav-i-selected"
              : apportCheck
              ? "fas fa-piggy-bank fa-2x mobile-nav-i-valid"
              : "fas fa-piggy-bank fa-2x mobile-nav-i"
          }
        ></i>
      </button>
      <button
        onClick={() => {
          setMobileDisplay({
            displayProjet: false,
            displayFinancement: false,
            displayRevenu: true,
            displayCharges: false,
            displayFoyer: false,
            displayRegime: false,
          });
          volver();
        }}
      >
        <i
          className={
            loyerCheck && displayRevenu
              ? "fas fa-hand-holding-usd fa-2x mobile-nav-i-selected-valid"
              : displayRevenu
              ? "fas fa-hand-holding-usd fa-2x mobile-nav-i-selected"
              : loyerCheck
              ? "fas fa-hand-holding-usd fa-2x mobile-nav-i-valid"
              : "fas fa-hand-holding-usd fa-2x mobile-nav-i"
          }
        ></i>
      </button>
      <button
        onClick={() => {
          setMobileDisplay({
            displayProjet: false,
            displayFinancement: false,
            displayRevenu: false,
            displayCharges: true,
            displayFoyer: false,
            displayRegime: false,
          });
          volver();
        }}
      >
        <i
          className={
            chargesCheck && displayCharges
              ? "fas fa-weight-hanging fa-2x mobile-nav-i-selected-valid"
              : displayCharges
              ? "fas fa-weight-hanging fa-2x mobile-nav-i-selected"
              : chargesCheck
              ? "fas fa-weight-hanging fa-2x mobile-nav-i-valid"
              : "fas fa-weight-hanging fa-2x mobile-nav-i"
          }
        ></i>
      </button>
      <button
        onClick={() => {
          setMobileDisplay({
            displayProjet: false,
            displayFinancement: false,
            displayRevenu: false,
            displayCharges: false,
            displayFoyer: true,
            displayRegime: false,
          });
          volver();
        }}
      >
        <i
          className={
            foyerCheck && displayFoyer
              ? "fas fa-house-user fa-2x mobile-nav-i-selected-valid"
              : displayFoyer
              ? "fas fa-house-user fa-2x mobile-nav-i-selected"
              : foyerCheck
              ? "fas fa-house-user fa-2x mobile-nav-i-valid"
              : "fas fa-house-user fa-2x mobile-nav-i"
          }
        ></i>
      </button>
      <button
        onClick={() => {
          setMobileDisplay({
            displayProjet: false,
            displayFinancement: false,
            displayRevenu: false,
            displayCharges: false,
            displayFoyer: false,
            displayRegime: true,
          });
          volver();
        }}
      >
        <i
          className={
            regimeCheck && displayRegime
              ? "fas fa-balance-scale fa-2x mobile-nav-i-selected-valid"
              : displayRegime
              ? "fas fa-balance-scale fa-2x mobile-nav-i-selected"
              : regimeCheck
              ? "fas fa-balance-scale fa-2x mobile-nav-i-valid"
              : "fas fa-balance-scale fa-2x mobile-nav-i"
          }
        ></i>
      </button>
    </div>
  );
};
export default MobileNav;
