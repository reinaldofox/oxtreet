import React, { useState, useEffect, useRef } from 'react' 
import Fetcher from '../../utils/Fetcher'
import Form  from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import Messages from '../../utils/Messages.js'
import './styles.css'

const Fornecedor = (props) => {  

  const [nome, setNome] = useState('')
  const [cnpj, setCnpj] = useState('')
  const [email, setEmail] = useState('')
  const [telefone, setTelefone] = useState('')
  const [celular, setCelular] = useState('')
  const [info, setInfo] = useState('')

  const [fornecedores, setFornecedores] = useState([])
  const formRef = useRef()

  const getSuppliers = async () => {
    return await Fetcher.request('/fornecedor/', 'GET')
    .then(data => data)
    .catch(error => { throw error })
  } 

  useEffect(() => {
    try {
      getSuppliers()
      .then(data => {
        setFornecedores(data)
        const fornecedores = data?.map(d => {return { 'id': d.id, 'nome': d.nome }})
        localStorage.setItem('fornecedores', JSON.stringify(fornecedores))  
      })
    } catch (error) {
      Messages.show('error')
    }
  }, [])

  const insert = async (supplier) => {
    return await Fetcher.request('/fornecedor/create', 'POST', supplier)
    .then(data => data)
    .catch(error =>  { throw error })
  }

  const handleSubmit = async () => {  
    Messages.show('success')
    // try {
    //   const f = await insert({ nome, cnpj, email, telefone, celular, info })
    //   console.log(f)
    //   getSuppliers().then(data => setFornecedores(data))
    //   formRef.current.reset()
    //   Messages.show('success')      
    // } catch (error) {
    //   console.error(error)
    //   Messages.show('error')      
    // }
  }

  return(
    <>
    <Form id='formFornecedor' ref={formRef} method='post'>
      <Row className="mb-3">
        <Col xs={6}> 
          <Form.Label>Nome</Form.Label> 
          <Form.Control id='nome' value={nome} onChange={ev => setNome(ev.target.value)}/>
        </Col>        
        <Col xs={3}> 
          <Form.Label>CNPJ</Form.Label> 
          <Form.Control id='cnpj' value={cnpj} onChange={ev => setCnpj(ev.target.value)} />
        </Col>        
      </Row>

      <Row className="mb-3"> 
        <Col xs={3}> 
          <Form.Label>E-mail</Form.Label> 
          <Form.Control id='email' value={email} onChange={ev => setEmail(ev.target.value)} />
        </Col>
        <Col xs={3}>
          <Form.Label>Telefone</Form.Label> 
          <Form.Control id='telefone' value={telefone} onChange={ev => setTelefone(ev.target.value)} />
        </Col>      
        <Col xs={3}>
          <Form.Label>Celular</Form.Label> 
          <Form.Control id='celular' value={celular} onChange={ev => setCelular(ev.target.value)} />
        </Col>        
      </Row>

      <Row className="mb-3">        
        <Col xs={9}>
          <Form.Label>Info</Form.Label> 
          <Form.Control as="textarea" rows={2} id='info' value={info} onChange={ev => setInfo(ev.target.value)} />
        </Col>
      </Row>    
      <Button variant="primary" onClick={handleSubmit}> Cadastrar </Button> 
    </Form>

    <hr />
    { fornecedores?.map(f => <li key={f.id}>{ f.nome }</li>) }
    </>
  )
}

export default Fornecedor
