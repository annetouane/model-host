import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

// propTypes component
// passe alerts (state alert from the root reducer) as a prop and destructure it
const AlerteStrip = ({ alerts }) =>
  // si alert dans le state
  alerts !== null &&
  alerts.length > 0 &&
  // map the different alerts in the state
  alerts.map((alert) => (
    // display the different alerts from the state
    <div
      className='alert-box'
      key={alert.id}
      style={{ backgroundColor: alert.color }}
    >
      <div>
        {
          (alert.color = "green" ? (
            <i class='fas fa-check-circle'></i>
          ) : (
            (alert.color = "orange" ? (
              <i class='fas fa-exclamation-circle'></i>
            ) : (
              <i class='fas fa-times-circle'></i>
            ))
          ))
        }
        <div
          style={{
            backgroundColor: alert.color,
            color: "#fff",
            borderRadius: "5px",
            zIndex: 10000000000,
            width: "100%",
            fontSize: "12px",
            borderRadius: "0 5px 5px 0x",
          }}
        >
          {alert.msg}
        </div>
      </div>
      <i className='fas fa-times'></i>
    </div>
  ));

// "alerts" is a prop so it needs to be declared/defined as a prop
AlerteStrip.propTypes = {
  alerts: PropTypes.array.isRequired,
};

// map the redux state to a prop in the component so that we have access to it
const mapStateToProps = (state) => ({
  // assign to "alerts" the root reducer's state call "alert"
  alerts: state.alert,
});

// whenever connect is used in a component, it has to be exported
export default connect(mapStateToProps)(AlerteStrip);
