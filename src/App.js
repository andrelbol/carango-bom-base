import { Container, CssBaseline, makeStyles, Snackbar, SnackbarContent } from "@material-ui/core";
import blue from "@material-ui/core/colors/blue";
import { ptBR } from "@material-ui/core/locale";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import React, { useState, useEffect } from "react";
import { Route, Switch } from "react-router-dom";
import CadastroMarca from "./pages/CadastroMarca";
import ListagemMarcas from "./pages/ListagemMarcas";
import Navbar from "./components/Navbar";
import PrivateRoute from "./components/PrivateRoute";
import ListagemVeiculos from "./pages/ListagemVeiculos";
import CadastroVeiculo from "./pages/CadastroVeiculo";
import ListagemUsuarios from "./pages/ListagemUsuarios";
import CadastroUsuario from "./pages/CadastroUsuario";
import Login from "./pages/Login";
import LoginContext from "./contexts/LoginContext";
import SnackbarContext from "./contexts/SnackbarContext";
import LoginService from "./services/LoginService";
import TokenService from "./services/TokenService";
import Dashboard from "./pages/Dashboard";
import clsx from "clsx";
import useStyles from './styles';

const muiTheme = createMuiTheme(
  {
    palette: {
      primary: {
        main: blue[900],
      },
    },
    drawerWidth: 240,
  },
  ptBR
);

function App() {
  const [usuario, setUsuario] = useState(null);

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarType, setSnackbarType] = useState("warning");
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const classes = useStyles();
  const loginService = new LoginService();
  const tokenService = new TokenService();

  useEffect(() => {
    console.log("Testando tela de app.js");
    const token = tokenService.getSessionToken();
    if (token) {
      const usuario = loginService.getUsuarioLogado();
      setUsuario(usuario);
    } else {
      logout();
    }
  }, []);

  function logout() {
    setUsuario(null);
    loginService.logout();
  }

  function mostraSnackbar(tipo, mensagem) {
    setSnackbarType(tipo);
    setSnackbarMessage(mensagem);
    setSnackbarOpen(true);
  }

  return (
    <ThemeProvider theme={muiTheme}>
      <LoginContext.Provider value={{ usuario, setUsuario }}>
        <SnackbarContext.Provider
          value={{ mostraSnackbar }}
        >
          <div className={classes.root}>
            <CssBaseline />
            <Navbar logout={logout} />
            <main className={classes.content}>
              <Container component='article' maxWidth='md'>
                <Switch>
                  <PrivateRoute path='/marcas'>
                    <ListagemMarcas></ListagemMarcas>
                  </PrivateRoute>
                  <PrivateRoute path='/cadastro-marca'>
                    <CadastroMarca></CadastroMarca>
                  </PrivateRoute>
                  <PrivateRoute path='/alteracao-marca/:id'>
                    <CadastroMarca></CadastroMarca>
                  </PrivateRoute>
                  <Route path='/veiculos'>
                    <ListagemVeiculos></ListagemVeiculos>
                  </Route>
                  <PrivateRoute path='/cadastro-veiculo'>
                    <CadastroVeiculo></CadastroVeiculo>
                  </PrivateRoute>
                  <PrivateRoute path='/alteracao-veiculo/:id'>
                    <CadastroVeiculo></CadastroVeiculo>
                  </PrivateRoute>
                  <PrivateRoute path='/usuarios'>
                    <ListagemUsuarios></ListagemUsuarios>
                  </PrivateRoute>
                  <Route path='/cadastro-usuario'>
                    <CadastroUsuario></CadastroUsuario>
                  </Route>
                  <PrivateRoute path='/dashboard'>
                    <Dashboard></Dashboard>
                  </PrivateRoute>
                  <Route path='/login'>
                    <Login></Login>
                  </Route>
                  <Route path='/'>
                    <ListagemVeiculos></ListagemVeiculos>
                  </Route>
                </Switch>
              </Container>
            </main>

            <Snackbar
              open={snackbarOpen}
              onClose={() => setSnackbarOpen(false)}
              autoHideDuration={3000}
              anchorOrigin={{ vertical: "top", horizontal: "center" }}
            >
              <SnackbarContent
                message={snackbarMessage}
                className={clsx({
                  [classes.snackbarError]: snackbarType === "error",
                  [classes.snackbarWarning]: snackbarType === "warning",
                })}
              />
            </Snackbar>
          </div>
        </SnackbarContext.Provider>
      </LoginContext.Provider>
    </ThemeProvider>
  );
}

export default App;
