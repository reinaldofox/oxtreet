import React, { useReducer } from "react";
import { PessoaContext, pessoaReducer, _pessoa } from '../contexts/PessoaContext'
import { Button, Tab, Tabs } from "react-bootstrap";
import { useOutletContext } from "react-router-dom";
import CadastroEndereco from "../components/forms/Endereco/CadastroEndereco";
import CadastroCliente from "../components/forms/Pessoa/CadastroPessoa";
import TabelaClientes from "../components/tables/TabelaClientes";
import API from "../utils/API.js";
import Dialog from "../utils/Dialog";
import { TfiMapAlt } from 'react-icons/tfi'
import { AiOutlineUserAdd } from 'react-icons/ai'
import { TbUsersGroup } from 'react-icons/tb'

const Cliente = () => {
  const user = useOutletContext();
  _pessoa.tipo = "Cliente"
  const [pessoa, dispatch] = useReducer(pessoaReducer, _pessoa);

  const handselect = (evkey) => {
    if (evkey == 3) console.log("entrou na aba de pesquisa");
  };

  const registerCliente = async () => {
    await API.fetchRequest("POST", "/cliente/create", pessoa, user.token)
      .then((data) => {
        debugger
        if (data.errors) {
          Dialog.show('error', data.errors)
          return
        }
        Dialog.show("success", "Cadastro efetuado com sucesso!");
        dispatch({ type: "reset"})
      })
      .catch((error) => {
        Dialog.show("error", "Ocorreu um erro inesperado!");
        console.error(error);
      });
  };

  return (
    <Tabs
      defaultActiveKey={1}
      variant="pills"
      className="mb-3"
      onSelect={(evkey) => handselect(evkey)}
    >
      <Tab eventKey={1} title="Clientes">
        <div className='admin_board'style={{width: "100%", marginLeft: 0}}>
          <h6 className='text_divider'> <TbUsersGroup size={30} />Clientes</h6>
          <TabelaClientes />
        </div>
      </Tab>
      <Tab eventKey={2} title="Cadastrar">
        <PessoaContext.Provider value={{ pessoa, dispatch }}>
        <div className='admin_board'style={{width: "100%", marginLeft: 0}}>
          <h6 className='text_divider'> <AiOutlineUserAdd size={30} />Cliente</h6>
            <CadastroCliente tipo={'pessoa'} />
        </div>
        <div className='admin_board' style={{width: "100%", marginLeft: 0}}>
          <h6 className='text_divider'> <TfiMapAlt size={30} />Endereço</h6>
          <CadastroEndereco />
        </div>
        <Button variant="primary" onClick={registerCliente}>
          Cadastrar
        </Button>
        </PessoaContext.Provider>
      </Tab>
      <Tab eventKey={3} title="Pesquisar">
        Aqui será o formulário de pesquisa
      </Tab>
    </Tabs>
  );
};

export default Cliente;
