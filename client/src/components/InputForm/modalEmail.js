import React from "react";

const ModalEmail = ({
  onSubmitEmail,
  onChangeEmailModal,
  setModal,
  modal,
  eModal,
  width,
}) => {
  return (
    <section className={modal ? "email-modal" : "modal-none"}>
      <div className='modal-input'>
        <h4>
          Simulimo est une solution gratuite pour modéliser la rentabilité
          d'investissements locatifs. Actuellement en construction, nous
          mettrons rapidement en lignes les fonctionnalités suivantes :
        </h4>
        <ul>
          <li>
            <i className='far fa-hand-point-right fa-2x'></i>
            <p>
              La fiscalité sur les revenus d'exploitation (loyers) modélisée
              selon les différents régimes fiscaux sélectionnés (SCI à l'IS,
              LMNP, location nue) ainsi que tous les paramètres renseignés
              décrivant votre investissement.
            </p>
          </li>
          <li>
            <i className='far fa-hand-point-right fa-2x'></i>
            <p>
              La fiscalité lors de la revente modélisée selon le régime fiscal
              choisi, de l'année de revente ainsi que tous les paramètres
              renseignés décrivant votre investissement.
            </p>
          </li>
        </ul>
        <h4>
          Restez informé(e) lors de la mise en lignes de ces nouvelles
          fonctionnalités :
        </h4>
        <form className='container-email' onSubmit={onSubmitEmail}>
          <input
            type='email'
            placeholder='Saisir Email'
            name='eModal'
            value={eModal}
            onChange={onChangeEmailModal}
            required
          />
          <button>Valider</button>
          {width > 760 ? (
            <button
              onClick={() => setModal(false)}
              style={{ backgroundColor: "#a8a8a8" }}
            >
              Annuler
            </button>
          ) : (
            ""
          )}
        </form>
      </div>
    </section>
  );
};
export default ModalEmail;
