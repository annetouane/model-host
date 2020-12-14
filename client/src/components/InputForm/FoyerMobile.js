import React from "react";
import MobilePagination from "./MobilePagination";
import NumberFormat from 'react-number-format';

const FoyerMobile = ({
  onChange,
  showModal,
  sepSpace,
  setMobileDisplayTab,
  focusMethod,
  mobileDisplayTab,
  revInvest1,
  augInvest1,
  revInvest2,
  augInvest2,
  width,
  formCheck,
}) => {
  const optionsAugmentation = [];
  for (let i = 0; i < 21; i++) {
    optionsAugmentation.push(i);
  }

  const optionsPartFisc = [];
  for (let i = 1; i <= 5; i += 0.25) {
    optionsPartFisc.push(i);
  }

  return (
    <section id='foyer' style={{ marginBottom: width < 770 && formCheck ? "80px" : "0" }}>
      <div className='form-box-v mt-10'>
        <div className='info-button'>
          <h4>Investisseur N° 1 :</h4>
        </div>

        <div className='type-alt-slider'>
          <div>
            <label>Revenu net avant impôt</label>
            <button 
                id='info-investisseur' 
                onClick={showModal}
                className='question-mark'
            >?</button>
          </div>
          <div className="flex-row ai-fs">
            <NumberFormat
              id="revInvest1-edit"
              name='revInvest1'
              value={revInvest1}
              displayType={'number'}
              thousandSeparator={" "}
              suffix={' €'}
              onChange={onChange}
              allowNegative={false}
              isAllowed={(values) => {
                const {floatValue} = values;
                return floatValue >= 0 &&  floatValue <= 150000;
              }}
            />
            <i 
              onClick={() => focusMethod("revInvest1-edit")} 
              style={{ fontSize: "14px" }}
              className="fas fa-pencil-alt"
            ></i>
          </div>
        </div>

        <input
          type='range'
          name='revInvest1'
          value={revInvest1}
          onChange={onChange}
          min='0'
          max='150000'
          className='slider mt-5'
        />
        <div className='invest-rev'>
          <label>Augmentation annuelle moyenne :</label>
          <select
            type='select'
            name='augInvest1'
            value={augInvest1}
            onChange={onChange}
            className='augmentation fs-12'
          >
            {optionsAugmentation.map((option) => (
              <option key={option} value={option / 100}>
                {option}%
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className='form-box-v mt-10'>
        <h4>Investisseur N° 2 :</h4>
        <div className='type-alt-slider'>
        <div>
            <label>Revenu net avant impôt</label>
            <button 
                id='info-investisseur' 
                onClick={showModal}
                className='question-mark'
            >?</button>
          </div>
          <div className="flex-row ai-fs">
            <NumberFormat
              id="revInvest2-edit"
              name='revInvest2'
              value={revInvest2}
              displayType={'number'}
              thousandSeparator={" "}
              suffix={' €'}
              onChange={onChange}
              allowNegative={false}
              isAllowed={(values) => {
                const {floatValue} = values;
                return floatValue >= 0 &&  floatValue <= 150000;
              }}
            />
            <i 
              onClick={() => focusMethod("revInvest2-edit")} 
              style={{ fontSize: "14px" }} 
              className="fas fa-pencil-alt"
            ></i>
          </div>
        </div> 

        <input
          type='range'
          name='revInvest2'
          value={revInvest2}
          onChange={onChange}
          min='0'
          max='150000'
          className='slider mt-5'
        />
        <div className='invest-rev w'>
          <label>Augmentation annuelle moyenne :</label>
          <select
            type='select'
            name='augInvest2'
            value={augInvest2}
            onChange={onChange}
            className='augmentation fs-12'
          >
            {optionsAugmentation.map((option) => (
              <option key={option} value={option / 100}>
                {option}%
              </option>
            ))}
          </select>
        </div>
        {revInvest2 !== 0 ? (
          <p className='fs-12 orange'>
            <i class='fas fa-exclamation-circle mr-5'></i>
            Dans sa version actuelle, Simulimo permet uniquement de modéliser un investissement avec un seul investisseur ou deux investisseurs rattachés au même foyer fiscal.
          </p>
        ) : (
          ""
        )}
      </div>

      <div className='form-box-h-3 mt-10'>
        <p className='p-par-fisc'>
          En France, l'impôt sur le revenu est calculé au niveau du foyer
          fiscal. Les invdividus composant le foyer fiscal sont appelées parts
          fiscales. Le site{" "}
          <a
            href='https://www.toutsurmesfinances.com/impots/parts-fiscales-du-foyer-comment-connaitre-et-calculer-leur-nombre.html'
            target='_blank'
            rel='noopener noreferrer'
          >
            toutsurmesfinances.com
          </a>{" "}
          explique comment calculer le nombre de parts fiscales de votre foyer
        </p>
        <div className='info-button'>
          <div>
            <label className='fs-12'>Part(s) Fiscale(s)</label>
            <button 
                  id='info-partfisc' 
                  onClick={showModal}
                  className='question-mark'
            >?</button>
          </div> 
          <select
            type='select'
            name='partFisc'
            onChange={onChange}
            className='input-box-3 fs-12'
          >
            {optionsPartFisc.map((optionPartFisc) => (
              <option key={optionPartFisc}>{optionPartFisc}</option>
            ))}
          </select>
        </div>
      </div>
      <MobilePagination
          setMobileDisplayTab={setMobileDisplayTab}
          mobileDisplayTab={mobileDisplayTab}
      />
    </section>
  );
};
export default FoyerMobile;
