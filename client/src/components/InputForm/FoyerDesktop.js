import React from "react";
import NumberFormat from "react-number-format";

const FoyerDesktop = ({
  onChange,
  showModal,
  focusMethod,
  onChangeDecimals,
  revInvest1,
  augInvest1,
  revInvest2,
  augInvest2,
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
    <section id='foyer'>
      <h3 className='form-header'>
        <i className='fas fa-house-user header-i'></i>&nbsp;&nbsp;Foyer fiscal
      </h3>
      <div className='form-box-v mt-10'>
        <div className='info-button info-button-foyer'>
          <h5>
            Revenu <u>imposable</u> & augmentation annuelle moyenne (%)
          </h5>
        </div>
        <div className='type-alt-slider border-investisseur pad-top-invest'>
          <div>
            <label>Investisseur N° 1</label>
            <button
              id='info-investisseur'
              onClick={showModal}
              className='question-mark'
            >
              ?
            </button>
          </div>
          <div className='border-input'>
            <NumberFormat
              id='revInvest1-edit'
              name='revInvest1'
              value={revInvest1}
              displayType={"number"}
              thousandSeparator={" "}
              suffix={" €"}
              onChange={onChange}
              allowNegative={false}
              isAllowed={(values) => {
                const { floatValue } = values;
                return floatValue >= 0 && floatValue <= 150000;
              }}
            />
            <i
              onClick={() => focusMethod("revInvest1-edit")}
              style={{ fontSize: "14px" }}
              className='fas fa-pencil-alt'
            ></i>
          </div>
        </div>
        <div className='invest-rev padding-investisseur'>
          <input
            type='range'
            name='revInvest1'
            value={revInvest1}
            onChange={onChange}
            min='0'
            max='150000'
            className='slider'
          />
          <div className='w-15 ml-10'>
            <select
              type='select'
              name='augInvest1'
              value={augInvest1}
              onChange={onChangeDecimals}
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

        <div className='type-alt-slider border-investisseur pad-top-invest'>
          <div>
            <label>Investisseur N° 2</label>
            <button
              id='info-investisseur'
              onClick={showModal}
              className='question-mark'
            >
              ?
            </button>
          </div>
          <div className='border-input'>
            <NumberFormat
              id='revInvest2-edit'
              name='revInvest2'
              value={revInvest2}
              displayType={"number"}
              thousandSeparator={" "}
              suffix={" €"}
              onChange={onChange}
              allowNegative={false}
              isAllowed={(values) => {
                const { floatValue } = values;
                return floatValue >= 0 && floatValue <= 150000;
              }}
            />
            <i
              onClick={() => focusMethod("revInvest2-edit")}
              style={{ fontSize: "14px" }}
              className='fas fa-pencil-alt'
            ></i>
          </div>
        </div>
        <div className='invest-rev'>
          <input
            type='range'
            name='revInvest2'
            value={revInvest2}
            onChange={onChange}
            min='0'
            max='150000'
            className='slider'
          />

          <div className='w-15 ml-10'>
            <select
              type='select'
              name='augInvest2'
              value={augInvest2}
              onChange={onChangeDecimals}
              className='input-box-3 fs-12'
            >
              {optionsAugmentation.map((option) => (
                <option key={option} value={option / 100}>
                  {option}%
                </option>
              ))}
            </select>
          </div>
        </div>
        {revInvest2 !== 0 ? (
          <p className='fs-12 orange'>
            <i className='fas fa-exclamation-circle mr-5'></i>
            Dans sa version actuelle, Simulimo permet uniquement de modéliser un
            investissement avec un seul investisseur ou deux investisseurs
            rattachés au même foyer fiscal.
          </p>
        ) : (
          ""
        )}
      </div>

      {/* {invCouple ? ( */}
      <div className='form-box-h-3 mt-10'>
        <p className='p-par-fisc'>
          En France, l'impôt sur le revenu est calculé au niveau du foyer
          fiscal. Les invdividus composant le foyer fiscal sont appelées parts
          fiscales ou parts de quotien familial. Le nombre de parts est une
          notion clé pour le calcul de l’impôt sur le revenu lorsque le foyer
          fiscal est composé de plusieurs individus. Plus d'informations sur
          <a
            style={{ color: "#007be8", fontWeight: "bold" }}
            href='https://www.service-public.fr/particuliers/vosdroits/F2705'
            target='_blank'
            rel='noopener noreferrer'
          >
            &nbsp;service-public.fr
          </a>
        </p>
        <div className='par-fisc'>
          <div className='info-button'>
            <div>
              <label>Part(s) Fiscale(s)</label>
              <button
                id='info-partfisc'
                onClick={showModal}
                className='question-mark'
              >
                ?
              </button>
            </div>
          </div>
          <select
            type='select'
            name='partFisc'
            onChange={onChangeDecimals}
            className='input-box-3 fs-12'
          >
            {optionsPartFisc.map((optionPartFisc) => (
              <option key={optionPartFisc}>{optionPartFisc}</option>
            ))}
          </select>
        </div>
      </div>
    </section>
  );
};
export default FoyerDesktop;
