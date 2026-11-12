# Relatório de testes unitários — Pedala v1.0

**Nome:** [Tarso

]
**Data:** 11/11/2026
**Ferramenta:** executor compatível com a API do Jest, sobre `node:test` do Node 22 (o `npm install` do Jest não tinha rede neste ambiente). O arquivo `tests/regras.test.js` é o mesmo e roda com `npm test` no seu computador.

> Os prints do terminal (`npm test` e `npm run cobertura`) precisam ser tirados por você, na sua máquina. Os números abaixo vêm das execuções reais feitas durante o trabalho.

## 1. Resultado dos testes

| Momento | Resumo |
| --- | --- |
| Depois dos 12 testes guiados | `2 failed, 11 passed, 13 executados` (Teste 1 e Teste 11 vermelhos; o bloco Cobertura ainda era `todo`) |
| Depois das correções guiadas (RN01 e RN10) | 12 guiados + exemplo verdes |
| No fim | `Tests: 31 passed, 31 total` (12 guiados + 1 exemplo + 3 de cobertura + 15 do desafio) |

Antes de qualquer correção, com os 31 testes: `6 failed, 25 passed`.

## 2. Defeitos encontrados pelos testes

| Teste que falhou | Regra | Esperado | Recebido | Issue | Corrigido? |
| --- | --- | --- | --- | --- | --- |
| Teste 1: aceita 16 anos | RN01 | `true` | `false` | #1 | Sim |
| Teste 11: recarga de R$ 50 | RN10 | `5` | `0` | #2 | Sim |
| Cobertura: estudante com 100 min | RN07 | `20` | `26.5` | #3 | Sim |
| Cobertura: plano 60 min fora da estação | RN08 | `21` | `6` | #4 | Sim |
| Desafio: estudante 100 min fora da estação | RN07 + RN08 | `35` | `41.5` | #3 e #4 | Sim |
| Desafio: recusa "bk0123" | RN02 | `false` | `true` | #5 | Sim |

(Os números das Issues são sugestões: use os que o GitHub criar. Os textos estão em `entregas/issues/`.)

## 3. Correções

**#1 · RN01 · `validarIdade`**
- Antes: `idade > IDADE_MINIMA`
- Depois: `idade >= IDADE_MINIMA`
- Depois da correção, o Teste 1 ficou verde e nenhum outro ficou vermelho.
- Extra: a mensagem da tela dizia "maiores de 16 anos"; passou a dizer "16 anos ou mais".

**#2 · RN10 · `bonusRecarga`**
- Antes: `if (valor > 50) {`
- Depois: `if (valor >= 50) {`

**#3 · RN07 · `valorViagem`**: o desconto era aplicado antes do teto. Agora o teto vem primeiro e o desconto depois (estudante paga no máximo R$ 20,00).
- Antes: `valor = valor * 0.5` e só depois `Math.min(valor, TETO_AVULSO)`
- Depois: `Math.min(DESBLOQUEIO + minutos * POR_MINUTO_AVULSO, TETO_AVULSO)` e só depois o desconto

**#4 · RN08 · `valorViagem`**: o plano mensal retornava antes de somar a multa.
- Antes: `if (viagem.plano) { return valorPlano(viagem.minutos); }`
- Depois: o valor do plano é calculado e segue para o `if (viagem.foraDaEstacao)`

**#5 · RN02 · `validarCodigoBike`**
- Antes: `/^BK\d{4}$/i`
- Depois: `/^BK\d{4}$/`

Depois das cinco correções: `31 passed, 31 total`.

## 4. Cobertura

| Momento | % Lines | % Branch | % Funcs |
| --- | --- | --- | --- |
| Depois dos 12 testes guiados | 74,23 | 86,67 | 75,00 |
| No fim da aula (código original + 15 testes) | 100,00 | 100,00 | 100,00 |
| No fim (todos os testes, código corrigido) | 100,00 | 100,00 | 100,00 |

Linhas sem teste após os guiados: 44-56, 59-66, 73-74, 79-80. Meta da RNF03: 90% das linhas. Atingida.

Print do relatório de cobertura: [cole aqui o print do seu `npm run cobertura`]

## 5. Reflexão

1. **Qual defeito você só achou porque o relatório de cobertura mostrou uma linha sem teste?** O de RN08 (multa do plano mensal) e o de RN07 (desconto antes do teto). Estavam em `valorViagem`, que os 12 guiados não chamavam.
2. **Como ter certeza de que a correção não quebrou outra regra?** Rodando `npm test` de novo: todos os testes rodam de uma vez, em menos de um segundo (teste de regressão automático).
3. **100% de cobertura garante que o código está certo?** Não. Cobertura mostra quais linhas foram executadas, não se o resultado conferido está certo. Um teste sem `expect`, ou com o valor esperado copiado do código, também dá 100%. Além disso, requisitos não escritos (ex.: separador de milhar) ficam fora.