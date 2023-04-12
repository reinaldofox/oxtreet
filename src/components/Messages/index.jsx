import React, { useEffect, useRef } from 'react' 
import './styles.css'
import { MdClose } from 'react-icons/md'

const Messages = (props) => {

  const msgRef = useRef(null)

  useEffect(() => {
    msgRef.current.classList.add('message_show') 
    setTimeout(() => {
      msgRef.current.classList.remove('message_show')
    }, 4000)
  }, [msgRef])

  return (
    <div className='messages {props.tipo}' ref={msgRef}>
      <div className='message_head'>{props.head}</div>
      <div className='message_text'>{props.message}</div>
      <div className='message_close' title='Fechar'><MdClose size={30}/></div>
    </div>
  )
}

export default Messages