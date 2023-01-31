import React, { useState } from 'react'
import { Form } from 'react-bootstrap'
import Input, { Select } from '../Input'
import './styles.css'
import { BiSearch } from 'react-icons/bi'
import { API_URL } from '../Messages.module'

const  SearchGrid = () => {
  
  const [modelo, setModelo] = useState('')
  const [tipo, setTipo] = useState('')
  const [tamanho, setTamanho] = useState('')
  const [precoVenda, setPrecoVenda] = useState('')
  const [cor, setCor] = useState('')
  const [detalhes, setDetalhes] = useState('')
  const [produtos, setProdutos] = useState([])
  
  const handleSearch = async (ev)  => {
    ev.preventDefault()
    await getProdutos()
    console.log(produtos)
  }

  const getProdutos = async () => {
    const searchParams = {modelo, tipo, tamanho, precoVenda, cor, detalhes}
    await fetch(`${API_URL}/produto/search`, {body: searchParams})
    .then(res => res.json())
    .then(data => setProdutos(data))
    .catch(error => console.log(error.message))
  }

  return (
    <Form id="form-user" method="post" onSubmit={handleSearch}>
      <div className='grid_container'>
        <div className='item1'><Input id={"modelo"} value={modelo} onChange={e => setModelo(e.target.value)} label={"Modelo"} type={"text"} /></div>
        <div className='item2'><Select label={"Tipo"} value={tipo} onChange={ev => setTipo(ev.target.value)} id={"tipo"} options={[{ id: null, value: "Selecione" },{ id: 1, value: "Calça" }, { id: 2, value: "Camisa" }]} /></div>
        <div className='item3'><Input id={"tamanho"} value={tamanho} onChange={ev => setTamanho(ev.target.value)} label={"Tamanho"} type={"text"} /></div>

        <div className='item4'> <Input id={"preco"} value={precoVenda} onChange={ev => setPrecoVenda(ev.target.value)} label={"Preco"} type={"text"} /></div>
        <div className='item5'><Input id={"cor"} value={cor} onChange={ev => setCor(ev.target.value)} label={"Cor"} type={"text"} /></div>
        <div className='item6'><Input id={"detalhe"} value={detalhes} onChange={ev => setDetalhes(ev.target.value)} label={"Detalhes"} type={"text"} /></div>
        <div> <button className='ox_button' type='submit'> <BiSearch size={30} tittle={'Clique para pesquisar'} /> Buscar </button> </div>
      </div>
    </Form>
  )
}

export default SearchGrid