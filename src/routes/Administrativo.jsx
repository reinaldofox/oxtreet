import React, { useEffect, useState } from 'react'
import Fetcher from '../utils/Fetcher.js'
import {Form, InputGroup, Button} from 'react-bootstrap'
import './Administrativo.css'
import { API_URL } from '../components/Messages.module'
import { HiOutlineColorSwatch } from 'react-icons/hi'
import { RiRulerLine } from 'react-icons/ri'
import Messages from '../utils/Messages.js'

const Administrativo = () => {

  const [cores, setCores] = useState('')
  const [coresBD, setCoresBD] = useState([])
  
  const [tamanhos, setTamanhos] = useState('')
  const [tamanhosBD, setTamanhosBD] = useState([])

  const handleCores = async (ev) => {
    ev.preventDefault()
    if(cores !== '') {
      const colors = cores.includes(',') ? cores?.split(',').map(c => ({cor: c.trim()})) : [{cor: cores.trim()}]
      console.log(colors);
      await fetch(API_URL+'/admin/cor/create', {
        method: 'POST',
        mode: 'cors',
        body: JSON.stringify(colors),
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
      })
      .then(async response => response.json())
      .then(data => {
        setCoresBD(data)
        Messages.show('success')
      })
      .catch(error => console.log('TRATAR ESSE ERRO', error))
    }
  }

  const handleTamanhos = async (ev) => {
    ev.preventDefault()
    if(tamanhos !== ''){
      const sizes = tamanhos.includes(',') ? tamanhos?.split(',').map(t => t.trim()) : [{tamanho: tamanhos.trim()}]
      await fetch(API_URL+'/admin/tamanho/create', {
        method: 'POST',
        mode: 'cors',
        body: JSON.stringify(sizes),
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
      })
      .then(async response => response.json())
      .then(data => console.log(data))
      .catch(error => console.log('TRATAR ESSE ERRO', error))
    }    
  }

  const getCores = async () => {
    try {
      await Fetcher.request('/admin/cor', "GET")
      .then(data => setCoresBD(data))
      .catch(error => console.log('erro----------', error))
    } catch (error) {
      alert("deu pau a linha 71", error)
    }
  }

  const getTamanhos = async () => {
    await fetch(API_URL+'/admin/tamanho')
    .then(async response => response.json())
    .then(async data => setTamanhosBD(data))
    .catch(error => console.log('TRATAR ESSE ERRO', error))
  }

  useEffect(() => {
    getCores()
    getTamanhos()
  }, [])

  return (
    <>
    {/* 
      <a href="/faturamento">Faturamento</a>
      <a href="/gastos">Gastos</a>
      <a href="/grades">Grades</a>
      <a href="/fornecedores">Fornecedores</a>
      Dados da moto, como consumo, preço gasolina e distancia
      para calcular o frete 
      <a href="/moto">Moto</a>
    */}

    <div className='admin_content'>

      <div className='admin_board'>
        <Form onSubmit={handleCores}>
          <h6 className='text_divider'> <HiOutlineColorSwatch size={30}/>Cores</h6>
          <InputGroup> 
            <Form.Control value={cores} onChange={ev => setCores(ev.target.value)} />
            <Button variant="secondary" type='submit'>OK</Button>
          </InputGroup>
          <Form.Text>
            Informe uma cor ou várias separadas por vírgula.
          </Form.Text>
        </Form>
        <div style={{margin: '20px 0'}}>
          <div className='oxlegend'>Cores cadastradas</div>
          <div className='oxfieldset'>
            {coresBD?.map(c => <div key={c.id} style={{display: 'inline'}}><div className='oxbadge'>{c.cor.toUpperCase()} </div> <div className='oxbagdeclose' title='Excluir'> X </div></div>)}
          </div>
        </div>
      </div>

      <div className='admin_board'>
        <Form onSubmit={handleTamanhos}>
          <h6 className='text_divider'> <RiRulerLine size={30}/>Tamanhos</h6>          
          <InputGroup>
            <Form.Control value={tamanhos} onChange={ev => setTamanhos(ev.target.value)} />
            <Button variant="secondary" type='submit'>OK</Button>
          </InputGroup>
          <Form.Text>
            Informe um tamanho ou vários separados por vírgula.
          </Form.Text>
        </Form>
        <div style={{margin: '20px 0'}}>        
          <div className='oxlegend'>Tamanhos cadastrados</div>
          <div className='oxfieldset'>
            {tamanhosBD?.map(t => <div key={t.id} style={{display: 'inline'}}><div className='oxbadge'>{t.tamanho.toUpperCase()}</div> <div className='oxbagdeclose' title='Excluir'> X </div></div>)}
          </div>
        </div>
      </div>
        
    </div>
    </>

  )
}

export default Administrativo