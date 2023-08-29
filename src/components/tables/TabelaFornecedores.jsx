import React, { useEffect, useState } from 'react';
import { Table } from 'react-bootstrap';
import { useOutletContext } from 'react-router-dom';
import Loader from '../../components/ui/Loader/Loader';

import API from '../../utils/API';
import Dialog from '../../utils/Dialog';

const TabelaFornecedores = () => {

  const user = useOutletContext() || {}
  const [fornecedores, setFornecedores] = useState({})
  const [showLoader, setShowLoader] = useState(true)

  useEffect(() => {
    API.fetchRequest('GET', '/fornecedor/all', null, user.token)
      .then(data => {
        if(data.errors) {
          Dialog.show('error', data.errors)
          console.log(data.stack)
          return
        }
        setFornecedores(data)
        setShowLoader(false)
      })      
      .catch(error => {
        Dialog.show('error', 'Ocorreu um erro ao buscar os fornecedores!')
        console.log(error)
      })
  }, [])

  return (
    <>
    {<Loader show={showLoader} message={"buscando fornecedores..."} />}
    <Table className="table table-striped">
      <thead>
        <tr>
          <th>Fornecedor</th>
          <th>email</th>
          <th>Telefone</th>
          <th>celular</th>                    
        </tr>
      </thead>
      <tbody>
        {fornecedores.length > 0 && fornecedores.map((f, index) => (
          <tr key={index} style={{ height: '40px' }}>
            <td>{f.nome}</td>  
            <td>{f.email}</td>            
            <td>{f.celular}</td>
            <td>{f.telefone}</td>
            
          </tr>
        ))}
      </tbody>
    </Table>    
    </>
  )
}

export default TabelaFornecedores