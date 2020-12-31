import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

// propTypes component
// passe alerts (state alert from the root reducer) as a prop and destructure it
const Alerte = ({ alerts }) =>
  // si alert dans le state
  alerts !== null &&
  alerts.length > 0 &&
  // map the different alerts in the state
  alerts.map((alert) => (
    // display the different alerts from the state
    <div
      style={{
        color: alert.alertType,
        borderRadius: "5px",
        zIndex: 10000000,
        width: "100%",
        fontSize: "12px",
      }}
      key={alert.id}
    >
      {alert.msg}
    </div>
  ));

// "alerts" is a prop so it needs to be declared/defined as a prop
Alerte.propTypes = {
  alerts: PropTypes.array.isRequired,
};

// map the redux state to a prop in the component so that we have access to it
const mapStateToProps = (state) => ({
  // assign to "alerts" the root reducer's state call "alert"
  alerts: state.alert,
});

// whenever connect is used in a component, it has to be exported
export default connect(mapStateToProps)(Alerte);
