import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import { DataGrid } from "@material-ui/data-grid";
import { Box, Button } from "@material-ui/core";

import UsuarioService from "../../services/UsuarioService";
import useStyles from "./styles";

function ListagemUsuarios() {
  const history = useHistory();
  const [usuarioSelecionado, setUsuarioSelecionado] = useState();
  const [usuarios, setUsuarios] = useState([]);
  const classes = useStyles();
  const usuarioService = new UsuarioService();
  
  function excluir() {
    usuarioService.excluir(usuarioSelecionado).then(() => {
      setUsuarioSelecionado(null);
      carregarUsuarios();
    });
  }
  
  function carregarUsuarios() {
    usuarioService.listar().then((dados) => setUsuarios(dados));
  }
  
  const columns = [
    {
      field: "nome",
      headerName: "Nome",
      flex: 1,
    },
  ];

  useEffect(() => carregarUsuarios(), []);

  return (
    <div>
      <DataGrid
        rows={usuarios}
        columns={columns}
        pageSize={5}
        autoHeight={true}
        onRowSelected={(gridSelection) =>
          setUsuarioSelecionado(gridSelection.data)
        }
      />

      <Box
        width={1}
        marginTop='10px'
        display='flex'
        justifyContent='space-between'
      >
        <div>
          <Button
            variant='contained'
            color='primary'
            onClick={() => history.push("/cadastro-usuario")}
          >
            Adicionar
          </Button>
        </div>
        <div className={classes.actionsToolbar}>
          <Button
            className={classes.actions}
            variant='contained'
            color='secondary'
            disabled={!usuarioSelecionado}
            onClick={() => excluir()}
          >
            Excluir
          </Button>
        </div>
      </Box>
    </div>
  );
}

export default ListagemUsuarios;
