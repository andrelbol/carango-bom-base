import React from 'react';
import { Card, CardContent, Typography } from '@material-ui/core';
import useStyles from './styles';
import { valorComVirgula } from '../../utils/numberUtils';

const CardMarca = function({ nomeMarca, quantidadeVeiculos, valor }) {
  const classes = useStyles();

  return (
    <div className={classes.cardMarca}>
      <Card>
        <CardContent>
          <Typography variant="h5" className={classes.tituloCard}>{ nomeMarca }</Typography>
          <Typography>{ quantidadeVeiculos } veículos</Typography>
          <Typography>{ valorComVirgula(valor) }</Typography>
        </CardContent>
      </Card>
    </div>
  );
}

export default CardMarca;