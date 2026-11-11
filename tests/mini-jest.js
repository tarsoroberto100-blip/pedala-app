(function () {
  const blocos = [];
  let atual = null;

  function iguais(a, b) {
    return JSON.stringify(a) === JSON.stringify(b);
  }

  function texto(valor) {
    return typeof valor === 'string' ? '"' + valor + '"' : JSON.stringify(valor);
  }

  function criarExpect(recebido, negado) {
    function verificar(passou, esperado, nome) {
      if (passou === negado) {
        const erro = new Error('expect(recebido)' + (negado ? '.not' : '') + '.' + nome + '(esperado)');
        erro.esperado = (negado ? 'diferente de ' : '') + esperado;
        erro.recebido = texto(recebido);
        throw erro;
      }
    }
    const api = {
      toBe: function (esperado) { verificar(Object.is(recebido, esperado), texto(esperado), 'toBe'); },
      toEqual: function (esperado) { verificar(iguais(recebido, esperado), texto(esperado), 'toEqual'); },
      toBeCloseTo: function (esperado, casas) {
        const precisao = casas === undefined ? 2 : casas;
        verificar(Math.abs(recebido - esperado) < Math.pow(10, -precisao) / 2, texto(esperado), 'toBeCloseTo');
      },
      toBeTruthy: function () { verificar(!!recebido, 'um valor verdadeiro', 'toBeTruthy'); },
      toBeFalsy: function () { verificar(!recebido, 'um valor falso', 'toBeFalsy'); },
      toContain: function (esperado) { verificar(recebido != null && recebido.indexOf(esperado) !== -1, 'algo que contenha ' + texto(esperado), 'toContain'); },
      toBeGreaterThan: function (esperado) { verificar(recebido > esperado, 'maior que ' + esperado, 'toBeGreaterThan'); },
      toBeLessThan: function (esperado) { verificar(recebido < esperado, 'menor que ' + esperado, 'toBeLessThan'); }
    };
    if (!negado) {
      api.not = criarExpect(recebido, true);
    }
    return api;
  }

  window.require = function () {
    return typeof PedalaRegras !== 'undefined' ? PedalaRegras : undefined;
  };

  window.describe = function (nome, corpo) {
    const anterior = atual;
    atual = { nome: nome, testes: [] };
    blocos.push(atual);
    corpo();
    atual = anterior;
  };

  window.test = function (nome, corpo) {
    const destino = atual || (blocos[0] && blocos[0].nome === '' ? blocos[0] : null);
    if (!destino) {
      atual = { nome: '', testes: [] };
      blocos.unshift(atual);
      atual.testes.push({ nome: nome, corpo: corpo });
      atual = null;
      return;
    }
    destino.testes.push({ nome: nome, corpo: corpo });
  };
  window.test.todo = function (nome) {
    (atual || blocos[blocos.length - 1]).testes.push({ nome: nome, todo: true });
  };
  window.it = window.test;
  window.expect = function (recebido) {
    return criarExpect(recebido, false);
  };

  window.rodarTestes = function () {
    const saida = document.getElementById('resultado');
    let passaram = 0;
    let falharam = 0;
    let pendentes = 0;
    blocos.forEach(function (bloco) {
      const titulo = document.createElement('h2');
      titulo.textContent = bloco.nome || 'Testes';
      saida.appendChild(titulo);
      bloco.testes.forEach(function (t) {
        const linha = document.createElement('div');
        if (t.todo) {
          pendentes += 1;
          linha.className = 'teste todo';
          linha.textContent = '✎ a fazer: ' + t.nome;
          saida.appendChild(linha);
          return;
        }
        try {
          t.corpo();
          passaram += 1;
          linha.className = 'teste ok';
          linha.textContent = '✓ ' + t.nome;
        } catch (erro) {
          falharam += 1;
          linha.className = 'teste falha';
          linha.textContent = '✕ ' + t.nome;
          const detalhe = document.createElement('pre');
          detalhe.textContent = erro.esperado !== undefined
            ? erro.message + '\n\nEsperado (Expected): ' + erro.esperado + '\nRecebido (Received): ' + erro.recebido
            : String(erro);
          linha.appendChild(detalhe);
        }
        saida.appendChild(linha);
      });
    });
    const resumo = document.getElementById('resumo');
    resumo.textContent = 'Testes: ' + (falharam ? falharam + ' falharam, ' : '') + passaram + ' passaram' + (pendentes ? ', ' + pendentes + ' a fazer' : '') + ', ' + (passaram + falharam + pendentes) + ' no total';
    resumo.className = falharam ? 'resumo vermelho' : 'resumo verde';
  };
})();
