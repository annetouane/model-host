import React from "react";

const ButtonModelMobile = ({ formCheck, onSubmit }) => {
  return (
    <button
      type='submit'
      className={
        formCheck ? "button-model-mobile-on" : "button-model-mobile-off"
      }
      onClick={onSubmit}
      disabled={!formCheck}
    >
      <i className='fas fa-forward fa-2x'></i>
    </button>
  );
};

export default ButtonModelMobile;
