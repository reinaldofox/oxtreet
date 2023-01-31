import './App.css';
// import FormProduto from './components/FormProduto'
// import OxTable from './components/Table';
// import Login from './components/Login'
import { Outlet } from 'react-router-dom'
import Header from './components/Header'

function App() {
  return (
    <div className="App">
      <Header />
      <Outlet />{/* SPA - No outlet é inserido o conteudo dinamico da pagina */}
      <hr />
      <small style={{color: '#50577afc'}}>Oxtreet BH - Representante Comercial</small>
      {/* <Login /> */}
      {/* <h3> Cadastrar produto </h3>
      <FormProduto />
      <hr />
      <h3> Estoque </h3>
      <OxTable /> */}
    </div>
  );
}

export default App;