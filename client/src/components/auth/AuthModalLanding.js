// components
import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

// actions
import { register, login, closeAuth } from "../../actions/auth";

const AuthModalLanding = ({ register, login, landingAuthModal, closeAuth }) => {
  const [tab, setTab] = useState(true);

  const [signUp, setSignUp] = useState({
    emailSignUp: "",
    passwordSignUp: "",
    condition: false,
  });

  const { emailSignUp, passwordSignUp, condition } = signUp;

  const onChangeSignUp = (e) => {
    setSignUp({ ...signUp, [e.target.name]: e.target.value });
  };

  const onChangeConditionSignUp = (e) => {
    setSignUp({ ...signUp, [e.target.name]: e.target.checked });
  };

  const onSignUp = (e) => {
    e.preventDefault();
    register(signUp)
  }

  // sign in
  const [signIn, setSignIn] = useState({
    emailSignIn: "",
    passwordSignIn: "",
  }); 

  const { emailSignIn, passwordSignIn } = signIn;

  const onChangeSignIn = (e) => {
    setSignIn({ ...signIn, [e.target.name]: e.target.value });
  };

  const onSignIn = (e) => {
    e.preventDefault();
    login(signIn)
  }

  // password
  const [passwordShown, setPasswordShown] = useState(false);

  const togglePasswordVisiblity = () => {
    setPasswordShown(passwordShown ? false : true);
  };

  return (
    <section className={landingAuthModal && landingAuthModal ? "auth-modal" : "auth-modal-none"}>
      <div className='auth-box' style={{ margin: 0 }}>
        <div onClick={closeAuth}>
          <i className='fa fa-arrow-right fa-2x quit-auth-modal'></i>
        </div>
        <div className='auth-header'>
          <button
            onClick={() => setTab(true)}
            style={{ borderBottom: tab ? "#007be8 solid 2px" : "" }}
            >Créer un compte
          </button>
          <button 
            onClick={() => setTab(false)}
            style={{ borderBottom: !tab ? "#007be8 solid 2px" : "" }}
            >Se connecter
          </button>
        </div>
        {tab ?
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
            required
          />
          <input
            name='passwordSignUp'
            value={passwordSignUp}        
            type={passwordShown ? "text" : "password"}
            onChange={onChangeSignUp}
            placeholder='Mot de passe'
            required
            />
          <div className="pwd-icon" onClick={togglePasswordVisiblity}>
            {passwordShown ?
              <i class="far fa-eye-slash">&nbsp;Cacher</i> :
              <i class="far fa-eye">&nbsp;Montrer</i>
            }
          </div>
          <div className='pwd-checks'>
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
          </div>
          <div className='flex-row ai-fs mt-5'>
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
            required
            />
          <input 
            name='passwordSignIn'
            value={passwordSignIn}        
            type={passwordShown ? "text" : "password"}
            onChange={onChangeSignIn}
            placeholder='Mot de passe'
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
      </div>
    </section>
  );
};

AuthModalLanding.propTypes = {
    landingAuthModal: PropTypes.bool.isRequired,
  };
  
  const mapStateToProps = (state) => ({
    landingAuthModal: state.auth.landingAuth,
  });
  
export default connect(mapStateToProps, { register, login, closeAuth })(AuthModalLanding);
