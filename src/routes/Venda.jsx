import React from 'react';
import { Tab, Tabs } from 'react-bootstrap';
import './Venda.css';
import VendaRegister from './venda/VendaRegister';
import VendaMes from './venda/VendasMes';
import { BsBagCheck } from 'react-icons/bs'

const Venda = () => {
  return (
    <div>
      <Tabs variant="pills" className="mb-3" >
        <Tab eventKey="vendas" title="Vendas">
          <hr />
          <VendaMes />
        </Tab>
        <Tab eventKey="vender" title="Vender"> 
        <div className='admin_board' style={{width: "100%", marginLeft: 0}}>       
          <h6 className='text_divider'> <BsBagCheck size={30} />Vender</h6>       
          <VendaRegister />
        </div>
        </Tab>
        <Tab eventKey="entregas" title="Entregas">
          <hr />
          Aqui será o formulário de pesquisa
        </Tab>        
      </Tabs>
    </div>
  )
}
export default Venda