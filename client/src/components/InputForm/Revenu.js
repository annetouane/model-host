import React from "react";

const Revenu = ({ onChange, sepSpace, loyer, chargesLoc, occupation }) => {
  const optionsOccupation = []; // options taux occupation
  for (let i = 1; i <= 12; i += 0.5) {
    optionsOccupation.push(i);
  }

  return (
    <section id='revenu'>
      <h3 className='form-header mt-20'>
        <i className='fas fa-hand-holding-usd header-i'></i>
        &nbsp;&nbsp;Revenu annuel d'exploitation
      </h3>
      <div className='flex-row jc-se mt-10'>
        <div className='slidecontainer form-group'>
          <label>Loyer mensuel : {sepSpace(loyer)} €</label>
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
        </div>
      </div>

      <div className='flex-row jc-se mt-20'>
        <div className='slidecontainer form-group mr-10'>
          <label>Charges locataires : {sepSpace(chargesLoc)} €</label>
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
        </div>

        <div className='flex-row jc-sb ai-fc form-group ml-10'>
          <label>Taux d'occupation : </label>
          <select
            type='select'
            name='occupation'
            value={occupation}
            onChange={onChange}
            className='input-box fs-12'
          >
            {optionsOccupation.map((option) => (
              <option key={option} value={option}>
                {option} mois
              </option>
            ))}
          </select>
        </div>
      </div>
    </section>
  );
};
export default Revenu;