import React from 'react'
import pulse from '../../../assets/img/interwind.svg'
import './Loader.css'

const Loader = (props) => {
  return (
    <div className='loader' id='loader' style={{ display: props.show ? "flex" : "none" }}>
      <div>
        <img src={pulse} />
      </div>
      <div className="fs-5">{props.message}</div>
    </div> 
  )
}

export default Loader