import React, { useEffect, useState } from 'react';
import { Dropdown, Form, Table } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import { AiFillStar } from 'react-icons/ai';
import { BsListCheck } from 'react-icons/bs';
import { FaRegChartBar } from 'react-icons/fa';
import { IoReceiptOutline } from 'react-icons/io5';
import { useOutletContext } from "react-router-dom";
import API from '../../utils/API';
import Dialog, { meses } from '../../utils/Dialog';
import Loader from '../../components/ui/Loader/Loader';
import './Venda.css';

const VendaMes = () => {

  const user = useOutletContext() || {}

  const [vendas, setVendas] = useState([])
  const [filtros, setFiltros] = useState({})
  const [filtro, setFiltro] = useState('Selecione')
  const [info, setInfo] = useState()
  const [sumarioMensal, setSumarioMensal] = useState([])
  const [showLoader, setShowLoader] = useState(true)

  
  useEffect(() => {
    API.fetchRequest('GET', '/venda/resumo', null, user.token)
      .then(data => {
        if (data.errors) {
          Dialog.show('error', data.errors)
        }
        setVendas(data)
        setShowLoader(false)
      })
      .catch(() => Dialog.show('error', 'Aconteceu um erro inesperado'))
    
    API.fetchRequest('GET', '/venda/sum', null, user.token)
      .then(data => handleSumarioMensal(data))
      .catch(() => Dialog.show('error', 'Aconteceu um erro inesperado'))
  }, [])

  const handleSumarioMensal = (data) => {
    let zerado = JSON.parse(JSON.stringify(data))
    zerado.map(sm => sm.total = 0)  
    // debugger
    try {
      // este random é apenas para motivos de teste do gráfico
      data.map(d => d.total = Math.floor(Math.random() * 6200))
    } catch (error) {
      console.log(error)
    }
    setSumarioMensal(zerado)
    setTimeout(() => {
      setSumarioMensal(data)
    }, 1);
  }

  const handleSetFiltros = ev => {
    const { name, value } = ev.target
    setInfo(prev => name + ' : ' + value)
    setFiltros(prev => ({
      ...prev,
      [name]: value,
    }))
  }

  const bgColorsChart = (total) => {
    total = parseInt(total)
    if (total <= 2000)
      return "#ed6060"
    
    if (total <= 4000)
      return "#f3a649"
    
    if (total > 4000)
      return "#74b185"
  }

  const buscar = () => {
    API.fetchRequest('GET', '/venda/?filtros=' + JSON.stringify(filtros))
      .then(data => {
        if(data.errors) {
          Dialog.show('error', data.errors)
          return
        }
        setShowLoader(false)
        setVendas(data)
      })
      .catch(error => console.log(error))
  }
  
  return (
    <>
    {<Loader show={showLoader} message={"buscando vendas..."} />}
    {vendas.length < 1 ? 
      <h5>Nenhuma venda efetuada no mês</h5>
      :
      <div>    
        <Dropdown className='d-inline'>
        <Dropdown.Toggle className="primary">
        {filtro}
        </Dropdown.Toggle >
        <Dropdown.Menu>
          <Dropdown.Item as="button" value={filtro} onClick={() => setFiltro('Cliente')}>
            Cliente
          </Dropdown.Item>
          <Dropdown.Item as="button" value={filtro} onClick={() => setFiltro('Valor')}>
            Valor
          </Dropdown.Item>
          <Dropdown.Item as="button" value={filtro} onClick={() => setFiltro('Pagamento')}>
            Pagamento
          </Dropdown.Item> 
        </Dropdown.Menu>
        </Dropdown>
  
        <Form.Control name={filtro} style={{width: '280px', display: 'inline'}} onChange={() => handleSetFiltros(ev)} />
        <h6 className="d-md-inline"> {info} </h6>
        <Button onClick={ev => buscar(ev)}>Buscar</Button>
  
        <div className='admin_board' style={{width: "100%", marginLeft: 0}}>       
        <h6 className='text_divider'> <IoReceiptOutline size={30} />Vendas do mês</h6>
          <Table className="table table-striped">
            <thead>
              <tr>
                <th>Cliente</th>
                <th>Valor</th>
                <th>Desconto</th>
                <th>Pagamento</th>
                <th>Canal</th>
                <th>Data</th>
                <th>Qtd. Itens</th>           
              </tr>
            </thead>
            <tbody>
              {vendas.map((v, index) => (
                /// Usar document.createDocumentFragment() para gerar elementos recursivamente pois um por um é muito custoso
                <tr key={index} style={{ height: '40px' }}>
                  <td>{v.nome}</td>
                  <td>{Dialog.brl(v.valor)}</td>
                  <td>{Dialog.brl(v.desconto)}</td>
                  <td>{v.pagamento}</td>
                  <td>{v.canal}</td>
                  <td>{new Date(v.data).toLocaleDateString()}</td>
                  <td>{v.qtdItens}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>  
  
        <div style={{display: "flex"}}> 
        <div className='admin_board' style={{width: "50%", marginLeft: 0}}>       
        <h6 className='text_divider'> <BsListCheck size={30} />Sumário mensal</h6>
          <Table className="table table-striped">
            <thead>
              <tr>
                <th>Mês</th>
                <th>Qtd. Vendas</th>
                <th>Qtd. Itens</th>
                <th>Descontos</th>
                <th>Total</th>
                <th>P/A</th>
                <th>T/M</th>          
              </tr>
            </thead>
            <tbody>
              {sumarioMensal?.map((sm, index) => (
              <tr key={index} style={{ height: '40px' }}>
                <td>{meses.nome[+sm.mes.split("/")[0]-1]}</td>
                <td>{sm.qtdVendas}</td>
                <td>{sm.qtdItens}</td>
                <td>{Dialog.brl(sm.desconto)}</td>
                <td>{Dialog.brl(sm.total)}</td>
                <td>{parseFloat(sm.pa).toFixed(2)}</td>
                <td>{Dialog.brl(sm.tm)}</td>
              </tr>            
              ))}
            </tbody>
          </Table>
        </div>
          <div className='admin_board' style={{ position: "relative" }}>       
          <h6 className='text_divider'> <FaRegChartBar size={30} />Gráfico de desempenho</h6>
            <div style={{
              display: "flex", flexDirection: "row-reverse", justifyContent: "flex-end",
              alignItems: "self-end", height: "374px", paddingLeft: "50px"}}>
              {sumarioMensal?.map((sm, index) => (             
                <div key={index} style={{width: "35px", margin: "3px", zIndex: "99",
                  display: "flex", flexDirection: "column", justifyContent: "center"}}>
                  <div style={{display: (sm.total > 6000) ? "flex" : "none", margin: "0 auto"}}>
                    <span><AiFillStar size={28} fill={"#ff8500"} /></span>
                  </div>
                  <div title={Dialog.brl(sm.total)} className='chartbar'
                    style={{
                      background: bgColorsChart(sm.total), height: `${parseInt((300 / 6000) * sm.total)}px`,
                    transition: `height ${parseFloat(Math.random() * 1 + 1).toFixed(1)}s linear`}}>                  
                  </div>                
                  <div style={{color: '#5c6885', margin: "0 auto"}}>{meses.nomeAbrev[+sm.mes.split("/")[0]-1]}</div>
                </div>            
              ))}
            </div>
            <div style={{position: "absolute", width: "96%", bottom: "53px", height: "300px"}}>
              <small className='text_divider' style={{marginBottom: "32px"}}>6000</small>
              <small className='text_divider' style={{marginBottom: "31.5px"}}>5000</small>
              <small className='text_divider' style={{marginBottom: "31.5px"}}>4000</small>
              <small className='text_divider' style={{marginBottom: "31.5px"}}>3000</small>
              <small className='text_divider' style={{marginBottom: "31.5px"}}>2000</small>
              <small className='text_divider' style={{marginBottom: "31.5px"}}>1000</small>
              <small className='text_divider' style={{marginBottom: "0"}}>0</small>
            </div>                                                                                      
        </div>
        </div>
        <button onClick={() => handleSumarioMensal(sumarioMensal)}>Redo</button>
        </div>
      } 
      </>   
  )
}
export default VendaMes