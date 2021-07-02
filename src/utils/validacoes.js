const valorNaoEhVazio = function (valor) {
  return !!valor
    ? { valido: true, texto: "" }
    : { valido: false, texto: "O campo não deve estar vazio." };
};

const valorNaoEhVazioENumericamenteMaiorQueQuantidade = function (quantidade) {
  return function (valor) {
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

const valorNaoEhVazioETemTamanhoMaiorQueQuantidade = function (quantidade) {
  return function (valor) {
    if (!!valor && valor.length > quantidade) {
      return { valido: true, texto: "" };
    } else {
      return {
        valido: false,
        texto: `O campo deve estar preenchido com um valor maior que ${quantidade}.`,
      };
    }
  };
};

export { valorNaoEhVazio, valorNaoEhVazioENumericamenteMaiorQueQuantidade, valorNaoEhVazioETemTamanhoMaiorQueQuantidade };