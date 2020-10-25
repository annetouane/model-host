import React from "react";

const IndicateursButton = ({ setClick, click }) => {
  return (
    <button
      onClick={() => setClick(!click)}
      className='indicateurs-mobile-button'
    >
      {click ? (
        <i class='far fa-times-circle header-i fa-2x indicateurs-mobile-button-on'></i>
      ) : (
        <i className='fas fa-temperature-high header-i fa-2x indicateurs-mobile-button-off' />
      )}
    </button>
  );
};

export default IndicateursButton;
