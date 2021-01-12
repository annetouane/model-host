// packages
import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  // CartesianGrid,
  Tooltip,
  Cell,
  ResponsiveContainer,
  ReferenceLine,
} from "recharts";

// actions
import {
  modelModalToggle,
  modelModalClic,
  saveModalClic,
} from "../../actions/modals";

export const Modelisation = ({
  modelModal,
  modelModalToggle,
  modelModalClic,
  saveModalClic,
  currentModel,
  sciIs,
  lmnpReel,
  lmnpMicro,
  nueReel,
  nueMicro,
  duree,
  sepSpace,
}) => {
  // option années de détention **************************************************************************
  const optionsDetention = []; // options taux occupation
  for (let i = 1; i <= duree; i += 1) {
    optionsDetention.push(i);
  }
  optionsDetention.sort(function (a, b) {
    return b - a;
  });

  // close window **********************************************************************************
  const modelClose = () => {
    modelModalToggle(false); // close auth modal
    // saveModalClic(false); // save n'est plus actif
    modelModalClic(false); // model n'est plus actif
  };

  // aggregated cash-flow ******************************************************************************

  // state année sélectionnée
  const [cashFlowYear, setCashFlowYear] = useState({
    sciIsYear: "",
    lmnpReelYear: "",
    lmnpMicroYear: "",
    nueReelYear: "",
    nueMicroYear: "",
  });
  const {
    sciIsYear,
    lmnpReelYear,
    lmnpMicroYear,
    nueReelYear,
    nueMicroYear,
  } = cashFlowYear;

  // state cashflow aggregated sur année sélectionnée
  // initialisé dans useEffect
  const [cashFlow, setCashFlowCash] = useState({
    sciIsCash: "",
    lmnpReelCash: "",
    lmnpMicroCash: "",
    nueReelCash: "",
    nueMicroCash: "",
  });

  const {
    sciIsCash,
    lmnpReelCash,
    lmnpMicroCash,
    nueReelCash,
    nueMicroCash,
  } = cashFlow;

  useEffect(() => {
    // initialise le composant avec la valeur comportant la durée en props
    setCashFlowYear({
      sciIsYear: duree,
      lmnpReelYear: duree,
      lmnpMicroYear: duree,
      nueReelYear: duree,
      nueMicroYear: duree,
    });
    // initialise le composant avec la somme cash-flow sur durée d'emprunt
    setCashFlowCash({
      sciIsCash: currentModel.reduce(
        (acc, curr) => acc + curr.sciIsCashFlowAfterFlatTax,
        0
      ),
      lmnpReelCash: currentModel.reduce(
        (acc, curr) => acc + curr.lmnpReelCashFlowNet,
        0
      ),
      lmnpMicroCash: currentModel.reduce(
        (acc, curr) => acc + curr.lmnpMicroCashFlowNet,
        0
      ),
      nueReelCash: currentModel.reduce(
        (acc, curr) => acc + curr.nueReelCashFlowNet,
        0
      ),
      nueMicroCash: currentModel.reduce(
        (acc, curr) => acc + curr.nueMicroCashFlowNet,
        0
      ),
    });
  }, [duree, currentModel]);

  //
  const onChange = (e, id) => {
    setCashFlowYear({
      ...cashFlowYear,
      [e.target.name]: parseInt(e.target.value),
    });
    // lors de l'actualisation des dropdown, identifie celui que a été actualisé
    // via l'id et update le state correspondant
    if (id === "sciIs") {
      const sciIs = currentModel
        .filter((x) => x.annee <= parseInt(e.target.value))
        .reduce((acc, curr) => acc + curr.sciIsCashFlowAfterFlatTax, 0);
      console.log("1", sciIs);
      setCashFlowCash({ ...cashFlow, sciIsCash: Math.round(sciIs) });
      console.log("2", sciIsCash);
    } else if (id === "lmnpReel") {
      const lmnpReel = currentModel
        .filter((x) => x.annee <= parseInt(e.target.value))
        .reduce((acc, curr) => acc + curr.lmnpReelCashFlowNet, 0);
      setCashFlowCash({ ...cashFlow, lmnpReelCash: Math.round(lmnpReel) });
    } else if (id === "lmnpMicro") {
      const lmnpMicro = currentModel
        .filter((x) => x.annee <= parseInt(e.target.value))
        .reduce((acc, curr) => acc + curr.lmnpMicroCashFlowNet, 0);
      setCashFlowCash({
        ...cashFlow,
        lmnpMicroCash: Math.round(lmnpMicro),
      });
    } else if (id === "nueReel") {
      const nueReel = currentModel
        .filter((x) => x.annee <= parseInt(e.target.value))
        .reduce((acc, curr) => acc + curr.nueReelCashFlowNet, 0);
      setCashFlowCash({ ...cashFlow, nueReelCash: Math.round(nueReel) });
    } else if (id === "nueMicro") {
      const nueMicro = currentModel
        .filter((x) => x.annee <= parseInt(e.target.value))
        .reduce((acc, curr) => acc + curr.nueMicroCashFlowNet, 0);
      setCashFlowCash({ ...cashFlow, nueMicroCash: Math.round(nueMicro) });
    }
  };

  // calcul MAXIMUM et MINIMUM axis value ************************************************************
  const maxValueArray = [];
  const minValueArray = [];

  if (sciIs) {
    const maxSciIs = Math.max.apply(
      Math,
      currentModel.map(function (o) {
        return o.sciIsCashFlowAfterFlatTax;
      })
    );
    maxValueArray.push(maxSciIs);
    const minSciIs = Math.min.apply(
      Math,
      currentModel.map(function (o) {
        return o.sciIsCashFlowAfterFlatTax;
      })
    );
    minValueArray.push(minSciIs);
  }

  if (lmnpReel) {
    const maxLmnpReel = Math.max.apply(
      Math,
      currentModel.map(function (o) {
        return o.lmnpReelCashFlowNet;
      })
    );
    maxValueArray.push(maxLmnpReel);
    const minLmnpReel = Math.min.apply(
      Math,
      currentModel.map(function (o) {
        return o.lmnpReelCashFlowNet;
      })
    );
    minValueArray.push(minLmnpReel);
  }

  if (lmnpMicro) {
    const maxLmnpMicro = Math.max.apply(
      Math,
      currentModel.map(function (o) {
        return o.lmnpMicroCashFlowNet;
      })
    );
    maxValueArray.push(maxLmnpMicro);
    const minLmnpMicro = Math.min.apply(
      Math,
      currentModel.map(function (o) {
        return o.lmnpMicroCashFlowNet;
      })
    );
    minValueArray.push(minLmnpMicro);
  }

  if (nueReel) {
    const maxNueReel = Math.max.apply(
      Math,
      currentModel.map(function (o) {
        return o.nueReelCashFlowNet;
      })
    );
    maxValueArray.push(maxNueReel);
    const minNueReel = Math.min.apply(
      Math,
      currentModel.map(function (o) {
        return o.nueReelCashFlowNet;
      })
    );
    minValueArray.push(minNueReel);
  }

  if (nueMicro) {
    const maxNueMicro = Math.max.apply(
      Math,
      currentModel.map(function (o) {
        return o.nueMicroCashFlowNet;
      })
    );
    maxValueArray.push(maxNueMicro);
    const minNueMicro = Math.min.apply(
      Math,
      currentModel.map(function (o) {
        return o.nueMicroCashFlowNet;
      })
    );
    minValueArray.push(minNueMicro);
  }

  // détermine valeur max / min de l'axe pour chaque graph
  // arrondi à la dizaine
  const maxValue =
    Math.max(...maxValueArray) > 0
      ? Math.ceil(
          Math.round(
            (Math.max(...maxValueArray) + Math.max(...maxValueArray) * 0.1) / 10
          ) * 10
        )
      : 0;
  const minValue =
    Math.min(...minValueArray) < 0
      ? Math.ceil(
          Math.round(
            (Math.min(...minValueArray) + Math.min(...minValueArray) * 0.1) / 10
          ) * 10
        )
      : 0;

  // customise tooltip : label et round value ************************************************************
  const CustomTooltip = ({ active, payload, label }) => {
    if (active) {
      return (
        <div className='custom-tooltip'>
          <p>{`Année ${label}`}</p>
          <p>{`Cash-flow net d'impôt : ${Math.round(payload[0].value)} €`}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <section
      id='modelisationWindow'
      className={modelModal ? "auth-modal" : "auth-modal-none"}
    >
      <div className='model-box'>
        <div onClick={modelClose}>
          <i className='fas fa-times quit-account-modal'></i>
        </div>
        <h1>Comparaison des cash-flow net d'impôt par régime</h1>
        <div className='chart-group'>
          {/* SCI IS *********************************************************************** */}
          {sciIs ? (
            <div className='model-group'>
              <h3>SCI à l'IS</h3>
              <div className='chart-container'>
                <div className='chart-box'>
                  <ResponsiveContainer width='100%' height={150}>
                    <BarChart data={currentModel}>
                      <XAxis
                        dataKey='annee'
                        stroke='#9c9999'
                        style={{
                          fontSize: "12px",
                        }}
                      />
                      <ReferenceLine y={0} stroke='#9c9999' strokeWidth={0.5} />{" "}
                      <YAxis
                        type='number'
                        domain={[minValue, maxValue]}
                        stroke='#9c9999'
                        ticks={[minValue, 0, maxValue]}
                        interval={0}
                        style={{
                          fontSize: "12px",
                        }}
                      />
                      <Tooltip content={<CustomTooltip />} />
                      <Bar dataKey='sciIsCashFlowAfterFlatTax' barSize={50}>
                        {currentModel.map((x, index) => (
                          <Cell
                            label={"SCI à l'IS"}
                            key={`cell-${index}`}
                            fill={
                              x.sciIsCashFlowAfterFlatTax > 0
                                ? "#01c96c"
                                : "#e1396c"
                            }
                          />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
                <div className='cash-flow-box'>
                  <h5>Cash-flow cumulé</h5>
                  <select
                    type='select'
                    name='sciIsYear'
                    value={sciIsYear}
                    onChange={(e) => onChange(e, "sciIs")}
                    className='input-box-2 fs-12'
                  >
                    {optionsDetention.map((option) => (
                      <option key={option} value={option}>
                        {option} ans
                      </option>
                    ))}
                  </select>
                  <h6>{sepSpace(Math.round(sciIsCash))} €</h6>
                </div>
              </div>
            </div>
          ) : (
            ""
          )}
          {/* LMNP REEL *********************************************************************** */}
          {lmnpReel ? (
            <div className='model-group'>
              <h3>LMNP au réel</h3>
              <div className='chart-container'>
                <div className='chart-box'>
                  <ResponsiveContainer width='100%' height={150}>
                    <BarChart data={currentModel}>
                      <XAxis
                        dataKey='annee'
                        stroke='#9c9999'
                        style={{
                          fontSize: "12px",
                        }}
                      />
                      <ReferenceLine y={0} stroke='#9c9999' strokeWidth={0.5} />{" "}
                      <YAxis
                        type='number'
                        domain={[minValue, maxValue]}
                        stroke='#9c9999'
                        ticks={[minValue, 0, maxValue]}
                        interval={0}
                        style={{
                          fontSize: "12px",
                        }}
                      />
                      <Tooltip content={<CustomTooltip />} />
                      <Bar dataKey='lmnpReelCashFlowNet' barSize={50}>
                        {currentModel.map((x, index) => (
                          <Cell
                            label={"LMNP au réel"}
                            key={`cell-${index}`}
                            fill={
                              x.lmnpReelCashFlowNet > 0 ? "#01c96c" : "#e1396c"
                            }
                          />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
                <div className='cash-flow-box'>
                  <h5>Cash-flow cumulé</h5>
                  <select
                    type='select'
                    name='lmnpReelYear'
                    value={lmnpReelYear}
                    onChange={(e) => onChange(e, "lmnpReel")}
                    className='input-box-2 fs-12'
                  >
                    {optionsDetention.map((option) => (
                      <option key={option} value={option}>
                        {option} ans
                      </option>
                    ))}
                  </select>
                  <h6>{sepSpace(Math.round(lmnpReelCash))} €</h6>
                </div>
              </div>
            </div>
          ) : (
            ""
          )}
          {/* LMNP MICRO *********************************************************************** */}
          {lmnpMicro ? (
            <div className='model-group'>
              <h3>LMNP au micro-foncier</h3>
              <div className='chart-container'>
                <div className='chart-box'>
                  <ResponsiveContainer width='100%' height={150}>
                    <BarChart data={currentModel}>
                      <XAxis
                        dataKey='annee'
                        stroke='#9c9999'
                        style={{
                          fontSize: "12px",
                        }}
                      />
                      <ReferenceLine y={0} stroke='#9c9999' strokeWidth={0.5} />{" "}
                      <YAxis
                        type='number'
                        domain={[minValue, maxValue]}
                        stroke='#9c9999'
                        ticks={[minValue, 0, maxValue]}
                        interval={0}
                        style={{
                          fontSize: "12px",
                        }}
                      />
                      <Tooltip content={<CustomTooltip />} />
                      <Bar dataKey='lmnpMicroCashFlowNet' barSize={50}>
                        {currentModel.map((x, index) => (
                          <Cell
                            label={"LMNP au réel"}
                            key={`cell-${index}`}
                            fill={
                              x.lmnpMicroCashFlowNet > 0 ? "#01c96c" : "#e1396c"
                            }
                          />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
                <div className='cash-flow-box'>
                  <h5>Cash-flow cumulé</h5>
                  <select
                    type='select'
                    name='lmnpMicroYear'
                    value={lmnpMicroYear}
                    onChange={(e) => onChange(e, "lmnpMicro")}
                    className='input-box-2 fs-12'
                  >
                    {optionsDetention.map((option) => (
                      <option key={option} value={option}>
                        {option} ans
                      </option>
                    ))}
                  </select>

                  <h6>{sepSpace(Math.round(lmnpMicroCash))} €</h6>
                </div>
              </div>
            </div>
          ) : (
            ""
          )}
          {nueReel ? (
            <div className='model-group'>
              <h3>Nue au réel</h3>
              <div className='chart-container'>
                <div className='chart-box'>
                  <ResponsiveContainer width='100%' height={150}>
                    <BarChart data={currentModel}>
                      <XAxis
                        dataKey='annee'
                        stroke='#9c9999'
                        style={{
                          fontSize: "12px",
                        }}
                      />
                      <ReferenceLine y={0} stroke='#9c9999' strokeWidth={0.5} />{" "}
                      <YAxis
                        type='number'
                        domain={[minValue, maxValue]}
                        stroke='#9c9999'
                        ticks={[minValue, 0, maxValue]}
                        interval={0}
                        style={{
                          fontSize: "12px",
                        }}
                      />
                      <Tooltip content={<CustomTooltip />} />
                      <Bar dataKey='nueReelCashFlowNet' barSize={50}>
                        {currentModel.map((x, index) => (
                          <Cell
                            label={"Nue au réel"}
                            key={`cell-${index}`}
                            fill={
                              x.nueReelCashFlowNet > 0 ? "#01c96c" : "#e1396c"
                            }
                          />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
                <div className='cash-flow-box'>
                  <h5>Cash-flow cumulé</h5>
                  <select
                    type='select'
                    name='nueReelYear'
                    value={nueReelYear}
                    onChange={(e) => onChange(e, "nueReel")}
                    className='input-box-2 fs-12'
                  >
                    {optionsDetention.map((option) => (
                      <option key={option} value={option}>
                        {option} ans
                      </option>
                    ))}
                  </select>
                  <h6>{sepSpace(Math.round(nueReelCash))} €</h6>
                </div>
              </div>
            </div>
          ) : (
            ""
          )}
          {nueMicro ? (
            <div className='model-group'>
              <h3>Nue au micro-foncier</h3>
              <div className='chart-container'>
                <div className='chart-box'>
                  <ResponsiveContainer width='100%' height={150}>
                    <BarChart data={currentModel}>
                      <XAxis
                        dataKey='annee'
                        stroke='#9c9999'
                        style={{
                          fontSize: "12px",
                        }}
                      />
                      <ReferenceLine y={0} stroke='#9c9999' strokeWidth={0.5} />{" "}
                      <YAxis
                        type='number'
                        domain={[minValue, maxValue]}
                        stroke='#9c9999'
                        ticks={[minValue, 0, maxValue]}
                        interval={0}
                        style={{
                          fontSize: "12px",
                        }}
                      />
                      <Tooltip content={<CustomTooltip />} />
                      <Bar dataKey='nueMicroCashFlowNet' barSize={50}>
                        {currentModel.map((x, index) => (
                          <Cell
                            label={"Nue au micro-foncier"}
                            key={`cell-${index}`}
                            fill={
                              x.nueMicroCashFlowNet > 0 ? "#01c96c" : "#e1396c"
                            }
                          />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
                <div className='cash-flow-box'>
                  <h5>Cash-flow cumulé</h5>
                  <select
                    type='select'
                    name='nueMicroYear'
                    value={nueMicroYear}
                    onChange={(e) => onChange(e, "nueMicro")}
                    className='input-box-2 fs-12'
                  >
                    {optionsDetention.map((option) => (
                      <option key={option} value={option}>
                        {option} ans
                      </option>
                    ))}
                  </select>

                  <h6>{sepSpace(Math.round(nueMicroCash))} €</h6>
                </div>
              </div>
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
    </section>
  );
};

Modelisation.propTypes = {
  modelModalToggle: PropTypes.func.isRequired,
  saveModalClic: PropTypes.func.isRequired,
  modelModalClic: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
  modelModal: PropTypes.bool,
  currentModel: PropTypes.array,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  modelModal: state.modals.modelModal,
  currentModel: state.modelData.currentModel,
});

export default connect(mapStateToProps, {
  modelModalToggle,
  modelModalClic,
  saveModalClic,
})(Modelisation);
