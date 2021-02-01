import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

const Footer = ({
  // onSubmitEmail,
  // onChangeEmailFooter,
  // eFooter,
  // clickFooter,
  isAuthenticated,
}) => {
  return (
    <section className='footer' style={{ height: "40px" }}>
      <h4
      // style={{
      //   textAlign: isAuthenticated && "center",
      //   width: isAuthenticated && "100%",
      // }}
      >
        © 2021 ACH. All rights reserved
      </h4>
      <div className='footer-links'>
        <a href='/information' target='_blank'>
          Qui sommes nous ?
        </a>
        <a href='/cgu' target='_blank'>
          CGU
        </a>
      </div>
      {/* {!isAuthenticated ? (
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
            {!clickFooter ? (
              <button>Valider</button>
            ) : (
              <button
                disabled
                style={{ cursor: "auto", backgroundColor: "#007be8" }}
              >
                Merci&nbsp;<i className='fas fa-check'></i>
              </button>
            )}
          </form>
        </div>
      ) : (
        ""
      )} */}
    </section>
  );
};

Footer.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps)(Footer);
