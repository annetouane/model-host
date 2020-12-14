// components
import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

// actions
import { register, login } from "../../actions/auth";

const Authentication = ({  register, login }) => {

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

  // sign in
  const [signIn, setSignIn] = useState({
    emailSignIn: "",
    passwordSignIn: "",
  }); 

  const { emailSignIn, passwordSignIn } = signIn;

  const onChangeSignIn = (e) => {
    setSignIn({ ...signIn, [e.target.name]: e.target.value });
  };

  const [passwordShown, setPasswordShown] = useState(false);

  const togglePasswordVisiblity = () => {
    setPasswordShown(passwordShown ? false : true);
  };

  // redirect if logged-in success
  // if (isAuthenticated) {
  //   return <Redirect to='/' />;
  // }

  return (
    <section className="authentication">
      <div className='auth-box'>
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
        <div className="auth-form">
          <input 
            name='emailSignUp'
            value={emailSignUp}
            type='email'
            onChange={onChangeSignUp}
            placeholder='Email' 
          />
          <input 
            name='passwordSignUp'
            value={passwordSignUp}        
            type={passwordShown ? "text" : "password"}
            onChange={onChangeSignUp}
            placeholder='Mot de passe' />
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
              onChange={onChangeConditionSignUp}/>
            <p>Accepter que Simulimo transmette mes informations à ses partenaires à des fins commerciales. <b>Vous pourrez changer d'avis à tout moment.</b> <a href="">En savoir plus</a></p>
          </div>
          <button>Créer un compte</button>
        </div> :
        <div className="auth-form">
          <input 
            name='emailSignIn'
            value={emailSignIn}
            type='email' 
            onChange={onChangeSignIn}
            placeholder='Email' />
          <input 
            name='passwordSignIn'
            value={passwordSignIn}        
            type={passwordShown ? "text" : "password"}
            onChange={onChangeSignIn}
            placeholder='Mot de passe' />
          <div className="pwd-icon" onClick={togglePasswordVisiblity}>
            {passwordShown ?
              <i class="far fa-eye-slash">&nbsp;Cacher</i> :
              <i class="far fa-eye">&nbsp;Montrer</i>
            }
          </div>
          <button>Se connecter</button>
        </div>}
      </div>
    </section>
  );
};

Authentication.propTypes = {
  register: PropTypes.func.isRequired,
  login: PropTypes.func.isRequired,
  // isAuthenticated: PropTypes.bool,
};

// const mapStateToProps = (state) => ({
//   isAuthenticated: state.auth.isAuthenticated,
// });

export default connect(null, { login, register })(Authentication);
