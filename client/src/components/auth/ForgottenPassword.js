// package
import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

// action
import { forgottenSms, forgottenChange } from "../../actions/auth";
import {
  passwordChangePage,
  forgottenPasswordToggle,
} from "../../actions/modals";
import { setAlert } from "../../actions/alert";

// components
import Alerte from "../Layout/Alert";

// image
import confirmationImg from "../../img/mobile-confirmation-2.svg";

const ForgottenPassword = ({
  passwordChangePage, // detect si route URL ou autre route
  history, // props router
  forgottenPasswordToggle, // action show hide forgotten password - redux
  passForgotModal, // bool show hide forgotten password - redux
  forgottenSms, // route envoi code sms
  forgottenChange, // update password if code is valid
  user, // user id sent to reducer from server - redux
  setAlert,
  isAuthenticated,
}) => {
  useEffect(() => {
    // inform the reducer about the current page
    const url = history.location.pathname;
    if (url.includes("forgotten-pwd")) {
      passwordChangePage(true);
    }
  }, [history, passwordChangePage]);

  // mobile state
  const [userMobile, setMobile] = useState({
    mobile: "",
  });
  const { mobile } = userMobile;

  const onChangeMobile = (e) => {
    setMobile({ ...userMobile, [e.target.name]: e.target.value });
  };

  // mobile state
  const [password, setPassword] = useState({
    newPassword: "",
    confirmation: "",
    codeSms: "",
  });
  const { newPassword, confirmation, codeSms } = password;

  const onChangePassword = (e) => {
    setPassword({ ...password, [e.target.name]: e.target.value });
  };

  // envoi le mobile de l'utilisateur au serveur
  // check if account can be created according to provided credentials
  const onSubmitMobile = (e) => {
    e.preventDefault();
    // si mobile n'est pas numérique
    if (!/^\d+$/.test(mobile)) {
      console.log("not number");
      setAlert("Merci de saisir uniquement des chiffres", "red", 3000);
      // si mobile n'est commence pas par 06 ou 07
    } else if (!mobile.startsWith("06") && !mobile.startsWith("07")) {
      console.log("not mobile");
      setAlert(
        "Merci d'indiquer un numéro de mobile (06/07xxxxxxxx)",
        "red",
        3000
      );
      // si mobile n'est pas sur 10 caractères
    } else if (mobile.length !== 10) {
      setAlert("Merci d'indiquer un mobile sur 10 chiffres", "red", 3000);
      // sinon post
    } else {
      console.log("ok");
      forgottenSms(mobile);
    }
  };

  // envoi le code et le nouveau mot de passe
  const onSubmitPassword = (e) => {
    e.preventDefault();
    if (newPassword !== confirmation) {
      setAlert("Les mots de passes ne correspondent pas", "red", 3000);
    } else {
      const data = {
        id: user.id,
        newPassword: newPassword,
        mobileRecover: mobile,
        codeSms: codeSms,
      };
      console.log(data);
      forgottenChange(data);
    }
  };

  // password show hide
  const [passwordShown, setPasswordShown] = useState(false);

  const togglePasswordVisiblity = () => {
    setPasswordShown(passwordShown ? false : true);
  };

  // redirect if logged-in success
  if (isAuthenticated) {
    return <Redirect to='/' />;
  }

  return (
    <section className='background'>
      {!passForgotModal ? (
        <div className='pwd-change-email'>
          <form
            className='password-change-form-email'
            onSubmit={onSubmitMobile}
          >
            <h1>Réinitialiser mot de passe</h1>
            <input
              name='mobile'
              type='tel'
              value={mobile}
              onChange={onChangeMobile}
              placeholder='N° de mobile'
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
      ) : (
        <div className='mobile-auth-page mobile-recover-pwd'>
          <img src={confirmationImg} alt='' />
          <h3>
            Un code d'activation à 4 chiffres a<br />
            été envoyé au : {mobile}
          </h3>
          <form onSubmit={onSubmitPassword} method='post'>
            <input
              name='codeSms'
              value={codeSms}
              type='number'
              onChange={onChangePassword}
              placeholder="Code d'activation"
              required
            />
            <input
              name='newPassword'
              value={newPassword}
              type={passwordShown ? "text" : "password"}
              onChange={onChangePassword}
              placeholder='Nouveau mot de passe'
              required
            />
            <input
              name='confirmation'
              value={confirmation}
              type={passwordShown ? "text" : "password"}
              onChange={onChangePassword}
              placeholder='Confirmer mot de passe'
              required
            />
            <div
              className='pwd-icon'
              onClick={togglePasswordVisiblity}
              style={{ color: "#333" }}
            >
              {passwordShown ? (
                <i className='far fa-eye-slash'>&nbsp;Cacher</i>
              ) : (
                <i className='far fa-eye'>&nbsp;Montrer</i>
              )}
            </div>
            <button style={{ border: "none" }}>Confirmer</button>
          </form>
          <div className='alt-validation-mobile'>
            <button
              onClick={() => forgottenPasswordToggle(false)}
              id='incorrect-mobile'
              style={{ border: "none", borderRight: "1px solid #aaa9a9" }}
            >
              Ce n° de mobile est incorrect
            </button>
            <button style={{ border: "none" }} onClick={onSubmitMobile}>
              Renvoyer le code d'activation
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

ForgottenPassword.propTypes = {
  passwordChangePage: PropTypes.func.isRequired,
  forgottenChange: PropTypes.func.isRequired,
  forgottenSms: PropTypes.func.isRequired,
  setAlert: PropTypes.func.isRequired,
  forgottenPasswordToggle: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
  passForgotModal: PropTypes.bool.isRequired,
  user: PropTypes.object,
};

const mapStateToProps = (state) => ({
  user: state.auth.user,
  isAuthenticated: state.auth.isAuthenticated,
  passForgotModal: state.modals.passForgotModal,
});

export default connect(mapStateToProps, {
  passwordChangePage,
  forgottenPasswordToggle,
  forgottenSms,
  setAlert,
  forgottenChange,
})(ForgottenPassword);
