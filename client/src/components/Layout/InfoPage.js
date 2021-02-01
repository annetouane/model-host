// package
import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

// action
import { passwordChangePage } from "../../actions/modals";

const InfoPage = ({
  passwordChangePage, // detect si route URL ou autre route
  history, // props router
}) => {
  useEffect(() => {
    // inform the reducer about the current page
    const url = history.location.pathname;
    if (url.includes("information")) {
      passwordChangePage(true);
    }
  }, [history, passwordChangePage]);

  return (
    <section className='information-page'>
      <h1>Qui sommes-nous ?</h1>
      <p>
        Simulimo est une application-web permettant de modéliser la rentabilité
        d'un investissement locatif selon différents régimes fiscaux (SCI à
        l’IS, LMNP, location nue). Vous renseignez les paramètres décrivant
        votre projet d'investissement (revenus et coûts associés au projet,
        financement du projet, revenu du foyer fiscal …) et l'application
        calcule le cash-flow annuel après impôts durant toute la durée de
        l'emprunt. Vous pourrez ainsi choisir le régime fiscal qui correspond le
        mieux à votre situation et à votre projet.
      </p>
      <p>
        Une deuxième version de l'application sera rapidement mise en ligne et
        incluera la modélisation de la fiscalité à la revente du bien après le
        nombre années de détention correspondant à votre stratégie.
      </p>
      <p>
        L'investissement locatif étant un engagement sur le long terme, il est
        essentiel pour l'investisseur de comprendre les mécanismes financiers et
        fiscaux sur lesquels il repose. De ce fait, l'application se veut
        pédagogique. Les bouttons{" "}
        <span
          className='question-mark'
          style={{
            backgroundColor: "transparent",
            margin: "0",
            cursor: "auto",
            padding: "2px 6px",
          }}
        >
          {" "}
          ?
        </span>{" "}
        du formulaire permettent d'accéder à des explications sur chaque
        paramètre décrivant le projet et liste des ressources externes
        permettant d'évaluer ces paramètres le plus précisemment possible.
      </p>
      <p>
        Lors de la création de votre compte, un lien pour télécharger un fichier
        Excel reproduisant les règles de calcul implémentées dans l'application
        vous sera envoyé à l'adresse email que vous aurez indiqué. Il inclut
        toutes les étapes intermédiaire de calcul pour vous permettre de mieux
        comprendre les paramètres influençant la rentabilité de votre projet.
        L'onglet glossaire vous donnera une définition de chacun des champs
        calculés.
      </p>
      <p>
        Pour toute question, n’hésitez pas à nous contacter directement à
        l’adresse suivante : simulimo@gmail.com. Nous serions également ravis de
        recevoir vos retours à propos de l'application ce qui nous permettra de
        l'adapter à vos besoins.
      </p>
    </section>
  );
};

InfoPage.propTypes = {
  passwordChangePage: PropTypes.func.isRequired,
};

export default connect(null, { passwordChangePage })(InfoPage);
