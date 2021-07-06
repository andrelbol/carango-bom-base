import { Container, CssBaseline, makeStyles } from "@material-ui/core";
import blue from "@material-ui/core/colors/blue";
import { ptBR } from "@material-ui/core/locale";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import React, { useState, useEffect } from "react";
import { Route, Switch } from "react-router-dom";
import CadastroMarca from "./pages/CadastroMarca";
import ListagemMarcas from "./pages/ListagemMarcas";
import Navbar from "./components/Navbar";
import ListagemVeiculos from "./pages/ListagemVeiculos";
import CadastroVeiculo from "./pages/CadastroVeiculo";
import ListagemUsuarios from "./pages/ListagemUsuarios";
import CadastroUsuario from "./pages/CadastroUsuario";
import Login from "./pages/Login";
import LoginContext from "./contexts/LoginContext";
import UsuarioService from "./services/UsuarioService";
import LoginService from "./services/LoginService";

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

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
  },
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(10),
  },
}));

function App() {
  const [usuario, setUsuario] = useState(null);
  const classes = useStyles();
  const loginService = new LoginService();
  const usuarioService = new UsuarioService();

  useEffect(() => {
    const token = sessionStorage.getItem("JWTToken");
    if (token) {
      // TODO: chamar endpoint que retorne o usuário a partirdo token e setar o usuário
    }
  });

  function logout() {
    setUsuario(null);
    loginService.logout();
  }

  return (
    <ThemeProvider theme={muiTheme}>
      <LoginContext.Provider value={{ usuario, setUsuario }}>
        <div className={classes.root}>
          <CssBaseline />
          <Navbar logout={logout} />
          <main className={classes.content}>
            <Container component='article' maxWidth='md'>
              <Switch>
                <Route path='/marcas'>
                  <ListagemMarcas></ListagemMarcas>
                </Route>
                <Route path='/cadastro-marca'>
                  <CadastroMarca></CadastroMarca>
                </Route>
                <Route path='/alteracao-marca/:id'>
                  <CadastroMarca></CadastroMarca>
                </Route>
                <Route path='/veiculos'>
                  <ListagemVeiculos></ListagemVeiculos>
                </Route>
                <Route path='/cadastro-veiculo'>
                  <CadastroVeiculo></CadastroVeiculo>
                </Route>
                <Route path='/alteracao-veiculo/:id'>
                  <CadastroVeiculo></CadastroVeiculo>
                </Route>
                <Route path='/usuarios'>
                  <ListagemUsuarios></ListagemUsuarios>
                </Route>
                <Route path='/cadastro-usuario'>
                  <CadastroUsuario></CadastroUsuario>
                </Route>
                <Route path='/login'>
                  <Login></Login>
                </Route>
                <Route path='/'>
                  <ListagemVeiculos></ListagemVeiculos>
                </Route>
              </Switch>
            </Container>
          </main>
        </div>
      </LoginContext.Provider>
    </ThemeProvider>
  );
}

export default App;
