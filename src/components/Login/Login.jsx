import React, { useState } from 'react'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import API from '../../utils/API'
// import Dialog from '../../utils/Dialog'
import './Login.css'

const Login = () => {
  
  const [login, setLogin] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = async (ev) => {
    ev.preventDefault()
    await API.fetchRequest('POST', '/app/login', { login, password })
    .then(data => storeUser(data))
    .catch(error => console.log('error', error))
  }

  const storeUser = data => {
    sessionStorage.setItem('userSession', JSON.stringify(data))
  }

  return(
    <Form id='formLogin' method='post' onSubmit={ev => handleLogin(ev)}>

      <Form.Group className="mb-3" controlId="inputLogin">
        <Form.Label>Login</Form.Label>
        <Form.Control type="text" required value={login} onChange={e => {setLogin(e.target.value.trim())}}/>    
      </Form.Group>

      <Form.Group className="mb-3" controlId="inputPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" required value={password} onChange={e => {setPassword(e.target.value.trim())}}/>         
      </Form.Group>

      <Button variant="primary" className="w-100 btn-secondary" type="submit"> Entrar </Button>

    </Form>  
  )
}

export default Login