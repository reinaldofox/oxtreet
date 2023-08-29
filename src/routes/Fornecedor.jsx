import React, { useReducer } from "react";
import { Button, Tab, Tabs } from "react-bootstrap";
import { PessoaContext, pessoaReducer, _pessoa } from '../contexts/PessoaContext'
import { useOutletContext } from "react-router-dom";
import CadastroEndereco from "../components/forms/Endereco/CadastroEndereco";
import CadastroFornecedor from "../components/forms/Pessoa/CadastroPessoa";
import TabelaFornecedores from "../components/tables/TabelaFornecedores";
import API from "../utils/API.js";
import Dialog from "../utils/Dialog";
import { TfiMapAlt } from 'react-icons/tfi'
import { AiOutlineUserAdd } from 'react-icons/ai'
import { MdTrolley } from 'react-icons/md'

const Fornecedor = () => {
  const user = useOutletContext();
  const [pessoa, dispatch] = useReducer(pessoaReducer, _pessoa);

  const registerfornecedor = async () => {
        await API.fetchRequest("POST", "/fornecedor/create", pessoa, user.token)
          .then(data => {
            // debugger
          if (data.errors) {
            Dialog.show('error', data.errors)
            console.log(data.stack)
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
    >
      <Tab eventKey={1} title="Fornecedores">
        <hr className="hr" />
        <div className='admin_board'style={{width: "100%", marginLeft: 0}}>
          <h6 className='text_divider'> <MdTrolley size={30} />Fornecedores</h6>
          <TabelaFornecedores />
        </div>
      </Tab>
      <Tab eventKey={2} title="Cadastrar">
        <hr className="hr" />
        <PessoaContext.Provider value={{ pessoa, dispatch }}>
        <div className='admin_board'style={{width: "100%", marginLeft: 0}}>
          <h6 className='text_divider'> <AiOutlineUserAdd size={30} />Fornecedor</h6>
            <CadastroFornecedor tipo={'fornecedor'} />
        </div>
        <div className='admin_board' style={{width: "100%", marginLeft: 0}}>
          <h6 className='text_divider'> <TfiMapAlt size={30} />Endereço</h6>
          <CadastroEndereco />
        </div>
        <Button variant="primary" onClick={registerfornecedor}>
          Cadastrar
        </Button>
        </PessoaContext.Provider>
      </Tab>
      <Tab eventKey={3} title="Pesquisar">
        <hr className="hr" />
        Aqui será o formulário de pesquisa
      </Tab>
    </Tabs>
  );
};

export default Fornecedor;
