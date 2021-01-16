// package
import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

// action
import { passwordChangePage } from "../../actions/modals";
import { forgottenChange } from "../../actions/auth";
import { setAlert } from "../../actions/alert";

// components
import Alerte from "../Layout/Alert";

const ChangePasswordLanding = ({
  passwordChangePage, // detect si route URL ou autre route
  forgottenChange, // action update mot de passe
  history, // props router
  match, // props router
}) => {
  const resetStates = () => {
    setPasswords({
      newPassWord: "",
      confirmNewPassword: "",
    });
  };

  useEffect(() => {
    // inform the reducer about the current page
    const url = history.location.pathname;
    if (url.includes("change-pwd")) {
      passwordChangePage(true);
    }
  }, [history, passwordChangePage]);

  // passwords state
  const [passwords, setPasswords] = useState({
    newPassWord: "",
    confirmNewPassword: "",
  });
  const { newPassWord, confirmNewPassword } = passwords;

  const onChangePassword = (e) => {
    setPasswords({ ...passwords, [e.target.name]: e.target.value });
  };

  // password show / hide func
  const [passwordShown, setPasswordShown] = useState(false);

  const togglePasswordVisiblity = () => {
    setPasswordShown(passwordShown ? false : true);
  };

  const onSubmitPassword = (e) => {
    e.preventDefault();
    if (newPassWord === confirmNewPassword) {
      forgottenChange(newPassWord, match.params.id);
      resetStates();
    } else {
      setAlert("Les mots de passe ne correspondent pas", "red", 3000);
    }
  };

  return (
    <section className='background'>
      <div className='pwd-change-email'>
        <form
          className='password-change-form-email'
          onSubmit={onSubmitPassword}
        >
          <h1>Nouveau mot de passe</h1>
          <input
            name='newPassWord'
            value={newPassWord}
            type={passwordShown ? "text" : "password"}
            onChange={onChangePassword}
            placeholder='Nouveau mot de passe'
            autoComplete='new-password'
            required
          />
          <input
            name='confirmNewPassword'
            value={confirmNewPassword}
            type={passwordShown ? "text" : "password"}
            onChange={onChangePassword}
            placeholder='Confirmer mot de passe'
            autoComplete='new-password'
            required
          />
          <div className='pwd-change-bottom'>
            <div className='flex-row jc-sb'>
              <div>
                <Alerte style={{ padding: 0 }} />
              </div>
              <div className='pwd-icon' onClick={togglePasswordVisiblity}>
                {passwordShown ? (
                  <i className='far fa-eye-slash'>&nbsp;Cacher</i>
                ) : (
                  <i className='far fa-eye'>&nbsp;Montrer</i>
                )}
              </div>
            </div>
            <button>Confirmer</button>
          </div>
        </form>
      </div>
    </section>
  );
};

ChangePasswordLanding.propTypes = {
  passwordChangePage: PropTypes.func.isRequired,
  forgottenChange: PropTypes.func.isRequired,
};

export default connect(null, { passwordChangePage, forgottenChange })(
  ChangePasswordLanding
);
