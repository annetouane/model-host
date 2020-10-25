import React from "react";

export const NavBar = () => {
  return (
    <nav className='landing-nav'>
      <div className='flex-row ai-fc'>
        <h1 className='bold'>SIMULIMO </h1>
      </div>

      {/* <div>
        <ul>
          <li>
            <a href='/register'>
              <span className='link'>
                Signup&nbsp;&nbsp;<i className='fas fa-user-plus'></i>
              </span>
            </a>
          </li>
          <li>
            <a href='/login'>
              <span className='link'>
                Login&nbsp;&nbsp;<i className='fas fa-sign-in-alt'></i>
              </span>
            </a>
          </li>
        </ul>
      </div> */}
    </nav>
  );
};

export default NavBar;
