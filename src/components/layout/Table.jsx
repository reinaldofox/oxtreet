import React, { useEffect, useRef, useState } from 'react'
import './Table.css'

import { BsBagPlusFill, BsFillBagCheckFill } from 'react-icons/bs'
import { CgCheckR } from 'react-icons/cg'
import { IoAppsSharp, IoTrashBinSharp } from 'react-icons/io5'
import { MdEditDocument, MdOutlineCancel } from 'react-icons/md'
import { BsTags } from 'react-icons/bs'

import API from '../../utils/API'
import Dialog from '../../utils/Dialog'
import { API_URL } from '../Messages.module'
import Loader from '../ui/Loader/Loader.jsx'

import { Button, Form, Modal, OverlayTrigger, Popover, Table } from 'react-bootstrap'
import { useOutletContext } from "react-router-dom"

const TableProdutos = () => {

  const user = useOutletContext()

  // let rowToDelete = null;
  const [showLoader, setShowLoader] = useState(true)
  const [produtos, setProdutos] = useState([])
  const [produtoVenda, setProdutoVenda] = useState({})
  const [suggestions, setSuggestions] = useState([])
  const [nomeCliente, setNomeCliente] = useState('')
  const [showModalVenda, setShowModalVenda] = useState(false);
  const [idExcluir, setIdExcluir] = useState('')
  const trRef = useRef(null)

  const handleClose = () => {
    setShowModalVenda(false);
    setProdutoVenda({})
  }

  const handleShow = (index) => {
    setShowModalVenda(true)
    setProdutoVenda(produtos[index])
  }  

  const loadProdutos = async () => {
    return await API.fetchRequest('GET', '/produto/grade', null, user.token)
      .then(data => {
        if (data.errors) {
          Dialog.show('error', data.errors)
        }
        setShowLoader(false)
        setProdutos(data)
      }) 
    .catch (error => console.log(error))
  }

  useEffect(() => {
    loadProdutos()
  }, [])

  const handleSuggestions = async (nome) => {
    setNomeCliente(nome)
    if (nome.length > 2) {  
      try {
        const cli = await API.xhrRequest('GET', `${API_URL}/cliente/search/?params=${nomeCliente}`)
        setSuggestions(cli)
      } catch (error) {
        Dialog.show('error', 'Ocorreu um erro inesperado!')
      }
    }
  }

  const handleDelete = async () => {
    // setShowModalMessage(true)
    hidePopover()
    console.log('retornou do modal') 
    await fetch(`${API_URL}/produto/${idExcluir}`, {method: 'DELETE'})
    .then(() => {
      console.log('produto removido')     
      // let tr = document.getElementById(`tr_${idExcluir}`)
      setTimeout(() => {
        trRef.current.remove();
      }, 1500)
      trRef.current.classList.add('delete_effect')      
    })
    //TODO - tratar esse retorno
    .catch(error => console.log('ERRO', error))
  }

  const hidePopover = () => {
    document.getElementById('popover-positioned-top').style.display = 'none'
    removeRowBackground(idExcluir)
  }

  const markRowToDelete = (id) => {
    setIdExcluir(id)
    // document.getElementById('tr_'+id)?.classList.add('mark_to_delete')
    trRef.current.classList.add('mark_to_delete')
  }

  const removeRowBackground = (id) => {
    trRef.current.classList.remove('mark_to_delete')
  }

  const popoverTop = (
    <Popover id="popover-positioned-top" style={{padding: "8px"}}>
      <span>Confirma?</span> <br />
      <CgCheckR title='Confirmar' onClick={ev => handleDelete()} size={24} className='icon' /> 
      <MdOutlineCancel title='Cancelar' onClick={hidePopover} size={24} className='icon' />
    </Popover>
  )

  return(
    <> 
      {<Loader show={showLoader} message={"buscando produtos..."} />}
      <div className='admin_board'style={{width: "100%", marginLeft: 0}}>
        <h6 className='text_divider'> <BsTags size={30} /> Estoque </h6>
      {produtos.length < 1 ? <h4>Estoque vazio</h4> :
      <Table id='tbl_produtos' className="table table-striped">
        <colgroup><col /><col /><col /><col /><col /></colgroup>
        <thead>
          <tr>
            <th><h6>Modelo</h6></th>
            <th><h6>Tipo</h6></th>
            <th><h6>Preço</h6></th>
            <th><h6>Qtd.</h6></th>
            <th><h6>Detalhes</h6></th>
            <th className='icon_align'><h6>Ações</h6></th>
          </tr>
        </thead>
        <tbody>
          {produtos.map((produto, index) => (
            /// Usar document.createDocumentFragment() para gerar elementos recursivamente pois um por um é muito custoso
            <tr key={index} id={`tr_${produto.id}`} ref={trRef} style={{height: '40px'}}>
              <td>{produto.modelo}</td>
              <td>{produto.tipo}</td>
              <td>{Dialog.brl(produto.preco)}</td>
              <td>{produto.qtdGrade}</td>
              <td><small>{produto.info}</small></td>
              <td>
                <div className='icon_align'>                
                  <button className='fake_button' title="Vender este item" onClick={ev => handleShow(index)}>
                    <BsFillBagCheckFill size={24} className='icon' />
                  </button>
                  <button className='fake_button' title="Solicitar este item">
                    <BsBagPlusFill  size={24} className='icon' />
                  </button>
                  <button className='fake_button' title="Alterar este item"> 
                    <MdEditDocument size={24} className='icon' />
                  </button>
                  {/* // TODO - FAZER UM IF ELSE, SE TEM GRADE EXIBE O BOTÃO D EXIBIR, SENÃO EXIBE O SOLICITAR */}
                  <button className='fake_button' title="Ver grade desse produto" >
                    <IoAppsSharp size={24} className='icon' />
                  </button>
                  <OverlayTrigger onExit={ev => removeRowBackground(produto.id)} trigger="click"
                    placement="left" overlay={popoverTop} rootClose={true}>
                    <button className='fake_button' title="Excluir este item" onClick={ev => markRowToDelete(produto.id)}> 
                      <IoTrashBinSharp size={24} className='icon' />
                    </button> 
                  </OverlayTrigger>
                </div>
              </td>
            </tr>       
          ))}
        </tbody>
        </Table> 
        }
      </div>
      <Modal show={showModalVenda} onHide={handleClose} size="lg" centered backdrop="static">
        <Modal.Header className='text-center' closeButton>          
          <h5> Efetuar Venda </h5>
        </Modal.Header>
        <Modal.Body>
          <Form>   
            <div className='box_item_modal'>         
            <strong> 
            {/* <FaGift size={25} color={'#FF7B54'} />  */}
            {produtoVenda.modelo} {produtoVenda.tamanho} {produtoVenda.cor} - R$ {produtoVenda.precoVenda?.replace?.('.', ',')} 
            </strong>
            <br />
            <small>{produtoVenda.detalhes}</small>
            </div>
            <hr />        

            <label htmlFor="cliente-suggestion" className="form-label">Informe o cliente</label>
            <input className="form-control" onChange={ev => handleSuggestions(ev.target.value)} list="suggestions" id="cliente-suggestion" placeholder="Digite pelo menos 3 letras." />
            <datalist id="suggestions" className='oxdatalist'>
              {
                suggestions?.map((suggest, index) => (
                  <option id={suggest.id} key={index} value={`${suggest.nome} - ${suggest.telefone}`} />
                ))
              }  
            </datalist>            

            <Form.Group className="mb-3 mt-3" controlId="exampleForm.ControlTextarea1" >
              <Form.Label>Comentários</Form.Label>
              <Form.Control as="textarea" rows={2} />    
            </Form.Group>
          </Form>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="success" type="submit"> Vender </Button>
          <Button variant="danger" onClick={handleClose}> Cancelar </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default TableProdutos