export default class Usuario {
  constructor(nome, senha) {
    this.nome = nome;
    this.senha = senha;
  }

  static vazio() {
    return new Usuario("", "");
  }
}