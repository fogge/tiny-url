import React from "react";
import "./Modal.scss";

const Modal = props => {
  const { toggleModal, deleteAll } = props
  return (
    <div className="backdrop" onClick={toggleModal}>
      <div className="modal" onClick={e => e.stopPropagation()}>
        <h2 className="modal-head">Confirm deletion</h2>
        <p className="modal-body">
          This will delete all of your created tiny-links. You will not be able
          to use them anymore.{" "}
        </p>
        <p>Are you sure you want to delete everything?</p>
        <div className="modal-buttons">
          <button className="cancel" onClick={toggleModal}>
            Cancel
          </button>
          <button onClick={deleteAll}>Delete all</button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
