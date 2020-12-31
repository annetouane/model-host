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
        {/* <div style={{display: "flex", justifyContent: "space-between"}}>
          <h3>
            Avant d'aller plus loin
          </h3>
          <div onClick={() => setModal(false)}>
            <i className='fa fa-arrow-right fa-2x indicateurs-mobile-button'></i>
          </div>
        </div>
        <h4>
          Simulimo est une solution gratuite pour modéliser la rentabilité d'un
          investissement locatif. Actuellement en construction, nous vous
          invitons à nous laisser votre adresse e-mail pour être informé(e) des
          nouvelles fonctionnalités mises en ligne.
        </h4>
        <form className='container-email' onSubmit={onSubmitEmail}>
          <input
            type='email'
            placeholder='xyz@email.com'
            name='eModal'
            value={eModal}
            onChange={onChangeEmailModal}
          />
          <button>Valider</button>
          {width > 770 ? (
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
        <h4>Prochainement, Simulimo permettra de modéliser :</h4>
        <ul>
          <li>
            <i className='far fa-hand-point-right fa-2x'></i>
            <p>
              La fiscalité sur les revenus d'exploitation (loyers) selon
              différents régimes fiscaux (SCI à l'IS, LMNP, location nue) ainsi
              que tous les paramètres renseignés décrivant votre investissement.
            </p>
          </li>
          <li>
            <i className='far fa-hand-point-right fa-2x'></i>
            <p>
              La fiscalité à la revente selon le régime fiscal choisi, l'année
              de revente ainsi que tous les paramètres renseignés décrivant
              votre investissement.
            </p>
          </li>
        </ul> */}
      </div>
    </section>
  );
};
export default ModalEmail;
