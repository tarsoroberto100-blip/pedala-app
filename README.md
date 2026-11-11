# Pedala — Testes unitários com Jest

O **Pedala** é o sistema de bicicletas compartilhadas da cidade. A versão 1.0 só vai para produção com **todos os testes unitários passando** e **cobertura de pelo menos 90%** das regras (RNF03).

Você vai escrever esses testes, encontrar os defeitos e corrigir o código guiado pelos testes.

## O que tem neste repositório

```
pedala-testes/
├── README.md                         ← este arquivo
├── REQUISITOS-Pedala.md              ← documento oficial: a fonte da verdade
├── TESTES-passo-a-passo.md           ← guia da aula
├── package.json                      ← configuração do Jest
├── app/                              ← o Pedala (abra app/index.html)
│   └── js/regras.js                  ← as regras que você vai testar
├── tests/
│   ├── regras.test.js                ← ONDE VOCÊ ESCREVE OS TESTES
│   ├── rodar-no-navegador.html       ← plano B, sem Node.js
│   └── mini-jest.js                  ← usado pelo plano B (não mexa)
├── modelos/
│   └── RELATORIO-TESTES-modelo.md    ← modelo do relatório
├── entregas/                         ← seu relatório vai aqui
└── .github/ISSUE_TEMPLATE/           ← modelo de relatório de defeito
```

## Passo 1 — Criar o seu repositório

1. No topo desta página: **Use this template → Create a new repository**.
2. Nome: `pedala-testes-nome-sobrenome`, **Public** (ou Private com o professor como colaborador).
3. **Code** → copie o link → `git clone <link>` → abra a pasta no VS Code.
4. No GitHub, em **Issues → Labels**, crie: `severidade: crítica`, `severidade: alta`, `severidade: média`, `severidade: baixa`.

## Passo 2 — Instalar e rodar o Jest

No terminal do VS Code, dentro da pasta:

```
node -v
npm install
npm test
```

Resultado esperado: `Tests: 13 todo, 1 passed, 14 total`.

Sem Node.js? Abra `tests/rodar-no-navegador.html` com o Live Server (plano B).

## Passo 3 — Seguir o guia

Tudo está no [`TESTES-passo-a-passo.md`](TESTES-passo-a-passo.md): os 12 testes guiados, a correção guiada pelos testes e a cobertura.

## Comandos

| Comando | O que faz |
| --- | --- |
| `npm test` | Roda todos os testes |
| `npm run cobertura` | Roda os testes e gera o relatório de cobertura em `coverage/index.html` |

## Regras

- O valor esperado de cada teste vem do `REQUISITOS-Pedala.md`, **nunca** do código.
- Nunca troque o esperado para um teste passar.
- Corrija o código só depois de ter um teste vermelho que prove o defeito.
- Um commit por correção, com `closes #N`.

## Checklist de entrega

- [ ] 12 testes guiados + 3 testes de cobertura de `valorViagem` (15 no total)
- [ ] 2 defeitos dos testes guiados corrigidos, com Issue fechada por commit
- [ ] Print do relatório de cobertura (a meta da RNF03, 90%, é o desafio para casa)
- [ ] `entregas/RELATORIO-TESTES-Pedala.md` com os prints
- [ ] Commit e push feitos
