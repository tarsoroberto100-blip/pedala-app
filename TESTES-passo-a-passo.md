# Testes unitários com Jest — passo a passo

Hoje você vai testar o **Pedala**, o sistema de bicicletas compartilhadas da cidade, com o **Jest**: a ferramenta de testes mais usada no mercado JavaScript.

> Teste unitário: um pedaço de código que chama **uma função**, com **dados conhecidos**, e confere se o **resultado** é o que o requisito diz.

---

## 1. Preparar o ambiente

No terminal do VS Code (**Ctrl + '**), dentro da pasta do seu repositório:

| # | Comando | O que deve aparecer |
| --- | --- | --- |
| 1 | `node -v` | Um número de versão, como `v20.11.0` |
| 2 | `npm install` | Baixa o Jest. Leva de 1 a 2 minutos. No fim aparece `added ... packages` |
| 3 | `npm test` | `Tests: 13 todo, 1 passed, 14 total` |

**Deu erro no passo 1?** O Node.js não está instalado: use o plano B (seção 9).
**Deu erro no passo 2?** Chame o professor. Enquanto isso, use o plano B.

A pasta `node_modules` que apareceu é o Jest. Ela **não vai para o GitHub**: o `.gitignore` já cuida disso.

---

## 2. Como ler o resultado do Jest

```
PASS  tests/regras.test.js
  Exemplo · valorAvulso
    ✓ viagem avulsa de 10 minutos custa R$ 8,00 (2 ms)
  RN01 · validarIdade
    ✎ todo Teste 1: aceita 16 anos

Tests:       13 todo, 1 passed, 14 total
```

| Você vê | Significa |
| --- | --- |
| `PASS` | Todos os testes do arquivo passaram |
| `FAIL` | Pelo menos um teste falhou |
| `✓` | Teste passou |
| `✕` | Teste falhou: role para cima e leia `Expected` (esperado) e `Received` (recebido) |
| `✎ todo` | Teste ainda não escrito |

Um teste que falha aparece assim:

```
  ● RN10 · bonusRecarga › Teste 11: recarga de R$ 50 ganha R$ 5 de bônus

    expect(received).toBe(expected)

    Expected: 5
    Received: 0
```

---

## 3. O padrão de todo teste: preparar → agir → verificar

```js
test('viagem avulsa de 10 minutos custa R$ 8,00', () => {
  const minutos = 10;                       // 1. PREPARAR: os dados

  const resultado = R.valorAvulso(minutos); // 2. AGIR: chama a função

  expect(resultado).toBe(8);                // 3. VERIFICAR: compara
});
```

**De onde vem o 8?** Do `REQUISITOS-Pedala.md` (RN04: R$ 3,00 + 10 × R$ 0,50). **Nunca do código.**

| Peça | Para que serve |
| --- | --- |
| `describe('nome', () => { ... })` | Agrupa os testes de uma regra |
| `test('nome', () => { ... })` | Um teste, um comportamento |
| `expect(valor).toBe(x)` | Confere se é exatamente x |
| `expect(objeto.ok).toBe(true)` | Confere um campo de um objeto |
| `test.todo('nome')` | Teste que ainda falta escrever |

O `R` no começo do arquivo são as regras do Pedala: `R.validarIdade(...)`, `R.valorAvulso(...)` e assim por diante. A lista está no fim de `app/js/regras.js`.

---

## 4. Prática 1 — os 12 testes guiados

Abra `tests/regras.test.js`. Cada `test.todo(...)` vira um teste completo. **Depois de cada teste: salve e rode `npm test`.**

### Testes 1 a 4: digite exatamente assim

```js
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
```

### Testes 5 a 12: complete o que falta

Use o `REQUISITOS-Pedala.md` para descobrir **cada valor esperado**. Faça a conta no papel antes.

| Teste | Regra | Chame | Esperado |
| --- | --- | --- | --- |
| 5 | RN03 | `R.calcularMinutos('08:10', '08:35')` | ? minutos |
| 6 | RN04 | `R.valorAvulso(30)` | ? reais |
| 7 | RN06 | `R.valorAvulso(100)` | ? reais |
| 8 | RN05 | `R.valorPlano(45)` | ? reais |
| 9 | RN05 | `R.valorPlano(50)` | ? reais |
| 10 | RN10 | `R.bonusRecarga(49)` | ? reais de bônus |
| 11 | RN10 | `R.bonusRecarga(50)` | ? reais de bônus |
| 12 | RN10 | `R.bonusRecarga(100)` | ? reais de bônus |

Valores em reais são escritos como números: R$ 18,00 é `18`; R$ 2,50 é `2.5`.

**Por que 45 e 50? Por que 49, 50 e 100?** É a técnica de **valor limite**: testar exatamente onde a regra muda.

---

## 5. Um teste ficou vermelho. E agora?

1. Leia o `Expected` e o `Received`.
2. **Confira o seu teste** com o requisito. O esperado está certo? Digitou certo?
3. O teste está certo? Então o **código** está errado: você achou um defeito.
4. **Abra uma Issue** com o modelo “Relatório de defeito”. Nos passos, o comando `npm test` e o nome do teste; no esperado e no obtido, os valores do Jest; na evidência, o print do terminal.
5. **Nunca troque o esperado para o teste passar.** Isso é desligar o alarme de incêndio.

---

## 6. Prática 2 — correção guiada pelos testes

Para cada teste vermelho dos testes guiados, siga o ciclo:

| # | Passo | Comando ou ação |
| --- | --- | --- |
| 1 | Ver o vermelho | `npm test` |
| 2 | Achar a função | Abra `app/js/regras.js` e procure a função que o teste chama |
| 3 | Comparar com a regra | Leia a função linha por linha ao lado do requisito. Onde ela desobedece? |
| 4 | Corrigir | Mude **só** o necessário. Salve |
| 5 | Ver o verde | `npm test`: o teste ficou verde **e nenhum outro ficou vermelho**? |
| 6 | Registrar | `git add .` → `git commit -m "fix: descricao curta (closes #N)"` → `git push` |

**Dica:** nos dois vermelhos dos testes guiados, o problema está num **sinal de comparação**. Compare com as palavras do requisito: “16 anos **ou mais**”, “**a partir de** R$ 50,00”.

O passo 5 é o grande ganho do teste automatizado: você confere **todas** as regras de uma vez, em menos de um segundo. Isso é **teste de regressão automático**.

---

## 7. Cobertura — quanto do código os seus testes executam

```
npm run cobertura
```

O Jest roda os testes e mostra uma tabela:

```
File       | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s
regras.js  |   ...   |   ...    |   ...   |   ...   | 44-56,59-66,...
```

| Coluna | Significa |
| --- | --- |
| `% Lines` | Porcentagem das linhas de `regras.js` que algum teste executou |
| `% Branch` | Porcentagem dos caminhos dos `if` que algum teste percorreu |
| `% Funcs` | Porcentagem das funções que algum teste chamou |
| `Uncovered Line #s` | As linhas que **nenhum** teste executou |

**Veja no navegador:** abra `coverage/index.html` com o Live Server → clique em `regras.js`. Linhas com fundo **vermelho** nunca foram executadas. Um `I` ou `E` amarelo marca um `if` ou `else` que nenhum teste percorreu.

**Na aula:** escreva no bloco `Cobertura` três testes de `R.valorViagem`: avulsa de 20 min na estação, estudante com 100 min e plano com 60 min fora da estação. Rode `npm run cobertura` de novo e tire o print.

**Desafio para casa (meta da RNF03: 90% das linhas):** os outros casos da tabela. O valor esperado sai sempre do requisito:

| Função | Casos para testar |
| --- | --- |
| `R.valorViagem({ plano, minutos, estudante, foraDaEstacao })` | avulsa de 20 min · estudante, 20 min · estudante, 100 min · avulsa fora da estação · plano, 30 min · plano, 60 min, fora da estação |
| `R.podeIniciar(saldo, plano)` | avulso com R$ 4,99 · avulso com R$ 5,00 · assinante com R$ 0 |
| `R.formatarMoeda(valor)` | `1234.5` |
| `R.validarCodigoBike(codigo)` | `'bk0123'` em minúsculas · `' BK0123 '` com espaços |
| `R.calcularMinutos(inicio, fim)` | devolução antes da retirada |

Exemplo de teste com objeto:

```js
test('avulsa de 20 minutos, devolvida na estação', () => {
  const viagem = { plano: false, minutos: 20, estudante: false, foraDaEstacao: false };

  const resultado = R.valorViagem(viagem);

  expect(resultado).toBe(13);
});
```

> Cobertura alta não prova que o código está certo. Ela mostra **onde você ainda não olhou**.

---

## 8. Desafio para casa

Os testes de cobertura vão revelar mais defeitos. Para cada vermelho confirmado: Issue, correção guiada pelo teste (seção 6) e commit com `closes #N`.

---

## 9. Plano B — sem Node.js

Abra `tests/rodar-no-navegador.html` com o Live Server. Ele roda o **mesmo** `regras.test.js`, com a mesma escrita. A cada teste: salve e aperte **F5** nessa aba. Só a cobertura (seção 7) não funciona no navegador: no lugar dela, preencha a tabela de cobertura do relatório à mão.

---

## 10. Entrega

1. `tests/regras.test.js` com os 12 testes guiados e os 3 de cobertura (15 testes no total).
2. Os 2 defeitos dos testes guiados corrigidos, cada um com o commit `closes #N`.
3. Copie `modelos/RELATORIO-TESTES-modelo.md` para `entregas/RELATORIO-TESTES-Pedala.md` e preencha, com os prints do `npm test` e do `npm run cobertura`.
4. `git add .` → `git commit -m "test: suite de testes do Pedala"` → `git push`.
