import {
  valorNaoEhVazio,
  valorNaoEhVazioENumericamenteMaiorQueQuantidade,
  valorNaoEhVazioETemTamanhoMaiorQueQuantidade,
} from "./validacoes";

test('Validação de valor não vazio deve retornar valido quando existir valor', () => {
  const VALOR_NAO_VAZIO = "conteúdo";
  
  const validacao = valorNaoEhVazio(VALOR_NAO_VAZIO);

  expect(validacao.valido).toBeTruthy();
});

test('Validação de valor não vazio deve retornar invalido quando não existir valor', () => {
  const VALOR_VAZIO = null;
  
  const validacao = valorNaoEhVazio(VALOR_VAZIO);

  expect(validacao.valido).toBeFalsy();
});

test('Validação de valor numericamente maior deve retornar verdadeiro para valor maior', () => {
  const VALOR = 5;
  const VALIDACAO = valorNaoEhVazioENumericamenteMaiorQueQuantidade(3);
  
  const validacao = VALIDACAO(VALOR);

  expect(validacao.valido).toBeTruthy();
});

test('Validação de valor numericamente maior deve retornar invalido para valor menor ou igual', () => {
  const VALOR_1 = 2;
  const VALOR_2 = 3;
  const VALIDACAO = valorNaoEhVazioENumericamenteMaiorQueQuantidade(3);
  
  const validacao_1 = VALIDACAO(VALOR_1);
  const validacao_2 = VALIDACAO(VALOR_2);

  expect(validacao_1.valido).toBeFalsy();
  expect(validacao_2.valido).toBeFalsy();
});

test('Validação de valor com tamanho maior deve retornar verdadeiro para valor maior', () => {
  const VALOR = "cinco";
  const VALIDACAO = valorNaoEhVazioETemTamanhoMaiorQueQuantidade(3);
  
  const validacao = VALIDACAO(VALOR);

  expect(validacao.valido).toBeTruthy();
});

test('Validação de valor com tamanho maior deve retornar invalido para valor menor ou igual', () => {
  const VALOR_1 = "do";
  const VALOR_2 = "tre";
  const VALIDACAO = valorNaoEhVazioETemTamanhoMaiorQueQuantidade(3);
  
  const validacao_1 = VALIDACAO(VALOR_1);
  const validacao_2 = VALIDACAO(VALOR_2);

  expect(validacao_1.valido).toBeFalsy();
  expect(validacao_2.valido).toBeFalsy();
});