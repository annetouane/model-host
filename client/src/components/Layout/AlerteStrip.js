import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { removeAlertStrip } from "../../actions/alert";

// propTypes component
// passe alerts (state alert from the root reducer) as a prop and destructure it
const AlerteStrip = ({ alerts, removeAlertStrip }) =>
  // si alert dans le state
  alerts !== null &&
  alerts.length > 0 &&
  // map the different alerts in the state
  alerts.map((alert) => (
    // display the different alerts from the state
    <div className='alert-box' key={alert.id}>
      <div className='alert-body'>
        <div className='alert-icon'>
          {
            (alert.alertType = "green" ? (
              <i className='fas fa-check-circle fa-2x'></i>
            ) : (
              (alert.alertType = "orange" ? (
                <i className='fas fa-exclamation-circle fa-2x'></i>
              ) : (
                <i className='fas fa-times-circle fa-2x'></i>
              ))
            ))
          }
        </div>
        <div className='alert-msg'>{alert.msg}</div>
        <button onClick={() => removeAlertStrip(alert.id)}>
          <i className='fas fa-times'></i>
        </button>
      </div>
    </div>
  ));

// "alerts" is a prop so it needs to be declared/defined as a prop
AlerteStrip.propTypes = {
  alerts: PropTypes.array.isRequired,
};

// map the redux state to a prop in the component so that we have access to it
const mapStateToProps = (state) => ({
  // assign to "alerts" the root reducer's state call "alert"
  alerts: state.alertStrip,
});

// whenever connect is used in a component, it has to be exported
export default connect(mapStateToProps, { removeAlertStrip })(AlerteStrip);
