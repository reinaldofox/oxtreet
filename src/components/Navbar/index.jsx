import React from 'react'
import { Link } from 'react-router-dom'
import './styles.css'

const Navbar = () => {
  return (
    <nav className='nav_menu'>
      <Link to='/'> home </Link>
      <Link to='/vendas'> vendas </Link>
      <Link to='/estoque'> estoque </Link>
      <Link to='/clientes'> clientes </Link>
      <Link to='/administrativo'> administrativo </Link>
    </nav>

  )
}

export default Navbar