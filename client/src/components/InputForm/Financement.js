import React from "react";

const Financement = ({ onChange, duree, apport, interet, assurance }) => {
  return (
    <section id='financement'>
      <h3 className='form-header'>
        <i className='fas fa-piggy-bank header-i'></i>
        &nbsp;&nbsp;Financement du projet
      </h3>
      <div className='flex-row jc-se mt-10'>
        <div className='slidecontainer form-group mr-10'>
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

        <div className='flex-row jc-sb ai-fc form-group ml-10'>
          <label>Apport (€) : </label>
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

      <div className='flex-row jc-se mt-20'>
        <div className='slidecontainer form-group mr-10'>
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

        <div className='slidecontainer form-group ml-10'>
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
            className='slider fs-12'
          />
        </div>
      </div>
    </section>
  );
};
export default Financement;
