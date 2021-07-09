import React from "react";
import "@testing-library/jest-dom/extend-expect";
import {
  fireEvent,
  render,
  screen,
  act,
  getAllByRole,
} from "@testing-library/react";
import ListagemMarcas from "./ListagemMarcas";
import SnackbarContext from "../../contexts/SnackbarContext";
import { Router } from "react-router-dom";
import { createMemoryHistory } from "history";
import MarcaService from "../../services/MarcaService";

jest.mock("../../services/MarcaService");
const mostraSnackbar = jest.fn();

function renderWithProvider() {
  const history = createMemoryHistory();

  const rendered = render(
    <Router history={history}>
      <SnackbarContext.Provider value={{ mostraSnackbar }}>
        <ListagemMarcas />
      </SnackbarContext.Provider>
    </Router>
  );
  return { history, ...rendered };
}

test("A página listagem marcas deve mostrar uma tabela com uma linha para cada marca retornada pela API", async () => {
  const MARCAS = Promise.resolve([
    { id: 1, nome: "Primeira" },
    { id: 2, nome: "Segunda" },
    { id: 3, nome: "Terceira" },
  ]);
  MarcaService.mockImplementation(() => {
    return {
      listar: () => MARCAS,
    };
  });

  renderWithProvider();
  await act(() => MARCAS);

  const linhas = screen.getAllByRole("row");

  expect(linhas).toHaveLength(4);
});

test("A página listagem marcas deve mostrar uma linha a menos após exclusão", async () => {
  let marcas = [
    { id: 1, nome: "Primeira" },
    { id: 2, nome: "Segunda" },
  ];

  let MARCAS_PROMISE = Promise.resolve(marcas);
  const MOCK_PROMISE = Promise.resolve();
  MarcaService.mockImplementation(() => {
    return {
      listar: () => MARCAS_PROMISE,
      excluir: (marcaSelecionada) => {
        marcas = marcas.filter((marca) => marca.id !== marcaSelecionada.id);
        MARCAS_PROMISE = Promise.resolve(marcas);
        return MOCK_PROMISE;
      },
    };
  });

  renderWithProvider();
  await act(() => MARCAS_PROMISE);

  const primeiraLinha = screen.getAllByRole("row")[1];
  const botaoExcluir = screen.getByRole("button", { name: "Excluir" });

  fireEvent.click(primeiraLinha);
  fireEvent.click(botaoExcluir);
  await act(() => MOCK_PROMISE);

  const linhas = screen.getAllByRole("row");

  expect(linhas).toHaveLength(2);
});

test("A página listagem marcas deve trocar a rota passando id da marca da linha ao alterar", async () => {
  let marcas = [
    { id: 1, nome: "Primeira" },
    { id: 2, nome: "Segunda" },
  ];

  let MARCAS_PROMISE = Promise.resolve(marcas);
  MarcaService.mockImplementation(() => {
    return {
      listar: () => MARCAS_PROMISE,
    };
  });

  const { history } = renderWithProvider();
  await act(() => MARCAS_PROMISE);

  const primeiraLinha = screen.getAllByRole("row")[1];
  const botaoAlterar = screen.getByRole("button", { name: "Alterar" });

  fireEvent.click(primeiraLinha);
  fireEvent.click(botaoAlterar);

  expect(history.location.pathname).toBe("/alteracao-marca/1");
});

test("A página listagem marcas deve trocar para a rota de cadastro ao clicar em cadastrar", async () => {
  const MARCAS = Promise.resolve([]);
  MarcaService.mockImplementation(() => {
    return {
      listar: () => MARCAS,
    };
  });
  const { history } = renderWithProvider();
  await act(() => MARCAS);

  const botaoCadastrar = screen.getByRole("button", { name: "Adicionar" });

  fireEvent.click(botaoCadastrar);

  expect(history.location.pathname).toBe("/cadastro-marca");
});

// test("A página listagem marcas deve mostrar um snackbar de erro caso ocorra problema de conflito no backend na exclusao", async () => {
  
//   let marcas = [{ id: 1, nome: "Primeira" }];
//   const MENSAGEM_ERRO = "Mensagem erro";
//   const ERRO = { status: 409, texto: MENSAGEM_ERRO };

//   let MARCAS_PROMISE = Promise.resolve(marcas);
//   const ERRO_EXCLUSAO_PROMISE = Promise.reject(ERRO);
//   MarcaService.mockImplementation(() => {
//     return {
//       listar: () => MARCAS_PROMISE,
//       excluir: () => ERRO_EXCLUSAO_PROMISE,
//     };
//   });

//   renderWithProvider();
//   await act(() => MARCAS_PROMISE);

//   const primeiraLinha = screen.getAllByRole("row")[1];
//   const botaoExcluir = screen.getByRole("button", { name: "Excluir" });

//   fireEvent.click(primeiraLinha);
//   fireEvent.click(botaoExcluir);
//   await act(() => ERRO_EXCLUSAO_PROMISE);


//   const linhas = screen.getAllByRole("row");

//   expect(linhas).toHaveLength(2);
//   expect(mostraSnackbar).toHaveBeenCalled();
// });