class Cliente {

  constructror(idCliente, nome, cpf, celular, telefone, info, createdAt, updatedAt) {
    this.idCliente = idCliente
    this.nome = nome
    this.cpf = cpf
    this.celular = celular
    this.telefone = telefone
    this.info = info
    this.createdAt = createdAt
    this.updatedAt = updatedAt
  }

  get idCliente() {
    return this._idCliente
  }

  set idCliente(idCliente) {
    this._idCliente = idCliente
  }

  get nome() {
    return this._nome
  }

  set nome(nome) {
    this._nome = nome.trim()
  }

  get cpf() {
    return this._cpf
  }

  set cpf(cpf) {
    this._cpf = cpf.trim()
  }

  get celular() {
    return this._celular
  }

  set celular(celular) {
    this._celular = celular
  }

  get telefone() {
    return this._telefone
  }

  set telefone(telefone) {
    this._telefone = telefone
  }

  get info() {
    return this._info
  }

  set info(info) {
    this._info = info
  }

  get createdAt() {
    return this._createdAt
  }

  set createdAt(createdAt) {
    this._createdAt = createdAt
  }

  get updatedAt() {
    return this._updatedAt
  }

  set updatedAt(updatedAt) {
    this._updatedAt = updatedAt
  }
}

export default new Cliente()