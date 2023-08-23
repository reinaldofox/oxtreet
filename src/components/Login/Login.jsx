import React from 'react'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import API from '../../utils/API'
import Dialog from '../../utils/Dialog'
import BgLogin from '../../assets/img/colored-woman.svg'
import './Login.css'

const Login = (props) => {
  
  const { loginData, setLoginData, storeUser } = props.state

  const handleLogin = async (ev) => {
    ev.preventDefault()
    const { login, password } = loginData
    await API.fetchRequest('POST', '/app/login', { login, password })
      .then(data => {
        if (data.errors) {
          Dialog.show('error', data.errors)
          return
        }
        storeUser(data)
      })
    .catch(error => console.log('error', error))
  }  

  return (
    <div className="oxtreet-login" style={{ backgroundImage: `url(${BgLogin})` }}>

      <Form id='formLogin' method='post' onSubmit={ev => handleLogin(ev)}>

        <Form.Group className="mb-3" controlId="inputLogin">
          <Form.Label>Login</Form.Label>
          <Form.Control type="text" required value={loginData.login}
            onChange={e =>  setLoginData({ ...loginData, login: e.target.value.trim()})} />         
            </Form.Group>

        <Form.Group className="mb-3" controlId="inputPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" required value={loginData.password}
            onChange={e =>  setLoginData({ ...loginData, password: e.target.value.trim()})} />         
        </Form.Group>

        <Button variant="primary" className="w-100 btn-secondary" type="submit"> Entrar </Button>
        <Form.Switch label={"Manter conectado"} checked={loginData.manterLogado}
            onChange={e =>  setLoginData({ ...loginData, manterLogado: !loginData.manterLogado})} /> 
          {/* onClick={() => setManterConectado(!manterConectado)} />  */}

      </Form>  
    </div>
  )
}

export default Login