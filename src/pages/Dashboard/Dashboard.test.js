import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { act, render, screen } from "@testing-library/react";
import { Router } from "react-router-dom";
import Dashboard from "./Dashboard";
import { createMemoryHistory } from "history";
import DashboardService from "../../services/DashboardService";

jest.mock("../../services/DashboardService");

function renderWithProvider() {
    const history = createMemoryHistory();
    const rerender = render(
        <Router history={history}>
            <Dashboard />
        </Router>
    );
    return { history, ...rerender }
}

test("deve exibir os cards por marca e seu valores e quantidade de veículos", async () => {
    const cards = Promise.resolve([
        { nomeMarca: "Marca 1", quantidadeVeiculos: 10, valor: 200000 },
        { nomeMarca: "Marca 2", quantidadeVeiculos: 5, valor: 20000 },
        { nomeMarca: "Marca 3", quantidadeVeiculos: 8, valor: 160000 }
    ]);

    DashboardService.mockImplementation(() => {
        return {
            getDadosDashboard: () => cards
        };
    });

    renderWithProvider();
    await act(() => cards);

    const linhas = screen.getAllByText("Marca", {exact: false});

    expect(linhas).toHaveLength(3);
});