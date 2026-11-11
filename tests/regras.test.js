const R = require('../app/js/regras.js');

describe('Exemplo · valorAvulso', () => {
  test('viagem avulsa de 10 minutos custa R$ 8,00', () => {
    const minutos = 10;

    const resultado = R.valorAvulso(minutos);

    expect(resultado).toBe(8);
  });
});

describe('RN01 · validarIdade', () => {
  test.todo('Teste 1: aceita 16 anos');
  test.todo('Teste 2: recusa 15 anos');
});

describe('RN02 · validarCodigoBike', () => {
  test.todo('Teste 3: aceita "BK0123"');
  test.todo('Teste 4: recusa "BK12", com só 2 números');
});

describe('RN03 · calcularMinutos', () => {
  test.todo('Teste 5: de 08:10 a 08:35 são 25 minutos');
});

describe('RN04 e RN06 · valorAvulso', () => {
  test.todo('Teste 6: 30 minutos custam R$ 18,00');
  test.todo('Teste 7: 100 minutos custam R$ 40,00, o teto');
});

describe('RN05 · valorPlano', () => {
  test.todo('Teste 8: 45 minutos custam R$ 0,00');
  test.todo('Teste 9: 50 minutos custam R$ 2,00');
});

describe('RN10 · bonusRecarga', () => {
  test.todo('Teste 10: recarga de R$ 49 não tem bônus');
  test.todo('Teste 11: recarga de R$ 50 ganha R$ 5 de bônus');
  test.todo('Teste 12: recarga de R$ 100 ganha R$ 20 de bônus');
});

describe('Cobertura', () => {
  test.todo('Escreva aqui os testes das linhas que o relatório de cobertura mostrou sem teste');
});
