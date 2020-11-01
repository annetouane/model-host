import React from "react";

const IndicateursButton = ({ setClick, click, setDisplayInfoModal }) => {
  const volver = () => {
    setClick(!click);
    setDisplayInfoModal(false);
  };
  return (
    <div onClick={() => volver()}>
      {click ? (
        <i className='far fa-times-circle header-i-2 fa-2x indicateurs-mobile-button-on'></i>
      ) : (
        <i className='fas fa-temperature-high header-i-2 fa-2x indicateurs-mobile-button-off' />
      )}
    </div>
  );
};

export default IndicateursButton;
