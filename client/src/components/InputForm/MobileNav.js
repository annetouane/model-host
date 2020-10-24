import React from "react";

const MobileNav = ({ setMobileDisplay }) => {
  return (
    <div className='mobile-nav'>
      <button
        onClick={() =>
          setMobileDisplay({
            displayProjet: true,
            displayFinancement: false,
            displayRevenu: false,
            displayCharges: false,
            displayFoyer: false,
            displayRegime: false,
          })
        }
      >
        <i className='fas fa-landmark fa-2x header-i'></i>
      </button>
      <button
        onClick={() =>
          setMobileDisplay({
            displayProjet: false,
            displayFinancement: true,
            displayRevenu: false,
            displayCharges: false,
            displayFoyer: false,
            displayRegime: false,
          })
        }
      >
        <i className='fas fa-piggy-bank fa-2x header-i'></i>
      </button>
      <button
        onClick={() =>
          setMobileDisplay({
            displayProjet: false,
            displayFinancement: false,
            displayRevenu: true,
            displayCharges: false,
            displayFoyer: false,
            displayRegime: false,
          })
        }
      >
        <i className='fas fa-hand-holding-usd fa-2x header-i'></i>
      </button>
      <button
        onClick={() =>
          setMobileDisplay({
            displayProjet: false,
            displayFinancement: false,
            displayRevenu: false,
            displayCharges: true,
            displayFoyer: false,
            displayRegime: false,
          })
        }
      >
        <i className='fas fa-weight-hanging fa-2x header-i'></i>
      </button>
      <button
        onClick={() =>
          setMobileDisplay({
            displayProjet: false,
            displayFinancement: false,
            displayRevenu: false,
            displayCharges: false,
            displayFoyer: true,
            displayRegime: false,
          })
        }
      >
        <i className='fas fa-house-user fa-2x header-i'></i>
      </button>
      <button
        onClick={() =>
          setMobileDisplay({
            displayProjet: false,
            displayFinancement: false,
            displayRevenu: false,
            displayCharges: false,
            displayFoyer: false,
            displayRegime: true,
          })
        }
      >
        <i className='fas fa-balance-scale fa-2x header-i'></i>
      </button>
    </div>
  );
};
export default MobileNav;
