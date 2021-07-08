import settings from "../config/settings";
import BaseService from "./BaseService.js";
import TokenService from './TokenService.js';

export default class LoginService extends BaseService {
  constructor() {
    super();
    this._tokenService = new TokenService();
  }

  login(loginForm) {
    return this.request(
      `${settings.baseUrl}/auth`,
      "POST",
      JSON.stringify(loginForm)
    ).then(({ token }) => {
      this._tokenService.setSessionToken(token);
      return token;
    });
  }

  logout() {
    this._tokenService.unsetSessionToken();
  }

  getUsuarioLogado() {
    return this.annonymous_request(`${settings.baseUrl}/auth`);
  }
}
