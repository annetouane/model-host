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
  netVendeur,
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
          className={width < 770 ? "form-box-v-half mt-10" : "form-box-v-half mt-10 mr-5"}
        >
          <div style={{width: '100%'}} className='flex-row jc-sb ai-fc'>
            <div className='type-alt-slider'>
              <div>
                <label>Durée d'emprunt</label>
                <button
                      id='info-duree'
                      onClick={showModal}
                      className='question-mark'
                >?</button>
              </div>

              <div className="border-input">
                <NumberFormat
                  id="frais-duree"
                  name='duree'
                  value={duree}
                  displayType={'number'}
                  suffix={' ans'}
                  onChange={onChange}
                  allowNegative={false}
                  isAllowed={(values) => {
                    const {floatValue} = values;
                    return floatValue >= 0 &&  floatValue <= 30;
                  }}
                />
                <i 
                  onClick={() => focusMethod("frais-duree")} 
                  style={{ fontSize: "14px" }} 
                  className="fas fa-pencil-alt"
                ></i>
              </div>
            </div>
          </div>

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
          </div>
        </div>

        <div
          className={
            width < 770 ? "form-box-h-2 mt-10" : "form-box-h-2 mt-10 ml-5"
          }
        >
          <div className='apport'>
            <div>
              <label>Apport</label>
              <button
                id='info-apport'
                onClick={showModal}
                className='question-mark'
              >?</button>
            </div>
            <input
              type='number'
              placeholder="Sans apport ? Saisir 0"
              name='apport'
              value={apport}
              onChange={onChange}
              className={isNaN(parseInt(apport)) ? 'input-box-false fs-12' : 'input-box fs-12'}
            />
          </div>
            {(apport > coutProjet && netVendeur != 0) ?
              <small
                style={{ marginTop: "5px",
                         color: "#007be8", 
                         fontWeight: "bold" }}
                >
                <i
                  style={{  marginLeft: "0",
                            marginRight: "5px",
                            color: "#007be8" }}
                  class="fas fa-exclamation-circle">
                </i>
                Apport supérieur au coût du projet. L'investisseur finance le projet à 100% sans contracter d'emprunt.
              </small>
            : ""}
        </div>
      </div>

      <div className='form-group'>
        <div
          className={width < 770 ? "form-box-v-half mt-10" : "form-box-v-half mt-10 mr-5"}
        >
        <div className='type-alt-slider'>
          <div style={{width: '100%'}} className='flex-row jc-sb ai-fc'>
            <div>
              <label >Taux d'intérêt</label>
              <button
                id='info-interet'
                onClick={showModal}
                className='question-mark'
              >?</button>
            </div>

            <div className="border-input">
              <NumberFormat
                    id="frais-interet"
                    name='interet'
                    value={interet}
                    decimalScale={2}
                    suffix={' %'}
                    onChange={onChangeDecimals}
                    allowNegative={false}
                    isAllowed={(values) => {
                      const {floatValue} = values;
                      return floatValue >= 0 &&  floatValue <= 4;
                    }}
                  />
                <i
                  onClick={() => focusMethod("frais-interet")}
                  style={{ fontSize: "14px" }}
                  className="fas fa-pencil-alt"
                ></i>
              </div>
          </div>
        </div>

          <div className='info-button'>
            <input
              type='range'
              name='interet'
              value={interet}
              onChange={onChangeDecimals}
              min='0'
              max='4'
              step='0.01'
              className='slider mt-5'
            />
          </div>
        </div>

        <div
          className={width < 770 ? "form-box-v-half mt-10" : "form-box-v-half mt-10 ml-5"}
        >
          <div className='type-alt-slider'>
            <div style={{width: '100%'}} className='flex-row jc-sb ai-fc'>
              <div>
                <label >Taux d'assurance</label>
                <button
                  id='info-assurance'
                  onClick={showModal}
                  className='question-mark'
                >?</button>
              </div>

              <div className="border-input">
                  <NumberFormat
                    id="frais-assurance"
                    name='assurance'
                    value={assurance}
                    decimalScale={2}
                    suffix={' %'}
                    onChange={onChangeDecimals}
                    allowNegative={false}
                    isAllowed={(values) => {
                      const {floatValue} = values;
                      return floatValue >= 0 &&  floatValue <= 1;
                    }}
                  />
                  <i
                    onClick={() => focusMethod("frais-assurance")}
                    style={{ fontSize: "14px" }}
                    className="fas fa-pencil-alt"
                  ></i>
                </div>
            </div>
          </div>
          <div className='info-button'>
            <input
              type='range'
              name='assurance'
              value={assurance}
              onChange={onChangeDecimals}
              min='0'
              max='1'
              step='0.01'
              className='slider mt-5'
            />
          </div>
        </div>
      </div>

      <div className='form-group'>
        <div
          className={width < 770 ? "form-box-v-half mt-10" : "form-box-v-half mt-10 mr-5"}
          style={{ height: "100px" }}
        >
        <div className='type-alt-slider'>
          <div className="flex-column">
            <div>
              <label>Frais bancaires</label>
              <button
                  id='info-frais-bancaires'
                  onClick={showModal}
                  className='question-mark'
              >?</button>
            </div>
              {emprunt ?
                <small>soit {Math.round((fraisBancaires / emprunt * 100 + Number.EPSILON) * 100) / 100} % du capital emprunté</small>
              : ""}
            </div>      
          <div className="border-input">
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
              <i 
                onClick={() => focusMethod("frais-bancaire-edit")} 
                style={{ fontSize: "14px" }}
                className="fas fa-pencil-alt"
              ></i>
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
          </div>
        </div>

        <div
          className={width < 770 ? "form-box-v-half mt-10" : "form-box-v-half mt-10 ml-5"}
          style={{ height: "100px" }}
        >
          <div className='type-alt-slider'>
            <div className="flex-column">
            <div>
              <label>Frais de courtier</label>
              <button
                  id='info-frais-courtier'
                  onClick={showModal}
                  className='question-mark'
              >?</button>
              </div>
                  {emprunt ?
                  <small>soit {Math.round((fraisCourtier / emprunt * 100 + Number.EPSILON) * 100) / 100} % du capital emprunté</small>
              : ""}
            </div>   
          <div className="border-input">
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
              <i 
                onClick={() => focusMethod("frais-courtier-edit")} 
                style={{ fontSize: "14px" }} 
                className="fas fa-pencil-alt"
              ></i>
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
