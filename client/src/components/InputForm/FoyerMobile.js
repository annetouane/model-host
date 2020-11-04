import React from "react";

const FoyerMobile = ({
  onChange,
  onChangeRegime,
  showModal,
  sepSpace,
  revInvest1,
  augInvest1,
  revInvest2,
  augInvest2,
  invCouple,
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
        <div className='info-button'>
          <h4>Investisseur N° 1 :</h4>
          <i
            id='info-investisseur'
            onClick={showModal}
            class='fas fa-question-circle mb-10'
          ></i>
        </div>
        <label>Revenu net avant impôts : {sepSpace(revInvest1)} €</label>
        <input
          type='range'
          name='revInvest1'
          value={revInvest1}
          onChange={onChange}
          min='0'
          max='100000'
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
        <label>Revenu net avant impôts : {sepSpace(revInvest2)} €</label>
        <input
          type='range'
          name='revInvest2'
          value={revInvest2}
          onChange={onChange}
          min='0'
          max='100000'
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
        {parseInt(revInvest2) !== 0 ? (
          <div className='flex-row  mt-5'>
            <label className='mr-10 bold'>
              Investisseurs membres du même foyer fiscal
            </label>
            <input
              type='checkbox'
              name='invCouple'
              defaultChecked={invCouple}
              onChange={onChangeRegime}
            />
          </div>
        ) : (
          ""
        )}
      </div>

      {/* {invCouple ? ( */}
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
          <label className='fs-12'>Part(s) Fiscale(s) :</label>
          <select
            type='select'
            name='partFisc'
            onChange={onChange}
            className='input-box-3 fs-12'
            disabled={!invCouple}
          >
            {optionsPartFisc.map((optionPartFisc) => (
              <option key={optionPartFisc}>{optionPartFisc}</option>
            ))}
          </select>
          <i
            id='info-partfisc'
            onClick={showModal}
            className='fas fa-question-circle'
            style={{ marginBottom: "5px" }}
          ></i>
        </div>

        {!invCouple ? (
          <p className='fs-12 orange'>
            <i class='fas fa-exclamation-circle mr-5'></i>
            Les parts fiscales ne seront pas prises en compte si les
            investisseurs ne sont pas rattachés au même foyer fiscal.
          </p>
        ) : (
          ""
        )}
      </div>
    </section>
  );
};
export default FoyerMobile;
