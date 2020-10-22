import React from "react";

const Charges = ({ onChange, sepSpace, fonciere, gestion, charges, pno }) => {
  return (
    <section id='charges'>
      <h3 className='form-header mt-20'>
        <i className='fas fa-weight-hanging header-i'></i>
        &nbsp;&nbsp;Charges annuelles d'exploitation
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
    </section>
  );
};
export default Charges;
