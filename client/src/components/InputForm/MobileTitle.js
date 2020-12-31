import React from "react";

const MobileTitle = ({ mobileDisplayTab, scrollTop }) => {
  return (
    <div
      className='mobile-title'
      style={{
        borderBottom: !scrollTop ? "1px solid #c8c9ca" : "",
        boxShadow: !scrollTop ? "1px solid #c8c9ca" : "",
      }}
    >
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
    </div>
  );
};

export default MobileTitle;
