import React, { useState } from "react";

export const Regime = ({ kpiData }) => {
  const [formData, setFormData] = useState({
    sciIs: null,
    lmnpReel: null,
    lmnpMicro: null,
    lmpReel: null,
    lmpMicro: null,
    nueReel: null,
    nueMicro: null,
    irl: 0.01,
  });

  const { irl } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.checked });
    kpiData(e.target.name, e.target.value);
  };

  const onChangeIrl = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const checkboxes = [
    {
      name: "sciIs",
      key: "checkBox1",
      label: "SCI à l'IS",
    },
    {
      name: "lmnpReel",
      key: "checkBox2",
      label: "LMNP au Réel",
    },
    {
      name: "lmnpMicro",
      key: "checkBox3",
      label: "LMNP au Micro Foncier",
    },
    {
      name: "lmpReel",
      key: "checkBox4",
      label: "LMP au Réel",
    },
    {
      name: "lmpMicro",
      key: "checkBox5",
      label: "LMP au Micro Foncier",
    },
    {
      name: "nueReel",
      key: "checkBox6",
      label: "Nue au Réel",
    },
    {
      name: "nueMicro",
      key: "checkBox7",
      label: "Nue au Micro Foncier",
    },
  ];

  return (
    <div>
      <h3 className='form-header mt-20'>
        <i className='fas fa-balance-scale header-i'></i>&nbsp;&nbsp;Régime
        fiscal
      </h3>
      <div className='flex-column jc-sb ai-fc form-group mt-10'>
        <label>
          Le régime fiscal est déterminé par le mode de détention (en direct ou
          via une société) et d'exploitation (location vide ou meublée) du bien,
          le revenu généré par le bien et les revenus de l’investisseurs ou
          encore la composition de son foyer fiscal. Certains régimes fiscaux
          dépendent du seul choix de l’investisseur, d’autre lui sont imposés
          par la situation de son foyer fiscal.
        </label>
        <div className='flex-row jc-fs mt-10 mb-10 flex-wrap bold fs-12'>
          {checkboxes.map((item) => (
            <div className='flex-row ai-fc mr-20' key={item.key}>
              <input
                className='mr-5'
                type='checkbox'
                name={item.name}
                onChange={onChange}
              />
              <label>{item.label}</label>
            </div>
          ))}
        </div>
        <small>
          Une modélisation sera calculée pour chaque régime fiscal sélectionné
        </small>
      </div>

      <div className='flex-row jc-se mt-20'>
        <div className='slidecontainer form-group flex-row jc-sb ai-fc'>
          <p className='w-55 fs-12 mr-10'>
            L'indice de référence des loyers (IRL) calculé par l'INSEE est le
            taux applicable pour augmenter le loyer d'un bail d'une année sur
            l'autre.
          </p>
          <div className='w-45 ml-10'>
            <label>
              Indice de référence des loyers :{" "}
              {Math.round((irl * 100 + Number.EPSILON) * 100) / 100} %
            </label>
            <input
              type='range'
              name='irl'
              value={irl}
              onChange={onChangeIrl}
              min='0'
              max='0.03'
              step='0.001'
              className='slider mt-5'
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Regime;
