import React from "react";

const Projet = ({
  onChange,
  sepSpace,
  netVendeur,
  travaux,
  ammeublement,
  notaire,
  agence,
  width,
}) => {
  const optionsAgence = []; // frais d'agence
  for (let i = 0; i < 11; i++) {
    optionsAgence.push(i);
  }

  return (
    <section id='projet'>
      <h3 className='form-header'>
        <i className='fas fa-landmark header-i'></i>
        &nbsp;&nbsp;Description du projet
      </h3>
      <div className='form-group'>
        <div
          className={
            width < 760 ? "form-box-h-2 mt-10" : "form-box-h-2 mr-5 mt-10"
          }
        >
          <label>Type de bien : </label>
          <select
            type='select'
            name='type'
            onChange={onChange}
            className='input-box fs-12'
            defaultValue='Selection...'
          >
            <option>Selection...</option>
            <option value='appartement'>Appartement</option>
            <option value='immeuble'>Immeuble</option>
            <option value='maison'>Maison</option>
            <option value='parking'>Parking</option>
            <option value='commerce'>Local Commercial</option>
          </select>
        </div>

        <div
          className={
            width < 760 ? "form-box-h-2 mt-10" : "form-box-h-2 ml-5 mt-10"
          }
        >
          <label>Code postal : </label>
          <input
            type='number'
            max='99999'
            min='1'
            name='codePostal'
            onChange={onChange}
            className='input-box fs-12'
            placeholder='Saisir code postal'
          />
        </div>
      </div>

      <div className='form-box-v mt-10'>
        <label>Net vendeur : {sepSpace(netVendeur)} €</label>
        <input
          type='range'
          name='netVendeur'
          value={netVendeur}
          onChange={onChange}
          min='0'
          max='1000000'
          step='500'
          className='slider mt-5'
        />
      </div>

      <div className='form-box-v mt-10'>
        <label>Travaux : {sepSpace(travaux)} €</label>
        <input
          type='range'
          name='travaux'
          value={travaux}
          onChange={onChange}
          min='0'
          max='300000'
          step='200'
          className='slider mt-5'
        />
      </div>

      <div className='form-box-v mt-10'>
        <label>Ammeublement : {sepSpace(ammeublement)} €</label>
        <input
          type='range'
          name='ammeublement'
          value={ammeublement}
          onChange={onChange}
          min='0'
          max='100000'
          step='100'
          className='slider mt-5'
        />
      </div>

      <div className='form-group'>
        <div
          className={width < 760 ? "form-box-h mt-10" : "form-box-h mr-5 mt-10"}
        >
          <label>Frais de notaire :</label>&nbsp;&nbsp;
          <select
            type='select'
            name='notaire'
            value={notaire}
            onChange={onChange}
            className='input-box-2 fs-12'
          >
            <option value='0.075'>Ancien (7.5%)</option>
            <option value='0.03'>Neuf (3%)</option>
          </select>
          &nbsp;&nbsp;
          <p>= {sepSpace(netVendeur * notaire)} €</p>
        </div>

        <div
          className={width < 760 ? "form-box-h mt-10" : "form-box-h ml-5 mt-10"}
        >
          <label>Frais d'agence :</label>&nbsp;&nbsp;&nbsp;
          <select
            type='select'
            name='agence'
            value={agence}
            onChange={onChange}
            className='input-box-2 fs-12'
          >
            {optionsAgence.map((option) => (
              <option key={option} value={option / 100}>
                {option}%
              </option>
            ))}
          </select>
          &nbsp;&nbsp;&nbsp;
          <p>= {sepSpace(netVendeur * agence)} €</p>
        </div>
      </div>
    </section>
  );
};
export default Projet;
