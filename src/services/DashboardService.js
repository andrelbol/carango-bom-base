import BaseService from './BaseService';
import settings from '../config/settings';


class DashboardService extends BaseService {
  
  getDadosDashboard() {
    return this.request(`${settings.baseUrl}/marcas/dashboard`);
  }
}

export default DashboardService;