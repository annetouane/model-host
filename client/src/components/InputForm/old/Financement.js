import React, { useState } from "react";

export const Financement = ({ kpiData }) => {
  const [formData, setFormData] = useState({
    duree: 20,
    apport: "",
    interet: 0.012,
    assurance: 0.001,
  });

  const { duree, apport, interet, assurance } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    kpiData(e.target.name, e.target.value);
  };

  return (
    <div>
      <h3 className='form-header mt-20'>
        <i className='fas fa-piggy-bank header-i'></i>&nbsp;&nbsp;Financement du
        projet
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
    </div>
  );
};

export default Financement;
