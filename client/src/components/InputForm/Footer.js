import React from "react";

const Footer = ({ onSubmitEmail, onChangeEmail, emailFooter }) => {
  return (
    <section className='footer'>
      <h4>© 2020 ACH. All rights reserved</h4>
      <div className='footer-email'>
        <h4>Être informé(e) des nouvelles fonctionnalités :</h4>
        <form onSubmit={onSubmitEmail}>
          <input
            type='email'
            placeholder='Saisir Email'
            name='emailFooter'
            value={emailFooter}
            onChange={onChangeEmail}
          />
          <button>Valider</button>
        </form>
      </div>
    </section>
  );
};
export default Footer;
