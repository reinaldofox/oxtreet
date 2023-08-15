import React, { useEffect, useRef, useState } from 'react';
import { Button, ButtonGroup, Dropdown, Form, Table, ToggleButton } from 'react-bootstrap';
import { useOutletContext } from "react-router-dom";
// ########## ICONES #########
import { BiPurchaseTag } from 'react-icons/bi';
import { FaMinus, FaPlus, FaRegTrashAlt, FaUserTag } from 'react-icons/fa';
import { FiDownload } from 'react-icons/fi';
import { IoReceiptOutline } from 'react-icons/io5';

import Loader from '../../components/ui/Loader/Loader';
import API from '../../utils/API';
import Dialog from '../../utils/Dialog.js';
import './VendaRegister.css';

const VendaRegister = () => {

  const user = useOutletContext()
  const [showLoader, setShowLoader] = useState(false)
  
  const [clientesBusca, setClientesBusca] = useState([])
  const inputCliRef = useRef(null)
  const resultCliRef = useRef(null)
  
  const [produtosBusca, setProdutosBusca] = useState([])
  const inputProdRef = useRef(null)
  const resultProdRef = useRef(null)

  let emptyVenda = {
    clienteId: null, canal: '', data: '', formaPgto: '', info: '',
    qtdItens: 0, valor: 0, cliente: {}, produtos: []
  }
  const [venda, setVenda] = useState({ ...emptyVenda })

  const [coluna, setColuna] = useState('sku');
  const radios = [
    { name: 'SKU', value: 'sku' },
    { name: 'Modelo', value: 'modelo' },
    { name: 'Fornecedor', value: 'fornecedor' }
  ]    

  useEffect(() => inputCliRef?.current.focus(), []) 
  
  // ########################### clientesBusca ######################################

  const getClientesByChars = async (params) => {
    if (params && params.length > 2) {
      return await API.fetchRequest('GET', '/app/cliente/search/?param='+params)
        .then(data => data)
        .catch(error => { throw error })
    }
  }
  
  const handleSearchCliente = async (params) => {
    if (params.length > 2) {
      resultCliRef.current.style.display = "inline"
      await getClientesByChars(params)
        .then(data => setClientesBusca(data))
        .catch(error => console.error(error))
    } else {
      resultCliRef.current.style.display = "none"
    }
  }

  const handleSelectCliente = (id) => {   
  if(id) {
    const cli = clientesBusca.find(c => c.id === id)
    setVenda({ ...venda, cliente: { id: cli.id, nome: cli.nome } })    
  }
    resultCliRef.current.style.display = "none"
    inputCliRef.current.value = ''
    inputProdRef.current.disabled = false
    inputProdRef.current.focus()
  }

  // ########################### PRODUTOS ######################################

  const findProdutosGradeByChars = async params => {
    const qs = `?col=${coluna.toLowerCase()}&param=${params}`    
      return await API.fetchRequest('GET', '/app/produto/search/' + qs)
      .then(data => data)
      .catch(error => { throw error})    
  }

  const handleSearchProdutos = async (params) => {
    if (params.length > 2) {
      await findProdutosGradeByChars(params)
      .then(data => setProdutosBusca(data))
      .catch(error => { throw error })     
      resultProdRef.current.style.display = "inline"
    }
  }

  const handleSelectProduto = gradeId => {
    if (gradeId) {      
      // Obtém o produto selecionado da lista retornada pela busca
      const prod = produtosBusca.find(p => p.gradeId === gradeId)
      // Verifica se o produto já consta na venda
      if (venda.produtos.some(p => p.gradeId === prod.gradeId)) { 
        Dialog.show('alert', 'Este produto já foi adicionado a venda!')        
        return
      }

      // Seta a quantide inicial do produto na venda
      prod.quantidade = 1
      const tempTotal = venda.valor += parseFloat(prod.preco)
      const tempQtdItens = venda.qtdItens + 1
      setVenda({ ...venda, qtdItens: tempQtdItens, valor: tempTotal })
      // setProdutos([...produtos, prod])
      venda.produtos.push(prod)
      inputProdRef.current.value = ''
      resultProdRef.current.style.display = "none"
      inputProdRef.current.focus()
    }
  }  

  const close = ref => {
    ref.current.style.display = "none"
    setProdutosBusca([])
  }

  const removeProdutosVenda = gradeId => {
    const tr = document.getElementById("tr-" + gradeId)
    if (tr) {
      tr.style.background = "#ff7d66"
      tr.style.opacity = 0
      tr.style.transition = "opacity 1s linear"
      const prod = venda.produtos.find(p => p.gradeId === gradeId)
      // const tempTotal = venda.valor - parseFloat(prod.preco)
      const tot = venda.valor - parseFloat(prod.preco)
      const prods = venda.produtos?.filter(prod => prod.gradeId !== gradeId)
      setVenda({ ...venda, valor: tot, produtos: prods })
      setTimeout(() => tr.style.display = "none", 1000)
    }
  }

  const handleQuantidadeItens = (action, pgv) => {

    const input = document.getElementById("input-qtd-" + pgv.gradeId)
    const exclude = document.getElementById("exclude-" + pgv.gradeId)
    const decrease = document.getElementById("decrease-" + pgv.gradeId)    
    const increase = document.getElementById("increase-" + pgv.gradeId)
    // const warning = document.getElementById("warning-" + pgv.gradeId)

    let valor = 0
    let qtdItens = 0
    switch (action) {
      case 'increase':
        exclude.style.display = "none"
        decrease.style.display = "inline"
        
        if (input.valueAsNumber + 1 >= pgv.qtdGrade) {
          increase.style.display = "none"
          increase.nextSibling.style.display = "inline"
          input.style.background = "#ff9f9f"
        }
        pgv.quantidade += 1
        input.value = parseInt(input.value) + 1
        valor = venda.valor + parseFloat(pgv.preco)
        qtdItens = venda.qtdItens + 1
        setVenda({ ...venda, qtdItens, valor })
        break;
        
        case 'decrease':
        if (input.valueAsNumber - 1 <= 1) {
          exclude.style.display = "inline"
          decrease.style.display = "none"
        } 
        increase.style.display = "inline"
        increase.nextSibling.style.display = "none"
        input.style.background = "#fff" 

        pgv.quantidade -= 1
        input.value = parseInt(input.value) - 1
        valor = venda.valor - parseFloat(pgv.preco)
        qtdItens = venda.qtdItens - 1
        setVenda({ ...venda, qtdItens, valor })      
        break;
    
      default:
        break;
    } 
    
  }
  
  const handleFecharVenda = async () => {
  
    if (!venda.data) {
      Dialog.show('alert', 'Favor informar a data da venda')
      return
    }
    
    if (!venda.canal) {
      Dialog.show('alert', 'Favor informar o canal de venda')
      return
    }

    if (!venda.formaPgto) {
      Dialog.show('alert', 'Favor informar a forma de pagamento')
      return
    }
    
    if (venda.produtos && venda.produtos.length > 0) {    
      setVenda({ ...venda, data: !venda.data || new Date() })
      venda.clienteId = venda.cliente.id
      delete venda.cliente     
      // TODO - POR MOTIVOS DE SEGURANÇA, O VALOR DA COMPRA DEVE SER CALCULADO NO SERVIDOR E NUNCA ENVIDADO PELO CLIENTE      
      setShowLoader(true)
      API.fetchRequest('POST', '/venda/create', venda, user.token)
        .then(data => {
          setShowLoader(false)
          resetStates()
          Dialog.show('success', 'Venda realizada com sucesso!')
        })
        .catch(error => {
          Dialog.show('error', 'Alguma coisa deu errado!')
          console.log(error)
        })
      }
    
  }

  const resetStates = () => {
    setClientesBusca([])
    setProdutosBusca([])
    setVenda({...emptyVenda})
  } 

  const setData = (data) => {
    debugger
    let hoje = new Date().getTime()
    let dv = new Date(data).getTime()
    if (dv > hoje) 
      Dialog.show('alert', 'Você selecionou uma data futura!')
    
    setVenda({ ...venda, data })
  }

  return (
    <div className='homeContainer'>
      <Loader show={showLoader} />
      <div className='leftContainer'>  

        <Form.Group className="mb-2 mid formgroup" controlId="formSearchCliente">
          <Form.Label>Cliente</Form.Label>
          <Form.Control ref={inputCliRef} type="text"  placeholder='Informe parte do nome'
            onChange={e => handleSearchCliente(e.target.value)} autoComplete="off"/>        
          <div ref={resultCliRef} className="search_results" onMouseLeave={() => close(resultCliRef)}>
            {clientesBusca?.map((cliente, index) => (
              <button key={index} className="search_result" onClick={() => handleSelectCliente(cliente.id)}>
                {cliente.nome}
              </button>)
            )}  
          </div>
        </Form.Group> 

        <Form.Group className="mid formgroup" controlId="formSearchProduto">
          <Form.Label>Produto</Form.Label>
          <Form.Control ref={inputProdRef} required disabled type="text" autoComplete="off"
            placeholder='Selecione Modelo | Fornecedor | SKU' onChange={e => handleSearchProdutos(e.target.value)} />
          <div ref={resultProdRef} className="search_results"
            onMouseLeave={ev => close(resultProdRef)} id="produtos_results"> 
            {produtosBusca?.map((prod, key) => (
              // aqui deve ser setado na lista de produtos e não na venda
              <button key={key} className="search_result" onClick={() => handleSelectProduto(prod.gradeId)}>
                <span>
                <small> {prod.modelo} - {prod.tamanho}/{prod.cor} - R$ {prod.preco} | {prod.fornecedor}</small>
                </span>
              </button>))}
          </div> 
        </Form.Group>
        <div style={{ margin: '0 5px 25px 5px' }}>
          <span style={{ margin: '10px 6px 10px 0' }}> Buscar por: </span>
            <ButtonGroup>
              {radios.map((radio, index) => (
                <ToggleButton key={index} id={`radio-${index}`} type="radio" variant='outline-primary' name="radio" size="sm"
                  value={radio.value} checked={coluna === radio.value} onChange={(e) => setColuna(e.currentTarget.value)}>
                  {radio.name}
                </ToggleButton>
              ))}
            </ButtonGroup>
        </div>       
      </div>
      
    {(venda.produtos.length || venda?.cliente?.nome) &&
      <div className='rightContainer'> 
            <Table id='tbl_produtos' style={{width: '680px'}} className="table table-striped">
              <thead>
                <tr>
                  <th>
                    <FaUserTag size={24} />
                  </th>
                  <th className="fs-6" colSpan="4">
                    Cliente: {venda.cliente.nome} 
                  </th>                    
                </tr>
              </thead>
            <tbody>
            {venda.produtos?.map(pgv  => (
              <tr id={"tr-"+pgv.gradeId} key={pgv.gradeId} style={{height: '45px'}}>            
                <td>
                  <BiPurchaseTag size={26}/>
                </td>
                <td colSpan="3">
                  {pgv.modelo} {pgv.tamanho}/{pgv.cor} - {Dialog.brl(pgv.preco)}
                </td>
                <td style={{width: '180px', textAlign: 'center'}}>                  
                  <div className="d-inline"> 
                    {/* Quantizador de produto  */}

                    <Button id={"exclude-" + pgv.gradeId} className="rounded-0 rounded-start mr-0"
                      style={{ background: "#ed6060" }} size="sm" title="Excluir este produto da venda"
                      onClick={() => removeProdutosVenda(pgv.gradeId)}>
                      <FaRegTrashAlt size={16} />
                    </Button>

                    <Button id={"decrease-"+pgv.gradeId} className="rounded-0 rounded-start ml-0" title="-1" size="sm"
                      value={-1} onClick={() => handleQuantidadeItens('decrease', pgv)}
                      style={{ display: "none" }}>
                      <FaMinus size={16} />
                    </Button>
                    
                    <input id={"input-qtd-" + pgv.gradeId} size="1" className="btn btn-sm rounded-0" type="number"
                      defaultValue={1} title={"Estoque: " + pgv.qtdGrade}
                      style={{
                        width: "35px",
                        background: pgv.qtdGrade == 1 ? "#ff9f9f" : "#fff"
                      }} />
                    
                    <Button id={"increase-" + pgv.gradeId} className="rounded-0 rounded-end" title="+1"
                      size="sm" onClick={() => handleQuantidadeItens('increase', pgv)}
                      style={{ display: pgv.qtdGrade == 1 ? "none" : "inline" }}>
                      <FaPlus size={16} />
                    </Button>

                    <span title="Estoque zerado" style={{ display: pgv.qtdGrade == 1 ? "inline" : "none" }}>
                      <Button className="rounded-0 rounded-end" size="sm" disabled>                      
                        <FiDownload size={16} style={{display: "inherit"}} />
                      </Button>
                    </span>
                    
                  </div>
                </td>       
            </tr>
          ))}
          </tbody>              
          {venda.produtos.length > 0 && 
          <tfoot>
            <tr>
              <th>
                <IoReceiptOutline size={24} / >           
              </th>
              <th>
                <input type="date" value={venda.data} onChange={ev => setData(ev.target.value)} 
                className="form-control col-md-4" />
              </th>
              <th style={{textAlign: 'center'}}>
                <Dropdown>
                <Dropdown.Toggle className="primary">
                {venda.canal || 'Canal'}
                </Dropdown.Toggle >
                <Dropdown.Menu>
                  {/* <Dropdown.Item value={canal} onClick={ev => setCanal(ev.target.textContent)}> */}
                  <Dropdown.Item as="button" value="Mercado Livre"
                    onClick={ev => setVenda({ ...venda, canal: ev.target.value })}>
                    Mercado Livre
                  </Dropdown.Item>
                  <Dropdown.Item as="button" value="Loja Online" 
                    onClick={ev => setVenda({ ...venda, canal: ev.target.value })}>
                    Loja Online
                  </Dropdown.Item>
                  <Dropdown.Item as="button" value="Venda Direta" 
                    onClick={ev => setVenda({ ...venda, canal: ev.target.value })}>
                    Venda Direta
                  </Dropdown.Item> 
                </Dropdown.Menu>
                </Dropdown>
              </th>              
              <th>              
                <Dropdown>
                <Dropdown.Toggle className="primary">
                  {venda.formaPgto || 'Forma Pagto'}
                </Dropdown.Toggle >
                <Dropdown.Menu>
                  <Dropdown.Item value={venda.formaPgto} 
                  onClick={ev => setVenda({ ...venda, formaPgto: ev.target.textContent })}>
                    Crédito
                  </Dropdown.Item>
                  <Dropdown.Item value={venda.formaPgto} 
                  onClick={ev => setVenda({ ...venda, formaPgto: ev.target.textContent })}>
                    Débito
                  </Dropdown.Item>
                  <Dropdown.Item value={venda.formaPgto} 
                  onClick={ev => setVenda({ ...venda, formaPgto: ev.target.textContent })}>
                    Dinheiro
                  </Dropdown.Item>                    
                  <Dropdown.Item value={venda.formaPgto} 
                  onClick={ev => setVenda({ ...venda, formaPgto: ev.target.textContent })}>
                    Pix
                  </Dropdown.Item>
                  <Dropdown.Item value={venda.formaPgto} 
                  onClick={ev => setVenda({ ...venda, formaPgto: ev.target.textContent })}>
                    Transferência
                  </Dropdown.Item>
                  <Dropdown.Divider />
                  <Dropdown.Item value={venda.formaPgto} 
                  onClick={ev => setVenda({ ...venda, formaPgto: ev.target.textContent })}>
                    Parc. 2x
                  </Dropdown.Item>
                  <Dropdown.Item value={venda.formaPgto} 
                  onClick={ev => setVenda({ ...venda, formaPgto: ev.target.textContent })}>
                  Parc. 3x
                  </Dropdown.Item>
                  <Dropdown.Item value={venda.formaPgto} 
                  onClick={ev => setVenda({ ...venda, formaPgto: ev.target.textContent })}>
                  Parc. 4x
                  </Dropdown.Item>
                  <Dropdown.Item value={venda.formaPgto} 
                  onClick={ev => setVenda({ ...venda, formaPgto: ev.target.textContent })}>
                  Parc. 5x
                  </Dropdown.Item>
                  <Dropdown.Item value={venda.formaPgto} 
                  onClick={ev => setVenda({ ...venda, formaPgto: ev.target.textContent })}>
                  Parc. 6x
                  </Dropdown.Item>
                </Dropdown.Menu>
                </Dropdown>
              </th>
              <th className="fs-6" style={{width: '160px'}}>
                Total: {Dialog.brl(venda.valor)}
              </th>
            </tr>      
            <tr>
              <th colSpan="5" >
                <Form.Group className="mb-3" controlId="vendainfoid">
                <Form.Label>Informações adicionais</Form.Label>
                <Form.Control as="textarea" value={venda.info} rows={3}
                  onChange={ev => setVenda({ ...venda, info: ev.target.value })} />
                </Form.Group>
              </th>
            </tr>
            <tr>
              <th colSpan="5">
                <Button  style={{float: 'right'}} onClick={handleFecharVenda} variant="success">Fechar venda</Button>
              </th>
            </tr>
          </tfoot>
          }
          </Table>
      </div>
    }
  </div>
  )
}

export default VendaRegister