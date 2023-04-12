import React, { useState, useRef, useEffect } from 'react'
import { API_URL } from '../components/Messages.module'
// ######### BOOTSTRAP #######
import Form from 'react-bootstrap/Form'
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import ListGroup from 'react-bootstrap/ListGroup';
import Dropdown from 'react-bootstrap/Dropdown'
// ########## ICONES #########
import { BsArrowReturnRight } from 'react-icons/bs'
import { BiPurchaseTag } from 'react-icons/bi'
import { FaUserTag } from 'react-icons/fa'
import { CgCloseR } from 'react-icons/cg'
import { IoReceiptOutline } from 'react-icons/io5'
// ########### MODELS #########
// import Venda from '../models/Venda'
import './Home.css'

const Home = () => {

  // const [venda, setVenda] = useState(Venda)
  // const [ProdutosVenda, setProdutosVenda] = useState([])

  const [clienteVenda, setClienteVenda] = useState({})
  const [clientes, setClientes] = useState([])
  const inputCliRef = useRef(null)
  const resultCliRef = useRef(null)
  
  const [produtosVenda, setProdutosVenda] = useState([])
  const [produtos, setProdutos] = useState([])
  const inputProdRef = useRef(null)
  const resultProdRef = useRef(null)

  const [valorTotal, setValorTotal] = useState(0)

  useEffect(() => {
    if (produtosVenda && produtosVenda.length > 0) {
      let valorTotal = produtosVenda?.reduce((total, produtosVenda)=> {
        return total += parseFloat(produtosVenda.precoVenda)         
      }, 0)
      setValorTotal(valorTotal)
    }
  }, [produtosVenda, setValorTotal])

  useEffect(() => inputCliRef.current.focus(), [])
  
  // ########################### CLIENTES ######################################

  const getClientesByChars = async (params) => {
    if (params && params.length > 2) {
      await fetch(API_URL+'/cliente/search/?params='+params)
      .then(async response => response.json())
      .then(data => setClientes(data))
      .catch(error => console.log('TRATAR ESSE ERRO', error))
    }
  }
  
  const handleSearchCliente = (params) => {
    if (params.length > 2) {
      resultCliRef.current.style.display = "inline"
      getClientesByChars(params)
    } else {
      resultCliRef.current.style.display = "none"
    }
  }

  const handleSelectCliente = (id) => {
    if(id) {
      const cli = clientes.find(c => c.id === id)
      setClienteVenda(cli)
      setProdutosVenda([])    
    }
    resultCliRef.current.style.display = "none"
    inputCliRef.current.value = ''
  }

  // ########################### PRODUTOS ######################################

  const getProdutosByChars = async (params) => {
    if (params && params.length > 2) {
      await fetch(API_URL+'/produto/search/?params='+params, {
        mode: 'cors', //cannot be 'no-cors'
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
      })
      .then(async response => response.json())
      .then(data => setProdutos(data))
      .catch(error => console.log('TRATAR ESSE ERRO', error))
    }
  }

  const handleSearchProdutos = (params) => {
    if (params.length > 2) {
      getProdutosByChars(params)
      resultProdRef.current.style.display = "inline"
    }
  }
  
  const handleSelectProduto = (id) => {
    if(id) {
      const prod = produtos.find(p => p.id === id)
      setProdutosVenda([...produtosVenda, { ...prod }])   
    }
    resultProdRef.current.style.height = "fitContent" 
    inputProdRef.current.value = ''
  }

  const close = ref => ref.current.style.display = "none"

  const removeItemListaVenda = (id) => {
    let prods = produtosVenda?.filter(prod => prod.id !== id)
    setProdutosVenda(prods)
  }

  const fecharVenda = async () => {
    if (produtosVenda && produtosVenda.length > 0) {
      const produtos = produtosVenda.map( pv => {
        return {
          produtoId: pv.id,
          precoVendido: pv.precoVenda,
          tamanho:'teste 10 chars',
          cor: 'teste 40 chars',
          quantidade: 1,
          info: 'Teste de vendas 200 chars'
        }
      })
      // produtoVenda = venda.id, produto.id, precoVendido, quantidade, info | adicionar qtd, cor
      const venda = { clienteId: clienteVenda.id, valor: valorTotal, pagamento: "Pix", info: "Desconto de R$ 15,00",  produtos }
      await fetch(API_URL+'/venda/create', {
        method: 'POST',
        mode: 'cors', //cannot be 'no-cors'
        body: JSON.stringify(venda),
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
      })
      .then(async response => response.json())
      .then(data => {
        resetStates()
        console.log(data);
      })
      .catch(error => console.log('TRATAR ESSE ERRO', error))
    }
  }

  const resetStates = () => {
    setClienteVenda({})
    setClientes([])       
    setProdutosVenda([])
    setProdutos([])
    setValorTotal(0)
  }

  return (
    <div className='homeContainer'>

      <div className='leftContainer'>
      <form id="autoform">
        <label htmlFor="browser">browser:</label>
        <input list="browserdata" id="browser" name="browser" size="50" autoComplete="off" />
      </form>

        <datalist id="browserdata">
        <option value="Reinaldo Adriano Santos">Papoula Azul, 284 - Havai</option>
        <option value="Glaucia Chagas Madureira">Rua Rubi, 34 - Ravena</option>
        <option value="Anísia Mendies Dias">Capim Verde, 38 - Bonsucesso</option>
      
        </datalist>

        {/* <input type="text" value={search} onChange={setSearch(ev => ev.target.value)} name="cliente"/> */}
        <Form.Group className="mb-3 mid formgroup" controlId="formSearchCliente">
          <Form.Label>Cliente</Form.Label>
          <Form.Control ref={inputCliRef} required type="text" autoComplete="off" onChange={e => handleSearchCliente(e.target.value)}/>        
          <div ref={resultCliRef} className="search_results" onMouseLeave={ev => close(resultCliRef)} id="clientes_results">
            {clientes?.map((cliente, index) => (
              <button key={index} className="search_result" onClick={ev => handleSelectCliente(cliente.id)}> {cliente.nome} </button>)
            )}  
          </div>
        </Form.Group> 

        {/* <input type="text" value={search} onChange={setSearch(ev => ev.target.value)} name="cliente"/> */}
        <Form.Group className="mb-3 mid formgroup" controlId="formSearchProuto">
          <Form.Label>Item</Form.Label>
          <Form.Control ref={inputProdRef} required type="text" autoComplete="off" onChange={e => handleSearchProdutos(e.target.value)}/>
          <div ref={resultProdRef} className="search_results"
            onMouseLeave={ev => close(resultProdRef)} id="produtos_results">
            {produtos?.map((produto, index) => (
              <button key={index} className="search_result" onClick={ev => handleSelectProduto(produto.id)}>
                <span> {produto.modelo} {produto.cor} {produto.tamanho} - R$ {produto.precoVenda} </span>
              </button>)
            )}
          </div> 
          <div style={{marginTop: "2px", marginLeft: "4px"}}>
            <span> <BsArrowReturnRight size={26} /> </span>
            <Form.Check inline label="Modelo" defaultChecked name="seachby" type="radio" id="searchmodelo"/>
            <Form.Check inline label="Código" name="seachby" type="radio" id="sarchcodigo"/>
            <Form.Check inline label="Tipo" name="seachby" type="radio" id="searchtipo"/>
            <Form.Check inline label="Cor" name="seachby" type="radio" id="searchcor"/>
            <Form.Check inline label="Preço" name="seachby" type="radio" id="searchpreco"/>
          </div>          
        </Form.Group>
      </div>
      
      {(produtosVenda.length || clienteVenda.nome) &&
        <div className='rightContainer'> 
          <Card >
            <ListGroup variant="flush">
            <ListGroup.Item variant={'warning'}>
              <span className='span_icon'> <FaUserTag size={24}/> </span> 
              Cliente: <strong>{clienteVenda.nome}</strong> 
              {produtosVenda.length > 0 ? <small> | {produtosVenda.length} produto(s) selecionados  </small> : ''}
            </ListGroup.Item> 
            {produtosVenda?.map((produto, index) => (
              <div key={index}>
                <ListGroup.Item action> 
                  <span className='span_icon'>
                    <BiPurchaseTag size={24}/>
                  </span>
                  <span>
                    {produto.modelo} {produto.cor} {produto.tamanho} - R$ {produto.precoVenda}
                  </span>
                  <span className='span_icon' style={{float: 'right'}}>
                    <CgCloseR className='icon' onClick={ev => removeItemListaVenda(produto.id)} size={24} title='Remover este item da venda'/>
                  </span>
                </ListGroup.Item> 
              </div>
            ))}

            {produtosVenda.length > 0 && 
              <ListGroup.Item variant={'success'}>  
                {/* <span style={{lineHeight: "50px", display: "inline"}}> 
                  {produtosVenda.length} itens
                </span> */}
                <span className='icon'><IoReceiptOutline size={24}/></span>             
                <span style={{lineHeight: "50px", display: "inline"}}> 
                  <strong> Total: R$ {valorTotal.toFixed(2)} </strong> 
                </span>
                <Dropdown style={{display: "inline", marginLeft: "25px"}}>
                <Dropdown.Toggle variant="outline-success" id="dropdown-basic">
                  Pagamento
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item href="#/action-1">Dinheiro</Dropdown.Item>
                  <Dropdown.Item href="#/action-2">Pix</Dropdown.Item>
                  <Dropdown.Item href="#/action-3">Débito</Dropdown.Item>
                  <Dropdown.Item href="#/action-3">Crédito</Dropdown.Item>
                  <Dropdown.Item href="#/action-3">Transferência</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
                        
              <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                <Form.Label>Informações adicionais</Form.Label>
                <Form.Control as="textarea" rows={2} />
              </Form.Group>

              <Button  style={{float: 'right'}} onClick={fecharVenda} variant="success">Fechar venda</Button>
              </ListGroup.Item>  
            }
            </ListGroup>
          </Card>
        </div>
      }
    </div>
  )
}

export default Home