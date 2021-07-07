export default class TokenService {
  constructor() {
    this._TOKEN_SESSION_KEY = "JWTToken";
  }

  getSessionToken() {
    return localStorage.getItem(this._TOKEN_SESSION_KEY);
  }

  setSessionToken(token) {
    return localStorage.setItem(this._TOKEN_SESSION_KEY, token);
  }

  unsetSessionToken() {
    localStorage.removeItem(this._TOKEN_SESSION_KEY);
  }
}