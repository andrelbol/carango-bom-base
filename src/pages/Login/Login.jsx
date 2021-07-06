import { useState, useContext } from "react";
import { useHistory, useLocation } from "react-router-dom";
import {
  Button,
  TextField,
  Snackbar,
  SnackbarContent,
} from "@material-ui/core";

import LoginService from "../../services/LoginService";
import LoginContext from "../../contexts/LoginContext";
import Usuario from "../../models/Usuario";
import useStyles from "./styles";

const Login = function (props) {
  const location = useLocation();
  const history = useHistory();
  const classes = useStyles();
  const { setUsuario } = useContext(LoginContext);
  const [loginForm, setLoginForm] = useState(Usuario.vazio());
  const [isSessionInvalid, setIsSessionInvalid] = useState(
    new URLSearchParams(location.search).get("invalidSession")
  );
  const loginService = new LoginService();

  function loginIncorreto() {
    // TODO: mostrar mensagem de erro pro usuário
    console.error("Login incorreto");
  }

  function login() {
    loginService
      .login(loginForm)
      .then(() => {
        setUsuario({ nome: loginForm.nome });
        history.push("/veiculos");
      })
      .catch(() => loginIncorreto());
  }

  return (
    <>
      <TextField
        value={loginForm.nome}
        onChange={(evt) =>
          setLoginForm({ ...loginForm, nome: evt.target.value })
        }
        name='nome'
        id='nome'
        label='Nome'
        type='text'
        variant='outlined'
        fullWidth
        margin='normal'
      />

      <TextField
        value={loginForm.senha}
        onChange={(evt) =>
          setLoginForm({ ...loginForm, senha: evt.target.value })
        }
        name='senha'
        id='senha'
        label='Senha'
        type='password'
        variant='outlined'
        fullWidth
        margin='normal'
      />

      <Snackbar
        open={!!isSessionInvalid}
        onClose={() => setIsSessionInvalid(null)}
        autoHideDuration={3000}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <SnackbarContent
          message='Sua sessão está expirada. Realize o login novamente'
          className={classes.snackbarWarning}
        />
      </Snackbar>

      <Button variant='contained' color='primary' size='large' onClick={login}>
        Logar
      </Button>
    </>
  );
}

export default Login;