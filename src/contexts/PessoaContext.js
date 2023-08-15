import React from 'react'

export const _endereco = {
  rua: "", numero: "", complemento: "", bairro: "", cep: "", cidade: "", uf: "", info: "",
};

export const _pessoa = {
  nome: "", cpfCnpj: "", email: "", telefone: "", celular: "", tipo: "", origem: "", info: "", endereco: _endereco,
};

export const PessoaContext = React.createContext()

export const pessoaReducer = (pessoa, action) => {
  switch (action.type) {

    case "fillpessoa":
      return ({ ...pessoa, [action.payload.key]: action.payload.value })

    case "filladdress":
      return ({ ...pessoa, endereco: { ...pessoa.endereco, [action.payload.key]: action.payload.value } })

    case "setaddress":
      return ({ ...pessoa, endereco: { ...action.payload.endereco } })

    default:
      break;
  }
  return pessoa;
};