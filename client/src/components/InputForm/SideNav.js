import React, { Link } from "react";

const Indicateurs = ({
  onSubmit,
  scrollTo,
  netVendeurCheck,
  apportCheck,
  loyerCheck,
  chargesCheck,
  foyerCheck,
  regimeCheck,
  formCheck,
}) => {
  return (
    <nav className='side-column-nav mr-20 mt-50'>
      <h3>
        <i className='fas fa-directions header-i'></i>&nbsp;&nbsp;Navigation
      </h3>
      <div className='side-column-box-nav flex-column mt-10 flex-column jc-se ai-fc'>
        {/* projet */}
        <div
          className='flex-row jc-sb ai-fc border-bottom'
          style={{
            backgroundColor: netVendeurCheck && "#016fc9",
            color: netVendeurCheck && "#fff",
            width: "100%",
            height: "100%",
            borderRadius: "10px 10px 0 0",
          }}
        >
          <i
            className='far fa-check-circle'
            style={{
              backgroundColor: !netVendeurCheck ? "#fff" : "#016fc9",
              color: "#fff",
              paddingLeft: "20px",
            }}
          ></i>
          <button
            type='button'
            className='nav-link side-nav-text'
            onClick={(e) => scrollTo(e, "#projet")}
            style={{
              backgroundColor: netVendeurCheck && "transparent",
              color: netVendeurCheck && "#fff",
            }}
          >
            Projet
          </button>
          <i
            className='far fa-times-circle'
            style={{
              backgroundColor: "transparent",
              color: netVendeurCheck ? "#016fc9" : "#333",
              paddingRight: "20px",
            }}
          ></i>
        </div>
        {/* financement */}
        <div
          className='flex-row jc-sb ai-fc border-bottom'
          style={{
            backgroundColor: apportCheck && "#016fc9",
            color: apportCheck && "#fff",
            width: "100%",
            height: "100%",
          }}
        >
          <i
            className='far fa-check-circle'
            style={{
              backgroundColor: !apportCheck ? "#fff" : "#016fc9",
              color: "#fff",
              paddingLeft: "20px",
            }}
          ></i>
          <button
            type='button'
            className='nav-link side-nav-text'
            onClick={(e) => scrollTo(e, "#financement")}
            style={{
              backgroundColor: apportCheck && "transparent",
              color: apportCheck && "#fff",
            }}
          >
            Financement
          </button>
          <i
            className='far fa-times-circle'
            style={{
              backgroundColor: "transparent",
              color: apportCheck ? "#016fc9" : "#333",
              paddingRight: "20px",
            }}
          ></i>
        </div>
        {/* revenu */}
        <div
          className='flex-row jc-sb ai-fc border-bottom'
          style={{
            backgroundColor: loyerCheck && "#016fc9",
            color: loyerCheck && "#fff",
            width: "100%",
            height: "100%",
          }}
        >
          <i
            className='far fa-check-circle'
            style={{
              backgroundColor: !loyerCheck ? "#fff" : "#016fc9",
              color: "#fff",
              paddingLeft: "20px",
            }}
          ></i>
          <button
            type='button'
            className='nav-link side-nav-text'
            onClick={(e) => scrollTo(e, "#revenu")}
            style={{
              backgroundColor: loyerCheck && "transparent",
              color: loyerCheck && "#fff",
            }}
          >
            Revenu
          </button>
          <i
            className='far fa-times-circle'
            style={{
              backgroundColor: "transparent",
              color: loyerCheck ? "#016fc9" : "#333",
              paddingRight: "20px",
            }}
          ></i>
        </div>
        {/* charges */}
        <div
          className='flex-row jc-sb ai-fc border-bottom'
          style={{
            backgroundColor: chargesCheck && "#016fc9",
            color: chargesCheck && "#fff",
            width: "100%",
            height: "100%",
          }}
        >
          <i
            className='far fa-check-circle'
            style={{
              backgroundColor: !chargesCheck ? "#fff" : "#016fc9",
              color: "#fff",
              paddingLeft: "20px",
            }}
          ></i>
          <button
            type='button'
            className='nav-link side-nav-text'
            onClick={(e) => scrollTo(e, "#charges")}
            style={{
              backgroundColor: chargesCheck && "transparent",
              color: chargesCheck && "#fff",
            }}
          >
            Charges
          </button>
          <i
            className='far fa-times-circle'
            style={{
              backgroundColor: "transparent",
              color: chargesCheck ? "#016fc9" : "#333",
              paddingRight: "20px",
            }}
          ></i>
        </div>
        {/* foyer */}
        <div
          className='flex-row jc-sb ai-fc border-bottom'
          style={{
            backgroundColor: foyerCheck && "#016fc9",
            color: foyerCheck && "#fff",
            width: "100%",
            height: "100%",
          }}
        >
          <i
            className='far fa-check-circle'
            style={{
              backgroundColor: !foyerCheck ? "#fff" : "#016fc9",
              color: "#fff",
              paddingLeft: "20px",
            }}
          ></i>
          <button
            type='button'
            className='nav-link side-nav-text'
            onClick={(e) => scrollTo(e, "#foyer")}
            style={{
              backgroundColor: foyerCheck && "transparent",
              color: foyerCheck && "#fff",
            }}
          >
            Foyer
          </button>
          <i
            className='far fa-times-circle'
            style={{
              backgroundColor: "transparent",
              color: foyerCheck ? "#016fc9" : "#333",
              paddingRight: "20px",
            }}
          ></i>
        </div>
        {/* régime */}
        <div
          className='flex-row jc-sb ai-fc'
          style={{
            backgroundColor: regimeCheck && "#016fc9",
            color: regimeCheck && "#fff",
            width: "100%",
            height: "100%",
            borderRadius: "0 0 10px 10px",
          }}
        >
          <i
            className='far fa-check-circle'
            style={{
              backgroundColor: !regimeCheck ? "#fff" : "#016fc9",
              color: "#fff",
              paddingLeft: "20px",
            }}
          ></i>
          <button
            type='button'
            className='nav-link side-nav-text'
            onClick={(e) => scrollTo(e, "#regime")}
            style={{
              backgroundColor: regimeCheck && "transparent",
              color: regimeCheck && "#fff",
            }}
          >
            Régime
          </button>
          <i
            className='far fa-times-circle'
            style={{
              backgroundColor: "transparent",
              color: regimeCheck ? "#016fc9" : "#333",
              paddingRight: "20px",
            }}
          ></i>
        </div>
      </div>
      <button
        className='button-model'
        onClick={onSubmit}
        disabled={!formCheck}
        style={{
          backgroundColor: !formCheck && "#a8a8a8",
          color: !formCheck && "#dfe3da",
          cursor: !formCheck && "not-allowed",
          lineHeight: '20px'
        }}
      >
        <a >
          Modélisation <br/>
          Fiscale &nbsp;
          <span
            style={{
              display: !formCheck && "none",
            }}
          >
            <i className='fas fa-forward'></i>
          </span>
        </a>
      </button>
    </nav>
  );
};
export default Indicateurs;
