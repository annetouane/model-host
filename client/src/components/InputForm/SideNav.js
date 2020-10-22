import React from "react";

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
    <nav className='side-column-nav mr-20 ml-20 mt-50'>
      <h3>
        <i className='fas fa-directions header-i'></i>&nbsp;&nbsp;Navigation
      </h3>
      <div className='side-column-box-nav flex-column mt-10 flex-column jc-se ai-fc'>
        <button
          type='button'
          className='nav-link side-nav-text radius-top border-bottom'
          onClick={(e) => scrollTo(e, "#projet")}
          style={{
            backgroundColor: netVendeurCheck && "#016fc9",
            color: netVendeurCheck && "#fff",
          }}
        >
          {!netVendeurCheck ? (
            <div className='flex-row jc-fc ai-fc'>
              <i className='far fa-times-circle'>&nbsp;&nbsp;</i>
              Projet
            </div>
          ) : (
            <div className='flex-row jc-fc ai-fc'>
              Projet&nbsp;&nbsp;<i className='far fa-check-circle'></i>
            </div>
          )}
        </button>
        <button
          type='button'
          className='nav-link side-nav-text border-bottom'
          onClick={(e) => scrollTo(e, "#financement")}
          style={{
            backgroundColor: apportCheck && "#016fc9",
            color: apportCheck ? "#fff" : "#333",
          }}
        >
          {!apportCheck ? (
            <div className='flex-row jc-fc ai-fc'>
              <i className='far fa-times-circle'>&nbsp;&nbsp;</i>
              Financement
            </div>
          ) : (
            <div className='flex-row jc-fc ai-fc'>
              Financement&nbsp;&nbsp;<i className='far fa-check-circle'></i>
            </div>
          )}{" "}
        </button>
        <button
          type='button'
          className='nav-link side-nav-text border-bottom'
          onClick={(e) => scrollTo(e, "#revenu")}
          style={{
            backgroundColor: loyerCheck && "#016fc9",
            color: loyerCheck && "#fff",
          }}
        >
          {!loyerCheck ? (
            <div className='flex-row jc-fc ai-fc'>
              <i className='far fa-times-circle'>&nbsp;&nbsp;</i>
              Revenu
            </div>
          ) : (
            <div className='flex-row jc-fc ai-fc'>
              Revenu&nbsp;&nbsp;<i className='far fa-check-circle'></i>
            </div>
          )}{" "}
        </button>
        <button
          type='button'
          className='nav-link side-nav-text border-bottom'
          onClick={(e) => scrollTo(e, "#charges")}
          style={{
            backgroundColor: chargesCheck && "#016fc9",
            color: chargesCheck && "#fff",
          }}
        >
          {!chargesCheck ? (
            <div className='flex-row jc-fc ai-fc'>
              <i className='far fa-times-circle'>&nbsp;&nbsp;</i>
              Charges
            </div>
          ) : (
            <div className='flex-row jc-fc ai-fc'>
              Charges&nbsp;&nbsp;<i className='far fa-check-circle'></i>
            </div>
          )}{" "}
        </button>
        <button
          type='button'
          className='nav-link side-nav-text border-bottom'
          onClick={(e) => scrollTo(e, "#foyer")}
          style={{
            backgroundColor: foyerCheck && "#016fc9",
            color: foyerCheck && "#fff",
          }}
        >
          {!foyerCheck ? (
            <div className='flex-row jc-fc ai-fc'>
              <i className='far fa-times-circle'>&nbsp;&nbsp;</i>
              Foyer
            </div>
          ) : (
            <div className='flex-row jc-fc ai-fc'>
              Foyer&nbsp;&nbsp;<i className='far fa-check-circle'></i>
            </div>
          )}{" "}
        </button>
        <button
          type='button'
          className='nav-link side-nav-text radius-bottom'
          onClick={(e) => scrollTo(e, "#regime")}
          style={{
            backgroundColor: regimeCheck && "#016fc9",
            color: regimeCheck && "#fff",
          }}
        >
          {!regimeCheck ? (
            <div className='flex-row jc-fc ai-fc'>
              <i className='far fa-times-circle'>&nbsp;&nbsp;</i>
              Régime
            </div>
          ) : (
            <div className='flex-row jc-fc ai-fc'>
              Régime&nbsp;&nbsp;<i className='far fa-check-circle'></i>
            </div>
          )}{" "}
        </button>
      </div>
      <button
        type='submit'
        className='button-model'
        onClick={onSubmit}
        disabled={!formCheck}
        style={{
          backgroundColor: !formCheck && "#a8a8a8",
          color: !formCheck && "#dfe3da",
          cursor: !formCheck && "not-allowed",
        }}
      >
        Modélisation Fiscale &nbsp;&nbsp;
        <span
          style={{
            display: !formCheck && "none",
          }}
        >
          <i className='fas fa-forward'></i>
        </span>
      </button>
    </nav>
  );
};
export default Indicateurs;
