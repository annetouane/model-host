import React from "react";

const MobileTitle = ({ mobileDisplayTab, scrollTop, setMobileDisplayTab }) => {
  const previous = () => {
    if (mobileDisplayTab === 0) {
      setMobileDisplayTab(5);
    } else {
      setMobileDisplayTab(mobileDisplayTab - 1);
    }
  };

  const next = () => {
    if (mobileDisplayTab === 5) {
      setMobileDisplayTab(0);
    } else {
      setMobileDisplayTab(mobileDisplayTab + 1);
    }
  };

  return (
    <div
      className='mobile-title pagination-mobile'
      style={{
        borderBottom: !scrollTop ? "1px solid #c8c9ca" : "",
        boxShadow: !scrollTop ? "1px solid #c8c9ca" : "",
      }}
    >
      <button onClick={() => previous()}>
        <i class='fas fa-chevron-circle-left'></i>
      </button>

      <h3>
        {mobileDisplayTab === 0
          ? "Description du Projet"
          : mobileDisplayTab === 1
          ? "Financement du Projet"
          : mobileDisplayTab === 2
          ? "Revenu Potentiel"
          : mobileDisplayTab === 3
          ? "Charges d'Exploitation"
          : mobileDisplayTab === 4
          ? "Foyer Fiscal"
          : mobileDisplayTab === 5
          ? "Régime Fiscal"
          : ""}
      </h3>
      <button onClick={() => next()}>
        <i class='fas fa-chevron-circle-right'></i>
      </button>
    </div>
  );
};

export default MobileTitle;
