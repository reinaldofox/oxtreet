import React, { useState } from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { API_URL } from '../Messages.module'

const FormProduto = (props) => {
  
  const [modelo, setModelo] = useState('')
  const [tipo, setTipo] = useState('')
  const [tamanho, setTamanho] = useState('')
  const [codigo, setCodigo] = useState('')
  const [precoCompra, setPrecoCompra] = useState('')
  const [precoVenda, setPrecoVenda] = useState('')
  const [cor, setCor] = useState('')
  const [detalhes, setDetalhes] = useState('')
  
  const handleSubmit = async (ev) => {
    ev.preventDefault()
    const produto = {modelo, tipo, tamanho, codigo, precoCompra, precoVenda, cor, detalhes}
    await fetch(`${API_URL}/produto/create`, {metdon: 'POST', body: produto})
    .then(res => res.json())
    .then(data => { console.log(data); cleanForm() })
    .catch(error => console.log(error.message))
  }

  const cleanForm = () => {
    setModelo('')
    setTipo('')
    setTamanho('')
    setCodigo('')
    setPrecoCompra('')
    setPrecoVenda('')
    setCor('')
    setDetalhes('')
  }

  return(
    <Form id='formProduto' method='post' onSubmit={handleSubmit}>
      <Form.Group className="mb-3" controlId="formModelo">
        <Form.Label>Modelo</Form.Label>
        <Form.Control required type="text" value={modelo} onChange={e => setModelo(e.target.value)}/>        
      </Form.Group>

      <Form.Group className="mb-3" controlId="formTipo">
        <Form.Label>Tipo</Form.Label>
        <Form.Control  required type="text" value={tipo} onChange={e => setTipo(e.target.value)}/>        
      </Form.Group>

      <Form.Group className="mb-3" controlId="formTamanho">
        <Form.Label>Tamanho</Form.Label>
        <Form.Control required type="text" value={tamanho} onChange={e => setTamanho(e.target.value)}/>        
      </Form.Group>

      <Form.Group className="mb-3" controlId="formCodigo">
        <Form.Label>Código</Form.Label>
        <Form.Control required type="text" value={codigo} onChange={e => setCodigo(e.target.value)}/>        
      </Form.Group>

      <Form.Group className="mb-3" controlId="formPreco">
        <Form.Label>Preço Compra</Form.Label>
        <Form.Control required type="text" value={precoCompra} onChange={e => setPrecoCompra(e.target.value)}/>        
      </Form.Group>

      <Form.Group className="mb-3" controlId="formPreco">
        <Form.Label>Preço Venda</Form.Label>
        <Form.Control required type="text" value={precoVenda} onChange={e => setPrecoVenda(e.target.value)}/>        
      </Form.Group>

      <Form.Group className="mb-3" controlId="formCor">
        <Form.Label>Cor</Form.Label>
        <Form.Control required type="text" value={cor} onChange={e => setCor(e.target.value)}/>        
      </Form.Group>

      <Form.Group className="mb-3" controlId="formDetalhe">
        <Form.Label>Detalhes</Form.Label>
        <Form.Control required type="text" value={detalhes} onChange={e => setDetalhes(e.target.value)}/>        
      </Form.Group>

      <Button variant="primary" type="submit">
        Cadastrar
      </Button>
    </Form>
  )
}

export default FormProduto