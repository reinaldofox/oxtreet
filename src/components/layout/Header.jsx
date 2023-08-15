import React from 'react'
import { IoLogoOctocat } from 'react-icons/io'
import { ReactComponent as OxLogo } from '../../assets/img/oxtreet-logo.svg'
import './Header.css'
import Navbar from './Navbar'

const Header = (props) => {  
  return (
    <>
    <div className={ `head_style ${props.class}` }>
      <OxLogo fill='#7286D3' className='oxlogo' />
      {/* <img id="oxtreet-logo" className="logosvg" src={oxtreetlogo} title={'oxtreet bh'} alt={'oxtreet bh'}/> */}
      <Navbar /> 
      <div>
        <IoLogoOctocat size={28} fill='beige' />
          <span style={{ color: 'beige', marginLeft: '5px' }} className='fs-6'>
            <nobr>{props.user.nome}</nobr>
          </span>
      </div>
    </div>
    </>
  )
}

export default Header