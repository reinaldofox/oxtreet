import React, { useEffect, useRef, useState } from 'react'
import { Outlet } from 'react-router-dom'
import './App.css'
import Header from './components/layout/Header'
import Login from './components/Login/Login'
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
  
  const [loginData, setLoginData] = useState({login: "", password: "", manterLogado: false})
  const [user, setUser] = useState(null)

  const storeUser = user => {
    if (user) {
      setUser(user)
      loadAppValues()
      showApp()
      if (loginData.manterLogado) {
        localStorage.setItem('userSession', JSON.stringify(user))
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
    const appvalues = await API.fetchRequest('GET', '/app/load/')
    .then(data => {
      if (data.errors) {
        Dialog.show('error', data.errors)
        console.error(data.stack)
      }
      localStorage.setItem('appvalues', JSON.stringify(appvalues))   
    })
    .catch(error =>  console.log('error', error))
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
          <div className="App" ref={appRef}><Outlet context={user}/></div>
          <Footer />
        </div>
        :
        <Login state={{ loginData, setLoginData, storeUser }} />        
      }
    </>
  );
}

export default App;