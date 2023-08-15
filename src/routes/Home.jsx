import React, { useEffect, useState } from 'react';
import { AiOutlineFundProjectionScreen } from 'react-icons/ai';
import { useOutletContext } from 'react-router-dom';
import API from '../utils/API';
import Dialog, { meses } from '../utils/Dialog';
import './Home.css';

const Home = () => {

  const user = useOutletContext()
  const [dash, setDash] = useState({})

  const loadDashBoard = async () => {
    await API.fetchRequest('GET', '/admin/dashboard', null, user.token)
      .then(data => {
        if (data.messages) {
          Dialog.show('error', data.messages)
        } else {
          setDash(data)
        }
      })
      .catch(error => Dialog.show('error', 'Ocorreu um erro inesperado!'))
  }

  useEffect(() => {
    loadDashBoard()
  }, [])
  
  return (

    <div style={{ display: "flex", flexDirection: "column", alignItems: "center"}}>
      
      <div style={{
        marginBottom: "20px", display: "flex", alignItems: "center",
        padding: "10px", borderBottom: "2px solid #777"
      }}>
        <AiOutlineFundProjectionScreen size={40} fill="#777" />
        <span className="fs-3" style={{ color: "#777", marginLeft: "15px"}}>
          Dashboard: {meses.nome[new Date().getMonth()]}
        </span>
      </div>

      <div style={{display: "flex", alignItems: "center"}}>    

      <div className='dashcard' style={{background: "#f36c49", opacity: (!dash.vendas) ? "0" : "1"}}>
      <span className="fs-4" style={{textOrientation: "upright"}}>Faturamento</span>
        
        <div>
          <span>Bruto</span>
          <h3 className="mb-0">{Dialog.brl(dash.vendas?.total)}</h3>
            <hr />
          <span>Despesas</span>
          <h3 className="mb-0">{Dialog.brl(dash?.totalDespesas)}</h3>
          <hr />
          <span>Descontos</span>
          <h3 className="mb-0">{Dialog.brl(dash.vendas?.totalDescontos)}</h3>
          <hr />
          <span>Líquido</span>
            <h3 className="mb-0">
              {Dialog.brl((dash.vendas?.total - dash?.totalDespesas - dash.vendas?.totalDescontos))}
            </h3>                      
        </div>
      </div>

      <div className='dashcard' style={{background: "#604161", opacity: (!dash.vendas) ? "0" : "1"}}>
      <span className="fs-4">Vendas</span>
        <hr />        
          <div>
            <span>Total</span>
            <h3 className="mb-0">{Dialog.brl(dash.vendas?.total)}</h3>
            <hr />
            <span>Qtd. Vendas</span>
            <h3 className="mb-0">{dash.vendas?.qtdVendas}</h3>
            <hr />
            <span>Qtd. Itens</span>
            <h3 className="mb-0">{dash.vendas?.qtdItens}</h3>
            <hr />
            <span>P/A</span>
            <h3 className="mb-0">{parseFloat(dash.vendas?.pa).toFixed(2)}</h3>
            <hr />
            <span>T/M</span>
            <h3 className="mb-0">{parseFloat(dash.vendas?.tm).toFixed(2)}</h3>
          </div>
      </div>
      
      <div className='dashcard' style={{background: "#BF4F51", opacity: (!dash.despesas) ? "0" : "1"}}>
        <span className="fs-4">Despesas</span>
        <hr />
        {dash.despesas?.map((d, ind) => <div key={ind}><div>{d.tipo}</div> <h3>{Dialog.brl(d.total)}</h3><hr /></div>)}
        Total:
        <br />
        <span className="fs-2">{Dialog.brl(dash.totalDespesas)}</span>
      </div>
        
      <div className='dashcard' style={{background: "#ed6060", opacity: (!dash.vendas) ? "0" : "1"}}>
      <span className="fs-4">Canal</span>
        <hr />
        {dash.vendasCanal?.map((v, ind) => (
          <div key={ind}>
            <div>{v.canal}</div>
            <h3 className="mb-0">{Dialog.brl(v.quantidade)}</h3>
            <span>Qtd Itens: {v.qtdItens}</span>
            <hr />
          </div>))} 
        Qtd. Total Itens
        <br />
        <span className="fs-2">{dash.qtdTotalItens}</span>
      </div>
      
      <div className='dashcard' style={{background: "#3b5281", opacity: (!dash.vendas) ? "0" : "1"}}>
      <span className="fs-4">Financeiro</span>
        <hr />        
        <div>
          <span>Receita</span>
          <h3 className="mb-0">R$ 10231,80</h3>
          <hr />
          <span>Cap. de Giro</span>
          <h3 className="mb-0">R$ 5390,00</h3> 
          <hr />
          <span>CMV</span>
          <h3 className="mb-0">R$ 14671,61</h3> 
          <hr />
          <span>CFE</span>
          <h3 className="mb-0">R$ 59,40</h3> 
        </div>
      </div>
        
      <div className='dashcard' style={{background: "#428491", opacity: (!dash.estoque) ? "0" : "1"}}>
      <span className="fs-4">Estoque</span>
        <hr />        
        <div>
          <span>Qtd Produtos</span>
          <h3 className="mb-0">{dash?.estoque?.qtdItens}</h3>
          <hr />
          <span>Valor Total</span>
          <h3 className="mb-0">{Dialog.brl(dash.estoque?.total)}</h3>            
        </div>
      </div>

      </div>
    </div>
  )
}

export default Home