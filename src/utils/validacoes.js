const valorNaoEhVazio = function (valor) {
  return !!valor
    ? { valido: true, texto: "" }
    : { valido: false, texto: "O campo não deve estar vazio." };
};

const valorNaoEhVazioEMaiorQueQuantidade = function (quantidade) {
  return function (valor) {
    valor = isNaN(valor) ? valor.length : valor;
    if (!!valor && valor > quantidade) {
      return { valido: true, texto: "" };
    } else {
      return {
        valido: false,
        texto: `O campo deve estar preenchido com um valor maior que ${quantidade}.`,
      };
    }
  };
};

export { valorNaoEhVazio, valorNaoEhVazioEMaiorQueQuantidade };