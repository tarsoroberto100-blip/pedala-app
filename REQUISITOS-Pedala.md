# Pedala — Documento de Requisitos

**Produto:** Pedala, sistema de bicicletas compartilhadas da cidade
**Plataforma:** web (navegadores atuais)
**Versão:** 1.0
**Autor:** Equipe de desenvolvimento do Pedala

> Este é o documento oficial. Ele diz o que é comportamento correto. Se o sistema faz diferente do que está aqui, é defeito.

---

## 1. Contexto

O ciclista retira uma bicicleta numa estação, pedala e devolve em qualquer estação. Ele pode pagar cada viagem (avulsa) ou ser assinante do plano mensal. O sistema calcula o valor da viagem, controla o saldo da carteira e as recargas.

## 2. Tabela de preços

| Item | Viagem avulsa | Plano mensal |
| --- | --- | --- |
| Desbloqueio | R$ 3,00 | grátis |
| Minutos incluídos | nenhum | 45 minutos por viagem |
| Minuto | R$ 0,50 | R$ 0,40 (só o que passar de 45) |
| Teto por viagem | R$ 40,00 | sem teto |

## 3. Regras de negócio

**RN01 — Idade.** O ciclista precisa ter **16 anos ou mais**.

**RN02 — Código da bicicleta.** O código tem **BK em letras maiúsculas** seguido de **4 números**. Exemplo: `BK0123`. Espaços no começo e no fim são ignorados.

**RN03 — Duração.** A duração da viagem é a quantidade de minutos entre a hora de retirada e a hora de devolução, no mesmo dia. Se a devolução não for depois da retirada, a duração é 0.

**RN04 — Viagem avulsa.** Valor = R$ 3,00 de desbloqueio + R$ 0,50 por minuto.

**RN05 — Plano mensal.** Os primeiros **45 minutos** de cada viagem são grátis. Cada minuto acima de 45 custa R$ 0,40.

**RN06 — Teto.** Uma viagem avulsa custa no máximo **R$ 40,00**.

**RN07 — Estudante.** Estudantes têm 50% de desconto na viagem avulsa. O desconto é aplicado **depois do teto**: o estudante paga no máximo R$ 20,00 por viagem. O desconto não vale para o plano mensal.

**RN08 — Devolução fora da estação.** A bicicleta devolvida fora de uma estação gera multa de **R$ 15,00**, somada ao valor da viagem. A multa vale para **todos**: avulso e plano mensal, estudante ou não.

**RN09 — Saldo mínimo.** A viagem avulsa só começa com saldo de pelo menos R$ 5,00. Assinante do plano não precisa de saldo.

**RN10 — Bônus de recarga.** Recarga **a partir de R$ 50,00** ganha 10% de bônus. A partir de R$ 100,00, ganha 20%. Abaixo de R$ 50,00, não há bônus.

## 4. Requisitos não-funcionais

**RNF01 — Persistência.** O saldo e o histórico continuam salvos depois de recarregar a página.

**RNF02 — Testabilidade.** Todas as regras ficam em `app/js/regras.js`, em funções que recebem os dados e devolvem o resultado, sem depender da tela.

**RNF03 — Qualidade.** A versão só vai para produção com todos os testes unitários passando e **cobertura de pelo menos 90% das linhas** de `regras.js`.
