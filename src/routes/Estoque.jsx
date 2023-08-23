import React from 'react';
import CadastroProduto from '../components/forms/Produto/CadastroProduto';
import TableProdutos from '../components/layout/Table';
import { Tab, Tabs } from 'react-bootstrap/';

const Estoque = () => {
  return (
    <>
    <Tabs variant="pills" className="mb-3" >      
      <Tab eventKey="produtos" title="Produtos">
        <hr className="hr" />
        <TableProdutos />
      </Tab>
      <Tab eventKey="adicionar" title="Adicionar">
        <hr className="hr" />
        <CadastroProduto />      
      </Tab>
      <Tab eventKey="pesquisar" title="Pesquisar">
        <hr className="hr" />
        Aqui será o formulário de pesquisa
      </Tab>      
      <Tab eventKey="grades" title="Grades">
        <hr className="hr" />
        <h5>Grades</h5>
        Filtrar grades por um select de produtos
      </Tab>        
    </Tabs>      
    </>
  )
}

export default Estoque