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
    return response.json();
  }

  _defaultFallback(response) {
    if (response.status === 403) {
      this._tokenService.unsetSessionToken();
      window.location.replace("/login?invalidSession=true");
    } else {
      throw response;
    }
  }

  request(url, method, body, headers, callback, fallback) {
    method = method || "GET";
    callback = callback || this._defaultCallback;
    fallback = fallback || this._defaultFallback;

    let requestInfo = {
      method,
      headers: { ...this._getDefaultHeaders(), headers },
    };

    if (method === "POST" || method === "PUT") {
      requestInfo = { ...requestInfo, body };
    }

    return fetch(url, requestInfo).then(callback).catch(fallback);
  }
}
