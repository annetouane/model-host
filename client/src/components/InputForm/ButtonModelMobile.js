import React from "react";

const ButtonModelMobile = ({ formCheck, onSave, onFisc }) => {
  return (
    <div
      className='button-model-mobile'
      style={{
        display: !formCheck ? "none" : "",
      }}
    >
      <div
        className='box-button-model-mobile'
        style={{
          borderRight: "#fff solid 0.5px",
        }}
      >
        <button type='submit' onClick={onSave}>
          {" "}
          Sauvegarder<i className='far fa-save'></i>
        </button>
      </div>
      <div
        className='box-button-model-mobile'
        style={{
          borderLeft: "#fff solid 0.5px",
        }}
      >
        <button type='submit' onClick={onFisc}>
          {" "}
          Fiscalité<i className='fas fa-balance-scale'></i>
        </button>
      </div>
    </div>
  );
};

export default ButtonModelMobile;
