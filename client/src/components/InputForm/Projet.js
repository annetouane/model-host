import React from "react";

const Projet = ({
  onChange,
  sepSpace,
  netVendeur,
  travaux,
  ammeublement,
  notaire,
  agence,
}) => {
  const optionsAgence = []; // frais d'agence
  for (let i = 0; i < 11; i++) {
    optionsAgence.push(i);
  }

  return (
    <section id='projet'>
      <h3 className=' form-header'>
        <i className='fas fa-landmark header-i'></i>
        &nbsp;&nbsp;Description du projet
      </h3>
      <div className='flex-row jc-se mt-10'>
        <div className='flex-row jc-sb ai-fc form-group mr-10'>
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

        <div className='flex-row jc-sb ai-fc form-group ml-10'>
          <label>Code postal : </label>
          <input
            type='number'
            max='99999'
            min='1'
            name='codePostal'
            onChange={onChange}
            className='input-box fs-12'
            placeholder='Saisir Code Postal'
          />
        </div>
      </div>

      <div className='slidecontainer form-group mt-20'>
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

      <div className='slidecontainer form-group mt-20'>
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

      <div className='slidecontainer form-group mt-20'>
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

      <div className='flex-row jc-se ai-fc mt-10 mt-20'>
        <div className='flex-row jc-sb ai-fc form-group mr-10'>
          <label>
            Frais de notaire :
            <br />
            {sepSpace(netVendeur * notaire)} €
          </label>
          <select
            type='select'
            name='notaire'
            value={notaire}
            onChange={onChange}
            className='input-box fs-12'
          >
            <option value='0.075'>Ancien (7.5%)</option>
            <option value='0.03'>Neuf (3%)</option>
          </select>
        </div>

        <div className='flex-row jc-sb ai-fc form-group ml-10'>
          <label>
            Frais d'agence :
            <br />
            {sepSpace(netVendeur * agence)} €
          </label>
          <select
            type='select'
            name='agence'
            value={agence}
            onChange={onChange}
            className='input-box'
          >
            {optionsAgence.map((option) => (
              <option key={option} value={option / 100}>
                {option}%
              </option>
            ))}
          </select>
        </div>
      </div>
    </section>
  );
};
export default Projet;
