import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';
import CustomDrawer from './CustomDrawer';
import LoginContext from '../../contexts/LoginContext';
import { MemoryRouter } from 'react-router-dom';

function renderWithProvider(usuario){
  return render(
    <MemoryRouter>
      <LoginContext.Provider value={{ usuario: usuario }}>
        <CustomDrawer />
      </LoginContext.Provider>
    </MemoryRouter>
  )
}

describe('O componente CustomDrawer ', () => {
  describe('se o usuário estiver logado ', () => {
    const USUARIO = { nome: "Usuario teste" };
    it('deve mostrar opcões', () => {
      renderWithProvider(USUARIO);
      const opcaoMarcas = screen.getByText('Marcas');
      const opcaoUsuarios = screen.getByText('Usuários');
      const opcaoVeiculos = screen.getByText('Veículos');
      const opcaoDashboard = screen.getByText('Dashboard');
      const opcaoLogout = screen.getByText('Sair');
  
      expect(opcaoMarcas).toBeInTheDocument();
      expect(opcaoUsuarios).toBeInTheDocument();
      expect(opcaoVeiculos).toBeInTheDocument();
      expect(opcaoDashboard).toBeInTheDocument();
      expect(opcaoLogout).toBeInTheDocument();
    });

    it('não deve mostrar opcão entrar', () => {
      renderWithProvider(USUARIO);
      const opcaoLogin = screen.queryByTestId('opcao-entrar');
      screen.debug();
      expect(opcaoLogin).not.toBeVisible();
    });
  });
});