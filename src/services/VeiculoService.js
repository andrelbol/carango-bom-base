import settings from "../config/settings.dev.js";
import BaseService from './BaseService.js';

export default class VeiculoService extends BaseService {
  cadastrar(veiculo) {
    return this.request(`${settings.baseUrl}/veiculos`,
      "POST",
      JSON.stringify(veiculo));
  }

  alterar(veiculo) {
    return this.request(`${settings.baseUrl}/veiculos/${veiculo.id}`,
      "PUT",
      JSON.stringify(veiculo));
  }

  consultar(id) {
    return this.request(`${settings.baseUrl}/veiculos/${id}`);
  }

  listar() {
    return this.request(`${settings.baseUrl}/veiculos`)
  }

  excluir(veiculo) {
    return this.request(`${settings.baseUrl}/veiculos/${veiculo.id}`,
      "DELETE", null, {}, () => {});
  }
}