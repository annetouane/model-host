import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

// actions
import {
  authToggle,
  landingToggle,
  accountModalToggle,
  mobileMenuToggle,
  kpiMobileToggle,
  modelModalToggle,
  saveModalToggle,
  modelModalClic,
  saveModalClic,
} from "../../actions/modals";

const mobileNavButton = ({
  mobileMenuToggle, // controle fenetre nav mobile - redux
  accountModalToggle, // controle fenetre mon compte - redux
  authToggle, // controle fenetre authentication - redux
  kpiMobileToggle, // controle fenetre indicateurs - redux
  modelModalToggle, // controle fenetre model - redux
  saveModalToggle, // controle fenetre save - redux
  modelModalClic, // détection clic model window
  saveModalClic, // détection clic save window
  mobileMenu, // bool - redux
  modelModal, // bool - redux
  saveModal, // bool - redux
  kpiMobile, // bool - redux
  accountModal, // bool - redux
  authModal, // bool - redux
}) => {
  // ouvre le menu mobile
  const openMenu = () => {
    mobileMenuToggle(true);
  };
  // // ferme menu mobile
  // const closeMobileMenu = () => {
  //   mobileMenuToggle(false); // ferme le menu mobile
  // };

  // ferme toutes les fenetres ouvertes
  const closeMenu = () => {
    mobileMenuToggle(false); // ferme le menu mobile
    authToggle(false); // ferme la fenetre identificiation
    accountModalToggle(false); // ferme la fenetre mon compte
    kpiMobileToggle(false); // ferme la fenetre indicateurs
    modelModalToggle(false); // ferme la fenetre model
    saveModalToggle(false); // ferme la fenetre save
    modelModalClic(false); // reset détection clic model window
    saveModalClic(false); // reset détection clic save window
  };

  return (
    <div className='mobile-nav-button'>
      {mobileMenu ? (
        <i className='fas fa-times fa-2x' onClick={closeMenu}></i>
      ) : !mobileMenu &&
        (modelModal || saveModal || kpiMobile || accountModal || authModal) ? (
        <i className='fas fa-times fa-2x' onClick={closeMenu}></i>
      ) : (
        <i className='far fa-compass fa-2x' onClick={openMenu}></i>
      )}
    </div>
  );
};
mobileNavButton.propTypes = {
  // detectSave: PropTypes.bool.isRequired,
  // detectModel: PropTypes.bool.isRequired,
  mobileMenu: PropTypes.bool.isRequired,
  modelModal: PropTypes.bool.isRequired,
  saveModal: PropTypes.bool.isRequired,
  kpiMobile: PropTypes.bool.isRequired,
  accountModal: PropTypes.bool.isRequired,
  authModal: PropTypes.bool.isRequired,
  authToggle: PropTypes.func.isRequired,
  accountModalToggle: PropTypes.func.isRequired,
  kpiMobileToggle: PropTypes.func.isRequired,
  mobileMenuToggle: PropTypes.func.isRequired,
  modelModalToggle: PropTypes.func.isRequired,
  saveModalToggle: PropTypes.func.isRequired,
  modelModalClic: PropTypes.func.isRequired,
  saveModalClic: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  // detectSave: state.modals.detectSave,
  // detectModel: state.modals.detectModel,
  mobileMenu: state.modals.mobileMenu,
  modelModal: state.modals.modelModal,
  saveModal: state.modals.saveModal,
  kpiMobile: state.modals.kpiMobile,
  accountModal: state.modals.accountModal,
  authModal: state.modals.authModal,
});

export default connect(mapStateToProps, {
  authToggle,
  landingToggle,
  accountModalToggle,
  kpiMobileToggle,
  mobileMenuToggle,
  modelModalToggle,
  saveModalToggle,
  modelModalClic,
  saveModalClic,
})(mobileNavButton);
