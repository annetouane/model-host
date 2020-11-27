import React, { useState } from "react";
import MobilePagination from "./MobilePagination";
import ReactTooltip from 'react-tooltip';
import NumberFormat from 'react-number-format';

const Projet = ({
  onChange,
  showModal,
  sepSpace,
  setMobileDisplayTab,
  focusMethod,
  onChangeDecimals,
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

  setTimeout(() => setIsButtonDisabled(true), 20000);
  
  return (
    <section id='projet' style={{ marginBottom: width < 770 && formCheck ? "80px" : "0" }}>
      {width > 770 ?
      <h3 className='form-header'>
        <i className='fas fa-landmark header-i'></i>
        &nbsp;&nbsp;Description du projet
      </h3> : ""}
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
        <div className='type-alt-slider'>
          <label>Net vendeur <small>(hors frais d'agence)</small> : </label>
          <div className="flex-row ai-fs">
            <NumberFormat
              id="projet-edit"
              name='netVendeur'
              value={netVendeur}
              displayType={'number'}
              thousandSeparator={" "}
              suffix={' €'}
              onChange={onChange}
              allowNegative={false}
              isAllowed={(values) => {
                const {floatValue} = values;
                return floatValue >= 0 &&  floatValue <= 1000000;
              }}
            />
            <small onClick={() => focusMethod("projet-edit")} style={{ fontSize: "13px" }}>
              <i class="far fa-edit"></i>
            </small>
          </div>
        </div>

        <div className='info-button'>
          <input
            data-tip="La valeur des jauges est modifiable soit<br>avec la souris, soit à l'aide des flèches<br>du clavier ou en éditant directement<br>la valeur à droite de chaque jauge"
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

      <div className='form-group'>
        <div className={width < 770 ? 'form-box-v mt-10' : 'form-box-v mr-5 mt-10'}>
        <div className='type-alt-slider'>
            <label>Travaux : </label>
            <div className="flex-row ai-fs">
              <NumberFormat
                id="travaux-edit"
                name='travaux'
                value={travaux}
                displayType={'number'}
                thousandSeparator={" "}
                suffix={' €'}
                onChange={onChange}
                allowNegative={false}
                isAllowed={(values) => {
                  const {floatValue} = values;
                  return floatValue >= 0 &&  floatValue <= 300000;
                }}
              />
              <small onClick={() => focusMethod("travaux-edit")} style={{ fontSize: "13px" }}>
                <i class="far fa-edit"></i>
              </small>
            </div>
          </div>

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
        
        <div className={width < 770 ? 'form-box-v mt-10' : 'form-box-v ml-5 mt-10'}>
          <div className='type-alt-slider'>
            <label>Ammeublemment : </label>
            <div className="flex-row ai-fs">
              <NumberFormat
                id="ammeublement-edit"
                name='ammeublement'
                value={ammeublement}
                displayType={'number'}
                thousandSeparator={" "}
                suffix={' €'}
                onChange={onChange}
                allowNegative={false}
                isAllowed={(values) => {
                  const {floatValue} = values;
                  return floatValue >= 0 &&  floatValue <= 100000;
                }}
              />
              <small onClick={() => focusMethod("ammeublement-edit")} style={{ fontSize: "13px" }}>
                <i class="far fa-edit"></i>
              </small>
            </div>
          </div>

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
              onChange={onChangeDecimals}
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
              onChange={onChangeDecimals}
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
