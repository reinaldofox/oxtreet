import React from 'react'

const Administrativo = () => {

  return (
    <>
      <h1>Administrativo</h1>
      <a href="/faturamento">Faturamento</a>
      <a href="/gastos">Gastos</a>
      {/* Dados da moto, como consumo, preço gasolina e distancia
      para calcular o frete */}
      <a href="/moto">Moto</a>
    </>
  )
}

export default Administrativo