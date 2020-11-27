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
              className={width < 770 ? "form-box-v mt-10" : "form-box-v mt-10 mr-5"}
            >

        <div className='type-alt-slider'>
        <div className="flex-column jc-fs">
          <label>Charges courantes :</label>
          <small style={{ marginLeft: 0 }}>
            <i 
              style={{ marginLeft: 0, cursor: "auto" }} 
              className="fas fa-exclamation-circle">
            </i> Exclure les charges locataires
          </small>
          </div>
          <div className="flex-row ai-fs">
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
              className="far fa-edit"
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
              className='slider mt-5'
            />
            <i
              id='info-charges'
              onClick={showModal}
              className='fas fa-question-circle'
            ></i>
          </div>
        </div>

        <div
          className={width < 770 ? "form-box-v mt-10" : "form-box-v mt-10 ml-5"}
        >
        <div className='type-alt-slider'>
          <div className="flex-column jc-fs">
            <label>Gestion locative :</label>
            <small style={{ visibility: revAnnuel !== 0 ? 'visible' : 'hidden' }}>{Math.round((gestion / revAnnuel * 100 + Number.EPSILON) * 100) / 100} % des loyers perçus</small>
            </div>
          <div className="flex-row ai-fs">
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
              className="far fa-edit"
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
              className='slider mt-5'
            />
            <i
              id='info-gestion'
              onClick={showModal}
              className='fas fa-question-circle'
            ></i>
          </div>
        </div>
      </div>

      <div className='form-group'>
      <div
          className={width < 770 ? "form-box-v mt-10" : "form-box-v mt-10 mr-5"}
        >
          <div className='type-alt-slider'>
            <label>Taxe foncière :</label>
          <div className="flex-row ai-fs">
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
              className="far fa-edit"
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
            <i
              id='info-fonciere'
              onClick={showModal}
              className='fas fa-question-circle'
            ></i>
          </div>
        </div>

        <div
          className={width < 770 ? "form-box-v mt-10" : "form-box-v mt-10 ml-5"}
        >
          <div className='type-alt-slider'>
          <label>Assurances PNO & GLI :</label>
          <div className="flex-row ai-fs">
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
              className="far fa-edit"
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
            <i
              id='info-pno'
              onClick={showModal}
              className='fas fa-question-circle'
            ></i>
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
