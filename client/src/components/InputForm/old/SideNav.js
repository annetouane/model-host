import React, { useRef, useEffect, useState } from "react";

export const SideNav = () => {
  useEffect(() => {
    const handleScroll = () => {};

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollTo = (ele) => {
    ele.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  // const leadershipRef = useRef(null);
  // const providerRef = useRef(null);
  // const operationsRef = useRef(null);

  // const sectionRefs = [
  //   { section: "Leadership", ref: leadershipRef },
  //   { section: "Providers", ref: providerRef },
  //   { section: "Operations", ref: operationsRef },
  // ];

  return (
    <div className='side-column ml-20 mt-50'>
      <h3>
        <i className='fas fa-directions header-i'></i>&nbsp;&nbsp;Navigation
      </h3>
      <div className='side-column-box mt-10'>
        <div className='header'>
          <button
            type='button'
            className='header_link'
            // onClick={() => {
            //   scrollTo(leadershipRef.current);
            // }}
          >
            Projet
          </button>
          <button
            type='button'
            className='header_link'
            // onClick={() => {
            //   scrollTo(providerRef.current);
            // }}
          >
            Financement
          </button>
          <button
            type='button'
            className='header_link'
            // onClick={() => {
            //   scrollTo(operationsRef.current);
            // }}
          >
            Revenu
          </button>
          <button
            type='button'
            className='header_link'
            // onClick={() => {
            //   scrollTo(operationsRef.current);
            // }}
          >
            Charges
          </button>
          <button
            type='button'
            className='header_link'
            // onClick={() => {
            //   scrollTo(operationsRef.current);
            // }}
          >
            Foyer
          </button>
          <button
            type='button'
            className='header_link'
            // onClick={() => {
            //   scrollTo(operationsRef.current);
            // }}
          >
            Régime
          </button>
        </div>
      </div>
    </div>
  );
};

export default SideNav;
