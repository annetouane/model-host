import React, { useState } from "react";

export const Foyer = ({ kpiData }) => {
  const [formData, setFormData] = useState({
    revInvest1: 0,
    augInvest1: 0.01,
    revInvest2: 0,
    augInvest2: 0.01,
    partFisc: "",
  });

  const { revInvest1, augInvest1, revInvest2, augInvest2, partFisc } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    kpiData(e.target.name, e.target.value);
  };

  const options = [];
  for (let i = 0; i < 21; i++) {
    options.push(i);
  }

  const optionsPartFisc = [];
  for (let i = 1; i <= 5; i += 0.25) {
    optionsPartFisc.push(i);
  }

  const sepSpace = (value) => {
    return Math.round(value)
      .toString()
      .replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  };

  return (
    <div>
      <h3 className='form-header mt-20'>
        <i className='fas fa-house-user header-i'></i>&nbsp;&nbsp;Foyer fiscal
      </h3>
      <div className='form-group mt-10'>
        <h3>Investisseur N°1 :</h3>
        <div className='flex-row ai-fc mt-10'>
          <div className='slidecontainer mr-5'>
            <div className='flex-row jc-sb'>
              <label>Revenu net avant impôts : {sepSpace(revInvest1)} €</label>
              <label>Augmentation annuelle moyenne :</label>
            </div>
            <div>
              <input
                type='range'
                name='revInvest1'
                value={revInvest1}
                onChange={onChange}
                min='0'
                max='100000'
                className='slider mt-5'
              />
            </div>
          </div>
          <div className='w-15 ml-10'>
            <select
              type='select'
              name='augInvest1'
              value={augInvest1}
              onChange={onChange}
              className='input-box-2 fs-12'
            >
              {options.map((option) => (
                <option key={option} value={option / 100}>
                  {option}%
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className='form-group mt-20'>
        <h3>Investisseur N°2 :</h3>
        <div className='flex-row ai-fc mt-10'>
          <div className='slidecontainer mr-5'>
            <div className='flex-row jc-sb'>
              <label>Revenu net avant impôts : {sepSpace(revInvest2)} €</label>
              <label>Augmentation annuelle moyenne :</label>
            </div>
            <div>
              <input
                type='range'
                name='revInvest2'
                value={revInvest2}
                onChange={onChange}
                min='0'
                max='100000'
                className='slider mt-5'
              />
            </div>
          </div>
          <div className='w-15 ml-10'>
            <select
              type='select'
              name='augInvest2'
              value={augInvest2}
              onChange={onChange}
              className='input-box-2 fs-12'
            >
              {options.map((option) => (
                <option key={option} value={option / 100}>
                  {option}%
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className='form-group mt-20'>
        <div className='flex-row ai-fc mt-10'>
          <p className='fs-12 w-75'>
            En France, l'impôt sur le revenu est calculé au niveau du foyer
            fiscal. Les invdividus composant le foyer fiscal sont appelées parts
            fiscales. Le nombre de parts fiscales est une notion clé pour le
            calcul de l’impôt sur le revenu lorsque le foyer fiscal est composé
            de plusieurs individus.
          </p>
          <div className='flex-column w-25 ml-20'>
            <label>Part(s) Fiscale(s)</label>
            <select
              type='select'
              name='partFisc'
              value={partFisc}
              onChange={onChange}
              className='input-box-2 fs-12'
            >
              {optionsPartFisc.map((optionPartFisc) => (
                <option key={optionPartFisc} value={optionPartFisc}>
                  {optionPartFisc}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Foyer;
