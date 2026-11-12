const PedalaRegras = (function () {
  const IDADE_MINIMA = 16;
  const DESBLOQUEIO = 3;
  const POR_MINUTO_AVULSO = 0.5;
  const TETO_AVULSO = 40;
  const FRANQUIA_PLANO = 45;
  const POR_MINUTO_PLANO = 0.4;
  const DESCONTO_ESTUDANTE = 50;
  const MULTA_FORA_DA_ESTACAO = 15;
  const SALDO_MINIMO = 5;

  function centavos(valor) {
    return Math.round(valor * 100) / 100;
  }

  function validarIdade(idade) {
    return Number.isInteger(idade) && idade >= IDADE_MINIMA;
  }

  function validarCodigoBike(codigo) {
    return /^BK\d{4}$/.test(String(codigo).trim());
  }

  function paraMinutos(hora) {
    const partes = String(hora).split(':');
    return Number(partes[0]) * 60 + Number(partes[1]);
  }

  function calcularMinutos(inicio, fim) {
    const minutos = paraMinutos(fim) - paraMinutos(inicio);
    return minutos > 0 ? minutos : 0;
  }

  function valorAvulso(minutos) {
    return centavos(Math.min(DESBLOQUEIO + minutos * POR_MINUTO_AVULSO, TETO_AVULSO));
  }

  function valorPlano(minutos) {
    const excedente = Math.max(0, minutos - FRANQUIA_PLANO);
    return centavos(excedente * POR_MINUTO_PLANO);
  }

  function valorViagem(viagem) {
    let valor;
    if (viagem.plano) {
      valor = valorPlano(viagem.minutos);
    } else {
      valor = Math.min(DESBLOQUEIO + viagem.minutos * POR_MINUTO_AVULSO, TETO_AVULSO);
      if (viagem.estudante) {
        valor = valor * (100 - DESCONTO_ESTUDANTE) / 100;
      }
    }
    if (viagem.foraDaEstacao) {
      valor = valor + MULTA_FORA_DA_ESTACAO;
    }
    return centavos(valor);
  }

  function podeIniciar(saldo, plano) {
    if (plano) {
      return { ok: true };
    }
    if (saldo < SALDO_MINIMO) {
      return { ok: false, motivo: 'Saldo mínimo de R$ 5,00 para viagens avulsas.' };
    }
    return { ok: true };
  }

  function bonusRecarga(valor) {
    if (valor >= 100) {
      return centavos(valor * 0.2);
    }
    if (valor >= 50) {
      return centavos(valor * 0.1);
    }
    return 0;
  }

  function formatarMoeda(valor) {
    return 'R$ ' + valor.toFixed(2).replace('.', ',');
  }

  return {
    validarIdade: validarIdade,
    validarCodigoBike: validarCodigoBike,
    calcularMinutos: calcularMinutos,
    valorAvulso: valorAvulso,
    valorPlano: valorPlano,
    valorViagem: valorViagem,
    podeIniciar: podeIniciar,
    bonusRecarga: bonusRecarga,
    formatarMoeda: formatarMoeda
  };
})();

if (typeof module !== 'undefined') {
  module.exports = PedalaRegras;
}