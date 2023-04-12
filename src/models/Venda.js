class Venda {

  constructor(idVenda, idCliente, valor, pagamento, info, createdAt, updatedAt) {
    this.idVenda = idVenda
    this.idCliente = idCliente
    this.valor = valor
    this.pagamento = pagamento
    this.info = info
  }

  get idVenda() {
    return this._idVenda
  }

  set idVenda(idVenda) {
    this._idVenda = idVenda
  }

  get idCliente() {
    return this._idCliente
  }

  set idCliente(idCliente) {
    this._idCliente = idCliente
  }

  get valor() {
    return this._valor
  }

  set valor(valor) {
    this._valor = valor
  }

  get pagamento() {
    return this._pagamento
  }

  set pagamento(pagamento) {
    this._pagamento = pagamento
  }

  get info() {
    return this._info
  }

  set info(info) {
    this._info = info
  }

  get updatedAt() {
    return this._updatedAt
  }

  set updatedAt(updatedAt) {
    this._updatedAt = updatedAt
  }
}

export default new Venda()