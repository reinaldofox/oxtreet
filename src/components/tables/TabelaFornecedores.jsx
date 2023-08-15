import React, { useEffect, useState } from 'react';
import { Table } from 'react-bootstrap';
import { useOutletContext } from 'react-router-dom';
import API from '../../utils/API';
import Dialog from '../../utils/Dialog';

const TabelaFornecedores = () => {

  const user = useOutletContext() || {}

  const [fornecedores, setFornecedores] = useState({})

  useEffect(() => {
    API.fetchRequest('GET', '/fornecedor/all', null, user.token)
      .then(data => setFornecedores(data))      
      .catch(error => {
        Dialog.show('error', 'Ocorreu um erro ao buscar os fornecedores!')
        console.log(error)
      })
  }, [])

  return (
    <>
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