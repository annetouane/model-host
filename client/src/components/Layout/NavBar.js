import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { openAuth } from "../../actions/auth"

export const NavBar = ({ isAuthenticated, openAuth }) => {
  return (
    <nav className='landing-nav' >
      <div className='flex-row ai-fc'>
        <a 
          style={{ fontSize: "24px",
                  fontWeight: "bold" 
                }}
          href='/'
          >SIMULIMO
        </a>
      </div>
    {isAuthenticated ? 
      <div>
        <ul>
          <li>
            <a href='/profile'>
              <span className='link'>
                Mon Compte&nbsp;&nbsp;<i className="far fa-user-circle"></i>
              </span>
            </a>
          </li>
          <li>
            <a href='/logout'>
              <span className='link'>
                Déconnexion&nbsp;&nbsp;<i className='fas fa-sign-in-alt'></i>
              </span>
            </a>
          </li>
        </ul>
      </div>
      : 
      <div>
        <ul>
          <li>
            <a href='/investment-modelisation'>
              <span className='link'>
                Simulateur&nbsp;&nbsp;<i className="fas fa-chart-bar"></i>
              </span>
            </a>
          </li>
          <li>
            <button onClick={openAuth}>
              <span className='link'>
                S'identifier&nbsp;&nbsp;<i className="far fa-user-circle"></i>
              </span>
            </button>
          </li>
        </ul>
      </div>}
    </nav>
  );
};

NavBar.propTypes = {
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { openAuth })(NavBar);
