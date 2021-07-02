import { Button, TextField } from "@material-ui/core";
import React, { useState } from "react";
import { useHistory } from "react-router";

import useStyles from './styles';
import useErros from "../../hooks/useErros";
import UsuarioService from "../../services/UsuarioService";
import Usuario from '../../models/Usuario';
import { valorNaoEhVazio, valorNaoEhVazioEMaiorQueQuantidade } from "../../utils/validacoes";


function CadastroUsuario() {
  const [usuario, setUsuario] = useState(Usuario.vazio());
  const [noEstadoInicial, setNoEstadoInicial] = useState(true);
  const [confirmacaoSenha, setConfirmacaoSenha] = useState("");

  const history = useHistory();

  const classes = useStyles();

  const usuarioService = new UsuarioService();

  const validacoes = {
    nome: valorNaoEhVazio,
    senha: valorNaoEhVazioEMaiorQueQuantidade(6),
    confirmacaoSenha: (dado) => {
      if(dado && dado === usuario.senha){
        return {valido: true };
      }else{
        return {valido:false, texto: "O campo confirmação de senha não deve estar vazio e deve ser igual ao campo senha."}
      }
    }
  };

  function validar(event) {
    setNoEstadoInicial(false);
    validarCampos(event);
  }

  const [erros, validarCampos, possoEnviar] = useErros(validacoes);

  function cancelar() {
    history.goBack();
  }

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        if (possoEnviar()) {
          usuarioService.cadastrar(usuario).then((res) => {
            setUsuario(Usuario.vazio());
            history.goBack();
          });
        }
      }}
    >
      <TextField
        value={usuario.nome}
        onChange={(evt) => setUsuario({ ...usuario, nome: evt.target.value })}
        onBlur={validar}
        helperText={erros.nome.texto}
        error={!erros.nome.valido}
        name="nome"
        id="nome"
        label="Nome"
        type="text"
        variant="outlined"
        fullWidth
        required
        margin="normal"
      />

      <TextField
        value={usuario.senha}
        onChange={(evt) => setUsuario({ ...usuario, senha: evt.target.value })}
        onBlur={validar}
        helperText={erros.senha.texto}
        error={!erros.senha.valido}
        name="senha"
        id="senha"
        label="Senha"
        type="password"
        variant="outlined"
        fullWidth
        required
        margin="normal"
      />

      <TextField
        value={confirmacaoSenha}
        onChange={(evt) => setConfirmacaoSenha(evt.target.value)}
        onBlur={validar}
        helperText={erros.confirmacaoSenha.texto}
        error={!erros.confirmacaoSenha.valido}
        name="confirmacaoSenha"
        id="confirmacaoSenha"
        label="Confirmação da senha"
        type="password"
        variant="outlined"
        fullWidth
        required
        margin="normal"
      />

      <Button
        variant="contained"
        color="primary"
        type="submit"
        disabled={!possoEnviar() || noEstadoInicial}
      >
        Cadastrar
      </Button>

      <Button
        className={classes.actions}
        variant="contained"
        color="secondary"
        onClick={cancelar}
      >
        Cancelar
      </Button>
    </form>
  );
}

export default CadastroUsuario;
