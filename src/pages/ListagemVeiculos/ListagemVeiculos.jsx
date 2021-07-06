import { DataGrid } from "@material-ui/data-grid";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import { Box, Button } from "@material-ui/core";

import VeiculoService from "../../services/VeiculoService";
import useStyles from "./styles";
import { useContext } from 'react';
import LoginContext from '../../contexts/LoginContext';

function ListagemVeiculos() {
  const history = useHistory();
  const [veiculoSelecionado, setVeiculoSelecionado] = useState();
  const [veiculos, setVeiculos] = useState([]);
  const { usuario } = useContext(LoginContext);
  const classes = useStyles();
  const veiculoService = new VeiculoService();

  function alterar() {
    history.push("/alteracao-veiculo/" + veiculoSelecionado.id);
  }

  function excluir() {
    veiculoService.excluir(veiculoSelecionado).then(() => {
      setVeiculoSelecionado(null);
      carregarVeiculos();
    });
  }

  function carregarVeiculos() {
    veiculoService.listar().then((dados) => setVeiculos(dados));
  }

  const columns = [
    { field: "marca", headerName: "Marca", flex: 1 },
    { field: "modelo", headerName: "Modelo", flex: 1 },
    { field: "ano", headerName: "Ano", flex: 1 },
    { field: "valor", headerName: "Valor", flex: 1 },
  ];

  useEffect(() => carregarVeiculos(), []);

  return (
    <div>
      <DataGrid
        rows={veiculos}
        columns={columns}
        pageSize={5}
        autoHeight={true}
        onRowSelected={(gridSelection) =>
          setVeiculoSelecionado(gridSelection.data)
        }
      />

      <Box
        width={1}
        marginTop="10px"
        display={!usuario ? "none" : "flex"}
        justifyContent="space-between"
      >
        <div>
          <Button
            variant="contained"
            color="primary"
            onClick={() => history.push("/cadastro-veiculo")}
          >
            Adicionar
          </Button>
        </div>
        <div className={classes.actionsToolbar}>
          <Button
            className={classes.actions}
            variant="contained"
            color="secondary"
            disabled={!veiculoSelecionado}
            onClick={() => excluir()}
          >
            Excluir
          </Button>
          <Button
            className={classes.actions}
            variant="contained"
            color="primary"
            disabled={!veiculoSelecionado}
            onClick={() => alterar()}
          >
            Alterar
          </Button>
        </div>
      </Box>
    </div>
  );
}

export default ListagemVeiculos;
