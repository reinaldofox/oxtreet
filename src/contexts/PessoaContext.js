import { createContext } from 'react'

export const _endereco = {
  rua: "", numero: "", complemento: "", bairro: "", cep: "", cidade: "", uf: "", info: "",
};

export const _pessoa = {
  nome: "", cpfCnpj: "", email: "", telefone: "", celular: "", tipo: "", origem: "", info: "", endereco: _endereco,
};

export const PessoaContext = createContext()

export const pessoaReducer = (pessoa, action) => {
  const { key, value } = action.payload ?? ""
  switch (action.type) {

    case "fillpessoa":
      return ({ ...pessoa, [key]: value })

    case "filladdress":
      return ({ ...pessoa, endereco: { ...pessoa.endereco, [key]: value } })

    case "setaddress":
      return ({ ...pessoa, endereco: { ...action.payload.endereco } })

    case "reset":
      return _pessoa

    default:
      break;
  }
  return pessoa;
};