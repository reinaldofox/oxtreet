import { Outlet } from 'react-router-dom'
import Header from './components/Header'
import { useState, useRef, useEffect } from 'react'
import Fetcher from './utils/Fetcher';
import Messages from './utils/Messages';
import './App.css';

function App() {

  const appRef = useRef()
  const [small, setSmall] = useState(false)  

  window.onscroll = () => {
    setSmall(appRef.current.getBoundingClientRect().top < 50)
  }

  //  CARREGAR O LOCALSTORAGE NO REQUEST DE LOGIN, POIS AUQI TODA
  // HORA QUE A PÁGINA MUDA O ESTADO/SE MOVE O METODO É EXUCUTADO
  // DESNECESSARIAMENTE
  // (async () => {
  //   try {
  //     const appvalues = await Fetcher.request('/app/load/', 'GET')
  //     localStorage.setItem('appvalues', JSON.stringify(appvalues))   
  //   } catch (error) {
  //     console.error(error)
  //     Messages.show('error')
  //   }    
  // })()

  const loadAppValues = async () => {
    try {
      const appvalues = await Fetcher.request('/app/load/', 'GET')
      localStorage.setItem('appvalues', JSON.stringify(appvalues))   
    } catch (error) {
      console.error(error)
      Messages.show('error')
    }    
  }

  useEffect(() => {
    loadAppValues()
  }, [])

  return (
    <>
      <div className='messages' id='messages' >        
      </div>
      <Header class={small ? 'small_header' : ''}/>
      <div className="App" ref={appRef}>
        <Outlet />{/* SPA - No outlet é inserido o conteudo dinamico da pagina */}
        <hr />
        <small style={{color: '#50577afc'}}>Oxtreet BH - Representante Comercial</small>
      </div>
    </>
  );
}

export default App;