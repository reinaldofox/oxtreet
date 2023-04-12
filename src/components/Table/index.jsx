import React, { useState, useEffect, useRef } from 'react'
import { Table, Form, Modal, Button, Popover, OverlayTrigger } from 'react-bootstrap'
import './styles.css'
import { IoBagCheckOutline, IoBagAddOutline } from 'react-icons/io5'
import { BiTrash, BiEdit } from 'react-icons/bi'
import { CgCheckR } from 'react-icons/cg'
import { MdOutlineCancel } from 'react-icons/md'
import { API_URL } from '../Messages.module'
import Fetcher from '../../utils/Fetcher'
import Messages from '../../utils/Messages'

const OxTable = (props) => {

  // let rowToDelete = null;
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
    try {
      return await Fetcher.request('/produto/', 'GET')
      .then(data => setProdutos(data))
      .catch(error => Messages.show('error'))   
    } catch (error) {
      Messages.show('error')
    }
  }

  useEffect(() => {
    loadProdutos()
    // debugger;
  }, [])

  const handleSuggestions = async (nome) => {
    setNomeCliente(nome)
    if (nome.length > 2) {

      let xhr = new XMLHttpRequest();
      xhr.open('GET', `${API_URL}/cliente/search/?params=${nomeCliente}`)
      xhr.responseType = 'json'
      xhr.send()
      xhr.onload = () => {
        console.log(xhr.response);
        let cliente = xhr.response
        setSuggestions(cliente)
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
    .catch(error => console.log('ERRO ---------- ', error))
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
      <Table id='tbl_produtos'>
        <colgroup><col /><col /><col /><col /><col /><col /><col /></colgroup>
        <thead>
          <tr>
            <th><h6>Modelo</h6></th>
            <th><h6>Tipo</h6></th>
            <th><h6>Tamanho</h6></th>
            <th><h6>Preço</h6></th>
            <th><h6>Cor</h6></th>
            <th><h6>Detalhes</h6></th>
            <th className='icon_align'><h6>Ações</h6></th>
          </tr>
        </thead>
        <tbody>
          {produtos.map((produto, index) => (
            <tr key={index} id={`tr_${produto.id}`} ref={trRef}>
              <td>{produto.modelo}</td>
              <td>{produto.tipo}</td>
              <td>{produto.tamanho}</td>
              <td>{produto.precoVenda}</td>
              <td>{produto.cor}</td>
              <td><small>{produto.info}</small></td>
              <td>
                <div className='icon_align'>
                  <button className='fake_button' title="Vender este item" onClick={ev => handleShow(index)} >
                    <IoBagCheckOutline size={24} className='icon' />
                  </button>
                  <button className='fake_button' title="Alterar este item" > 
                    <BiEdit size={24} className='icon' />
                  </button>
                  <button className='fake_button' title="Solicitar este item">
                    <IoBagAddOutline  size={24} className='icon' />
                  </button>
                  <OverlayTrigger onExit={ev => removeRowBackground(produto.id)} trigger="click" placement="left" overlay={popoverTop} rootClose={true}>
                    <button className='fake_button' title="Excluir este item" onClick={ev => markRowToDelete(produto.id)}> 
                      <BiTrash size={24} className='icon' />
                    </button> 
                  </OverlayTrigger>
                </div>
              </td>
            </tr>       
          ))}
        </tbody>
      </Table> 
  
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

export default OxTable