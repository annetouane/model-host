// package
import React, { useState } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

// component
import Alerte from "./../Layout/Alert";

// actions
import { authToggle, saveModalClic, modelModalClic } from "../../actions/auth";

const AuthModalLanding = ({ 
  onChangeSignUp,
  onChangeConditionSignUp,
  onChangeSignIn,
  onSignUp,
  onSignIn,
  emailSignUp,
  passwordSignUp,
  condition,
  emailSignIn,
  passwordSignIn,
  detectSave, // detect clic on sauvegarder
  detectModel, // detect clic on model
  authModal, // bool open close auth
  authToggle, // action open close auth
  saveModalClic, // detect clic save
  modelModalClic // detect clic model
 }) => {
  
  // choix tab : création compte ou connection
  const [signUpTab, setSignUpTab] = useState(true);

  // password show hide
  const [passwordShown, setPasswordShown] = useState(false);

  const togglePasswordVisiblity = () => {
    setPasswordShown(passwordShown ? false : true);
  };

  // ferme fenetre et reset clic detect
  const authClose = () => {
    authToggle(false) // close auth modal
    saveModalClic(false) // save n'est plus actif
    modelModalClic(false) // model n'est plus actif
  }

  return (
    <section className={authModal ? "auth-modal" : "auth-modal-none"}>
      <div className='auth-box' style={{ margin: 0 }}>
        <div onClick={authClose}>
          <i className='fas fa-window-close fa-2x quit-auth-modal'></i>
        </div>
        <div className='auth-header'>
          <button
            onClick={() => setSignUpTab(true)}
            style={{ borderBottom: signUpTab ? "#007be8 solid 2px" : "" }}
            >Créer un compte
          </button>
          <button 
            onClick={() => setSignUpTab(false)}
            style={{ borderBottom: !signUpTab ? "#007be8 solid 2px" : "" }}
            >Se connecter
          </button>
        </div>
        {signUpTab && detectSave ?
          <p>Veuillez créer un compte pour sauvegarder ce projet. Une fois votre email vérifier, vous pourrez vous connecter à votre compte et reprendre la modélisation du projet sauvegardé.</p> 
        : !signUpTab && detectSave ?
          <p>Connectez-vous à votre compte pour sauvegarder ce projet.</p>
        : signUpTab && detectModel ?
          <p>Veuillez créer un compte pour visualiser la rentabilité après impôt de ce projet. Les paramètres saisis seront automatiquement sauvegardés et une fois votre email vérifier, vous pourrez vous connecter et visualiser la rentabilité après impôt de ce projet sur toute la durée de l'emprunt.</p> 
        : !signUpTab && detectModel ?
          <p>Connectez-vous à votre compte pour visualiser la rentabilité après impôt de ce projet sur toute la durée de l'emprunt.</p>
        :  ""}
        {signUpTab ?
        <form
          className="auth-form"
          onSubmit={onSignUp}
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
          <input
            name='passwordSignUp'
            value={passwordSignUp}        
            type={passwordShown ? "text" : "password"}
            onChange={onChangeSignUp}
            placeholder='Mot de passe'
            autoComplete='new-password'
            required
            />
          <div className="flex-row jc-sb ml-5 mb-5 mt-5">
            <small style={{ fontSize: "9px" }}>Choisir un mot de passe de 8 caractères minimum</small>
            <div className="pwd-icon" onClick={togglePasswordVisiblity}>
              {passwordShown ?
                <i class="far fa-eye-slash">&nbsp;Cacher</i> :
                <i class="far fa-eye">&nbsp;Montrer</i>
              }
            </div>
          </div>
          {/* <div className='pwd-checks'>
            {passwordSignUp === "" || passwordSignUp.length <= 8 ?
              <i class="fas fa-times"></i> :
              <i class="fas fa-check" style={{ color: "#01c96c" }} ></i>}&nbsp;
              <h6>8 characters minimum</h6>
          </div>
          <div className='pwd-checks'>
            {passwordSignUp === "" || passwordSignUp.toUpperCase() === passwordSignUp ?
              <i class="fas fa-times"></i> :
              <i class="fas fa-check" style={{ color: "#01c96c" }} ></i>}&nbsp;
              <h6>1 minuscule</h6>
          </div> 
          <div className='pwd-checks'>
            {passwordSignUp === "" || passwordSignUp.toLowerCase() === passwordSignUp ?
              <i class="fas fa-times"></i> :
              <i class="fas fa-check" style={{ color: "#01c96c" }} ></i>}&nbsp;
              <h6>1 majuscule</h6>
          </div>
          <div className='pwd-checks'>
            {passwordSignUp === "" || /\d/.test(passwordSignUp) === false ?
              <i class="fas fa-times"></i> :
              <i class="fas fa-check" style={{ color: "#01c96c" }} ></i>}&nbsp;
              <h6>1 chiffre</h6>
          </div> */}
          <div className='auth-box-end'>
            <input 
              type="checkbox" 
              className='ml-5 mr-5'
              name='condition'
              value={condition}
              onChange={onChangeConditionSignUp}
              required
              />
            <p>Accepter que Simulimo transmette mes informations à ses partenaires à des fins commerciales. <b>Vous pourrez changer d'avis à tout moment.</b> <a href="" target='_blank'>En savoir plus</a></p>
          </div>
          <button>Créer un compte</button>
        </form> :
        <form
          className="auth-form"
          onSubmit={onSignIn}
        >
          <input 
            name='emailSignIn'
            value={emailSignIn}
            type='email' 
            onChange={onChangeSignIn}
            placeholder='Email'
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
          <div className="pwd-icon" onClick={togglePasswordVisiblity}>
            {passwordShown ?
              <i class="far fa-eye-slash">&nbsp;Cacher</i> :
              <i class="far fa-eye">&nbsp;Montrer</i>
            }
          </div>
          <button>Se connecter</button>
        </form>}
        <Alerte />
      </div>
    </section>
  );
};

AuthModalLanding.propTypes = {
  authModal: PropTypes.bool.isRequired,
  detectSave: PropTypes.bool.isRequired,
  detectModel: PropTypes.bool.isRequired,
  authToggle: PropTypes.func.isRequired,
  saveModalClic: PropTypes.func.isRequired,
  modelModalClic: PropTypes.func.isRequired,
  onSignUp: PropTypes.func.isRequired,
  onSignIn: PropTypes.func.isRequired,
  };
  
  const mapStateToProps = (state) => ({
    authModal: state.auth.authModal,
    detectSave: state.auth.detectSave,
    detectModel: state.auth.detectModel,
  });
  
export default connect(mapStateToProps, { authToggle, 
                                          saveModalClic, 
                                          modelModalClic })(AuthModalLanding);
