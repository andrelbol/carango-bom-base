export default class TokenService {
  constructor() {
    this._TOKEN_SESSION_KEY = "JWTToken";
  }

  getSessionToken() {
    return sessionStorage.getItem(this._TOKEN_SESSION_KEY);
  }

  setSessionToken(token) {
    return sessionStorage.setItem(this._TOKEN_SESSION_KEY, token);
  }

  unsetSessionToken() {
    sessionStorage.removeItem(this._TOKEN_SESSION_KEY);
  }
}