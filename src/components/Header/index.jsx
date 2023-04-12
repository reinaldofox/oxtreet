import React from 'react'
import Navbar from '../Navbar'
import './styles.css'
import { ReactComponent as OxLogo } from '../../assets/img/oxtreet-logo.svg'

const Header = (props) => {  
  return (
    <div className={ `head_style ${props.class}` }>
      <OxLogo fill='#7286D3' className='oxlogo' />
      {/* <img id="oxtreet-logo" className="logosvg" src={oxtreetlogo} title={'oxtreet bh'} alt={'oxtreet bh'}/> */}
      <Navbar /> 
      | a- a+
    </div>
  )
}

export default Header