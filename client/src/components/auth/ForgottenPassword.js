// package
import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

// action
import { forgottenEmail } from "../../actions/auth";
import { passwordChangePage } from "../../actions/modals";

// components
import Alerte from "../Layout/Alert";

const ForgottenPassword = ({
  forgottenEmail, // action envoi email réinitialisation
  passwordChangePage, // detect si route URL ou autre route
  history, // props router
}) => {
  const resetStates = () => {
    setEmail({
      email: "",
    });
  };

  useEffect(() => {
    // inform the reducer about the current page
    const url = history.location.pathname;
    if (url.includes("forgotten-pwd")) {
      passwordChangePage(true);
    }
  }, [history, passwordChangePage]);

  // passwords state
  const [userEmail, setEmail] = useState({
    email: "",
  });
  const { email } = userEmail;

  const onChangeEmail = (e) => {
    setEmail({ ...userEmail, [e.target.name]: e.target.value });
  };

  const onSubmitEmail = (e) => {
    e.preventDefault();
    forgottenEmail(email);
    resetStates();
  };

  return (
    <section className='background'>
      <div className='pwd-change-email'>
        <form className='password-change-form-email' onSubmit={onSubmitEmail}>
          <h1>Réinitialiser mot de passe</h1>
          <input
            name='email'
            type='email'
            value={email}
            onChange={onChangeEmail}
            placeholder='Email'
            required
          />
          <div className='pwd-change-bottom'>
            <div className='flex-row jc-sb'></div>
            <button style={{ marginTop: "10px", height: "40px" }}>
              Confirmer
            </button>
            <div style={{ maxWidth: "300px" }}>
              <Alerte style={{ padding: 0 }} />
            </div>
          </div>
        </form>
      </div>
    </section>
  );
};

ForgottenPassword.propTypes = {
  forgottenEmail: PropTypes.func.isRequired,
  passwordChangePage: PropTypes.func.isRequired,
};

export default connect(null, { forgottenEmail, passwordChangePage })(
  ForgottenPassword
);
