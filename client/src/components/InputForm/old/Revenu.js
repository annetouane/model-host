import React, { useState } from "react";

export const Revenu = ({ kpiData }) => {
  const [formData, setFormData] = useState({
    loyer: 0,
    chargesLoc: 0,
    occupation: 11,
  });

  const { loyer, chargesLoc, occupation } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    kpiData(e.target.name, e.target.value);
  };

  const sepSpace = (value) => {
    return Math.round(value)
      .toString()
      .replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  };

  const options = [];
  for (let i = 1; i <= 12; i += 0.5) {
    options.push(i);
  }

  return (
    <div id='Operations'>
      <h3 className='form-header mt-20'>
        <i className='fas fa-hand-holding-usd header-i'></i>&nbsp;&nbsp;Revenu
        d'exploitation
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
            {options.map((option) => (
              <option key={option} value={option}>
                {option} mois
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};

export default Revenu;
