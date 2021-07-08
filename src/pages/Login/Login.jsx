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
import { useEffect } from 'react';
import SnackbarContext from '../../contexts/SnackbarContext';

const Login = function (props) {
  const location = useLocation();
  const history = useHistory();
  const classes = useStyles();
  const { setUsuario } = useContext(LoginContext);
  const [loginForm, setLoginForm] = useState(Usuario.vazio());
  const { mostraSnackbar } = useContext(SnackbarContext);
  const loginService = new LoginService();

  function loginIncorreto() {
    mostraSnackbar('error', 'Nome ou senha estão incorretos');
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

  function cadastrar() {
    history.push("/cadastro-usuario");
  }

  useEffect(() => {
    const isSessionInvalid = new URLSearchParams(location.search).get("invalidSession");
    if(isSessionInvalid){
      mostraSnackbar('warning', 'Sua sessão está expirada. Realize o login novamente');
    }
  }, [])

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

      <Button
        variant='contained'
        color='primary'
        size='large'
        onClick={login}
      >
        Logar
      </Button>

      <Button
        className={classes.actions}
        variant='contained'
        color='primary'
        size='large'
        onClick={cadastrar}
      >
        Cadastrar
      </Button>
    </>
  );
};

export default Login;
