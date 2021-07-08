import BaseService from './BaseService';
import DadosDashboard from '../models/DadosDashboard';


class DashboardService extends BaseService {
  
  getDadosDashboard() {
    const mockedData = [
      new DadosDashboard("Marca1", 10, 1000),
      new DadosDashboard("Marca2", 20, 2000),
      new DadosDashboard("Marca3", 30, 3000),
      new DadosDashboard("Marca4", 40, 4000),
    ]

    return Promise.resolve(mockedData);
  }
}

export default DashboardService;