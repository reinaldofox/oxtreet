import React from 'react'
import Navbar from '../Navbar'
import './styles.css'
import { BsShop } from 'react-icons/bs'

const Header = () => {
  return (
    <div className='head_style'>
      <div className='logo'> <span> <BsShop size={30} /> </span> <span>Oxtreet BH - Gerenciamento</span> </div>
      <Navbar />
    </div>
  )
}

export default Header