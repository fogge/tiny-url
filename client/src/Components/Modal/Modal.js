import React from "react";
import "./Modal.scss";

const Modal = props => {
  const { toggleModal, deleteAll, deletionMessage } = props;
  return (
    <div className="backdrop" onClick={toggleModal}>
      <div className="modal" onClick={e => e.stopPropagation()}>
        <h2 className="modal-head">Confirm deletion</h2>
        {deletionMessage ? (
          <p>{deletionMessage}</p>
        ) : (
          <React.Fragment>
            <p>
              This will delete all of your created tiny-links. You will not be
              able to use them anymore.{" "}
            </p>
            <p>Are you sure you want to delete everything?</p>
          </React.Fragment>
        )}

        <div className="modal-buttons">
          {deletionMessage ? (
            <button onClick={toggleModal}>Close</button>
          ) : (
            <React.Fragment>
              <button onClick={toggleModal}>Cancel</button>
              <button onClick={deleteAll}>Delete all</button>
            </React.Fragment>
          )}
        </div>
      </div>
    </div>
  );
};

export default Modal;
