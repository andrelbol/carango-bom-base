import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { fireEvent, render, screen } from "@testing-library/react";
import CustomDrawer from "./CustomDrawer";
import LoginContext from "../../contexts/LoginContext";
import { Router } from "react-router-dom";
import { createMemoryHistory } from 'history';

function renderWithProvider(usuario) {
  const history = createMemoryHistory();
  const rendered = render(
    <Router history={history}>
      <LoginContext.Provider value={{ usuario: usuario }}>
        <CustomDrawer />
      </LoginContext.Provider>
    </Router>
  );
  return { history, ...rendered }
}

test("O componente CustomDrawer deve mostrar opções se o usuário estiver logado", () => {
  const USUARIO = { nome: "Usuario teste" };

  renderWithProvider(USUARIO);
  const opcaoMarcas = screen.getByText("Marcas");
  const opcaoUsuarios = screen.getByText("Usuários");
  const opcaoVeiculos = screen.getByText("Veículos");
  const opcaoDashboard = screen.getByText("Dashboard");
  const opcaoLogout = screen.getByText("Sair");

  expect(opcaoMarcas).toBeInTheDocument();
  expect(opcaoUsuarios).toBeInTheDocument();
  expect(opcaoVeiculos).toBeInTheDocument();
  expect(opcaoDashboard).toBeInTheDocument();
  expect(opcaoLogout).toBeInTheDocument();
});

test("O componente CustomDrawer deve redirecionar para rotas corretas", () => {
  const USUARIO = { nome: "Usuario teste" };
  const { history } = renderWithProvider(USUARIO);

  const botaoVeiculos = screen.getByText('Veículos');
  fireEvent.click(botaoVeiculos);
  expect(history.location.pathname).toBe("/veiculos");
  
  const botaoMarcas = screen.getByText('Marcas');
  fireEvent.click(botaoMarcas);
  expect(history.location.pathname).toBe("/marcas");

  const botaoDashboard = screen.getByText('Dashboard');
  fireEvent.click(botaoDashboard);
  expect(history.location.pathname).toBe("/dashboard");

  const botaoUsuarios = screen.getByText('Usuários');
  fireEvent.click(botaoUsuarios);
  expect(history.location.pathname).toBe("/usuarios");
});
