import React from "react";

const MobilePagination = ({ mobileDisplayTab, setMobileDisplayTab }) => {

  const previous = () => {
    if (mobileDisplayTab === 0) {
      setMobileDisplayTab(5)
    } else {
      setMobileDisplayTab(mobileDisplayTab - 1)
    }
  }

  const next = () => {
    if (mobileDisplayTab === 5) {
      setMobileDisplayTab(0)
    } else {
      setMobileDisplayTab(mobileDisplayTab + 1)
    }
  }
  return (
    <div className='pagination-mobile'>
        <button onClick={() => previous()}>Précédent</button>
        <h4 style={{ color: "grey", fontSize: "12px" }}>{mobileDisplayTab + 1 } / 6</h4>
        <button onClick={() => next()}>Suivant</button>
    </div>
  );
};

export default MobilePagination;
