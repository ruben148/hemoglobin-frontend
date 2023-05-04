function Modal(props) {

    function confirmClickHandler() {
        props.onConfirm();
    }
  return (
    <div className="modal">
      <p>Are you sure?</p>
      <button className="btn btn--alt" onClick={props.onCancel}>
        Cancel
      </button>
      <button className="btn" onClick={confirmClickHandler}>Delete</button>
    </div>
  );
}

export default Modal;
