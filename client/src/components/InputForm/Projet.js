import React from "react";
import MobilePagination from "./MobilePagination";
// import ReactTooltip from 'react-tooltip';
import NumberFormat from "react-number-format";

const Projet = ({
  onChange,
  showModal,
  sepSpace,
  setMobileDisplayTab,
  focusMethod,
  onChangeDecimals,
  mobileDisplayTab,
  netVendeur,
  travaux,
  ammeublement,
  notaire,
  agence,
  width,
  formCheck,
}) => {
  // const [isButtonDisabled, setIsButtonDisabled] = useState(false)

  // setTimeout(() => setIsButtonDisabled(true), 20000);

  return (
    <section
      id='projet'
      style={{ marginBottom: width < 770 && formCheck ? "80px" : "0" }}
    >
      {width > 770 ? (
        <h3 className='form-header'>
          <i className='fas fa-landmark header-i'></i>
          &nbsp;&nbsp;Description du projet
        </h3>
      ) : (
        ""
      )}
      {/* {width > 770 && !isButtonDisabled ? 
        <ReactTooltip
          delayHide={200} 
          backgroundColor="#fff"
          multiline={true}
          border={true}
          borderColor="#cacaca"
          textColor="#333"
          className="transparent"
          place="left"
        /> 
        : ""} */}

      <div className='form-box-v mt-10'>
        <div className='type-alt-slider'>
          <div>
            <label>
              Net vendeur&nbsp;
              <small style={{ marginLeft: 0 }}>
                <strong>
                  (
                  <i
                    style={{ marginLeft: 0, cursor: "auto", color: "#007be8" }}
                    className='fas fa-exclamation-circle'
                  ></i>{" "}
                  hors frais d'agence)
                </strong>
              </small>
            </label>
            <button
              id='info-net-vendeur'
              onClick={showModal}
              className='question-mark'
            >
              ?
            </button>
          </div>
          <div className='border-input'>
            <NumberFormat
              id='projet-edit'
              name='netVendeur'
              value={netVendeur}
              displayType={"number"}
              thousandSeparator={" "}
              suffix={" €"}
              onChange={onChange}
              allowNegative={false}
              isAllowed={(values) => {
                const { floatValue } = values;
                return floatValue >= 0 && floatValue <= 1000000;
              }}
            />
            <i
              onClick={() => focusMethod("projet-edit")}
              style={{ fontSize: "14px" }}
              className='fas fa-pencil-alt'
            ></i>
          </div>
        </div>

        <div className='info-button'>
          <input
            // data-tip="La valeur des jauges est modifiable soit<br>avec la souris, soit à l'aide des flèches<br>du clavier ou en éditant directement<br>la valeur à droite de chaque jauge"
            type='range'
            name='netVendeur'
            value={netVendeur}
            onChange={onChange}
            min='0'
            max='1000000'
            step='500'
            className='slider mt-5'
          />
        </div>
      </div>

      <div className='form-group'>
        <div
          className={width < 770 ? "form-box-h mt-10" : "form-box-h mr-5 mt-10"}
          style={{ height: width > 770 ? "100px" : "100%" }}
        >
          <div>
            <label>Frais de notaire</label>
            <button
              id='info-notaire'
              onClick={showModal}
              className='question-mark'
            >
              ?
            </button>
          </div>
          <select
            type='select'
            name='notaire'
            value={notaire}
            onChange={onChangeDecimals}
            className='input-box-2 fs-12'
          >
            <option value='0.075'>7.5% (Ancien)</option>
            <option value='0.03'>3% (Neuf)</option>
          </select>
          <p className='data-bold-blue'>{sepSpace(netVendeur * notaire)} €</p>
        </div>

        <div
          className={width < 770 ? "form-box-h mt-10" : "form-box-h ml-5 mt-10"}
          style={{ height: "100px" }}
        >
          <div className='type-alt-slider' style={{ margin: "0" }}>
            <div>
              <label>Frais d'agence</label>
              <button
                id='info-agence'
                onClick={showModal}
                className='question-mark'
              >
                ?
              </button>
            </div>

            <div className='border-input'>
              <NumberFormat
                id='frais-agence'
                name='agence'
                value={agence}
                decimalScale={2}
                suffix={" €"}
                thousandSeparator={" "}
                onChange={onChange}
                allowNegative={false}
                isAllowed={(values) => {
                  const { floatValue } = values;
                  return floatValue >= 0 && floatValue <= 50000;
                }}
              />
              <i
                onClick={() => focusMethod("frais-agence")}
                style={{ fontSize: "14px" }}
                className='fas fa-pencil-alt'
              ></i>
            </div>
          </div>
          <small>
            {" "}
            soit{" "}
            {netVendeur === 0
              ? 0
              : Math.round(
                  ((agence / netVendeur) * 100 + Number.EPSILON) * 100
                ) / 100}{" "}
            % du net vendeur
          </small>
          <div className='info-button'>
            <input
              type='range'
              name='agence'
              value={agence}
              onChange={onChange}
              min='0'
              max='50000'
              step='100'
              className='slider mt-5'
            />
          </div>
        </div>
      </div>

      <div className='form-group'>
        <div
          className={
            width < 770 ? "form-box-v-half mt-10" : "form-box-v-half mr-5 mt-10"
          }
        >
          <div className='type-alt-slider'>
            <div>
              <label>Travaux</label>
              <button
                id='info-travaux'
                onClick={showModal}
                className='question-mark'
              >
                ?
              </button>
            </div>
            <div className='border-input'>
              <NumberFormat
                id='travaux-edit'
                name='travaux'
                value={travaux}
                displayType={"number"}
                thousandSeparator={" "}
                suffix={" €"}
                onChange={onChange}
                allowNegative={false}
                isAllowed={(values) => {
                  const { floatValue } = values;
                  return floatValue >= 0 && floatValue <= 300000;
                }}
              />
              <i
                onClick={() => focusMethod("travaux-edit")}
                style={{ fontSize: "14px" }}
                className='fas fa-pencil-alt'
              ></i>
            </div>
          </div>

          <div className='info-button'>
            <input
              type='range'
              name='travaux'
              value={travaux}
              onChange={onChange}
              min='0'
              max='300000'
              step='200'
              className='slider mt-5'
            />
          </div>
        </div>

        <div
          className={
            width < 770 ? "form-box-v-half mt-10" : "form-box-v-half ml-5 mt-10"
          }
        >
          <div className='type-alt-slider'>
            <div>
              <label>Ammeublement</label>
              <button
                id='info-ammeublement'
                onClick={showModal}
                className='question-mark'
              >
                ?
              </button>
            </div>
            <div className='border-input'>
              <NumberFormat
                id='ammeublement-edit'
                name='ammeublement'
                value={ammeublement}
                displayType={"number"}
                thousandSeparator={" "}
                suffix={" €"}
                onChange={onChange}
                allowNegative={false}
                isAllowed={(values) => {
                  const { floatValue } = values;
                  return floatValue >= 0 && floatValue <= 100000;
                }}
              />
              <i
                onClick={() => focusMethod("ammeublement-edit")}
                style={{ fontSize: "14px" }}
                className='fas fa-pencil-alt'
              ></i>
            </div>
          </div>

          <div className='info-button'>
            <input
              type='range'
              name='ammeublement'
              value={ammeublement}
              onChange={onChange}
              min='0'
              max='100000'
              step='100'
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
export default Projet;
