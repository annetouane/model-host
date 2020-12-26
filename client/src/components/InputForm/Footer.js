import React from "react";

const Footer = ({ onSubmitEmail, onChangeEmailFooter, eFooter, clickFooter }) => {
  
  return (
    <section className='footer'>
      <h4>© 2020 ACH. All rights reserved</h4>
      <div className='footer-email'>
        <h4>Être informé(e) des nouvelles fonctionnalités :</h4>
        <form onSubmit={onSubmitEmail}>
          <input
            type='email'
            placeholder='xyz@email.com'
            name='eFooter'
            value={eFooter}
            onChange={onChangeEmailFooter}
            required
          />
          {!clickFooter ? 
          <button>Valider</button>
          : <button disabled style={{ cursor: "auto", backgroundColor: "#007be8" }} >Merci&nbsp;<i class="fas fa-check"></i></button>}
        </form>
      </div>
    </section>
  );
};
export default Footer;
