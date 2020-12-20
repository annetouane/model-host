// components
import React from "react";
// import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import AuthModalLanding from "../auth/AuthModalLanding";

const Landing = () => {

  // // redirect if logged-in success
  // if (isAuthenticated) {
  //   return <Redirect to='/investment-modelisation' />;
  // }

  return (
    <section className="landing-page">
      <AuthModalLanding/>
      <h1>Welcome Lads</h1>
    </section>
  );
};

Landing.propTypes = {
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps)(Landing);
