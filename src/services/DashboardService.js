import BaseService from './BaseService';
import settings from '../config/settings.dev';


class DashboardService extends BaseService {
  
  getDadosDashboard() {
    return this.request(`${settings.baseUrl}/marcas/dashboard`);
  }
}

export default DashboardService;