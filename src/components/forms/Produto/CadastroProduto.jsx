import React, { useEffect, useRef, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Table from 'react-bootstrap/Table';
import { BsStackOverflow } from 'react-icons/bs';
import { FaMinus, FaPlus } from 'react-icons/fa';
import { TbStack3 } from 'react-icons/tb';
import { BiCloset } from 'react-icons/bi';

import { useOutletContext } from "react-router-dom";
import API from '../../../utils/API';
import Dialog from '../../../utils/Dialog.js';

import './CadastroProduto.css';

const CadastroProduto = () => {

  const user = useOutletContext()

  const [fornecedores, setFornecedores] = useState([])
  const tblGradeRef = useRef()
  const selectCorRef = useRef()
  const selectTamanhoRef = useRef()
  const quantidadeRef = useRef()

  let cores = [];
  let tamanhos = [];
  
  (() => {
    const appValues = localStorage.getItem('appvalues')
    if (appValues) {
      const values = JSON.parse(appValues)
      cores = values['cores']
      tamanhos = values['tamanhos']
    }
  })() 

  const _produto = {
    modelo: '',
    tipo: '',
    sku: '',
    fornecedorId: '',
    codigoBarra: '',
    precoCompra: '',
    precoVenda: '',
    info: '',
    grades: []
  }

  const produtoPreenchido = () => {
    return produto.modelo !== ''
      && produto.tipo !== ''
      && produto.sku !== ''
      && produto.fornecedorId !== ''
      && produto.codigoBarra !== ''
      && produto.precoCompra !== ''
      && produto.precoVenda !== ''   
  }

  const _grade = { cor: '', corValue: '', tamanho: '', tamanhoValue: '', quantidade: 0, fornecedorId: '' }
  
  const [produto, setProduto] = useState(_produto)
  const [grade, setGrade] = useState(_grade)

  const handleProduto = ev => {
    const { name, value } = ev.target
    setProduto(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleGrade = ev => {
    const { name, value } = ev.target
    const vetor = name === 'cor' ? cores : tamanhos
    const valor = vetor.find(v => v.id?.toString() === value)
    setGrade(prev => ({
      ...prev,
      [name]: value,
      [name + 'Value']: valor[name],
    }))
  }

  const handleQuantidade = qtd => {
    const quant = grade.quantidade + qtd
    setGrade(prev => ({
      ...prev,
      quantidade: quant
    }))
  } 

  const addGrade = () => { 

    if (grade.cor === '' || grade.tamanho === '' || grade.quantidade < 1) {
      Dialog.show('alert', 'Favor informar todos os campos!')
      return
    }    
    if (produto.grades.some(g => g.cor === grade.cor && g.tamanho === grade.tamanho)) {
      Dialog.show('alert', 'Produto já adicionado a grade')
      return
    } 
    if (grade.quantidade < 1) {
      Dialog.show('alert', 'Favor informar a quantidade!')
      return
    }

    const grd = { cor: grade.cor, tamanho: grade.tamanho, quantidade: grade.quantidade, fornecedorId: produto.fornecedorId }
    produto.grades.push(grd)
    const row = tblGradeRef.current.insertRow(-1)
    row.style.heigth = '45px'
    row.insertCell(0).innerHTML = grade.tamanhoValue
    row.insertCell(1).innerHTML = grade.corValue
    row.insertCell(2).innerHTML = grade.quantidade 
    row.insertCell(3).innerHTML = "<box-icon name='trash' color='#716464' class='icon' ></box-icon>"
    tblGradeRef.current.parentElement.style.display ='table'    
    selectCorRef.current.selectedIndex = 0
    selectTamanhoRef.current.selectedIndex = 0
    quantidadeRef.current.innerHTML = 0
    setGrade(_grade)
  }

  useEffect(() => {
    loadFornecedores()
  }, [])

  const checaPreco = (ev) => {
    const p = ev.target
    if(p.value !== '' && parseFloat(p.value) < parseFloat(produto.precoCompra)){
      Dialog.show('alert', 'Preço de venda não pode ser menor do que o preço de compra')
    }
  }
  
  const loadFornecedores = async () => {
    await API.fetchRequest('GET', '/fornecedor/all', null, user.token )
      .then(data => {
        if (data.errors) {
          Dialog.show('error', data.errors)
          console.log(data.stack)
        }
        setFornecedores(data)
      })
      .catch(error => {
        console.error(error)
        Dialog.show('error', 'Deu erro no CadastroProduto:loadFornecedores')
      })
  }  

  const handleSubmit = async () => {
    setShowLoader(true)
    try {      
      return await API.fetchRequest('POST', '/produto/create', produto, user.token )
      .then(data => {
        if (data.errors) {
          Dialog.show('error', data.errors)
          console.log(data.stack)
          setShowLoader(false)
          return
        }
        setShowLoader(false)
        Dialog.show('success', 'Produto cadastrado com sucesso!"')
      })      
    } catch (error) {
      Dialog.show('error')
    }
    clearForm()
    setShowLoader(false)  
  }

  return (
    <>
      <Form>
      <div className='admin_board' style={{width: "100%", marginLeft: 0}}>       
        <h6 className='text_divider'> <BiCloset size={30} />Produto</h6>
        <Row className="mb-3">
          <Col xs={6}>
            <Form.Label>Modelo</Form.Label>
            <Form.Control name='modelo' value={produto.modelo} onChange={ev => handleProduto(ev)} />
          </Col>
          <Col xs={2}>
            <Form.Label>Tipo</Form.Label>
            <Form.Control name='tipo' value={produto.tipo} onChange={ev => handleProduto(ev)} />
          </Col>
          <Col xs={3}>
            <Form.Label>Fornecedor</Form.Label>
            {/* TODO - FAZER ESTE DROPODOWN IGUAL O DA SELECÃO DE CANAL E FORMA PGTO DA VENDA */}
            <Form.Select name="fornecedorId" size="sm" value={produto.fornecedorId} onChange={ev => handleProduto(ev)}>
              <option>Escolha...</option>
            {fornecedores?.map(f => <option key={f.id} value={f.id}> {f.nome} </option>)}
            </Form.Select>
            
          </Col>
        </Row>
        <Row className="mb-3">
          <Col xs={2}>
            <Form.Label>SKU</Form.Label>
            <Form.Control name='sku' value={produto.sku} onChange={ev => handleProduto(ev)} />
          </Col>
          <Col xs={2}>
            <Form.Label>Código de Barra</Form.Label>
            <Form.Control name='codigoBarra' value={produto.codigoBarra} onChange={ev => handleProduto(ev)} />
          </Col>
          <Col xs={2}>
            <Form.Label>Preço Compra</Form.Label>
            <Form.Control name='precoCompra' value={produto.precoCompra} onChange={ev => handleProduto(ev)}  />
          </Col>
          <Col xs={2}>
            <Form.Label>Preço Venda</Form.Label>
            <Form.Control name='precoVenda' value={produto.precoVenda} onBlur={ev => checaPreco(ev)} onChange={ev => handleProduto(ev)} />
          </Col>
        </Row>

        <Row className="mb-3">
          <Col xs={8}>
            <Form.Label>Detalhes</Form.Label>
            <Form.Control name='info' as="textarea" rows={2} value={produto.info} onChange={ev => handleProduto(ev)} />
          </Col>
        </Row>
        </div>

        {produtoPreenchido() &&
          <div>         
          <div className='admin_board' style={{width: "100%", marginLeft: 0}}>       
              <h6 className='text_divider'> <TbStack3 size={30} />Grade</h6>
              <Col xs={5}>
            <Table className="table table-striped text-center mt-3" >        
              <thead>
                <tr key={grade.id}>
                  <th>
                    <Form.Label>Tamanho</Form.Label>
                    <Form.Select name="tamanho" size="sm" value={grade.tamanho} onChange={ev => handleGrade(ev)}
                    ref={selectTamanhoRef}>
                    <option>Escolha...</option>
                    {tamanhos?.map(t => <option key={t.id} value={t.id}> {t.tamanho?.toUpperCase()} </option>)}
                    </Form.Select>
                  </th>
                  <th>
                    <Form.Label>Cor</Form.Label>
                    <Form.Select name="cor" size="sm" value={grade.cor} onChange={ev => handleGrade(ev)} ref={selectCorRef}>
                      <option>Escolha...</option>
                      {cores?.map(c => <option key={c.id} value={c.id}> {c.cor?.toUpperCase()} </option>)}
                    </Form.Select>
                  </th>
                  <th>
                  <Form.Label>Quantidade</Form.Label>
                  <br />
                  <Button className="rounded-0 rounded-start" size="sm" style={{marginRight: 0}}title="-1" disabled={grade.quantidade < 1}
                    onClick={() => handleQuantidade(-1)}>
                    <FaMinus />
                    </Button>
                    <Button name="quantidade" variant="outline-secondary" className="rounded-0" size="sm" ref={quantidadeRef}>
                      {grade.quantidade}
                    </Button>
                    <Button className="rounded-0 rounded-end" size="sm" title="+1" onClick={() => handleQuantidade(1)}>
                          <FaPlus />
                    </Button>
                  </th>
                  <th>
                    <Form.Label>Montar</Form.Label>
                    <div>
                      <Button className="btn-primary" size="sm" onClick={addGrade} title='Adicionar a grade' 
                      disabled={grade.cor === '' || grade.tamanho === '' || grade.quantidade < 1}>
                      <BsStackOverflow size={22} />
                      </Button>
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody ref={tblGradeRef}>
              </tbody>
              </Table>
            </Col>
          </div>
        </div>}
        <Button variant="primary" onClick={handleSubmit}> Cadastrar </Button>      
      </Form>
    </>
  )
}

export default CadastroProduto