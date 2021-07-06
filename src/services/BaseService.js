import TokenService from "./TokenService";

export default class BaseService {
  constructor() {
    this._tokenService = new TokenService();
  }

  _getDefaultHeaders() {
    const token = this._tokenService.getSessionToken();
    if (token) {
      return {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      };
    } else {
      return { "Content-Type": "application/json" };
    }
  }

  _defaultCallback(response) {
    if(response.status == 403){
      window.location.replace("/login?invalidSession=true");
    }
    return response.json();
  }

  request(url, method, body, headers, callback) {
    method = method || "GET";
    callback = callback || this._defaultCallback;

    let requestInfo = {
      method,
      headers: { ...this._getDefaultHeaders(), headers },
    };

    if (method === "POST" || method === "PUT") {
      requestInfo = { ...requestInfo, body };
    }

    return fetch(url, requestInfo).then(callback);
  }
}
