import settings from '../config/settings.dev.js';

const jsonHeaders = {
  'Content-Type': 'application/json',
};

const TOKEN_KEY = "JWTToken";

const LoginService = {
  login(loginForm) {
    return fetch(`${settings.baseUrl}/auth`, {
      method: 'POST',
      headers: jsonHeaders,
      body: JSON.stringify(loginForm)
    }).then(r => r.json())
    .then(({ token })=> {
      sessionStorage.setItem(TOKEN_KEY, token);
      return token;
    });
  },

  logout() {
    sessionStorage.removeItem(TOKEN_KEY);
  }
}

export default LoginService;