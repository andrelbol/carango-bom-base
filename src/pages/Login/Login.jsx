import { useState, useContext } from "react";
import { Button, TextField } from "@material-ui/core";

import LoginService from "../../services/LoginService";
import LoginContext from "../../contexts/LoginContext";
import Usuario from "../../models/Usuario";

export default function () {
  const [loginForm, setLoginForm] = useState(Usuario.vazio());

  const { setUsuario } = useContext(LoginContext);

  function loginIncorreto() {
    // TODO: mostrar mensagem de erro pro usuário
    console.error("Login incorreto");
  }

  function login() {
    LoginService.login(loginForm)
      .then(() => {
        setUsuario({ nome: loginForm.nome });
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

      <Button variant='contained' color='primary' size='large' onClick={login}>
        Logar
      </Button>
    </>
  );
}
