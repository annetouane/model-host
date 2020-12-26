import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { authToggle, accountModalToggle, logout } from "../../actions/auth"

export const NavBar = ({ 
  isAuthenticated, 
  authToggle, 
  accountModalToggle,
  logout  }) => {


  const openAccount = () => {
    accountModalToggle(true)
  };

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
            <a href='/investment-modelisation'>
              <span className='link'>
                Simulateur&nbsp;<i className="fas fa-chart-bar"></i>
              </span>
            </a>
          </li>
          <li>
            <button
              onClick={openAccount}  
            >
              <span className='link'>
                Mon Compte&nbsp;<i className="far fa-user-circle"></i>
              </span>
            </button>
          </li>
        </ul>
      </div>
      : 
      <div>
        <ul>
          <li>
            <a href='/investment-modelisation'>
              <span className='link'>
                Simulateur&nbsp;<i className="fas fa-chart-bar"></i>
              </span>
            </a>
          </li>
          <li> 
            <button 
              onClick={() => authToggle(true)}
              >
              <span className='link'>
                S'identifier&nbsp;<i className="far fa-user-circle"></i>
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
  authToggle: PropTypes.func.isRequired,
  accountModalToggle: PropTypes.func.isRequired,
  logout: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { authToggle, logout, accountModalToggle })(NavBar);
