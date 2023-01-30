import React from "react";
import Button from 'react-bootstrap/Button';
import { Modal } from "react-bootstrap";

const ModalMessage = (props, {handleConfirm}) => {
  const { show, handleClose, size, modalTitle, modalMessage } = props;
  return (
    <Modal onClose={handleClose} size={size} show={show} onHide={handleClose} backdrop="static">
      <Modal.Header closeButton>
        <Modal.Title className='text-danger'>{modalTitle}</Modal.Title>
        <p className="btn-modal-close" onClick={() => handleClose()}>
          <i className="fa fa-times text-danger"></i>
        </p>
      </Modal.Header>
      {/* <Modal.Body>{props.children}</Modal.Body> */}
      <Modal.Body> <strong> {modalMessage} </strong> </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}> Cancelar </Button>
        <Button variant="danger" onClick={ev => handleConfirm}> Excluir </Button>

        {/* Desenvolver a funcionalidade de retorno de valores dos botões: true e false
        https://stackoverflow.com/questions/44406350/how-can-i-get-value-from-react-modal-bootstrap
         */}

      
      </Modal.Footer>
    </Modal>
  );
};

export default ModalMessage;