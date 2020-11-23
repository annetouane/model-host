import React from "react";
import MobilePagination from "./MobilePagination";

const Revenu = ({
  onChange,
  sepSpace,
  setMobileDisplayTab,
  mobileDisplayTab,
  loyer,
  chargesLoc,
  occupation,
  width,
  showModal,
  formCheck,
}) => {
  const optionsOccupation = []; // options taux occupation
  for (let i = 1; i <= 12; i += 0.5) {
    optionsOccupation.push(i);
  }

  return (
    <section id='revenu' style={{ marginBottom: width < 770 && formCheck ? "80px" : "0" }}>
      {width > 770 ?
      <h3 className='form-header'>
        <i className='fas fa-hand-holding-usd header-i'></i>
        &nbsp;&nbsp;Revenu annuel d'exploitation
      </h3> : ""}
      <div className='flex-row jc-se'>
        <div className='form-box-v mt-10'>
          <label>Loyer mensuel <small>(hors charges)</small> : {sepSpace(loyer)} €</label>
          <div className='info-button'>
            <input
              type='range'
              name='loyer'
              value={loyer}
              onChange={onChange}
              min='0'
              max='10000'
              step='20'
              className='slider mt-5'
            />
            <i
              id='info-loyer'
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
          <label>
            Charges locataires <small>(annuelle)</small> : {sepSpace(chargesLoc)} €
          </label>
          <div className='info-button'>
            <input
              type='range'
              name='chargesLoc'
              value={chargesLoc}
              onChange={onChange}
              min='0'
              max='10000'
              step='20'
              className='slider mt-5'
            />
            <i
              id='info-locataire'
              onClick={showModal}
              class='fas fa-question-circle'
            ></i>
          </div>
        </div>

        <div
          className={
            width < 770 ? "form-box-h-4 mt-10" : "form-box-h-4 mt-10 ml-5"
          }
        >
          <label>Occupation annuelle : </label>
          <select
            type='select'
            name='occupation'
            value={occupation}
            onChange={onChange}
            className='input-box-2 fs-12'
          >
            {optionsOccupation.map((option) => (
              <option key={option} value={option}>
                {option} mois
              </option>
            ))}
          </select>
          <i
            id='info-occupation'
            onClick={showModal}
            class='fas fa-question-circle'
          ></i>
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
export default Revenu;
