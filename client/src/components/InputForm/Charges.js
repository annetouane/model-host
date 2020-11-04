import React from "react";

const Charges = ({
  onChange,
  showModal,
  sepSpace,
  fonciere,
  gestion,
  charges,
  pno,
  width,
}) => {
  return (
    <section id='charges'>
      <h3 className='form-header'>
        <i className='fas fa-weight-hanging header-i'></i>
        &nbsp;&nbsp;Charges annuelles d'exploitation
      </h3>
      <div className='form-group'>
        <div
          className={width < 770 ? "form-box-v mt-10" : "form-box-v mt-10 mr-5"}
        >
          <label>Taxe foncière : {sepSpace(fonciere)} €</label>
          <div className='info-button'>
            <input
              type='range'
              name='fonciere'
              value={fonciere}
              onChange={onChange}
              min='0'
              max='10000'
              step='20'
              className='slider mt-5'
            />
            <i
              id='info-fonciere'
              onClick={showModal}
              class='fas fa-question-circle'
            ></i>
          </div>
        </div>

        <div
          className={width < 770 ? "form-box-v mt-10" : "form-box-v mt-10 ml-5"}
        >
          <label>Gestion locative : {sepSpace(gestion)} €</label>
          <div className='info-button'>
            <input
              type='range'
              name='gestion'
              value={gestion}
              onChange={onChange}
              min='0'
              max='10000'
              step='20'
              className='slider mt-5'
            />
            <i
              id='info-gestion'
              onClick={showModal}
              class='fas fa-question-circle'
            ></i>
          </div>
        </div>
      </div>

      <div className='form-group'>
        <div
          className={width < 770 ? "form-box-v mt-10" : "form-box-v mt-10 mr-5"}
        >
          <label>Charges courantes : {sepSpace(charges)} €</label>
          <div className='info-button'>
            <input
              type='range'
              name='charges'
              value={charges}
              onChange={onChange}
              min='0'
              max='10000'
              step='20'
              className='slider mt-5'
            />
            <i
              id='info-charges'
              onClick={showModal}
              class='fas fa-question-circle'
            ></i>
          </div>
        </div>

        <div
          className={width < 770 ? "form-box-v mt-10" : "form-box-v mt-10 ml-5"}
        >
          <label>Assurances PNO & GLI : {sepSpace(pno)} €</label>
          <div className='info-button'>
            <input
              type='range'
              name='pno'
              value={pno}
              onChange={onChange}
              min='0'
              max='5000'
              step='10'
              className='slider mt-5'
            />
            <i
              id='info-pno'
              onClick={showModal}
              class='fas fa-question-circle'
            ></i>
          </div>
        </div>
      </div>
    </section>
  );
};
export default Charges;
