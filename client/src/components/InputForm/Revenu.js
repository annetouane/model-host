import React from "react";
import MobilePagination from "./MobilePagination";
import NumberFormat from 'react-number-format';

const Revenu = ({
  onChange,
  sepSpace,
  setMobileDisplayTab,
  focusMethod,
  mobileDisplayTab,
  onChangeDecimals,
  loyer,
  chargesLoc,
  occupation,
  width,
  showModal,
  formCheck,
}) => {
  const optionsOccupation = []; // options taux occupation
  for (let i = 1; i <= 12; i += 0.5) {
    optionsOccupation.push(i);
    console.log(optionsOccupation)
  }

  return (
    <section id='revenu' style={{ marginBottom: width < 770 && formCheck ? "80px" : "0" }}>
      {width > 770 ?
      <h3 className='form-header'>
        <i className='fas fa-hand-holding-usd header-i'></i>
        &nbsp;&nbsp;Revenu annuel d'exploitation
      </h3> : ""}
      <div className='form-group'>
        <div className='form-box-v mt-10'>
        <div className='type-alt-slider'>
          <div>
          <label>Loyer mensuel&nbsp;
            <small style={{ marginLeft: 0 }}>
            <strong>
              (<i 
                style={{ marginLeft: 0, cursor: "auto", color: "#007be8" }} 
                className="fas fa-exclamation-circle">
              </i> charges comprises)</strong>
            </small>
          </label>
          <button 
              id='info-loyer' 
              onClick={showModal}
              className='question-mark'
            >?</button>
          </div>
          <div className="border-input">
            <NumberFormat
              id="loyer-edit"
              name='loyer'
              value={loyer}
              displayType={'number'}
              thousandSeparator={" "}
              suffix={' €'}
              onChange={onChange}
              allowNegative={false}
              isAllowed={(values) => {
                const {floatValue} = values;
                return floatValue >= 0 &&  floatValue <= 10000;
              }}
            />
              <i 
                onClick={() => focusMethod("loyer-edit")} 
                style={{ fontSize: "14px" }} 
                className="fas fa-pencil-alt"
              ></i>
            </div>
          </div>

          <div className='info-button'>
            <input
              type='range'
              name='loyer'
              value={loyer}
              onChange={onChange}
              min='0'
              max='10000'
              step='20'
              className='slider mt-5'
            />
          </div>
        </div>
      </div>

      <div className='form-group'>
        <div
          className={width < 770 ? "form-box-v-half mt-10" : "form-box-v-half mt-10 mr-5"}
        >
        <div className='type-alt-slider'>
          <div>
            <label>
              Charges locataires<small><strong> (/an)</strong></small>
            </label>
            <button 
                id='info-locataire'
                onClick={showModal}
                className='question-mark'
            >?</button>
          </div>
          <div className="border-input">
            <NumberFormat
              id="chargesLoc-edit"
              name='chargesLoc'
              value={chargesLoc}
              displayType={'number'}
              thousandSeparator={" "}
              suffix={' €'}
              onChange={onChange}
              allowNegative={false}
              isAllowed={(values) => {
                const {floatValue} = values;
                return floatValue >= 0 &&  floatValue <= 10000;
              }}
            />
            <i 
              onClick={() => focusMethod("chargesLoc-edit")} 
              style={{ fontSize: "14px" }} 
              className="fas fa-pencil-alt"
            ></i>
          </div>
        </div>

          <div className='info-button'>
            <input
              type='range'
              name='chargesLoc'
              value={chargesLoc}
              onChange={onChange}
              min='0'
              max='10000'
              step='20'
              className='slider mt-5'
            />
          </div>
        </div>

        <div
          className={
            width < 770 ? "form-box-h-4 mt-10" : "form-box-h-4 mt-10 ml-5"
          }
        >
          <div>
            <label>Occupation annuelle</label>
            <button 
                  id='info-occupation'
                  onClick={showModal}
                  className='question-mark'
              >?</button>
          </div>
          <select
            type='select'
            name='occupation'
            value={occupation}
            onChange={onChangeDecimals}
            className='input-box-2 fs-12'
          >
            {optionsOccupation.map((option) => (
              <option key={option} value={option}>
                {option} mois
              </option>
            ))}
          </select>
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
export default Revenu;
