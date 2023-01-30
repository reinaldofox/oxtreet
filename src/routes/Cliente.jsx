import React, { useState } from 'react'
import ModalMessage from "../components/ModalMessage";
import FormCliente from '../components/FormCliente'
import { CONFIRM_TITLE, CONFIRM_EXCLUIR } from '../components/Messages.module'

const Cliente = () => {

  const [show, setShow] = useState(false);

  return (
    <div className="App">

      <FormCliente />




      <h2>Modal Demo</h2>
      <button className="btn btn-info btn-sm" onClick={() => setShow(true)}>Open Modal 1</button>
      <hr />
      
      <ModalMessage
        show={show}
        handleClose = {() => setShow(false)}
        handleShow = {() => setShow(true)}
        modalTitle = {CONFIRM_TITLE}
        modalMessage = {CONFIRM_EXCLUIR}
      />  

    </div>
  )
}

export default Cliente