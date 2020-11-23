import React from "react";

const ButtonModelMobile = ({ formCheck, onSubmit, modal }) => {
  return (
    <div 
      className="button-model-mobile"
      style={{
          display: !formCheck || modal ?  "none" : ""
      }}
        >
      <button
        type='submit'
        onClick={onSubmit}
      > Modélisation fiscale
      </button>
        <i className='fas fa-forward fa-lg'></i>
    </div>
  );
};

export default ButtonModelMobile;
