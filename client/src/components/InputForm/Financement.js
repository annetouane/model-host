import React from "react";
import MobilePagination from "./MobilePagination";
import NumberFormat from 'react-number-format';

const Financement = ({
  onChange,
  showModal,
  sepSpace,
  setMobileDisplayTab,
  onChangeDecimals,
  focusMethod,
  mobileDisplayTab,
  duree,
  apport,
  interet,
  assurance,
  fraisBancaires,
  fraisCourtier,
  coutProjet,
  emprunt,
  width,
  formCheck,
}) => {
  return (
    <section id='financement' style={{ marginBottom: width < 770 && formCheck ? "80px" : "0" }}>
      {width > 770 ?
      <h3 className='form-header'>
        <i className='fas fa-piggy-bank header-i'></i>
        &nbsp;&nbsp;Financement du projet
      </h3> : ""}
      <div className='form-group'>
        <div
          className={width < 770 ? "form-box-v mt-10" : "form-box-v mt-10 mr-5"}
        >
          <label>Durée d'emprunt : {duree} ans</label>
          <div className='info-button'>
            <input
              type='range'
              name='duree'
              value={duree}
              onChange={onChange}
              min='0'
              max='30'
              className='slider mt-5'
            />
            <i
              id='info-duree'
              onClick={showModal}
              className='fas fa-question-circle'
            ></i>
          </div>
        </div>

        <div
          className={
            width < 770 ? "form-box-h-2 mt-10" : "form-box-h-2 mt-10 ml-5"
          }
        >
          <div className='apport'>
            <label>Apport (€) : </label>&nbsp;
            <input
              type='number'
              placeholder='Saisir Apport'
              name='apport'
              value={apport}
              onChange={onChange}
              className={apport === "" ? 'input-box-false fs-12' : 'input-box fs-12'}
            />
            <i
              id='info-apport'
              onClick={showModal}
              class='fas fa-question-circle '
            ></i>
          </div>
            {apport > coutProjet ?
              <small style={{marginTop: "5px", color: "orange", fontWeight: "bold"}}>Apport supérieur au coût du projet<i style={{color:"orange"}}class="fas fa-exclamation-circle"></i></small>
            : ""}
        </div>
      </div>

      <div className='form-group'>
        <div
          className={width < 770 ? "form-box-v mt-10" : "form-box-v mt-10 mr-5"}
        >
          <label>
            Taux d'intérêt :{" "}
            {Math.round((interet * 100 + Number.EPSILON) * 100) / 100} %
          </label>
          <div className='info-button'>
            <input
              type='range'
              name='interet'
              value={interet}
              onChange={onChangeDecimals}
              min='0'
              max='0.04'
              step='0.0001'
              className='slider mt-5'
            />
            <i
              id='info-interet'
              onClick={showModal}
              class='fas fa-question-circle'
            ></i>
          </div>
        </div>

        <div
          className={width < 770 ? "form-box-v mt-10" : "form-box-v mt-10 ml-5"}
        >
          <label> 
            Taux d'assurance :{" "}
            {Math.round((assurance * 100 + Number.EPSILON) * 100) / 100} %
          </label>
          <div className='info-button'>
            <input
              type='range'
              name='assurance'
              value={assurance}
              onChange={onChangeDecimals}
              min='0'
              max='0.01'
              step='0.0001'
              className='slider mt-5'
            />
            <i
              id='info-assurance'
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
          <div className="flex-column">
            <label>Frais bancaires :</label>
              {emprunt ?
                <small>soit {Math.round((fraisBancaires / emprunt * 100 + Number.EPSILON) * 100) / 100} % du capital emprunté</small>
              : ""}
            </div>      
          <div className="flex-row ai-fs">
            <NumberFormat
              id="frais-bancaire-edit"
              name='fraisBancaires'
              value={fraisBancaires}
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
            <small onClick={() => focusMethod("frais-bancaire-edit")} style={{ fontSize: "13px" }}>
              <i class="far fa-edit"></i>
            </small>
          </div>
        </div>

          <div className='info-button'>
            <input
              type='range'
              name='fraisBancaires'
              value={fraisBancaires}
              onChange={onChange}
              min='0'
              max='10000'
              step='10'
              className='slider mt-5'
            />
            <i
              id='info-frais-bancaires'
              onClick={showModal}
              className='fas fa-question-circle'
            ></i>
          </div>
        </div>

        <div
          className={width < 770 ? "form-box-v mt-10" : "form-box-v mt-10 ml-5"}
        >
          <div className='type-alt-slider'>
            <div className="flex-column">
              <label>Frais de courtier :</label>
                  {emprunt ?
                  <small>soit {Math.round((fraisCourtier / emprunt * 100 + Number.EPSILON) * 100) / 100} % du capital emprunté</small>
              : ""}
            </div>   
          <div className="flex-row ai-fs">
            <NumberFormat
              id="frais-courtier-edit"
              name='fraisCourtier'
              value={fraisCourtier}
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
            <small onClick={() => focusMethod("frais-courtier-edit")} style={{ fontSize: "13px" }}>
              <i class="far fa-edit"></i>
            </small>
          </div>
        </div>

          <div className='info-button'>
            <input
              type='range'
              name='fraisCourtier'
              value={fraisCourtier}
              onChange={onChange}
              min='0'
              max='10000'
              step='10'
              className='slider mt-5'
            />
            <i
              id='info-frais-courtier'
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
export default Financement;
