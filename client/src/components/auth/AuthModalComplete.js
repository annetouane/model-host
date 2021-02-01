// package
import React, { useState } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

// component
import Alerte from "../Layout/Alert";

// image
import confirmationImg from "../../img/mobile-confirmation-2.svg";

// actions
import {
  authToggle,
  saveModalClic,
  modelModalClic,
  mobileVerificationToggle,
} from "../../actions/modals";

const AuthModalComplete = ({
  onChangeSignUp,
  onChangeConditionSignUp,
  onChangeSignIn,
  onSignUp,
  onSignIn,
  setSignUp,
  setSignIn,
  emailSignUp,
  mobileSignUp,
  passwordSignUp,
  confirmPassword,
  condition,
  codeSms,
  emailSignIn,
  passwordSignIn,
  width,
  onCheckAccountCreation, // ask server if account can be create
  mobileVerificationToggle, // action open close mobile verification - redux
  authModal, // bool open close auth - redux
  authToggle, // action open close auth - redux
  saveModalClic, // detect clic save - redux
  modelModalClic, // detect clic model - redux
  modalMobileVerif, // si compte peut-être créé, ouvre vérification mobile - redux
  // detectSave, // detect clic on sauvegarder - redux
  // detectModel, // detect clic on model - redux
}) => {
  // choix tab : création compte ou connection
  const [signUpTab, setSignUpTab] = useState(true);

  // password show hide
  const [passwordShown, setPasswordShown] = useState(false);

  const togglePasswordVisiblity = () => {
    setPasswordShown(passwordShown ? false : true);
  };

  const resetStates = () => {
    setSignUp({
      emailSignUp: "",
      mobileSignUp: "",
      passwordSignUp: "",
      confirmPassword: "",
      condition: false,
    });
    setSignIn({
      emailSignIn: "",
      passwordSignIn: "",
    });
  };

  // ferme fenetre et reset clic detect
  const authClose = () => {
    authToggle(false); // close auth modal
    saveModalClic(false); // save n'est plus actif
    modelModalClic(false); // model n'est plus actif
    mobileVerificationToggle(false);
    resetStates();
  };

  return (
    <section className={authModal ? "auth-modal" : "auth-modal-none"}>
      <div className='auth-box' style={{ margin: 0 }}>
        {width > 1155 && !modalMobileVerif ? (
          <div onClick={authClose}>
            <i className='fas fa-times quit-auth-modal'></i>
          </div>
        ) : (
          ""
        )}
        {!modalMobileVerif ? (
          <div style={{ width: "100%" }}>
            <div className='account-params'>
              <button
                onClick={() => setSignUpTab(true)}
                style={{
                  backgroundColor: signUpTab ? "#007be8" : "",
                  border: signUpTab ? "1px solid rgb(192, 192, 192)" : "none",
                  borderRadius: signUpTab ? "5px 5px 0 0" : "0",
                  color: signUpTab ? "#fff" : "#333",
                  borderBottomStyle: signUpTab && "none",
                }}
              >
                Créer un compte
              </button>
              <button
                onClick={() => setSignUpTab(false)}
                style={{
                  backgroundColor: !signUpTab ? "#007be8" : "",
                  border: !signUpTab ? "1px solid rgb(192, 192, 192)" : "none",
                  borderRadius: !signUpTab ? "5px 5px 0 0" : "0",
                  color: !signUpTab ? "#fff" : "#333",
                  borderBottomStyle: !signUpTab && "none",
                }}
                className='button-delete-account'
              >
                Se connecter
              </button>
            </div>
            {/* {signUpTab && detectSave ? (
              <p>
                Créer un compte pour sauvegarder ce projet. Une fois votre email
                vérifier, vous pourrez vous connecter et retrouver dans votre
                compte votre projet sauvegardé.
              </p>
            ) : !signUpTab && detectSave ? (
              <p>Connectez-vous à votre compte pour sauvegarder ce projet.</p>
            ) : signUpTab && detectModel ? (
              <p>
                Créer un compte pour visualiser le cash-flow annuel net d'impôt
                de ce projet sur toute la durée de l'emprunt. Les paramètres
                saisis seront automatiquement sauvegardés. Une fois votre email
                vérifier, vous pourrez vous connecter à votre compte et
                consulter le cash-flow annuel net d'impôt de votre projet.
              </p>
            ) : !signUpTab && detectModel ? (
              <p>
                Connectez-vous à votre compte pour visualiser la rentabilité
                après impôt de ce projet sur toute la durée de l'emprunt.
              </p>
            ) : signUpTab && !detectModel && !detectSave ? (
              <p>
                Créer un compte pour visualiser le cash-flow annuel net d'impôt
                d'un projet sur toute la durée de l'emprunt et sauvegarder les
                paramètres de tous vos projets à l'étude.
              </p>
            ) : !signUpTab && !detectModel && !detectSave ? (
              <p>
                Connectez-vous à votre compte pour visualiser le cash-flow
                annuel net d'impôt d'un projet sur toute la durée de l'emprunt
                et sauvegarder les paramètres de tous vos projets à l'étude.
              </p>
            ) : (
              ""
            )} */}
            {signUpTab ? (
              <form
                className='auth-form'
                onSubmit={onCheckAccountCreation}
                method='post'
              >
                <input
                  name='emailSignUp'
                  value={emailSignUp}
                  type='email'
                  onChange={onChangeSignUp}
                  placeholder='Email'
                  autoComplete='email'
                  required
                />
                <div className='mobile-input'>
                  <p
                    style={{
                      color: mobileSignUp === "" ? "grey" : "#000000",
                    }}
                  >
                    +33
                  </p>
                  <input
                    name='mobileSignUp'
                    value={mobileSignUp}
                    onChange={onChangeSignUp}
                    type='tel'
                    placeholder='N° de mobile sur 10 chiffres'
                    autoComplete='tel'
                    required
                  />
                </div>

                <input
                  name='passwordSignUp'
                  value={passwordSignUp}
                  type={passwordShown ? "text" : "password"}
                  onChange={onChangeSignUp}
                  placeholder='Mot de passe'
                  autoComplete='new-password'
                  required
                />
                <input
                  name='confirmPassword'
                  value={confirmPassword}
                  type={passwordShown ? "text" : "password"}
                  onChange={onChangeSignUp}
                  placeholder='Confirmer mot de passe'
                  autoComplete='new-password'
                  required
                />
                <div className='flex-row jc-sb ml-5 mb-5'>
                  <small style={{ fontSize: "9px" }}>
                    Choisir un mot de passe de 8 caractères minimum
                  </small>
                  <div className='pwd-icon' onClick={togglePasswordVisiblity}>
                    {passwordShown ? (
                      <i className='far fa-eye-slash'>&nbsp;Cacher</i>
                    ) : (
                      <i className='far fa-eye'>&nbsp;Montrer</i>
                    )}
                  </div>
                </div>
                {/* <div className='pwd-checks'>
            {passwordSignUp === "" || passwordSignUp.length <= 8 ?
              <i className="fas fa-times"></i> :
              <i className="fas fa-check" style={{ color: "#01c96c" }} ></i>}&nbsp;
              <h6>8 characters minimum</h6>
          </div>
          <div className='pwd-checks'>
            {passwordSignUp === "" || passwordSignUp.toUpperCase() === passwordSignUp ?
              <i className="fas fa-times"></i> :
              <i className="fas fa-check" style={{ color: "#01c96c" }} ></i>}&nbsp;
              <h6>1 minuscule</h6>
          </div> 
          <div className='pwd-checks'>
            {passwordSignUp === "" || passwordSignUp.toLowerCase() === passwordSignUp ?
              <i className="fas fa-times"></i> :
              <i className="fas fa-check" style={{ color: "#01c96c" }} ></i>}&nbsp;
              <h6>1 majuscule</h6>
          </div>
          <div className='pwd-checks'>
            {passwordSignUp === "" || /\d/.test(passwordSignUp) === false ?
              <i className="fas fa-times"></i> :
              <i className="fas fa-check" style={{ color: "#01c96c" }} ></i>}&nbsp;
              <h6>1 chiffre</h6>
          </div> */}
                <div className='auth-box-end'>
                  <input
                    type='checkbox'
                    className='ml-5 mr-5'
                    name='condition'
                    checked={condition}
                    onChange={onChangeConditionSignUp}
                    required
                  />
                  <p>
                    En créant mon espace personnel, je reconnais avoir pris
                    connaissance des conditions générales d'utilisation et je
                    les accepte.{" "}
                    <a
                      href='/cgu'
                      target='_blank'
                      style={{ fontWeight: "bold" }}
                    >
                      En savoir plus
                    </a>
                  </p>
                </div>
                <button>Créer un compte</button>
              </form>
            ) : (
              // <div>
              //   {passForgotModal ? (
              <form className='auth-form' onSubmit={onSignIn} method='post'>
                <input
                  name='emailSignIn'
                  value={emailSignIn}
                  type='text'
                  onChange={onChangeSignIn}
                  placeholder='Email ou n° de mobile'
                  autoComplete='email'
                  required
                />
                <input
                  name='passwordSignIn'
                  value={passwordSignIn}
                  type={passwordShown ? "text" : "password"}
                  onChange={onChangeSignIn}
                  placeholder='Mot de passe'
                  autoComplete='current-password'
                  required
                />
                <div className='pwd-icon' onClick={togglePasswordVisiblity}>
                  {passwordShown ? (
                    <i className='far fa-eye-slash'>&nbsp;Cacher</i>
                  ) : (
                    <i className='far fa-eye'>&nbsp;Montrer</i>
                  )}
                </div>
                <button>Se connecter</button>
                <div className='forgotten-pwd-button'>
                  <Link to='/forgotten-pwd' target='_blank'>
                    Mot de pass oublié ?
                  </Link>
                </div>
              </form>
            )}

            <Alerte />
          </div>
        ) : (
          <div className='mobile-auth-page'>
            <img src={confirmationImg} alt='' />
            <h3>
              Un code d'activation à 4 chiffres a<br />
              été envoyé au : {mobileSignUp}
            </h3>
            <form onSubmit={onSignUp} method='post'>
              <input
                name='codeSms'
                value={codeSms}
                type='number'
                onChange={onChangeSignUp}
                placeholder="Code d'activation"
                required
              />
              <button>Confirmer</button>
            </form>
            <div className='alt-validation-mobile'>
              <button
                onClick={() => mobileVerificationToggle(false)}
                id='incorrect-mobile'
                style={{ borderRight: "1px solid #aaa9a9" }}
              >
                Ce n° de mobile est incorrect
              </button>
              <button onClick={onCheckAccountCreation}>
                Renvoyer le code d'activation
              </button>
            </div>
            <Alerte />
          </div>
        )}
      </div>
    </section>
  );
};

AuthModalComplete.propTypes = {
  authModal: PropTypes.bool.isRequired,
  detectSave: PropTypes.bool.isRequired,
  detectModel: PropTypes.bool.isRequired,
  authToggle: PropTypes.func.isRequired,
  saveModalClic: PropTypes.func.isRequired,
  modalMobileVerif: PropTypes.bool.isRequired,
  modelModalClic: PropTypes.func.isRequired,
  onSignUp: PropTypes.func.isRequired,
  onSignIn: PropTypes.func.isRequired,
  mobileVerificationToggle: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  authModal: state.modals.authModal,
  modalMobileVerif: state.modals.modalMobileVerif,
  detectSave: state.modals.detectSave,
  detectModel: state.modals.detectModel,
});

export default connect(mapStateToProps, {
  authToggle,
  saveModalClic,
  modelModalClic,
  mobileVerificationToggle,
})(AuthModalComplete);
