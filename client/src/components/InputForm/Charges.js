import React from "react";
import MobilePagination from "./MobilePagination";
import NumberFormat from 'react-number-format';

const Charges = ({
  onChange,
  showModal,
  setMobileDisplayTab,
  mobileDisplayTab,
  focusMethod,
  revAnnuel,
  fonciere,
  gestion,
  charges,
  chargesLoc,
  pno,
  width,
}) => {
  return (
    <section id='charges'>
      {width > 770 ?
      <h3 className='form-header'>
        <i className='fas fa-weight-hanging header-i'></i>
        &nbsp;&nbsp;Charges annuelles d'exploitation
      </h3> : ""}
        <div className='form-group'>
          <div
              className={width < 770 ? "form-box-v-half mt-10" : "form-box-v-half mt-10 mr-5"}
              style={{height: "100px"}}
            >

        <div className='type-alt-slider'>
        <div className="flex-column jc-fs">
          <div >
            <label>Charges courantes</label>
            <button 
                id='info-charges' 
                onClick={showModal}
                className='question-mark'
              >?</button>
          </div>
          <small style={{ marginLeft: 0 }}>
            <i 
              style={{ marginLeft: 0, cursor: "auto", color: "#007be8" }} 
              className="fas fa-exclamation-circle">
            </i> <strong>Inclure les charges locataires</strong>
          </small>
          </div>
          <div className="border-input">
            <NumberFormat
              id="charges-edit"
              name='charges'
              value={charges}
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
              onClick={() => focusMethod("charges-edit")} 
              style={{ fontSize: "14px" }} 
              className="fas fa-pencil-alt"
            ></i>
          </div>
        </div>              
          
          <div className='info-button'>
            <input
              type='range'
              name='charges'
              value={charges}
              onChange={onChange}
              min='0'
              max='10000'
              step='10'
              className='slider'
            />
          </div>
        </div>

        <div
          className={width < 770 ? "form-box-v-half mt-10" : "form-box-v-half mt-10 ml-5"}
          style={{ height: "100px" }}
        >
        <div className='type-alt-slider'>
          <div className="flex-column jc-fs">
            <div>
              <label>Gestion locative</label>
              <button 
                  id='info-gestion' 
                  onClick={showModal}
                  className='question-mark'
                >?</button>
            </div>
              <small 
                // style={{ visibility: revAnnuel !== 0 ? 'visible' : 'hidden' }}
                >
                  {Math.round((gestion / (revAnnuel - chargesLoc) * 100 + Number.EPSILON) * 100) / 100} % des loyers perçus hors charges
              </small>
            </div>
          <div className="border-input">
            <NumberFormat
              id="gestion-edit"
              name='gestion'
              value={gestion}
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
              onClick={() => focusMethod("gestion-edit")} 
              style={{ fontSize: "14px" }} 
              className="fas fa-pencil-alt"
            ></i>
          </div>
        </div>     

          <div className='info-button'>
            <input
              type='range'
              name='gestion'
              value={gestion}
              onChange={onChange}
              min='0'
              max='10000'
              step='10'
              className='slider'
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
              <label>Taxe foncière</label>
              <button 
                  id='info-fonciere' 
                  onClick={showModal}
                  className='question-mark'
              >?</button>
            </div>
          <div className="border-input">
            <NumberFormat
              id="fonciere-edit"
              name='fonciere'
              value={fonciere}
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
              onClick={() => focusMethod("fonciere-edit")} 
              style={{ fontSize: "14px" }} 
              className="fas fa-pencil-alt"
            ></i>
          </div>
        </div>

          <div className='info-button'>
            <input
              type='range'
              name='fonciere'
              value={fonciere}
              onChange={onChange}
              min='0'
              max='10000'
              step='10'
              className='slider mt-5'
            />
          </div>
        </div>

        <div
          className={width < 770 ? "form-box-v-half mt-10" : "form-box-v-half mt-10 ml-5"}
        >
          <div className='type-alt-slider'>
          <div>
              <label>Assurances PNO & GLI</label>
              <button 
                  id='info-pno' 
                  onClick={showModal}
                  className='question-mark'
              >?</button>
            </div>
          <div className="border-input">
            <NumberFormat
              id="pno-edit"
              name='pno'
              value={pno}
              displayType={'number'}
              thousandSeparator={" "}
              suffix={' €'}
              onChange={onChange}
              allowNegative={false}
              isAllowed={(values) => {
                const {floatValue} = values;
                return floatValue >= 0 &&  floatValue <= 2000;
              }}
            />
            <i 
              onClick={() => focusMethod("pno-edit")} 
              style={{ fontSize: "14px" }} 
              className="fas fa-pencil-alt"
            ></i>
          </div>
        </div>          

          <div className='info-button'>
            <input
              type='range'
              name='pno'
              value={pno}
              onChange={onChange}
              min='0'
              max='2000'
              step='10'
              className='slider mt-5'
            />
          </div>
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
export default Charges;
