import React from 'react'
import './Footer.css'
import { Link } from 'react-router-dom'
import { FaInstagram } from 'react-icons/fa'
import { FaFacebook } from 'react-icons/fa'
import { FaWhatsapp } from 'react-icons/fa'
import { BsShop } from 'react-icons/bs'
import MLLogo from '../../assets/img/ml.svg'

const Footer = () => {

  return (
    <div className='footer' style={{
      display: 'flex', alignItems: 'center', justifyContent: 'center', height: '160px',
      width: '75%', margin: '20px auto', flexDirection: 'column'
    }}>
      {/* <span className="fs-4">oxtreet bh</span> */}      
      <div className='icons-list' style={{margin: "20px 0"}}>
        <FaInstagram size={36} fill='#737373' title="Instagram" />
        <FaFacebook size={36} fill='#737373' title="Facebook"/>
        <FaWhatsapp size={36} fill='#737373' title="Whatsapp"/>
        <BsShop size={32} fill='#737373' title="Loja Online"/>
        <img src={MLLogo} style={{width: '45px'}} title="Mercado Livre"/>
      </div>
      <div className='footer-links'>
      <Link to='/'> home </Link> |
      <Link to='/vendas'> vendas </Link> |
      <Link to='/estoque'> estoque </Link> |
      <Link to='/clientes'> clientes </Link> |
      <Link to='/fornecedores'> fornecedores </Link> |
      <Link to='/administrativo'> administrativo </Link>
      </div>
      <div style={{marginTop: '30px'}}>
        <small> &copy; oxtreet bh {new Date().getFullYear()} - Desenvolvido por Reinaldo A Santos</small>
      </div>

    </div>
  )
}

export default Footer