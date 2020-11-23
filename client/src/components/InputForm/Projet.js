import React, { useState } from "react";
import MobilePagination from "./MobilePagination";
import ReactTooltip from 'react-tooltip';

const Projet = ({
  onChange,
  showModal,
  sepSpace,
  setMobileDisplayTab,
  mobileDisplayTab,
  netVendeur,
  travaux,
  ammeublement,
  notaire,
  agence,
  width,
  formCheck,
}) => {
  const optionsAgence = []; // frais d'agence
  for (let i = 0; i < 11; i++) {
    optionsAgence.push(i);
  }

  const [isButtonDisabled, setIsButtonDisabled] = useState(false)

  setTimeout(() => setIsButtonDisabled(true), 30000);
  
  return (
    <section id='projet' style={{ marginBottom: width < 770 && formCheck ? "80px" : "0" }}>
      {width > 770 ?
      <h3 className='form-header'>
        <i className='fas fa-landmark header-i'></i>
        &nbsp;&nbsp;Description du projet
      </h3> : ""}
      {/* "#01c96c 007be8" */}
      {width > 770 && !isButtonDisabled ? 
        <ReactTooltip
          delayHide={200} 
          backgroundColor="#fff"
          multiline={true}
          border={true}
          borderColor="#cacaca"
          textColor="#333"
          className="transparent"
          place="left"
        /> 
        : ""}
      
      <div className='form-box-v mt-10'>
        <label>Net vendeur : {sepSpace(netVendeur)} €</label>
        <div className='info-button'>
          <input
            data-tip="Utiliser les flèches du <br/> clavier pour  ajuster la <br/>valeur des jauges"
            type='range'
            name='netVendeur'
            value={netVendeur}
            onChange={onChange}
            min='0'
            max='1000000'
            step='500'
            className='slider mt-5'
          />
          <i
            id='info-net-vendeur'
            onClick={showModal}
            className='fas fa-question-circle'
          ></i>
        </div>
      </div>

      <div className='form-box-v mt-10'>
        <label>Travaux : {sepSpace(travaux)} €</label>
        <div className='info-button'>
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
          <i
            id='info-travaux'
            onClick={showModal}
            className='fas fa-question-circle'
          ></i>
        </div>
      </div>

      <div className='form-box-v mt-10'>
        <label>Ammeublement : {sepSpace(ammeublement)} €</label>
        <div className='info-button'>
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
          <i
            id='info-ammeublement'
            onClick={showModal}
            className='fas fa-question-circle'
          ></i>
        </div>
      </div>

      <div className='form-group'>
        <div
          className={width < 770 ? "form-box-h mt-10" : "form-box-h mr-5 mt-10"}
        >
          <div className='horizontal-input'>
            <label>Frais de notaire :</label>
            <p>{sepSpace(netVendeur * notaire)} €</p>
            <select
              type='select'
              name='notaire'
              value={notaire}
              onChange={onChange}
              className='input-box-2 fs-12'
            >
              <option value='0.075'>7.5% (Ancien)</option>
              <option value='0.03'>3%   (Neuf)</option>
            </select>
          </div>
          <i
            id='info-notaire'
            onClick={showModal}
            className='fas fa-question-circle fa-lg'
          ></i>
        </div>

        <div
          className={width < 770 ? "form-box-h mt-10" : "form-box-h ml-5 mt-10"}
        >
          <div className='horizontal-input'>
            <label style={{ marginRight: "5px" }}>Frais d'agence :</label>
            <p>{sepSpace(netVendeur * agence)} €</p>
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
          </div>
          <i
            id='info-agence'
            onClick={showModal}
            className='fas fa-question-circle fa-lg'
          ></i>
        </div>
      </div>
      {width < 700 ?
      <MobilePagination
          setMobileDisplayTab={setMobileDisplayTab}
          mobileDisplayTab={mobileDisplayTab}
      /> : ""}
    </section>
  );
};
export default Projet;
