import React from "react";

const Foyer = ({
  onChange,
  onChangeRegime,
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
      <div className='form-group mt-10'>
        <h3>Investisseur N° 1 :</h3>
        <div className='flex-row ai-fc mt-10'>
          <div className='slidecontainer mr-5'>
            <div className='flex-row jc-sb'>
              <label>Revenu net avant impôts : {sepSpace(revInvest1)} €</label>
              <label>Augmentation annuelle moyenne :</label>
            </div>
            <div>
              <input
                type='range'
                name='revInvest1'
                value={revInvest1}
                onChange={onChange}
                min='0'
                max='100000'
                className='slider mt-5'
              />
            </div>
          </div>
          <div className='w-15 ml-10'>
            <select
              type='select'
              name='augInvest1'
              value={augInvest1}
              onChange={onChange}
              className='input-box-2 fs-12'
            >
              {optionsAugmentation.map((option) => (
                <option key={option} value={option / 100}>
                  {option}%
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className='form-group mt-20'>
        <div className='flex-row jc-sb'>
          <h3>Investisseur N° 2 :</h3>
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

        <div className='flex-row ai-fc mt-10'>
          <div className='slidecontainer mr-5'>
            <div className='flex-row jc-sb'>
              <label>Revenu net avant impôts : {sepSpace(revInvest2)} €</label>
              <label>Augmentation annuelle moyenne :</label>
            </div>
            <div>
              <input
                type='range'
                name='revInvest2'
                value={revInvest2}
                onChange={onChange}
                min='0'
                max='100000'
                className='slider mt-5'
              />
            </div>
          </div>
          <div className='w-15 ml-10'>
            <select
              type='select'
              name='augInvest2'
              value={augInvest2}
              onChange={onChange}
              className='input-box-2 fs-12'
            >
              {optionsAugmentation.map((option) => (
                <option key={option} value={option / 100}>
                  {option}%
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* {invCouple ? ( */}
      <div className='form-group mt-20'>
        <div className='flex-row ai-fc mt-10'>
          <div className='flex-column w-35 mr-20'>
            <label>Part(s) Fiscale(s)</label>
            <select
              type='select'
              name='partFisc'
              onChange={onChange}
              className='input-box-2 fs-12'
              disabled={!invCouple}
            >
              {optionsPartFisc.map((optionPartFisc) => (
                <option key={optionPartFisc}>{optionPartFisc}</option>
              ))}
            </select>
          </div>
          <p className='fs-12 w-75'>
            En France, l'impôt sur le revenu est calculé au niveau du foyer
            fiscal. Les invdividus composant le foyer fiscal sont appelées parts
            fiscales. Le nombre de parts fiscales est une notion clé pour le
            calcul de l’impôt sur le revenu lorsque le foyer fiscal est composé
            de plusieurs individus.
          </p>
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
      {/* ) : (
      ""
    )} */}
    </section>
  );
};
export default Foyer;
