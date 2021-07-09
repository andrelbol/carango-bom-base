import React from "react";
import "@testing-library/jest-dom/extend-expect";
import {
  fireEvent,
  render,
  screen,
  act,
  getAllByRole,
} from "@testing-library/react";
import ListagemUsuarios from "./ListagemUsuarios";
import { Router } from "react-router-dom";
import { createMemoryHistory } from "history";
import UsuarioService from "../../services/UsuarioService";

jest.mock("../../services/UsuarioService");

function renderWithProvider() {
    const history = createMemoryHistory();
  
    const rendered = render(
      <Router history={history}>
       <ListagemUsuarios />
      </Router>
    );
    return { history, ...rendered };
  }

  test("A página listagem usuários deve mostrar uma tabela com uma linha para cada usuário retornado pela API", async () => {
    const USUARIOS = Promise.resolve([
      { id: 1, nome: "LUANA" },
      { id: 2, nome: "LORENA" },
      { id: 3, nome: "ANDRÉ" },
    ]);

    UsuarioService.mockImplementation(() => {
      return {
        listar: () => USUARIOS,
      };
    });
  
    renderWithProvider();
    await act(() => USUARIOS);
  
    const linhas = screen.getAllByRole("row");
  
    expect(linhas).toHaveLength(4);
  });

  test("A página listagem usuários deve mostrar uma linha a menos após exclusão", async () => {
    let usuarios = [
      { id: 1, nome: "LUANA" },
      { id: 2, nome: "LORENA" }
    ];
  
    let USUARIOS_PROMISE = Promise.resolve(usuarios);
    const MOCK_PROMISE = Promise.resolve();
    UsuarioService.mockImplementation(() => {
      return {
        listar: () => USUARIOS_PROMISE,
        excluir: (usuarioSelecionado) => {
          usuarios = usuarios.filter((usuario) => usuario.id !== usuarioSelecionado.id);
          USUARIOS_PROMISE = Promise.resolve(usuarios);
          return MOCK_PROMISE;
        },
      };
    });

    renderWithProvider();
    await act(() => USUARIOS_PROMISE);
  
    const primeiraLinha = screen.getAllByRole("row")[1];
    const botaoExcluir = screen.getByRole("button", { name: "Excluir" });
  
    fireEvent.click(primeiraLinha);
    fireEvent.click(botaoExcluir);
    await act(() => MOCK_PROMISE);
  
    const linhas = screen.getAllByRole("row");
  
    expect(linhas).toHaveLength(2);

  });

  test("A página listagem usuários deve trocar para a rota de cadastro ao clicar em cadastrar", async () => {
    const USUARIOS = Promise.resolve([]);
    UsuarioService.mockImplementation(() => {
      return {
        listar: () => USUARIOS,
      };
    });
    const { history } = renderWithProvider();
    await act(() => USUARIOS);
  
    const botaoCadastrar = screen.getByRole("button", { name: "Adicionar" });
  
    fireEvent.click(botaoCadastrar);
  
    expect(history.location.pathname).toBe("/cadastro-usuario");
  });