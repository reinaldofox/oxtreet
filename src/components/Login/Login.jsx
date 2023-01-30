import React, { useState } from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

const Login = () => {
  
  const [login, setLogin] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = (ev) => {
    ev.preventDefault()
    // axios.post('http://localhost:3001/login/', {login, password})
    // .then(res => { 
    //   console.log(res.data)
    //   cleanForm()
    // })
    // .catch(error => {
    //   console.log(error.message)
    // })
  }

  const cleanForm = () => {
    setLogin('')
    setPassword('')
  }

  return(
    <Form id='formLogin' method='post' onSubmit={handleSubmit}>

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