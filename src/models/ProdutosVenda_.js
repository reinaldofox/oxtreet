class ProdutosVenda {

  constructor(idVenda, idProduto, quantidade, precoVendido, tamanho, info, createdAt, updatedAt) {
    this.idVenda = idVenda
    this.idProduto = idProduto
    this.quantidade = quantidade
    this.precoVendido = precoVendido
    this.tamanho = tamanho
    this.info = info
  }

  get idVenda() {
    return this._idVenda
  }

  set idVenda(idVenda) {
    this._idVenda = idVenda
  }

  get idProduto() {
    return this._idProduto
  }

  set idProduto(idProduto) {
    this._idProduto = idProduto
  }

  get quantidade() {
    return this._quantidade
  }

  set quantidade(quantidade) {
    this._quantidade = quantidade
  }

  get precoVendido() {
    return this._precoVendido
  }

  set precoVendido(precoVendido) {
    this._precoVendido = precoVendido
  }

  get tamanho() {
    return this._tamanho
  }

  set tamanho(tamanho) {
    this._tamanho = tamanho
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

export default new ProdutosVenda()