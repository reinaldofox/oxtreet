import React, { useState, useRef } from 'react'
import ModalMessage from "../components/ModalMessage";
import FormCliente from '../components/FormCliente'
import { CONFIRM_TITLE, CONFIRM_EXCLUIR } from '../components/Messages.module'
import Button from 'react-bootstrap/Button';
import Overlay from 'react-bootstrap/Overlay';
import Popover from 'react-bootstrap/Popover';

const Cliente = () => {

  const [showModal, setShowModal] = useState(false);

  const [target, setTarget] = useState(null);
  const [show, setShow] = useState(false);
  const ref = useRef(null);

  const [info, setInfo] = useState('')

  const handleClick = (event) => {
    setShow(!show);
    setTarget(event.target);
  };

  const handleShowModal = () => {
    setShow(true)
    // document.body.style.filter = 'blur(2px)'
  }

  return (
    <div>

      <FormCliente />

      <h2>Modal Demo</h2>
      <button className="btn btn-info btn-sm" onClick={handleShowModal}>Open Modal 1</button>
      <hr />
      <Button onClick={handleClick} onMouseEnter={ev => setInfo(`We declare a function called changeBackground above 
      the view part of the React Component. The changeBackground function receives the event object 
      (which is passed automatically through any event handler to a function), 
      and changes the style.background value to ‘red’.'`)}>Mostrar popover</Button>
      <ModalMessage
        show={showModal}
        handleClose = {() => setShowModal(false)}
        handleShow = {() => setShowModal(true)}
        modalTitle = {CONFIRM_TITLE}
        modalMessage = {CONFIRM_EXCLUIR}
      />  

    <Button onClick={handleClick} onMouseEnter={ev => {handleClick(); setInfo('mensagem popover')}}>Mostrar popover</Button>  
    <div ref={ref}>    
      <Overlay show={show} target={target} placement="top" container={ref} containerPadding={20} >
        <Popover id="popover-contained">
          <Popover.Body>{info} </Popover.Body>
        </Popover>
      </Overlay>
    </div> 

    </div>
  )
}

export default Cliente