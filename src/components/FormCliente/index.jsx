import React, { useState } from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { API_URL } from '../Messages.module'

const FormProduto = (props) => {
  
  const [nome, setNome] = useState('')
  const [cpf, setCpf] = useState('')
  const [comentario, setComentario] = useState('')
  const [telefone, setTelefone] = useState('')
  const [telefone2, setTelefone2] = useState('')
  
  const handleSubmit = async (ev) => {
    ev.preventDefault()
    const cliente = {nome, cpf, comentario, telefone, telefone2}
    await fetch(`${API_URL}/cliente/create`, {method: 'POST', body: cliente})
    .then(response => response.json())
    .then(data => { console.log(data); cleanForm() })
    .catch(error => console.log(error))
  }

  const cleanForm = () => {
    setNome('')
    setCpf('')
    setComentario('')
    setTelefone('')
    setTelefone2('')
  }

  return(
    <Form id='formCliente' method='post' onSubmit={handleSubmit}>
      <Form.Group className="mb-3" controlId="formnome">
        <Form.Label>Nome</Form.Label>
        <Form.Control required type="text" value={nome} onChange={e => setNome(e.target.value)}/>        
      </Form.Group>

      <Form.Group className="mb-3" controlId="formCpf">
        <Form.Label>CPF</Form.Label>
        <Form.Control  required type="text" value={cpf} onChange={e => setCpf(e.target.value)}/>        
      </Form.Group>

      <Form.Group className="mb-3" controlId="formComentario">
        <Form.Label>Comentário</Form.Label>
        <Form.Control required type="text" value={comentario} onChange={e => setComentario(e.target.value)}/>        
      </Form.Group>

      <Form.Group className="mb-3" controlId="formTelefone">
        <Form.Label>Telefone</Form.Label>
        <Form.Control required type="text" value={telefone} onChange={e => setTelefone(e.target.value)}/>        
      </Form.Group>

      <Form.Group className="mb-3" controlId="formTelefone2">
        <Form.Label>Celular</Form.Label>
        <Form.Control required type="text" value={telefone2} onChange={e => setTelefone2(e.target.value)}/>        
      </Form.Group>

      <Button variant="primary" type="submit">
        Cadastrar
      </Button>
    </Form>
  )
}

export default FormProduto