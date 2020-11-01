import React from "react";

const Revenu = ({
  onChange,
  sepSpace,
  loyer,
  chargesLoc,
  occupation,
  width,
  showModal,
}) => {
  const optionsOccupation = []; // options taux occupation
  for (let i = 1; i <= 12; i += 0.5) {
    optionsOccupation.push(i);
  }

  return (
    <section id='revenu'>
      <h3 className='form-header'>
        <i className='fas fa-hand-holding-usd header-i'></i>
        &nbsp;&nbsp;Revenu annuel d'exploitation
      </h3>
      <div className='flex-row jc-se'>
        <div className='form-box-v mt-10'>
          <label>Loyer mensuel : {sepSpace(loyer)} €</label>
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
            Charges locataires (annuelles) : {sepSpace(chargesLoc)} €
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
            width < 770 ? "form-box-h-2 mt-10" : "form-box-h-2 mt-10 ml-5"
          }
        >
          <label>Taux annuel d'occupation : </label>
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
    </section>
  );
};
export default Revenu;
