import React, { useEffect, useState } from 'react';
import { Box } from '@material-ui/core';

import DashboardService from '../../services/DashboardService';
import CardMarca from '../../components/CardMarca';

const Dashboard = function() {
  const [ cardsDashboard, setCardsDashboard ] = useState([]);
  const dashBoardService = new DashboardService();

  useEffect(() => {
    dashBoardService.getDadosDashboard()
      .then(response => setCardsDashboard(response));
  }, []);

  return (
    <Box display="flex" width={1} justifyContent="space-between" flexWrap="wrap">
      { cardsDashboard.map(cardData => <CardMarca nomeMarca={cardData.nomeMarca}
        quantidadeVeiculos={cardData.quantidadeVeiculos} valor={cardData.valor} />)}
    </Box>
  );
}

export default Dashboard;