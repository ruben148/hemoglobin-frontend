import { useState } from "react";
import Modal from "./Modal";
import Backdrop from "./Backdrop";

function Todo(props) {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  function deleteClickHandler() {
    setModalIsOpen(true);
  }

  function confirmDeleteHandler() {
    setModalIsOpen(false);
  }

  function closeModalHandler() {
    setModalIsOpen(false);
  }

  return (
    <div className="card">
      <h2>{props.titletext}</h2>
      <div className="actions">
        <button className="btn" onClick={deleteClickHandler}>
          Delete
        </button>
      </div>
      {modalIsOpen ? (
        <Modal onCancel={closeModalHandler} onConfirm={confirmDeleteHandler} />
      ) : null}
      {modalIsOpen ? <Backdrop onCancel={closeModalHandler} /> : null}
    </div>
  );
}

export default Todo;
