import { render, screen, act, fireEvent, waitFor } from "@testing-library/react";
import { Router } from "react-router";
import { createMemoryHistory } from "history";

import CadastroMarca from "./CadastroMarca";
import MarcaService from "../../services/MarcaService";

jest.mock("../../services/MarcaService");

function renderWithRouter() {
  const history = createMemoryHistory();
  const rendered = render(
    <Router history={history}>
      <CadastroMarca />
    </Router>
  );

  return { history, ...rendered };
}

test("A página Cadastro Marcas deve abrir vazia caso nenhum id seja passado", () => {
  renderWithRouter();

  const campoNome = screen.getByLabelText(/^Marca/i);

  expect(campoNome.textContent).toBe('');
});

test('A página de Cadastro Marcas deve cadastrar caso o campo esteja válido', async () => {
  const FUNCAO_CADASTRO = jest.fn(() => Promise.resolve());
  MarcaService.mockImplementation(() => ({
    cadastrar: FUNCAO_CADASTRO
  }));

  renderWithRouter();

  const campoNome = screen.getByLabelText(/^Marca/i);
  const formularioCadastrar = screen.getByTestId(/formulario-cadastro-marca/i);

  fireEvent.change(campoNome, { target: { value: "Válido" } });
  fireEvent.submit(formularioCadastrar);

  await waitFor(() => expect(FUNCAO_CADASTRO).toHaveBeenCalledTimes(1));
});