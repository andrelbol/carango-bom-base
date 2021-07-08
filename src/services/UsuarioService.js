import settings from "../config/settings";
import BaseService from "./BaseService.js";

export default class UsuarioService extends BaseService {
  cadastrar(usuario) {
    return this.request(
      `${settings.baseUrl}/usuarios`,
      "POST",
      JSON.stringify(usuario)
    );
  }

  alterar(usuario) {
    return this.request(
      `${settings.baseUrl}/usuarios/${usuario.id}`,
      "PUT",
      JSON.stringify(usuario)
    );
  }

  consultar(id) {
    return this.request(`${settings.baseUrl}/usuarios/${id}`);
  }

  listar() {
    return this.request(`${settings.baseUrl}/usuarios`);
  }

  excluir(usuario) {
    return this.request(
      `${settings.baseUrl}/usuarios/${usuario.id}`,
      "DELETE",
      null,
      {},
      () => {}
    );
  }
}
