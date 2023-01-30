import React, { useState, useEffect } from 'react'
import { Table, Form, Modal, Button, Popover, OverlayTrigger } from 'react-bootstrap'
import './styles.css'
import { IoBagCheckOutline, IoBagAddOutline } from 'react-icons/io5'
import { BiTrash,  BiLike, BiEdit } from 'react-icons/bi'
import { MdOutlineCancel } from 'react-icons/md'
import { Accordion }from 'react-bootstrap'
import SearchGrid from '../SearchGrid/'
import { API_URL } from '../Messages.module'

const OxTable = (props) => {

  // let rowToDelete = null;
  const [produtos, setProdutos] = useState([])
  const [produtoVenda, setProdutoVenda] = useState({})
  const [suggestions, setSuggestions] = useState([])
  const [nomeCliente, setNomeCliente] = useState('')

  const [showModalVenda, setShowModalVenda] = useState(false);

  const [idExcluir, setIdExcluir] = useState('')

  const handleClose = () => {
    setShowModalVenda(false);
    setProdutoVenda({})
  }

  const handleShow = (index) => {
    setShowModalVenda(true)
    setProdutoVenda(produtos[index])
  }  

  const getProdutos = async () => {   
    await fetch(`${API_URL}/produto/`)
    // Sequelize upsert retorna true se foi criado ou false se foi atualizado
    .then(response => response.json())
    .then(data => setProdutos(data))
    .catch(error => console.log('TRATAR ESSE ERRO', error))
  }

  const handleSuggestions = async (nome) => {
    setNomeCliente(nome)
    if (nome.length > 2) {

      let xhr = new XMLHttpRequest();
      xhr.open('GET', `${API_URL}/cliente/search/?nomeCliente=${nomeCliente}`)
      xhr.responseType = 'json'
      xhr.send()
      xhr.onload = () => {
        console.log(xhr.response);
        let cliente = xhr.response
        setSuggestions(cliente)
      }
    }
  }

  useEffect(() => { getProdutos() }, [])

  const handleDelete = async () => {
    // setShowModalMessage(true)
    hidePopover()
    console.log('retornou do modal') 
    await fetch(`${API_URL}/produto/${idExcluir}`, {method: 'DELETE'})
    .then(response => response.json())
    //TODO - tratar esse retorno
    .then(data => console.log('TRATAR essa exclusão'))
    .catch(error => console.log('ERRO ---------- ', error))
  }

  const hidePopover = () => {
    // document.getElementById('popover-positioned-top')?.classList.remove('show')
    // removeRowBackground(idExcluir)
  }

  const markRowToDelete = (id) => {
    setIdExcluir(id)
    document.getElementById('tr_'+id)?.classList.add('mark_to_delete')
  }

  const removeRowBackground = (id) => {
    document.getElementById('tr_'+id)?.classList.remove('mark_to_delete')
  }

  const popoverTop = (
    <Popover id="popover-positioned-top" style={{padding: "8px"}}>
      <span>Confirma?</span> <br />
      <BiLike title='Confirmar' onClick={ev => handleDelete()} size={24} className='icon' /> 
      <MdOutlineCancel title='Cancelar' onClick={hidePopover} size={24} className='icon' />
    </Popover>
  )

  return(
    <> 

      <Accordion className='mt-4 mb-4'>
        <Accordion.Item eventKey="0">
          <Accordion.Header>Pesquisar Item</Accordion.Header>
          <Accordion.Body>
            <SearchGrid />
          </Accordion.Body>
        </Accordion.Item>      
      </Accordion>

      <Table id='tbl_produtos' reload={props.reload}>
        <thead>
          <tr>
            <th>Modelo</th>
            <th>Tipo</th>
            <th>Tamanho</th>
            <th>Preço</th>
            <th>Cor</th>
            <th>Detalhes</th>
            <th className='icon_align'>Ações</th>
          </tr>
        </thead>
        <tbody>
          {produtos.map((produto, index) => (
            <tr key={index} id={`tr_${produto.id}`}>
              <td>{produto.modelo}</td>
              <td>{produto.tipo}</td>
              <td>{produto.tamanho}</td>
              <td>{produto.precoVenda}</td>
              <td>{produto.cor}</td>
              <td>{produto.detalhes}</td> 
              <td>
                <span className='icon_align'>
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
                </span>
              </td>
            </tr> 
          ))}
        </tbody>
      </Table> 
  
      <Modal show={showModalVenda} onHide={handleClose} size="lg" centered>
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