import React from 'react'
import OxTable from '../components/Table'
import FormProduto from '../components/FormProduto'
// import { BiSave } from 'react-icons/bi'
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';

const Estoque = () => {

  return (
    // <>
    //   <BiSave className='icon' size={50} title="Cadastrar novo item" />
    //   <OxTable />
    // </>
    <Tabs defaultActiveKey="Estoque" id="justify-tab-example" className="nav_tab mt-4">
      <Tab eventKey="Estoque" title="Itens em estoque">
        <OxTable />
      </Tab>     
      <Tab eventKey="Cadastrar" title="Cadastrar item">
        <FormProduto />
      </Tab>
      <Tab eventKey="Pedidos" title="Fornecedor">
        <FormProduto />
      </Tab>
    </Tabs>
  )
}

export default Estoque