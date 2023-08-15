import React from 'react'
import { Link } from 'react-router-dom'
import './Navbar.css'

const Navbar = () => {

  return (
    // <nav className='nav_menu' style={{background: '#d1c5b1', borderRadius: '8px', padding: '0 15px', height: '50px'}}>
    <nav className='nav_menu'>
      <Link to='/'> home </Link> <span> | </span>
      <Link to='/vendas'> vendas </Link> <span> | </span>
      <Link to='/estoque'> estoque </Link> <span> | </span>
      <Link to='/clientes'> clientes </Link> <span> | </span>
      <Link to='/fornecedores'> fornecedores </Link> <span> | </span>
      <Link to='/administrativo'> administrativo </Link> 
    </nav>

  )
}

export default Navbar