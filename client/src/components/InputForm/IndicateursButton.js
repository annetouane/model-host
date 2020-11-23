import React from "react";

const IndicateursButton = ({ setClick }) => {

  return (
    <div onClick={() => setClick(false)}>
        <i className='far fa-times-circle header-i-2 fa-2x indicateurs-mobile-button'></i>
    </div>
  );
};

export default IndicateursButton;
