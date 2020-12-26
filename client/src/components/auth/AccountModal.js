// package
import React, { useState } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

// component
import Alerte from "./../Layout/Alert";

// actions
import { accountModalToggle, logout } from "../../actions/auth";
import { setAlert } from "../../actions/alert";

const AccountModal = ({ setAlert, accountModalToggle, accountModal, logout }) => {
  
  // ferme fenetre et reset clic detect
  const accountClose = () => {
    accountModalToggle(false) // close account modal
  };

  // change password *****************************************************************************************
  const [pwdChange, setPwdChange] = useState({ 
      togglePwd: false,
   });
  const { togglePwd } = pwdChange

  // passwords state
  const [passwords, setPasswords] = useState({ 
    newPassWord: "",
    confirmNewPassword: "",
 });
 const { newPassWord, confirmNewPassword } = passwords

 const onChangePassword = (e) => {
    setPasswords({ ...passwords, [e.target.name]: e.target.value });
  };

  const onClickPasswordButton = () => {
    setDeleteButton({ toggleDelete: false })
    setPwdChange({ togglePwd: !togglePwd })
  }

  // password show hide
  const [passwordShown, setPasswordShown] = useState(false);

  const togglePasswordVisiblity = () => {
      setPasswordShown(passwordShown ? false : true);
  };


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
    setDeleteButton({ toggleDelete: !toggleDelete })
  }

  const onDelete = (e) => {
    e.preventDefault();
      if (deleteText === 'supprimer') {
          console.log('delete')
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
          <i className='fas fa-window-close fa-2x quit-auth-modal'></i>
        </div>
        <h3>Paramètres du compte</h3>
        <div className="account-params">
            <button
                className='button-change-password'
                onClick={onClickPasswordButton}
            >Changer mot de passe</button>
            <button
                className='button-delete-account'
                onClick={onClickDeleteButton}
            >Supprimer mon compte</button>
            <button
                className='button-disconnect'
                onClick={functionLogout}
            >Déconnexion</button>
        </div>
        {togglePwd ?
        <form className='password-change-form'>
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
                <button>Confirmer</button>
                <div className="pwd-icon" onClick={togglePasswordVisiblity}>
                    {passwordShown ?
                    <i class="far fa-eye-slash">&nbsp;Cacher</i> :
                    <i class="far fa-eye">&nbsp;Montrer</i>
                    }
            </div>
          </div>
        </form>
        : ""}
        {toggleDelete ?
        <form className="account-delete" >
                <p>Pour supprimer votre compte, merci de saisir <strong>"supprimer"</strong> ci-dessous puis appuyer sur confirmer :</p>
                <input
                    name='deleteText'
                    value={deleteText}
                    type="text"
                    onChange={onChangeDelete}
                    placeholder='Saisir supprimer'
                    required
                />
            <button onClick={onDelete}>Confirmer</button>
            <Alerte />
        </form>
        : ""}
      </div>
    </section>
  );
};

AccountModal.propTypes = {
  accountModal: PropTypes.bool.isRequired,
  accountModalToggle: PropTypes.func.isRequired,
  logout: PropTypes.func.isRequired,
  setAlert: PropTypes.func.isRequired,
};
  
const mapStateToProps = (state) => ({
    accountModal: state.auth.accountModal,
});

export default connect(mapStateToProps, { accountModalToggle, logout, setAlert })(AccountModal);
