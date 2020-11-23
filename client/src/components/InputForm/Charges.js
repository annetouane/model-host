import React from "react";
import MobilePagination from "./MobilePagination";

const Charges = ({
  onChange,
  showModal,
  sepSpace,
  setMobileDisplayTab,
  mobileDisplayTab,
  revAnnuel,
  fonciere,
  gestion,
  charges,
  pno,
  width,
  formCheck,
}) => {
  return (
    <section id='charges'>
      {width > 770 ?
      <h3 className='form-header'>
        <i className='fas fa-weight-hanging header-i'></i>
        &nbsp;&nbsp;Charges annuelles d'exploitation
      </h3> : ""}
        <div className='form-group'>
          <div
              className={width < 770 ? "form-box-v mt-10" : "form-box-v mt-10 mr-5"}
            >
          <label>Charges courantes : {sepSpace(charges)} €</label>
          <small><i class="fas fa-exclamation-circle"></i>&nbsp;Exclure les charges locataires</small>
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
          <label>Gestion locative : {Math.round((gestion * 100 + Number.EPSILON) * 100) / 100}% soit {sepSpace(gestion * revAnnuel)} €</label>
          <small>Exprimés en % des loyers perçus</small>
          <div className='info-button'>
            <input
              type='range'
              name='gestion'
              value={gestion}
              onChange={onChange}
              min='0'
              max='0.1'
              step='0.001'
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
      {width < 700 ?
      <MobilePagination
          setMobileDisplayTab={setMobileDisplayTab}
          mobileDisplayTab={mobileDisplayTab}
      /> : ""}
    </section>
  );
};
export default Charges;
