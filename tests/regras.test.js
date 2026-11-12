const R = require('../app/js/regras.js');

describe('Exemplo · valorAvulso', () => {
  test('viagem avulsa de 10 minutos custa R$ 8,00', () => {
    const minutos = 10;

    const resultado = R.valorAvulso(minutos);

    expect(resultado).toBe(8);
  });
});

describe('RN01 · validarIdade', () => {
  test('Teste 1: aceita 16 anos', () => {
    const idade = 16;

    const resultado = R.validarIdade(idade);

    expect(resultado).toBe(true);
  });

  test('Teste 2: recusa 15 anos', () => {
    const idade = 15;

    const resultado = R.validarIdade(idade);

    expect(resultado).toBe(false);
  });
});

describe('RN02 · validarCodigoBike', () => {
  test('Teste 3: aceita "BK0123"', () => {
    const codigo = 'BK0123';

    const resultado = R.validarCodigoBike(codigo);

    expect(resultado).toBe(true);
  });

  test('Teste 4: recusa "BK12", com só 2 números', () => {
    const codigo = 'BK12';

    const resultado = R.validarCodigoBike(codigo);

    expect(resultado).toBe(false);
  });
});

describe('RN03 · calcularMinutos', () => {
  test('Teste 5: de 08:10 a 08:35 são 25 minutos', () => {
    const resultado = R.calcularMinutos('08:10', '08:35');

    expect(resultado).toBe(25);
  });
});

describe('RN04 e RN06 · valorAvulso', () => {
  test('Teste 6: 30 minutos custam R$ 18,00', () => {
    const resultado = R.valorAvulso(30);

    expect(resultado).toBe(18);
  });

  test('Teste 7: 100 minutos custam R$ 40,00, o teto', () => {
    const resultado = R.valorAvulso(100);

    expect(resultado).toBe(40);
  });
});

describe('RN05 · valorPlano', () => {
  test('Teste 8: 45 minutos custam R$ 0,00', () => {
    const resultado = R.valorPlano(45);

    expect(resultado).toBe(0);
  });

  test('Teste 9: 50 minutos custam R$ 2,00', () => {
    const resultado = R.valorPlano(50);

    expect(resultado).toBe(2);
  });
});

describe('RN10 · bonusRecarga', () => {
  test('Teste 10: recarga de R$ 49 não tem bônus', () => {
    const resultado = R.bonusRecarga(49);

    expect(resultado).toBe(0);
  });

  test('Teste 11: recarga de R$ 50 ganha R$ 5 de bônus', () => {
    const resultado = R.bonusRecarga(50);

    expect(resultado).toBe(5);
  });

  test('Teste 12: recarga de R$ 100 ganha R$ 20 de bônus', () => {
    const resultado = R.bonusRecarga(100);

    expect(resultado).toBe(20);
  });
});

describe('Cobertura', () => {
  test('avulsa de 20 minutos, devolvida na estação, custa R$ 13,00', () => {
    const viagem = { plano: false, minutos: 20, estudante: false, foraDaEstacao: false };

    const resultado = R.valorViagem(viagem);

    expect(resultado).toBe(13);
  });

  test('estudante com 100 minutos paga R$ 20,00 (50% do teto de R$ 40,00)', () => {
    const viagem = { plano: false, minutos: 100, estudante: true, foraDaEstacao: false };

    const resultado = R.valorViagem(viagem);

    expect(resultado).toBe(20);
  });

  test('plano com 60 minutos fora da estação paga R$ 6,00 + multa de R$ 15,00 = R$ 21,00', () => {
    const viagem = { plano: true, minutos: 60, estudante: false, foraDaEstacao: true };

    const resultado = R.valorViagem(viagem);

    expect(resultado).toBe(21);
  });
});

describe('Desafio · valorViagem (RN04 a RN08)', () => {
  test('estudante com 20 minutos paga R$ 6,50 (50% de R$ 13,00)', () => {
    const viagem = { plano: false, minutos: 20, estudante: true, foraDaEstacao: false };

    expect(R.valorViagem(viagem)).toBe(6.5);
  });

  test('avulsa de 20 minutos fora da estação paga R$ 13,00 + multa de R$ 15,00 = R$ 28,00', () => {
    const viagem = { plano: false, minutos: 20, estudante: false, foraDaEstacao: true };

    expect(R.valorViagem(viagem)).toBe(28);
  });

  test('plano com 30 minutos, na estação, não paga nada', () => {
    const viagem = { plano: true, minutos: 30, estudante: false, foraDaEstacao: false };

    expect(R.valorViagem(viagem)).toBe(0);
  });

  test('estudante não ganha desconto no plano mensal (RN07)', () => {
    const viagem = { plano: true, minutos: 55, estudante: true, foraDaEstacao: false };

    expect(R.valorViagem(viagem)).toBe(4);
  });

  test('estudante com 100 minutos fora da estação paga R$ 20,00 + R$ 15,00 de multa, sem desconto na multa', () => {
    const viagem = { plano: false, minutos: 100, estudante: true, foraDaEstacao: true };

    expect(R.valorViagem(viagem)).toBe(35);
  });
});

describe('Desafio · RN09 · podeIniciar', () => {
  test('avulso com R$ 4,99 não pode iniciar', () => {
    const resultado = R.podeIniciar(4.99, false);

    expect(resultado.ok).toBe(false);
    expect(resultado.motivo).toContain('R$ 5,00');
  });

  test('avulso com R$ 5,00 pode iniciar', () => {
    expect(R.podeIniciar(5, false).ok).toBe(true);
  });

  test('assinante com R$ 0 pode iniciar', () => {
    expect(R.podeIniciar(0, true).ok).toBe(true);
  });
});

describe('Desafio · formatarMoeda', () => {
  test('usa vírgula nos centavos e duas casas decimais', () => {
    expect(R.formatarMoeda(8)).toBe('R$ 8,00');
    expect(R.formatarMoeda(2.5)).toBe('R$ 2,50');
  });

  test('1234.5 termina em ",50" e começa com "R$ "', () => {
    const resultado = R.formatarMoeda(1234.5);

    expect(resultado.startsWith('R$ ')).toBe(true);
    expect(resultado.endsWith(',50')).toBe(true);
  });
});

describe('Desafio · RN02 · validarCodigoBike (casos extras)', () => {
  test('recusa "bk0123" em minúsculas (o BK precisa ser maiúsculo)', () => {
    expect(R.validarCodigoBike('bk0123')).toBe(false);
  });

  test('aceita " BK0123 " com espaços no começo e no fim', () => {
    expect(R.validarCodigoBike(' BK0123 ')).toBe(true);
  });
});

describe('Desafio · RN03 · calcularMinutos (casos extras)', () => {
  test('devolução antes da retirada dá 0 minuto', () => {
    expect(R.calcularMinutos('09:00', '08:30')).toBe(0);
  });

  test('devolução na mesma hora da retirada dá 0 minuto', () => {
    expect(R.calcularMinutos('09:00', '09:00')).toBe(0);
  });
});

describe('Desafio · RN10 · bonusRecarga (casos extras)', () => {
  test('recarga de R$ 99 ganha 10%: R$ 9,90', () => {
    expect(R.bonusRecarga(99)).toBe(9.9);
  });
});