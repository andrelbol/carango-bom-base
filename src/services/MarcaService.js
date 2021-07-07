import settings from "../config/settings.dev.js";
import BaseService from "./BaseService.js";

export default class MarcaService extends BaseService {
  cadastrar(marca) {
    return this.request(
      `${settings.baseUrl}/marcas`,
      "POST",
      JSON.stringify(marca)
    );
  }

  alterar(marca) {
    return this.request(
      `${settings.baseUrl}/marcas/${marca.id}`,
      "PUT",
      JSON.stringify(marca)
    );
  }

  consultar(id) {
    return this.request(`${settings.baseUrl}/marcas/${id}`);
  }

  listar() {
    return this.request(`${settings.baseUrl}/marcas`);
  }

  excluir(marca) {
    return this.request(
      `${settings.baseUrl}/marcas/${marca.id}`,
      "DELETE",
      null,
      {},
      () => {}
    );
  }
}
