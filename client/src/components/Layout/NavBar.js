import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import {
  authToggle,
  accountModalToggle,
  landingToggle,
} from "../../actions/modals";

export const NavBar = ({
  isAuthenticated,
  authToggle,
  accountModalToggle,
  landingToggle,
  landingModal,
}) => {
  const [dimensions, setDimensions] = useState({
    width: window.innerWidth,
  });
  const { width } = dimensions;

  useEffect(() => {
    const debouncedHandleResize = function handleResize() {
      setDimensions({
        height: window.innerHeight,
        width: window.innerWidth,
      });
    };
    window.addEventListener("resize", debouncedHandleResize);
    return (_) => {
      window.removeEventListener("resize", debouncedHandleResize);
    };
  });

  const openAccount = () => {
    accountModalToggle(true);
  };

  return (
    <nav className='landing-nav'>
      <div className='flex-row ai-fc'>
        <button
          style={{ fontSize: "24px", fontWeight: "bold" }}
          onClick={() => landingToggle(true)}
        >
          SIMULIMO
        </button>
      </div>
      {isAuthenticated && width > 770 ? (
        <div>
          <ul>
            <li>
              {landingModal ? (
                <button onClick={() => landingToggle(false)}>
                  <span className='link'>
                    Simulateur&nbsp;<i className='fas fa-chart-bar'></i>
                  </span>
                </button>
              ) : (
                <button onClick={() => landingToggle(true)}>
                  <span className='link'>
                    Accueil&nbsp;<i class='fas fa-home'></i>
                  </span>
                </button>
              )}
            </li>
            <li>
              <button onClick={openAccount}>
                <span className='link'>
                  Mon Compte&nbsp;<i className='far fa-user-circle'></i>
                </span>
              </button>
            </li>
          </ul>
        </div>
      ) : !isAuthenticated && width > 770 ? (
        <div>
          <ul>
            <li>
              {landingModal ? (
                <button onClick={() => landingToggle(false)}>
                  <span className='link'>
                    Simulateur&nbsp;<i className='fas fa-chart-bar'></i>
                  </span>
                </button>
              ) : (
                <button onClick={() => landingToggle(true)}>
                  <span className='link'>
                    Accueil&nbsp;<i class='fas fa-home'></i>
                  </span>
                </button>
              )}
            </li>
            <li>
              <button onClick={() => authToggle(true)}>
                <span className='link'>
                  S'identifier&nbsp;<i className='far fa-user-circle'></i>
                </span>
              </button>
            </li>
          </ul>
        </div>
      ) : (
        ""
      )}
    </nav>
  );
};

NavBar.propTypes = {
  isAuthenticated: PropTypes.bool,
  authToggle: PropTypes.func.isRequired,
  accountModalToggle: PropTypes.func.isRequired,
  landingToggle: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  landingModal: state.modals.landingModal,
});

export default connect(mapStateToProps, {
  authToggle,
  accountModalToggle,
  landingToggle,
})(NavBar);
