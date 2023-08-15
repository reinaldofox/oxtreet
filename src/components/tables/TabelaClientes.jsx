import React, { useEffect, useState } from 'react';
import { Table } from 'react-bootstrap';
import { useOutletContext } from 'react-router-dom';
import API from '../../utils/API';
import Dialog from '../../utils/Dialog';

const TabelaClientes = () => {

  const user = useOutletContext() || {}

  const [clientes, setClientes] = useState({})

  useEffect(() => {
    API.fetchRequest('GET', '/cliente/all', null, user.token)
      .then(data => setClientes(data))      
      .catch(error => Dialog.show('error', 'Ocorreu um erro ao buscar os clientes!'))
  }, [])

  return (
    <>
    <Table className="table table-striped">
      <thead>
        <tr>
          <th>Cliente</th>
          <th>Celular</th>
          <th>Telefone</th>
          <th>Endereco</th>                    
        </tr>
      </thead>
      <tbody>
        {clientes.length > 0 && clientes.map((cli, index) => (
          <tr key={index} style={{ height: '40px' }}>
            <td>{cli.nome}</td>            
            <td>{cli.celular}</td>
            <td>{cli.telefone}</td>
            <td>
              {cli.endereco?.rua}, {cli.endereco?.numero}, {cli.endereco?.bairro} - {cli.endereco?.cidade} / {cli.endereco?.uf}
            </td>
          </tr>
        ))}
      </tbody>
    </Table>    
    </>
  )
}

export default TabelaClientes