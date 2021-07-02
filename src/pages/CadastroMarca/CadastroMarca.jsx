import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import { Button, TextField } from "@material-ui/core";

import useErros from "../../hooks/useErros";
import useStyles from "./styles";
import MarcaService from "../../services/MarcaService";
import { valorNaoEhVazioEMaiorQueQuantidade } from "../../utils/validacoes";

function CadastroMarca() {
  const [marca, setMarca] = useState("");
  const { id } = useParams();
  const history = useHistory();
  const classes = useStyles();
  const marcaService = new MarcaService();

  const validacoes = {
    marca: valorNaoEhVazioEMaiorQueQuantidade(3),
  };
  const [erros, validarCampos, possoEnviar] = useErros(validacoes);

  function cancelar() {
    history.goBack();
  }

  useEffect(() => {
    if (id) {
      marcaService.consultar(id).then((m) => setMarca(m.nome));
    }
  }, [id]);

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        if (possoEnviar()) {
          if (id) {
            marcaService.alterar({ id, nome: marca }).then((res) => {
              history.goBack();
            });
          } else {
            marcaService.cadastrar({ nome: marca }).then((res) => {
              setMarca("");
              history.goBack();
            });
          }
        }
      }}
    >
      <TextField
        value={marca}
        onChange={(evt) => setMarca(evt.target.value)}
        onBlur={validarCampos}
        helperText={erros.marca.texto}
        error={!erros.marca.valido}
        name='marca'
        id='marca'
        label='Marca'
        type='text'
        variant='outlined'
        fullWidth
        required
        margin='normal'
      />

      <Button
        variant='contained'
        color='primary'
        type='submit'
        disabled={!possoEnviar()}
      >
        {id ? "Alterar" : "Cadastrar"}
      </Button>

      <Button
        className={classes.actions}
        variant='contained'
        color='secondary'
        onClick={cancelar}
      >
        Cancelar
      </Button>
    </form>
  );
}

export default CadastroMarca;
