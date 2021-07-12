import React from "react";
import "@testing-library/jest-dom/extend-expect";
import CadastroUsuario from "./CadastroUsuario";
import { Router } from "react-router-dom";
import { createMemoryHistory } from "history";
import UsuarioService from "../../services/UsuarioService";
import {
    fireEvent,
    render,
    screen,
    act,
    getAllByRole,
  } from "@testing-library/react";

jest.mock("../../services/UsuarioService");


function renderWithProvider() {
    const history = createMemoryHistory();
  
    const rendered = render(
      <Router history={history}>
       <CadastroUsuario />
      </Router>
    );
    return { history, ...rendered };
  }

  test("A página cadastro usuários deve cadastrar um usuario ao clicar em cadastrar", async () => {
    const usuario = { nome: "Luana", senha: "1234567" };
    const cadastrarUsuario = jest.fn(() => Promise.resolve(usuario));

    UsuarioService.mockImplementation(() => {
      return {
        cadastrar:  cadastrarUsuario,
      };
    });
  
    renderWithProvider();
   
    let inputNome = screen.getByRole('textbox', { name: 'Nome' });
    let inputSenha = screen.getByLabelText(/^Senha/i);
    let inputConfSenha = screen.getByLabelText(/^Confirmação da senha/i);
    const form = screen.getByTestId('form');

    fireEvent.change(inputNome, { target: { value: usuario.nome } });
    fireEvent.change(inputSenha, { target: { value: usuario.senha } });
    fireEvent.change(inputConfSenha, { target: { value: usuario.senha } });
    fireEvent.submit(form);

    await act(() => cadastrarUsuario);
    expect(cadastrarUsuario).toHaveBeenCalled();
  });