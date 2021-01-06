import React from "react";

const ProjectsPagination = ({ projectDisplayTab, setProjectDisplayTab }) => {
  const previous = () => {
    if (projectDisplayTab === 0) {
      setProjectDisplayTab(3);
    } else {
      setProjectDisplayTab(projectDisplayTab - 1);
    }
  };

  const next = () => {
    if (projectDisplayTab === 3) {
      setProjectDisplayTab(0);
    } else {
      setProjectDisplayTab(projectDisplayTab + 1);
    }
  };
  return (
    <div className='pagination-project'>
      <button onClick={() => previous()}>Précédent</button>
      <h4 style={{ color: "grey", fontSize: "12px" }}>
        {projectDisplayTab + 1} / 4
      </h4>
      <button onClick={() => next()}>Suivant</button>
    </div>
  );
};

export default ProjectsPagination;
