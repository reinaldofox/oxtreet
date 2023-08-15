import React, { useEffect, useRef, useState } from 'react'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import { Outlet } from 'react-router-dom'
import './App.css'
import Header from './components/layout/Header'
import Footer from './components/layout/Footer'
import API from './utils/API'
import Dialog from './utils/Dialog'

const App = () => {  
  
  // window.onbeforeunload = ev => ev.returnValue = 'onbeforeunload'
  window.onload = () => {
    setSmall(appRef?.current?.getBoundingClientRect().top < 30)
  }
  window.onscroll = () => {
    setSmall(appRef?.current?.getBoundingClientRect().top < 30)
  }

  const mainRef = useRef()
  const appRef = useRef()
  const [small, setSmall] = useState(false)  
  
  const [login, setLogin] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [manterConectado, setManterConectado] = useState(false)

  const handleLogin = async (ev) => {
    ev.preventDefault()
    await API.fetchRequest('POST', '/app/login', { login, password })
    .then(data => storeUser(data))
    .catch(error => console.log('error', error))
  }

  const storeUser = data => {
    if (data) {
      setUser(data)
      loadAppValues()
      showApp()
      if (manterConectado) {
        localStorage.setItem('userSession', JSON.stringify(data))
      } else {
        localStorage.removeItem('userSession')
      }
    } else {
      Dialog.show('alert', 'Login ou senha inválidos!')
    }
  }  

  const showApp = () => {
    setTimeout(() => {
      mainRef.current.style.opacity = 1
      mainRef.current.style.marginTop = "0"
    }, 500)
  }

  const loadAppValues = async () => {
    try {
      const appvalues = await API.fetchRequest( 'GET', '/app/load/')
      localStorage.setItem('appvalues', JSON.stringify(appvalues))   
    } catch (error) {
      console.error(error)
      Dialog.show('error')
    }    
  }
  
  useEffect(() => {
    const userLocal = localStorage.getItem('userSession')
    if (userLocal) {
      loadAppValues()
      setUser(JSON.parse(userLocal))
      showApp()
    }
    // return () => localStorage.removeItem('userSession')
  }, []);

  return (
    <>
      <div className='Dialog' id='Dialog'> </div>        
      {user ?
          <div id='main' ref={mainRef}>
          <Header user={user} class={small ? 'small_header' : ''} />      
            <div className="App" ref={appRef}>
              <Outlet context={user}/>
            </div>
            <Footer />
          </div>
        :
        <Form id='formLogin' method='post' onSubmit={ev => handleLogin(ev)}>
          <Form.Group className="mb-3" controlId="inputLogin">
            <Form.Label>Login</Form.Label>
            <Form.Control type="text" required value={login} onChange={e => {setLogin(e.target.value.trim())}}/>    
          </Form.Group>
          <Form.Group className="mb-3" controlId="inputPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" required value={password} onChange={e => {setPassword(e.target.value.trim())}}/>         
          </Form.Group>
          <Button variant="primary" className="w-100 btn-secondary mb-3" type="submit"> Entrar </Button>
          <Form.Switch label={"Manter conectado"} onClick={() => setManterConectado(!manterConectado)} /> 
        </Form>          
      }

    </>
  );
}

export default App;