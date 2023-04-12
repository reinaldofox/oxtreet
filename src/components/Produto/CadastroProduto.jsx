import React, { useState, useEffect } from 'react'
import Fetcher from '../../utils/Fetcher'
import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import Messages from '../../utils/Messages.js'
import './styles.css'

const CadastroProduto = (props) => {

  const [modelo, setModelo] = useState('')
  const [tipo, setTipo] = useState('')
  const [sku, setSku] = useState('')
  const [codigoBarra, setCodigoBarra] = useState('')
  const [precoCompra, setPrecoCompra] = useState('')
  const [precoVenda, setPrecoVenda] = useState('')
  const [info, setInfo] = useState('')
  const [tamanho, setTamanho] = useState('')
  const [cor, setCor] = useState('')
  // const [produtos, setProdutos] = useState([])

  const [fornecedores, setFornecedores] = useState([])
  const [fornecedorId, setFornecedorId] = useState('')

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
  
  useEffect(() => {
    loadFornecedores()
  }, [])

  const loadFornecedores = async () => {
    await Fetcher.request('/fornecedor/search', 'GET', null, '/?cols=id,nome')
      .then(data => setFornecedores(data))
      .catch(error => {
        console.error(error)
        Messages.show('error')
      })
  }

  const insert = async (produto) => {
    return await Fetcher.request('/produto/create', 'POST', produto)
      .catch(error => { throw error })
  }

  const handleSubmit = async () => {
    try {
      const prod = { fornecedorId, modelo, tipo, sku, codigoBarra, precoCompra, precoVenda, info }
      await insert(prod).then(data => console.log('Data', data))
      // getProdutos().then(data => setProdutos(data))
      clearForm()
      Messages.show('success')
    } catch (error) {
      console.error(error)
      Messages.show('error')
    }
  }

  const clearForm = () => {
    setModelo('')
    setTipo('')
    setSku('')
    setCodigoBarra('')
    setPrecoCompra('')
    setPrecoVenda('')
    setInfo('')
  }

  return (
    <>
      <Form>

        <Row className="mb-3">
          <Col xs={6}>
            <Form.Label>Modelo</Form.Label>
            <Form.Control id='modelo' value={modelo} onChange={ev => setModelo(ev.target.value)} />
          </Col>
          <Col xs={2}>
            <Form.Label>Tipo</Form.Label>
            <Form.Control id='tipo' value={tipo} onChange={ev => setTipo(ev.target.value)} />
          </Col>
          <Col xs={3}>
            <Form.Label>Fabricante</Form.Label>
            <Form.Select id='fornecedorid' value={fornecedorId} onChange={ev => setFornecedorId(ev.target.value)}>
              <option>Escolha...</option>
              {fornecedores?.map(f => <option key={f.id} value={f.id}> {f.nome} </option>)}
            </Form.Select>
          </Col>
        </Row>

        <Row className="mb-3">
          <Col xs={2}>
            <Form.Label>Cor</Form.Label>
            <Form.Select value={cor.id} onChange={ev => setCor(ev.target.value)}>
              <option>Escolha...</option>
              {cores?.map(c => <option key={c.id} value={c.id}> {c.cor.toUpperCase()} </option>)}
            </Form.Select>
          </Col>
          <Col xs={1}>
            <Form.Label>Tamanho</Form.Label>
            <Form.Select value={tamanho} onChange={ev => setTamanho(ev.target.value)}>
              <option>Escolha...</option>
              {tamanhos?.map(t => <option key={t.id} value={t.id}> {t.tamanho?.toUpperCase()} </option>)}
            </Form.Select>
          </Col>
          <Col xs={2}>
            <Form.Label>SKU</Form.Label>
            <Form.Control value={sku} onChange={ev => setSku(ev.target.value)} />
          </Col>
          <Col xs={2}>
            <Form.Label>Código de Barra</Form.Label>
            <Form.Control value={codigoBarra} onChange={ev => setCodigoBarra(ev.target.value)} />
          </Col>
          <Col xs={2}>
            <Form.Label>Preço Compra</Form.Label>
            <Form.Control value={precoCompra} onChange={ev => setPrecoCompra(ev.target.value)} />
          </Col>
          <Col xs={2}>
            <Form.Label>Preço Venda</Form.Label>
            <Form.Control value={precoVenda} onChange={ev => setPrecoVenda(ev.target.value)} />
          </Col>
        </Row>

        <Row className="mb-3">
          <Col xs={9}>
            <Form.Label>Info</Form.Label>
            <Form.Control as="textarea" rows={2} value={info} onChange={ev => setInfo(ev.target.value)} />
          </Col>
        </Row>
        <Button variant="primary" onClick={handleSubmit}> Cadastrar </Button>

      </Form>
    </>
  )
}

export default CadastroProduto
