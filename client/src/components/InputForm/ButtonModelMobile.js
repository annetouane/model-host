import React from "react";

const ButtonModelMobile = ({ netVendeur, formCheck, onSave, onFisc }) => {
  return (
    <div className='button-model-mobile'>
      <div
        className='box-button-model-mobile'
        style={{
          borderRight: "#fff solid 2px",
          backgroundColor: netVendeur === 0 && "grey",
        }}
      >
        <button
          type='submit'
          onClick={onSave}
          disabled={netVendeur === 0 ? true : false}
          style={{ backgroundColor: netVendeur === 0 && "grey" }}
        >
          {" "}
          Sauvegarder<i className='far fa-save'></i>
        </button>
      </div>
      <div
        className='box-button-model-mobile'
        style={{
          borderLeft: "#fff solid 0.5px",
          backgroundColor: !formCheck && "grey",
        }}
      >
        <button
          type='submit'
          onClick={onFisc}
          disabled={!formCheck}
          style={{ backgroundColor: !formCheck && "grey" }}
        >
          {" "}
          Fiscalité<i className='fas fa-balance-scale'></i>
        </button>
      </div>
    </div>
  );
};

export default ButtonModelMobile;
