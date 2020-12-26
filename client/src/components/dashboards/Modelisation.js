// packages
import React from 'react';
import { connect } from "react-redux";
import PropTypes from "prop-types";
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip,
} from 'recharts';

// actions
import { modelModalToggle, modelModalClic, saveModalClic } from "../../actions/auth"

const data = [
  {
    name: 'Année 1', uv: 4000, pv: 2400, amt: 2400,
  },
  {
    name: 'Année 2', uv: 3000, pv: 1398, amt: 2210,
  },
  {
    name: 'Année 3', uv: -1000, pv: 9800, amt: 2290,
  },
  {
    name: 'Année 4', uv: 500, pv: 3908, amt: 2000,
  },
  {
    name: 'Année 5', uv: -2000, pv: 4800, amt: 2181,
  },
  {
    name: 'Année 6', uv: -250, pv: 3800, amt: 2500,
  },
  {
    name: 'Année 7', uv: 3490, pv: 4300, amt: 2100,
  },
];

const gradientOffset = () => {
  const dataMax = Math.max(...data.map(i => i.uv));
  const dataMin = Math.min(...data.map(i => i.uv));

  if (dataMax <= 0) {
    return 0;
  }
  if (dataMin >= 0) {
    return 1;
  }

  return dataMax / (dataMax - dataMin);
};

const off = gradientOffset();

export const Modelisation = ({ modelModal, modelModalToggle, modelModalClic, saveModalClic }) => {

  const saveClose = () => {
    modelModalToggle(false) // close auth modal
    saveModalClic(false) // save n'est plus actif
    modelModalClic(false) // model n'est plus actif
  }

  return (
    <section className={modelModal ? "auth-modal" : "auth-modal-none"}>
      <div className='model-box'>
        <div >
          <i className='fas fa-window-close fa-2x quit-auth-modal'
             onClick={saveClose}
          ></i>
        </div>
        <AreaChart
          width={600}
          height={300}
          data={data}
          margin={{
            top: 10, right: 30, left: 0, bottom: 0,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <defs>
            <linearGradient id="splitColor" x1="0" y1="0" x2="0" y2="1">
              <stop offset={off} stopColor="green" stopOpacity={1} />
              <stop offset={off} stopColor="red" stopOpacity={1} />
            </linearGradient>
          </defs>
          <Area type="monotone" dataKey="uv" stroke="#000" fill="url(#splitColor)" />
        </AreaChart>
    </div>
    </section>
  );
}

Modelisation.propTypes = {
  modelModalToggle: PropTypes.func.isRequired,
  saveModalClic: PropTypes.func.isRequired,
  modelModalClic: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
  modelModal: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  modelModal: state.auth.modelModal,
});

export default connect(mapStateToProps, { modelModalToggle,
                                          modelModalClic,
                                          saveModalClic })(Modelisation);

