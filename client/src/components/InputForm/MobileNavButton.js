import React from "react";

const mobileNavButton = ({ toggleMobileNav, setToggleMobileNav, netVendeurCheck }) => {
  return (
    <div className='mobile-nav-button'>
        {toggleMobileNav ? 
        <i 
          className="fas fa-times fa-2x"
          onClick={() => setToggleMobileNav(!toggleMobileNav)}
          >
        </i> :
        <i
          className="far fa-compass fa-2x"
          onClick={() => setToggleMobileNav(!toggleMobileNav)}
        >
        </i>}
    </div>
  );
};

export default mobileNavButton;
