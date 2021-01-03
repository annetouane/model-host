import React from "react";
import MobilePagination from "./MobilePagination";
import NumberFormat from "react-number-format";

const Regime = ({
  onChangeDecimals,
  onChangeRegime,
  showModal,
  setMobileDisplayTab,
  mobileDisplayTab,
  focusMethod,
  sciIs,
  lmnpReel,
  lmnpMicro,
  nueReel,
  nueMicro,
  irl,
  width,
  formCheck,
}) => {
  return (
    <section
      id='regime'
      style={{ marginBottom: width <= 1155 && formCheck ? "80px" : "0" }}
    >
      {width > 770 ? (
        <h3 className='form-header'>
          <i className='fas fa-balance-scale header-i'></i>
          &nbsp;&nbsp;Régime fiscal
        </h3>
      ) : (
        ""
      )}
      <div className='form-box-v mt-10'>
        <div className='regime-responsive'>
          <div className='regime-responsive-items'>
            <h6 className={width < 770 ? "mt-10" : ""}>
              Société civile immobilière (SCI) :
            </h6>
            <div>
              <input
                className='mr-5'
                type='checkbox'
                name='sciIs'
                checked={sciIs}
                onChange={onChangeRegime}
              />
              <label>Impôt sur les sociétés</label>
            </div>
            <h6 className='mt-10'>
              Location meublée non-professionnelle (LMNP) :
            </h6>
            <div>
              <input
                className='mr-5'
                type='checkbox'
                name='lmnpReel'
                checked={lmnpReel}
                onChange={onChangeRegime}
              />
              <label className='mr-20'>Régime réel</label>
              <input
                className='mr-5'
                type='checkbox'
                name='lmnpMicro'
                checked={lmnpMicro}
                onChange={onChangeRegime}
              />
              <label>Micro-foncier</label>
            </div>
            <h6 className='mt-10'>Location nue :</h6>
            <div>
              <input
                className='mr-5'
                type='checkbox'
                name='nueReel'
                checked={nueReel}
                onChange={onChangeRegime}
              />
              <label className='mr-20'>Régime réel</label>
              <input
                className='mr-5'
                type='checkbox'
                name='nueMicro'
                checked={nueMicro}
                onChange={onChangeRegime}
              />
              <label>Micro-foncier</label>
            </div>
          </div>
          <label>
            Le régime fiscal est déterminé par le mode de détention du bien (en
            direct ou via une société), son mode d'exploitation (location vide
            ou meublée), le revenu qu'il génère, les revenus de l’investisseurs
            ou encore la composition de son foyer fiscal. Certains régimes
            fiscaux dépendent du seul choix de l’investisseur, d’autre lui sont
            imposés par la situation de son foyer fiscal. Visitez le site&nbsp;
            <a
              style={{ color: "#007be8", fontWeight: "bold" }}
              href='https://www.pap.fr/bailleur/choisir-investissement/la-fiscalite-immobiliere/a1247'
              target='_blank'
              rel='noopener noreferrer'
            >
              pap.fr
            </a>{" "}
            pour plus d'informations sur la fiscalité immobilière.
          </label>
        </div>
      </div>

      <div className='form-box-h-3 mt-10'>
        <p className='p-irl'>
          L'indice de référence des loyers (IRL) est le taux légalement
          applicable pour augmenter le loyer d'un bail d'une année sur l'autre.
          Il est calculé par l'INSEE à partir du taux d'inflation constaté d'une
          année sur l'autre.
        </p>
        <div className='irl'>
          <div className='type-alt-slider'>
            <div style={{ width: "100%" }} className='flex-row jc-sb ai-fc'>
              <div>
                <label>Indice de référence des loyers</label>
                <button
                  id='info-irl'
                  onClick={showModal}
                  className='question-mark'
                >
                  ?
                </button>
              </div>

              <div className='border-input'>
                <NumberFormat
                  id='frais-irl'
                  name='irl'
                  value={irl}
                  decimalScale={2}
                  suffix={" %"}
                  onChange={onChangeDecimals}
                  allowNegative={false}
                  isAllowed={(values) => {
                    const { floatValue } = values;
                    return floatValue >= 0 && floatValue <= 3;
                  }}
                />
                <i
                  onClick={() => focusMethod("frais-irl")}
                  style={{ fontSize: "14px" }}
                  className='fas fa-pencil-alt'
                ></i>
              </div>
            </div>

            {/* <label>{Math.round((irl * 100 + Number.EPSILON) * 100) / 100} %</label> */}
          </div>
          <div className='info-button'>
            <input
              type='range'
              name='irl'
              value={irl}
              onChange={onChangeDecimals}
              min='0'
              max='3'
              step='0.1'
              className='slider mt-5'
            />
          </div>
        </div>
      </div>
      {width < 700 ? (
        <MobilePagination
          setMobileDisplayTab={setMobileDisplayTab}
          mobileDisplayTab={mobileDisplayTab}
        />
      ) : (
        ""
      )}
    </section>
  );
};
export default Regime;
