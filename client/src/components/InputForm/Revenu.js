import React from "react";
import MobilePagination from "./MobilePagination";
import NumberFormat from 'react-number-format';

const Revenu = ({
  onChange,
  sepSpace,
  setMobileDisplayTab,
  focusMethod,
  mobileDisplayTab,
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
  }

  return (
    <section id='revenu' style={{ marginBottom: width < 770 && formCheck ? "80px" : "0" }}>
      {width > 770 ?
      <h3 className='form-header'>
        <i className='fas fa-hand-holding-usd header-i'></i>
        &nbsp;&nbsp;Revenu annuel d'exploitation
      </h3> : ""}
      <div className='flex-row jc-se'>
        <div className='form-box-v mt-10'>
        <div className='type-alt-slider'>
          <label>Loyer mensuel&nbsp;
          <small style={{ marginLeft: 0 }}>
            (<i 
              style={{ marginLeft: 0, cursor: "auto" }} 
              className="fas fa-exclamation-circle">
            </i>charges comprises)
          </small> :</label>


          <div className="flex-row ai-fs">
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
                className="far fa-edit"
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
            <i
              id='info-loyer'
              onClick={showModal}
              class='fas fa-question-circle'
            ></i>
          </div>
        </div>
      </div>

      <div className='form-group'>
        <div
          className={width < 770 ? "form-box-v mt-10" : "form-box-v mt-10 mr-5"}
        >
        <div className='type-alt-slider'>
          <label>Charges locataires <small>(/an)</small> :</label>
          <div className="flex-row ai-fs">
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
              className="far fa-edit"
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
            <i
              id='info-locataire'
              onClick={showModal}
              class='fas fa-question-circle'
            ></i>
          </div>
        </div>

        <div
          className={
            width < 770 ? "form-box-h-4 mt-10" : "form-box-h-4 mt-10 ml-5"
          }
        >
          <label>Occupation annuelle : </label>
          <select
            type='select'
            name='occupation'
            value={occupation}
            onChange={onChange}
            className='input-box-2 fs-12'
          >
            {optionsOccupation.map((option) => (
              <option key={option} value={option}>
                {option} mois
              </option>
            ))}
          </select>
          <i
            id='info-occupation'
            onClick={showModal}
            class='fas fa-question-circle'
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
export default Revenu;
