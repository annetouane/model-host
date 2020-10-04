import React, { useState } from "react";

export const Charges = ({ kpiData }) => {
  const [formData, setFormData] = useState({
    fonciere: 0,
    gestion: 0,
    charges: 0,
    pno: 0,
  });

  const { fonciere, gestion, charges, pno } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    kpiData(e.target.name, e.target.value);
  };

  const sepSpace = (value) => {
    return Math.round(value)
      .toString()
      .replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  };

  return (
    <div>
      <h3 className='form-header mt-20'>
        <i className='fas fa-weight-hanging header-i'></i>&nbsp;&nbsp;Charges
        d'exploitation
      </h3>
      <div className='flex-row jc-se mt-10'>
        <div className='slidecontainer form-group mr-10'>
          <label>Taxe foncière : {sepSpace(fonciere)} €</label>
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
        </div>

        <div className='slidecontainer form-group ml-10'>
          <label>Gestion locative : {sepSpace(gestion)} €</label>
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
        </div>
      </div>

      <div className='flex-row jc-se mt-20'>
        <div className='slidecontainer form-group mr-10'>
          <label>Charges courantes : {sepSpace(charges)} €</label>
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
        </div>

        <div className='slidecontainer form-group ml-10'>
          <label>Assurance PNO : {sepSpace(pno)} €</label>
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
        </div>
      </div>
    </div>
  );
};

export default Charges;
