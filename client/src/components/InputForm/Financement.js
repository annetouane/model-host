import React from "react";

const Financement = ({
  onChange,
  duree,
  apport,
  interet,
  assurance,
  width,
}) => {
  return (
    <section id='financement'>
      <h3 className='form-header'>
        <i className='fas fa-piggy-bank header-i'></i>
        &nbsp;&nbsp;Financement du projet
      </h3>
      <div className='form-group'>
        <div
          className={width < 760 ? "form-box-v mt-10" : "form-box-v mt-10 mr-5"}
        >
          <label>Durée d'emprunt : {duree} ans</label>
          <input
            type='range'
            name='duree'
            value={duree}
            onChange={onChange}
            min='0'
            max='30'
            className='slider mt-5'
          />
        </div>

        <div
          className={
            width < 760 ? "form-box-h-2 mt-10" : "form-box-h mt-10 ml-5"
          }
        >
          <label>Apport (€) : </label>&nbsp;
          <input
            type='number'
            placeholder='Saisir Apport'
            name='apport'
            value={apport}
            onChange={onChange}
            className='input-box fs-12'
          />
        </div>
      </div>

      <div className='form-group'>
        <div
          className={width < 760 ? "form-box-v mt-10" : "form-box-v mt-10 mr-5"}
        >
          <label>
            Taux d'intérêt :{" "}
            {Math.round((interet * 100 + Number.EPSILON) * 100) / 100} %
          </label>
          <input
            type='range'
            name='interet'
            value={interet}
            onChange={onChange}
            min='0'
            max='0.04'
            step='0.001'
            className='slider mt-5'
          />
        </div>

        <div
          className={width < 760 ? "form-box-v mt-10" : "form-box-v mt-10 ml-5"}
        >
          <label>
            Taux d'assurance :{" "}
            {Math.round((assurance * 100 + Number.EPSILON) * 100) / 100} %
          </label>
          <input
            type='range'
            name='assurance'
            value={assurance}
            onChange={onChange}
            min='0'
            max='0.01'
            step='0.0001'
            className='slider mt-5'
          />
        </div>
      </div>
    </section>
  );
};
export default Financement;
