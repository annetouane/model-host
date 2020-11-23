import React from "react";

const mobileNavButton = ({ toggleMobileNav, setToggleMobileNav, netVendeurCheck }) => {
  return (
    <div className='mobile-nav-button'>
        {toggleMobileNav ? 
        <i 
          className="fas fa-chevron-circle-up fa-2x"
          onClick={() => setToggleMobileNav(!toggleMobileNav)}
          ></i> :
        <i className="fas fa-chevron-circle-down fa-2x" onClick={() => setToggleMobileNav(!toggleMobileNav)}></i>}
    </div>
  );
};

export default mobileNavButton;
