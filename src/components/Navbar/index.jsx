import React from 'react'
import { Link } from 'react-router-dom'
import './styles.css'

const Navbar = () => {

  return (
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