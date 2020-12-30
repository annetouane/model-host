// components
import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

// actions
import { saveModalToggle, saveModalClic, modelModalClic } from "../../actions/auth"

const SaveModal = ({ 
    saveModal, 
    onChangeString, 
    isAuthenticated,
    saveModalToggle,
    saveModalClic,
    modelModalClic
 }) => {

  const saveClose = () => {
    saveModalToggle(false) // close auth modal
    saveModalClic(false) // save n'est plus actif
    modelModalClic(false) // model n'est plus actif
  }

  return (
    <section className={saveModal ? "auth-modal" : "auth-modal-none"}>
      <div className='save-box' style={{ margin: 0, padding: "40px" }}>
        <div >
          <i className='fas fa-times quit-auth-modal'
             onClick={saveClose}></i>
        </div>
        <h4>Sauvergarder mon projet</h4>
        {!isAuthenticated ?
        <div>
            <p>
                Vous ne vous êtes pas identifié. Afin de sauvegarder votre projet, 
                il vous sera demandé de connecter à votre compte lors de la prochaine étape.
            </p>
            <p>
                Si vous n'avez pas de compte vous retrouverez votre projet lors
                lors de votre première connexion.
            </p>            
        </div>
            : ""}
            <h5>Créer un nouveau projet</h5>
            <form style={{ width: "100%" }} >
              <div className='save-form'>
                <div className='save-input'>
                    {/* <label>Nom du projet</label> */}
                    <input 
                        type="text"
                        onChange={onChangeString}
                        name='nomProjet'
                        placeholder='Nom du projet'
                        required
                    />
                </div>  
                <div className='save-input'>
                    {/* <label>Code Postal</label> */}
                    <input
                        type="number"
                        onChange={onChangeString}
                        name='codePostal'
                        max='99999'
                        placeholder='Code postal'
                    />
                </div>  
                <div className='save-input'>
                {/* <label>Type de bien</label> */}
                    <select
                        type='select'
                        name='typeBien'
                        onChange={onChangeString}
                        //   value={notaire}
                        //   onChange={onChangeDecimals}
                        //   className='input-box-2 fs-12'
                    >
                        <option >Type de bien...</option>
                        <option >Appartement</option>
                        <option >Maison</option>
                        <option >Immeuble</option>
                        <option >Parking</option>
                        <option >Local commercial</option>
                        <option >Autre</option>
                    </select>
                </div>
              <button>Valider</button>
              </div>
            </form>
        {isAuthenticated ?
        <div>
            <h5>Mes projets sauvegardés</h5>
            <ul>
                <li className='flex-row'>
                    <input type="checkbox"/>
                    <h6>Nom Projet</h6>
                    <h6>Code Postal</h6>
                    <h6>Type de bien</h6>
                    <h6>Mettre à jour un projet</h6>
                    |
                    <h6>Mettre à jour un projet</h6>                    
                </li>
            </ul>
        </div>
        : ""}
      </div>
    </section>
  );
};

SaveModal.propTypes = {
    onChangeString: PropTypes.func.isRequired,
    saveModalToggle: PropTypes.func.isRequired,
    saveModalClic: PropTypes.func.isRequired,
    modelModalClic: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool,
    saveModal: PropTypes.bool,
  };
  

const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.isAuthenticated,
    saveModal: state.auth.saveModal,
});

export default connect(mapStateToProps, { saveModalToggle,
                                          saveModalClic,
                                          modelModalClic })(SaveModal);
