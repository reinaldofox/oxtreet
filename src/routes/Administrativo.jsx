import React, { useEffect, useState } from 'react'
import { Button, Dropdown, Form, InputGroup, Table, Tab, Tabs  } from 'react-bootstrap'
import { BsCalculator } from 'react-icons/bs'
import { HiOutlineArrowRight, HiOutlineColorSwatch } from 'react-icons/hi'
import { LiaCashRegisterSolid } from 'react-icons/lia'
import { RiRulerLine } from 'react-icons/ri'
import { useOutletContext } from "react-router-dom"
import Loader from '../components/ui/Loader/Loader'
import API from '../utils/API.js'
import Dialog from '../utils/Dialog.js'
import './Administrativo.css'

const Administrativo = () => {

  const emptyDespesa = { tipo: "", motivo: "", valor: "", data: "", info: "" }  

  const user = useOutletContext()

  const [showLoader, setShowLoader] = useState(false)

  const [cores, setCores] = useState('')
  const [coresBD, setCoresBD] = useState([])
  
  const [tamanhos, setTamanhos] = useState('')
  const [tamanhosBD, setTamanhosBD] = useState([])
  const [despesa, setDespesa] = useState(emptyDespesa)
  const [listaDespesa, setListDespesa] = useState([])

  const handleCores = async () => {
    if(cores !== '') {
      const colors = cores.includes(',') ? cores?.split(',').map(c => ({cor: c.trim()})) : [{cor: cores.trim()}]
      await API.fetchRequest('POST', '/admin/cor/', colors, user.token)
        .then(data => {
          if (data.errors) {
            Dialog.show('error', data.errors)
            console.log(data.stack)
            return
          }
          setCoresBD(data)
        })
      .catch(error => console.log('TRATAR ESSE ERRO', error))  
    }
  }
  
  const getCores = async () => {
    try {
      await API.fetchRequest("GET", '/admin/cor', null, user.token)
        .then(data => {
          if (data.errors) {
            Dialog.show('error', data.errors)
            console.log(data.stack)
            return
          }
        setCoresBD(data)
      })
      .catch(error => console.log('erro', error))
    } catch (error) {
      alert("deu pau a linha 71", error)
    }
  }

  const handleTamanhos = async (ev) => {
    ev.preventDefault()
    if(tamanhos !== ''){
      const sizes = tamanhos.includes(',') ? tamanhos?.split(',').map(t => t.trim()) : [{ tamanho: tamanhos.trim() }]
      await API.fetchRequest('POST', '/admin/tamanho/', sizes, user.token)
      .then(data => {
        if (data.errors) {
          Dialog.show('error', data.errors)
          console.log(data.stack)
          return
        }
        setCoresBD(data)
      })
      .catch(error => console.log('erro', error))
    }    
  }

  const getTamanhos = async () => {
    await API.fetchRequest('GET', '/admin/tamanho', null, user.token)
      .then(data => {
        if (data.errors) {
          Dialog.show('error', data.errors)
          console.log(data.stack)
          return
        }
        setTamanhosBD(data)
      })
    .catch(error => console.log('erro', error))
  }

  const isValidDespesa = () => {
    return despesa.tipo != "" && despesa.motivo != "" && despesa.valor != "" && despesa.data != ""
  }

  const handleLancarDespesa = async () => {
    if (!isValidDespesa()) {
      Dialog.show('alert', 'Favor informar todos os campos!')
      return
    }
    
    setShowLoader(true)
    await API.fetchRequest('POST', '/admin/despesa', despesa, user.token)
      .then(data => {
        setShowLoader(false)
        if (data.error) {
          Dialog.show('error', data.error)
          console.log(data.stack)
          return
        }
        setDespesa(emptyDespesa)
        getListaDespesa()
        Dialog.show('success', 'Despesa lançada com sucesso!')
      })
    .catch(error => console.log('TRATAR ESSE ERRO', error))
  }

  const getListaDespesa = async () => {
    await API.fetchRequest('GET', '/admin/despesa', null, user.token)
    .then(data => {
      if (data.errors) {
        Dialog.show('error', data.errors)
        console.log(data.stack)
        return
      }
      setListDespesa(data)
    })
    .catch(error => Dialog.show('error', 'Ocorreu um erro ao buscar as despesas!'))
  }

  useEffect(() => {
    getCores()
    getTamanhos()
    getListaDespesa()
  }, [])

  const handselect = evkey => {
    if (evkey == "grade") console.log("entrou na aba grade");
    // getTamanhos()
  };

  return (
    <>      
      <Tabs defaultActiveKey={"financas"} variant="pills"className="mb-3" onSelect={(evkey) => handselect(evkey)}>     
        <Tab eventKey="financas" title="Finanças">
        <hr className="hr"/>
        <div className='admin_content'>
          <div className='admin_board'>       
            <h6 className='text_divider'> <BsCalculator size={30} />Despesas</h6>
            <div style={{display: "flex", alignContent: "flex-end", justifyContent: "space-evenly"}}>
              <Dropdown>            
              <Dropdown.Toggle className="primary">
                {despesa.motivo || 'Despesa'}
              </Dropdown.Toggle >
                <Dropdown.Menu>
                  <Dropdown.Header>Administrativa</Dropdown.Header>
                  <Dropdown.Item as="button" value="Internet"
                  onClick={ev => setDespesa({ ...despesa, tipo: "Administrativa", motivo: ev.target.value })}>
                    Internet
                  </Dropdown.Item>
                  <Dropdown.Item as="button" value="Telefone"
                  onClick={ev => setDespesa({ ...despesa, tipo: "Administrativa", motivo: ev.target.value })}>
                    Telefone
                  </Dropdown.Item>
                  <Dropdown.Item as="button" value="Insumos"
                  onClick={ev => setDespesa({ ...despesa, tipo: "Administrativa", motivo: ev.target.value })}>
                    Insumos
                  </Dropdown.Item>                    
                  <Dropdown.Item as="button" value="Outros"
                  onClick={ev => setDespesa({ ...despesa, tipo: "Administrativa", motivo: ev.target.value })}>
                    Outros
                  </Dropdown.Item>
                  
                  <Dropdown.Header>Financeira</Dropdown.Header>
                  <Dropdown.Item as="button" value="INSS"
                  onClick={ev => setDespesa({ ...despesa, tipo: "Financeira", motivo: ev.target.value })}>
                    INSS
                  </Dropdown.Item>                    
                  <Dropdown.Item as="button" value="Taxas"
                  onClick={ev => setDespesa({ ...despesa, tipo: "Financeira", motivo: ev.target.value })}>
                    Taxas
                  </Dropdown.Item>
                  <Dropdown.Item as="button" value="Encargos"
                  onClick={ev => setDespesa({ ...despesa, tipo: "Financeira", motivo: ev.target.value })}>
                    Encargos
                  </Dropdown.Item>
                  <Dropdown.Item as="button" value="Juros"
                  onClick={ev => setDespesa({ ...despesa, tipo: "Financeira", motivo: ev.target.value })}>
                    Juros
                  </Dropdown.Item>          
                </Dropdown.Menu>            
              </Dropdown>

              <Form.Group  controlId="formLancarDespesa">
                <Form.Control required type="text" placeholder='Valor' value={despesa.valor}
                    onChange={ev => setDespesa({ ...despesa, valor: ev.target.value })} />             
              </Form.Group>

                <input type="date" className="form-control w-25" value={despesa.data}
                  onChange={ev => setDespesa({ ...despesa, data: ev.target.value })} />
                <HiOutlineArrowRight size={30} color='#6d6464'/>
                <Button disabled={!isValidDespesa()} onClick={handleLancarDespesa}>Lançar</Button>
            </div>         
            <Table className="table table-striped">
              <thead>
                <tr>
                  <th>Tipo</th>
                  <th>Motivo</th>
                  <th>Valor</th>
                  <th>Data</th>          
                </tr>
              </thead>
              <tbody>
                {listaDespesa.map((ld, index) => (
                  <tr key={index} style={{ height: '40px' }}>
                    <td>{ld.tipo}</td>
                    <td>{ld.motivo}</td>
                    <td>{Dialog.brl(ld.valor)}</td>
                    <td>{new Date(ld.data).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </Table> 
          </div>
          <div className='admin_board'>       
            <h6 className='text_divider'> <LiaCashRegisterSolid size={30} />Financeiro</h6>
          </div> 
        </div>
        </Tab>
        <Tab eventKey="funcionarios" title="Funcionários">
        <hr className="hr"/>
        </Tab>
        <Tab eventKey="grade" title="Grades">
          <hr className="hr"/>
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
                    {coresBD?.map(c => (
                      <div key={c.id} style={{ display: 'inline', borderRadius: '4px'}}>
                        <div className='oxbadge'>{c.cor.toUpperCase()} </div>
                        <div className='oxbagdeclose' title='Excluir'> X </div>
                      </div>
                    ))}
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
                    {tamanhosBD?.map(t => (
                      <div key={t.id} style={{ display: 'inline' }}>
                        <div className='oxbadge'>{t.tamanho.toUpperCase()}</div>
                        <div className='oxbagdeclose' title='Excluir'> X </div>
                      </div>
                    ))}
                </div>
              </div>
            </div>
              
          </div>          
        </Tab>
      </Tabs> 
    </>

  )
}

export default Administrativo