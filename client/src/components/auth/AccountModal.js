// package
import React, { useState } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";

// component
import Alerte from "./../Layout/Alert";

// actions
import { accountModalToggle, logout, updPassword, deleteAccount } from "../../actions/auth";
import { setAlert } from "../../actions/alert";

const AccountModal = ({
  setAlert, 
  accountModalToggle,
  accountModal, 
  logout,
  updPassword,
  deleteAccount,
  history
}) => {
    const resetStates = () => {
      setPasswords({     
        oldPassword: "",
        newPassWord: "",
        confirmNewPassword: ""
      })
      setDeleteInput({ 
        deleteText: "",
      });
    }
  
  // ferme fenetre et reset clic detect
  const accountClose = () => {
    accountModalToggle(false) // close account modal
    setPwdChange({ togglePwd: true })
    setDeleteButton({ toggleDelete: false })
    resetStates()
  };

  // change password *****************************************************************************************
  const [pwdChange, setPwdChange] = useState({ 
      togglePwd: true,
   });
  const { togglePwd } = pwdChange

  // passwords state
  const [passwords, setPasswords] = useState({ 
    oldPassword: "",
    newPassWord: "",
    confirmNewPassword: "",
 });
 const { oldPassword, newPassWord, confirmNewPassword } = passwords

 const onChangePassword = (e) => {
    setPasswords({ ...passwords, [e.target.name]: e.target.value });
  };

  const onClickPasswordButton = () => {
    setDeleteButton({ toggleDelete: false })
    setPwdChange({ togglePwd: true })
  }

  // password show hide
  const [passwordShown, setPasswordShown] = useState(false);

  const togglePasswordVisiblity = () => {
      setPasswordShown(passwordShown ? false : true);
  };

  const onPasswordChange = (e) => {
    e.preventDefault()
    if (newPassWord === confirmNewPassword) {
      updPassword(passwords)
    } else {
        setAlert("Les mots de passes ne sont pas identiques", "red", 5000)
    }
  }

  // delete account *****************************************************************************************
  const [deleteButton, setDeleteButton] = useState({ 
    toggleDelete: false,
  });
  const { toggleDelete } = deleteButton

  const [deleteInput, setDeleteInput] = useState({ 
    deleteText: "",
  });
  const { deleteText } = deleteInput

  const onChangeDelete = (e) => {
    setDeleteInput({ ...deleteInput, [e.target.name]: e.target.value });
  }

  const onClickDeleteButton = () => {
    setPwdChange({ togglePwd: false })
    setDeleteButton({ toggleDelete: true })
  }

  const onDelete = (e) => {
    e.preventDefault();
      if (deleteText === 'supprimer') {
        deleteAccount()
        history.push("/")
      } else {
          setAlert(
              'Merci de saisir "supprimer" pour supprimer votre compte',
              "orange",
              5000
          )
      }
  }

  // logout and close window *****************************************************************************************
  const functionLogout = () => {
    logout()
    accountModalToggle(false)
  }

  return (
    <section className={accountModal ? "auth-modal" : "auth-modal-none"}>
      <div className='account-box' style={{ margin: 0 }}>
        <div onClick={accountClose}>
          <i className='fas fa-times quit-account-modal'></i>
        </div>
        <h3>Paramètres du compte</h3>
        <div className="account-params">
            <button
                style={{ 
                         color: togglePwd ? "#fff" : "#333",
                         backgroundColor: togglePwd ? "#2d94ee" : "",
                         borderRadius: togglePwd ? "5px 5px 0 0" : "" 
                        }}
                className='button-change-password'
                onClick={onClickPasswordButton}
            >Changer mot de passe</button>
            <button
                style={{ 
                         color: toggleDelete ? "#fff" : "#333",
                         backgroundColor: toggleDelete ? "#2d94ee" : "",
                         borderRadius: toggleDelete ? "5px 5px 0 0" : ""
                        }}            
                className='button-delete-account'
                onClick={onClickDeleteButton}
            >Supprimer mon compte</button>
        </div>
        {togglePwd ?
        <form 
          className='password-change-form'
          onSubmit={onPasswordChange}
        >
            <input 
                name='oldPassword'
                value={oldPassword}
                type={passwordShown ? "text" : "password"}
                onChange={onChangePassword}
                placeholder='Ancien mot de passe'
                autoComplete='new-password'
                required
            />
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
              <div className="flex-row jc-sb">
                <div >
                  <Alerte style={{ padding: 0 }} />
                </div>
                <div className="pwd-icon" onClick={togglePasswordVisiblity}>
                    {passwordShown ?
                    <i class="far fa-eye-slash">&nbsp;Cacher</i> :
                    <i class="far fa-eye">&nbsp;Montrer</i>
                  }
                </div>
              </div>
          <button>Confirmer</button>
          </div>
        </form>
        : ""}
        {toggleDelete ?
        <form className="account-delete" >
          <p>Pour supprimer votre compte, merci de saisir <strong>"supprimer"</strong> ci-dessous puis appuyer sur confirmer. <br/><strong>Cette opération ne sera pas réversible.</strong></p>
          <input
              name='deleteText'
              value={deleteText}
              type="text"
              onChange={onChangeDelete}
              placeholder='Saisir supprimer'
              required
          />
          <button onClick={onDelete}>Confirmer</button>
        </form>
        : ""}
      <div className='button-disconnect'>
        <button
            onClick={functionLogout}
        >Déconnexion</button>
      </div>
      </div>
    </section>
  );
};

AccountModal.propTypes = {
  accountModal: PropTypes.bool.isRequired,
  accountModalToggle: PropTypes.func.isRequired,
  logout: PropTypes.func.isRequired,
  setAlert: PropTypes.func.isRequired,
  updPassword: PropTypes.func.isRequired,
  deleteAccount: PropTypes.func.isRequired,
};
  
const mapStateToProps = (state) => ({
  accountModal: state.auth.accountModal,
});

export default withRouter(connect(mapStateToProps, { 
  accountModalToggle, 
  logout, 
  setAlert, 
  deleteAccount,
  updPassword })(AccountModal));
