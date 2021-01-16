import React from "react";
import ModalObjects from "./ModalObjects";

const InfoModal = ({ idContent, setDisplayInfoModal }) => {
  return (
    <section id='modal-comp' className='info-modal'>
      {ModalObjects.filter((info) => info.id === idContent).map(
        (filteredInfo) => (
          <div className='info-modal-container' key={filteredInfo.id}>
            <div className='info-modal-header'>
              <h3>{filteredInfo.titre}</h3>
              <button onClick={() => setDisplayInfoModal(false)}>
                <i className='far fa-times-circle fa-2x'></i>
              </button>
            </div>
            <div
              className='info-modal-content'
              dangerouslySetInnerHTML={{ __html: filteredInfo.texte }}
            ></div>
            {/* <div className='info-modal-content-p'>{filteredInfo.texte}</div> */}
          </div>
        )
      )}
    </section>
  );
};

export default InfoModal;
