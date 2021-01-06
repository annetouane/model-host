// package
import React, { useState } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";

// component
import Alerte from "./../Layout/Alert";
// import ProjectPagination from "../InputForm/ProjectsPagination";

// actions
import { logout, updPassword, deleteAccount } from "../../actions/auth";
import { accountModalToggle } from "../../actions/modals";
import { setAlert } from "../../actions/alert";

const AccountModal = ({
  setAlert,
  accountModalToggle,
  accountModal,
  logout,
  updPassword,
  deleteAccount,
  history,
  projects,
  getProjectToUpdate,
  onDeleteProject,
  onVisualise,
  // projectDisplayTab,
  // setProjectDisplayTab,
}) => {
  const resetStates = () => {
    setPasswords({
      oldPassword: "",
      newPassWord: "",
      confirmNewPassword: "",
    });
    setDeleteInput({
      deleteText: "",
    });
  };

  // ferme fenetre et reset clic detect
  const accountClose = () => {
    resetStates(); // effecace le contenu des inputs
    accountModalToggle(false); // close account modal
    setParamAccount({ toggleParamAccount: true }); // réinitialise l'onglet Projet sauvegardé
    setPwdChange({ togglePwdChange: false }); // ferme l'onglet changement de mdp
    setDeleteButton({ toggleDelete: false }); // ferme l'onglet delete account
    getProjectToUpdate(""); // remet à zéro l'id projet à manipuler
  };

  // change tab *****************************************************************************************
  const [paramAccount, setParamAccount] = useState({
    toggleParamAccount: true,
  });
  const { toggleParamAccount } = paramAccount;

  // passwords state
  const [passwords, setPasswords] = useState({
    oldPassword: "",
    newPassWord: "",
    confirmNewPassword: "",
  });
  const { oldPassword, newPassWord, confirmNewPassword } = passwords;

  const onChangePassword = (e) => {
    setPasswords({ ...passwords, [e.target.name]: e.target.value });
  };

  const onClickPasswordButton = () => {
    setDeleteButton({ toggleDelete: false }); //
    setParamAccount({ toggleParamAccount: true }); //
  };

  // password show / hide func
  const [passwordShown, setPasswordShown] = useState(false);

  const togglePasswordVisiblity = () => {
    setPasswordShown(passwordShown ? false : true);
  };

  const onPasswordChange = (e) => {
    e.preventDefault();
    if (newPassWord === confirmNewPassword) {
      updPassword(passwords);
    } else {
      setAlert("Les mots de passes ne sont pas identiques", "red", 5000);
    }
  };

  // paramètre du compte *****************************************************************************************

  // hide / show changement de mot de passe
  const [pwdChange, setPwdChange] = useState({
    togglePwdChange: false,
  });
  const { togglePwdChange } = pwdChange;

  // hide / show delete account
  const [deleteButton, setDeleteButton] = useState({
    toggleDelete: false,
  });
  const { toggleDelete } = deleteButton;

  // texte supprimer pour validation delete account
  const [deleteInput, setDeleteInput] = useState({
    deleteText: "",
  });
  const { deleteText } = deleteInput;

  const onChangeDelete = (e) => {
    setDeleteInput({ ...deleteInput, [e.target.name]: e.target.value });
  };

  // lorsque click sur boutton paramètre du compte
  const onClickAccountParams = () => {
    setParamAccount({ toggleParamAccount: false });
  };

  // fonction suppression du compte
  const onDelete = (e) => {
    e.preventDefault();
    if (deleteText === "supprimer") {
      deleteAccount();
      history.push("/"); // reload app sur page d'accueil
    } else {
      setAlert(
        'Merci de saisir "supprimer" pour supprimer votre compte',
        "orange",
        5000
      );
    }
  };

  // logout and close window *****************************************************************************************
  const functionLogout = () => {
    getProjectToUpdate(""); // réinitialise l'id projet
    logout(); // déconnect et efface le token
    accountModalToggle(false); // ferme la modal
    getProjectToUpdate(""); // reset selected project ID
  };

  return (
    <section className={accountModal ? "auth-modal" : "auth-modal-none"}>
      <div className='account-box' style={{ margin: 0 }}>
        <div className='account-box-bis'>
          <div onClick={accountClose}>
            <i className='fas fa-times quit-account-modal'></i>
          </div>
          <h3>Mon compte</h3>
          <div className='account-params'>
            <button
              style={{
                color: toggleParamAccount ? "#fff" : "#333",
                backgroundColor: toggleParamAccount ? "#2d94ee" : "",
                borderRadius: toggleParamAccount ? "5px 5px 0 0" : "",
              }}
              className='button-change-password'
              onClick={onClickPasswordButton}
            >
              Mes Projets sauvegardés
            </button>
            <button
              style={{
                color: !toggleParamAccount ? "#fff" : "#333",
                backgroundColor: !toggleParamAccount ? "#2d94ee" : "",
                borderRadius: !toggleParamAccount ? "5px 5px 0 0" : "",
              }}
              className='button-delete-account'
              onClick={onClickAccountParams}
            >
              Paramètres du compte
            </button>
          </div>
          {/* <ProjectPagination
            projectDisplayTab={projectDisplayTab}
            setProjectDisplayTab={setProjectDisplayTab}
          /> */}
          {toggleParamAccount ? (
            <form className='saved-projects-box'>
              <ul>
                {projects.map((project) => (
                  <li className='saved-projects-items' key={project._id}>
                    <input
                      type='radio'
                      name='projects'
                      onChange={() => getProjectToUpdate(project._id)}
                      required
                    />
                    <h6>{project.nomProjet}</h6>
                    <h6>{project.ville}</h6>
                    <h6>
                      {project.natureBien}{" "}
                      {project.typeAppartement ? project.typeAppartement : ""}
                    </h6>
                  </li>
                ))}
              </ul>
              {projects.length > 0 ? (
                <div className='saved-button-group'>
                  <button id='visualiser' onClick={(e) => onVisualise(e)}>
                    Visualiser
                  </button>
                  <button id='supprimer' onClick={(e) => onDeleteProject(e)}>
                    Supprimer
                  </button>
                </div>
              ) : (
                <div className='no-project-saved'>
                  <p style={{ marginTop: "10px" }}>
                    Vous n'avez pas encore de projet sauvegardé. <br /> Après
                    avoir saisi les paramètres de votre projet d'investissement,
                    le boutton{" "}
                    <span>
                      <i className='far fa-save'></i> Sauvegarder
                    </span>{" "}
                    du simulateur vous permettra d'enregistrer vos différents
                    projets à l'étude afin de les retrouver dans votre compte
                    lors de votre prochaine connexion.
                  </p>
                </div>
              )}

              <Alerte />
            </form>
          ) : (
            <div className='bloc-account-param'>
              <div
                className='box-change-pwd-delete-account'
                style={{
                  paddingBottom: togglePwdChange && "5px",
                  borderBottom: togglePwdChange && "1px solid #c8c9ca",
                }}
              >
                {/* changer mot de passe*/}
                <h6>Changer mot de passe</h6>
                {!togglePwdChange ? (
                  <button>
                    <i
                      onClick={() => {
                        setPwdChange({ togglePwdChange: true });
                        setDeleteButton({ toggleDelete: false });
                      }}
                      className='far fa-plus-square'
                    ></i>
                  </button>
                ) : (
                  <button>
                    <i
                      onClick={() => setPwdChange({ togglePwdChange: false })}
                      className='far fa-minus-square'
                    ></i>
                  </button>
                )}
              </div>

              {togglePwdChange ? (
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
                    <div className='flex-row jc-sb'>
                      <div>
                        <Alerte style={{ padding: 0 }} />
                      </div>
                      <div
                        className='pwd-icon'
                        onClick={togglePasswordVisiblity}
                      >
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
              ) : (
                ""
              )}
              {/* supprimer mon compte */}
              <div
                className='box-change-pwd-delete-account'
                style={{
                  paddingBottom: toggleDelete && "5px",
                  borderBottom: toggleDelete && "1px solid #c8c9ca",
                }}
              >
                <h6>Supprimer mon compte</h6>
                {!toggleDelete ? (
                  <button>
                    <i
                      onClick={() => {
                        setDeleteButton({ toggleDelete: true });
                        setPwdChange({ togglePwdChange: false });
                      }}
                      className='far fa-plus-square'
                    ></i>
                  </button>
                ) : (
                  <button>
                    <i
                      onClick={() => setDeleteButton({ toggleDelete: false })}
                      className='far fa-minus-square'
                    ></i>
                  </button>
                )}
              </div>
              {toggleDelete ? (
                <form className='account-delete'>
                  <p>
                    Pour supprimer votre compte, merci de saisir{" "}
                    <strong>"supprimer"</strong> ci-dessous puis appuyer sur
                    confirmer. <br />
                    <strong>Cette opération ne sera pas réversible.</strong>
                  </p>
                  <input
                    name='deleteText'
                    value={deleteText}
                    type='text'
                    onChange={onChangeDelete}
                    placeholder='Saisir supprimer'
                    required
                  />
                  <button onClick={onDelete}>Confirmer</button>
                </form>
              ) : (
                ""
              )}
            </div>
          )}
        </div>
        <div className='button-disconnect'>
          <button onClick={functionLogout}>Déconnexion</button>
        </div>
      </div>
    </section>
  );
};

AccountModal.propTypes = {
  accountModal: PropTypes.bool.isRequired,
  accountModalToggle: PropTypes.func.isRequired,
  logout: PropTypes.func.isRequired,
  onDeleteProject: PropTypes.func.isRequired,
  getProjectToUpdate: PropTypes.func.isRequired,
  setAlert: PropTypes.func.isRequired,
  updPassword: PropTypes.func.isRequired,
  deleteAccount: PropTypes.func.isRequired,
  projects: PropTypes.array,
};

const mapStateToProps = (state) => ({
  accountModal: state.modals.accountModal,
  projects: state.modelData.projects,
  isAuthenticated: state.auth.isAuthenticated,
});

export default withRouter(
  connect(mapStateToProps, {
    accountModalToggle,
    logout,
    setAlert,
    deleteAccount,
    updPassword,
  })(AccountModal)
);
