const CHAVE = 'pedala_dados';

let dados = carregar();

function carregar() {
  try {
    const salvo = localStorage.getItem(CHAVE);
    return salvo ? JSON.parse(salvo) : { saldo: 0, historico: [] };
  } catch (erro) {
    return { saldo: 0, historico: [] };
  }
}

function salvar() {
  try {
    localStorage.setItem(CHAVE, JSON.stringify(dados));
  } catch (erro) {
    return;
  }
}

function el(id) {
  return document.getElementById(id);
}

function mostrar(id, texto, tipo) {
  el(id).textContent = texto;
  el(id).className = 'mensagem' + (tipo ? ' ' + tipo : '');
}

function lerViagem() {
  const minutos = PedalaRegras.calcularMinutos(el('inicio').value, el('fim').value);
  return {
    codigo: el('codigo').value,
    idade: Number(el('idade').value),
    minutos: minutos,
    plano: el('plano').checked,
    estudante: el('estudante').checked,
    foraDaEstacao: el('foraDaEstacao').checked
  };
}

function atualizarResumo() {
  const v = lerViagem();
  el('estudante').disabled = v.plano;
  el('rMinutos').textContent = v.minutos + ' min';
  el('rValor').textContent = PedalaRegras.formatarMoeda(PedalaRegras.valorViagem(v));
}

function atualizarBonus() {
  const valor = Number(el('recarga').value) || 0;
  const bonus = PedalaRegras.bonusRecarga(valor);
  el('ajudaBonus').textContent = bonus > 0
    ? 'Bônus desta recarga: ' + PedalaRegras.formatarMoeda(bonus)
    : 'Recargas a partir de R$ 50,00 ganham bônus.';
}

function registrar(texto) {
  const agora = new Date();
  const hora = String(agora.getHours()).padStart(2, '0') + ':' + String(agora.getMinutes()).padStart(2, '0');
  dados.historico.unshift(hora + ' · ' + texto);
  salvar();
  renderizar();
}

function recarregar() {
  const valor = Number(el('recarga').value);
  if (!(valor > 0)) {
    mostrar('msgCarteira', 'Informe um valor maior que zero.', 'erro');
    return;
  }
  const bonus = PedalaRegras.bonusRecarga(valor);
  dados.saldo = Math.round((dados.saldo + valor + bonus) * 100) / 100;
  mostrar('msgCarteira', 'Recarga de ' + PedalaRegras.formatarMoeda(valor) + (bonus > 0 ? ' + bônus de ' + PedalaRegras.formatarMoeda(bonus) : '') + '.', 'ok');
  registrar('Recarga de ' + PedalaRegras.formatarMoeda(valor + bonus));
}

function finalizar(evento) {
  evento.preventDefault();
  const v = lerViagem();
  if (!PedalaRegras.validarIdade(v.idade)) {
    mostrar('msgViagem', 'O Pedala é para maiores de 16 anos.', 'erro');
    return;
  }
  if (!PedalaRegras.validarCodigoBike(v.codigo)) {
    mostrar('msgViagem', 'Código inválido. Use BK e 4 números, como BK0123.', 'erro');
    return;
  }
  if (v.minutos === 0) {
    mostrar('msgViagem', 'A devolução precisa ser depois da retirada.', 'erro');
    return;
  }
  const inicio = PedalaRegras.podeIniciar(dados.saldo, v.plano);
  if (!inicio.ok) {
    mostrar('msgViagem', inicio.motivo, 'erro');
    return;
  }
  const valor = PedalaRegras.valorViagem(v);
  dados.saldo = Math.round((dados.saldo - valor) * 100) / 100;
  mostrar('msgViagem', 'Viagem de ' + v.minutos + ' min com a ' + v.codigo.trim() + ': ' + PedalaRegras.formatarMoeda(valor) + '.', 'ok');
  registrar('Viagem ' + v.codigo.trim() + ', ' + v.minutos + ' min' + (v.plano ? ' (plano)' : '') + ': ' + PedalaRegras.formatarMoeda(valor));
}

function limpar() {
  dados = { saldo: 0, historico: [] };
  salvar();
  mostrar('msgCarteira', '');
  mostrar('msgViagem', '');
  renderizar();
}

function renderizar() {
  el('saldoTopo').textContent = PedalaRegras.formatarMoeda(dados.saldo);
  const lista = el('listaHistorico');
  lista.innerHTML = '';
  if (dados.historico.length === 0) {
    const vazio = document.createElement('li');
    vazio.textContent = 'Nenhuma movimentação ainda.';
    lista.appendChild(vazio);
  }
  dados.historico.forEach(function (linha) {
    const li = document.createElement('li');
    li.textContent = linha;
    lista.appendChild(li);
  });
  atualizarResumo();
  atualizarBonus();
}

el('formViagem').addEventListener('input', atualizarResumo);
el('formViagem').addEventListener('change', atualizarResumo);
el('formViagem').addEventListener('submit', finalizar);
el('recarga').addEventListener('input', atualizarBonus);
el('recarregar').addEventListener('click', recarregar);
el('limpar').addEventListener('click', limpar);
renderizar();
