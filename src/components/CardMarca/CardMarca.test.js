import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import CardMarca from './CardMarca';

describe('O componente CardMarca ', () => {
  it('deve mostrar o nome da marca passado como parâmetro', () => {
    const NOME_MARCA = "MARCA TESTE";
    render(<CardMarca nomeMarca={NOME_MARCA}/>);

    const titulo = screen.getByText(NOME_MARCA);

    expect(titulo).toBeInTheDocument();
  });

  it('deve mostrar a quantidade de veículos passada como parâmetro', () => {
    const QUANTIDADE_VEICULOS = 10;
    render(<CardMarca quantidadeVeiculos={QUANTIDADE_VEICULOS}/>);

    const quantidade = screen.getByText(`${QUANTIDADE_VEICULOS} veículos`);

    expect(quantidade).toBeInTheDocument();
  });

  it('deve mostrar o valor passado como parâmetro', () => {
    const VALOR = 10000;
    const STRING_VALOR = "R$ 10.000,00";
    render(<CardMarca valor={VALOR}/>);

    const valor = screen.getByText(STRING_VALOR);

    expect(valor).toBeInTheDocument();
  });
});