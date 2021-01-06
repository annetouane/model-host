// packages
import React, { useState } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

// component
import LocationSearchInput from "./CityGoogleApi";
import Alert from "../Layout/Alert";

// actions
import {
  saveModalToggle,
  saveModalClic,
  modelModalClic,
} from "../../actions/modals";

const SaveModal = ({
  onChangeString,
  saveModal,
  saveModalToggle,
  saveModalClic,
  modelModalClic,
  width,
  getProjectToUpdate, // get nomProjet to mainform state
  natureBien, // nature du bien pour condition type d'appartement
  projects, // liste de projets
  onCreateProject, // save new project to the database
  onUpdateProject, // save new project to the database
}) => {
  // choix tab : création compte ou connection
  const [newProject, setNewProject] = useState(true);

  const saveClose = () => {
    saveModalToggle(false); // close auth modal
    saveModalClic(false); // save n'est plus actif
    modelModalClic(false); // model n'est plus actif
    getProjectToUpdate("");
  };

  return (
    <section className={saveModal ? "auth-modal" : "auth-modal-none"}>
      <div className='auth-box' style={{ margin: 0, padding: "40px" }}>
        {width > 1155 ? (
          <div onClick={saveClose}>
            <i className='fas fa-times quit-auth-modal'></i>
          </div>
        ) : (
          ""
        )}
        <h4>Sauvergarder mon projet</h4>

        <div className='account-params'>
          <button
            onClick={() => {
              setNewProject(true);
              getProjectToUpdate("");
            }}
            style={{
              backgroundColor: newProject ? "#007be8" : "",
              border: newProject ? "1px solid rgb(192, 192, 192)" : "none",
              borderRadius: newProject ? "5px 5px 0 0" : "0",
              color: newProject ? "#fff" : "#333",
              borderBottomStyle: newProject && "none",
            }}
          >
            Créer nouveau projet
          </button>
          <button
            onClick={() => setNewProject(false)}
            style={{
              backgroundColor: !newProject ? "#007be8" : "",
              border: !newProject ? "1px solid rgb(192, 192, 192)" : "none",
              borderRadius: !newProject ? "5px 5px 0 0" : "0",
              color: !newProject ? "#fff" : "#333",
              borderBottomStyle: !newProject && "none",
            }}
            className='button-delete-account'
          >
            Mes projets sauvegardés
          </button>
        </div>
        {newProject ? (
          <form style={{ width: "100%" }} onSubmit={onCreateProject}>
            <div className='save-form'>
              <div className='save-group'>
                <label>Nom du projet</label>
                <input
                  type='text'
                  onChange={onChangeString}
                  name='nomProjet'
                  placeholder='Nom du projet...'
                  required
                />
              </div>

              <div className='save-group'>
                <label>Ville</label>
                <LocationSearchInput onChangeString={onChangeString} />
              </div>

              <div className='save-group'>
                <label>Nature du bien</label>
                <select
                  type='select'
                  name='natureBien'
                  onChange={onChangeString}
                >
                  <option>...</option>
                  <option>Appartement</option>
                  <option>Maison</option>
                  <option>Immeuble</option>
                  <option>Parking</option>
                  <option>Local commercial</option>
                  <option>Autre</option>
                </select>
              </div>
              {natureBien === "Appartement" ? (
                <div className='save-group'>
                  <label>Type d'appartement</label>
                  <select
                    type='select'
                    name='typeAppartement'
                    onChange={onChangeString}
                  >
                    <option>...</option>
                    <option>Studio</option>
                    <option>T1</option>
                    <option>T2</option>
                    <option>T3</option>
                    <option>T4</option>
                    <option>T5</option>
                    <option>Autres</option>
                  </select>
                </div>
              ) : (
                ""
              )}
              <button>Sauvegarder</button>
            </div>
          </form>
        ) : (
          <form className='saved-projects-box' onSubmit={onUpdateProject}>
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
                <button id='sauvegarder'>Mettre à jour</button>
              </div>
            ) : (
              <div className='no-project-saved'>
                <p>
                  Vous n'avez pas encore de projet sauvegardé. <br /> Créer un
                  projet dans l'onglet dédié puis vous pourrez le mettre à jour
                  ici lorsque vous changerez ses paramètres.
                </p>
              </div>
            )}
          </form>
        )}
        <Alert />
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
  projects: PropTypes.array,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  saveModal: state.modals.saveModal,
  projects: state.modelData.projects,
});

export default connect(mapStateToProps, {
  saveModalToggle,
  saveModalClic,
  modelModalClic,
})(SaveModal);
