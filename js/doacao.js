// Página "Como ajudar": botão de copiar a chave Pix e simulador de doação.

// ---------- Copiar a chave Pix ----------

const botaoCopiar = document.getElementById('copiar-pix');
const avisoPix = document.getElementById('aviso-pix');

// navigator.clipboard só existe em sites com HTTPS (ou no próprio computador).
// Sem ele o botão continua escondido e a pessoa copia a chave à mão.
if (navigator.clipboard) {
  botaoCopiar.hidden = false;

  botaoCopiar.addEventListener('click', function () {
    const chave = document.getElementById('chave-pix').textContent.trim();

    // writeText devolve uma Promise: o then roda quando a cópia termina
    navigator.clipboard.writeText(chave)
      .then(function () {
        avisoPix.textContent = 'Chave copiada! Agora cole no aplicativo do seu banco.';
      })
      .catch(function () {
        avisoPix.textContent = 'Não foi possível copiar. Selecione a chave e copie à mão.';
      });
  });
}

// ---------- Simulador "Quanto a sua doação ajuda?" ----------

const formSimulador = document.getElementById('form-simulador');
const campoValor = document.getElementById('valor-mensal');
const erroValor = document.getElementById('erro-valor');
const resultado = document.getElementById('resultado-simulador');

document.getElementById('simulador').hidden = false;

// Converte o texto digitado ("20", "20,50", "20.50" ou "1.500,00") para centavos.
// Devolve null se não for um valor válido.
function lerCentavos(texto) {
  let limpo = texto.trim().replace('R$', '').trim();

  if (limpo.includes(',')) {
    // jeito brasileiro: ponto separa milhar e vírgula separa os centavos
    limpo = limpo.replaceAll('.', '').replace(',', '.');
  } else if (!/^\d+\.\d{1,2}$/.test(limpo)) {
    // "1.500" é mil e quinhentos; só "20.5" ou "20.50" contam como centavos
    limpo = limpo.replaceAll('.', '');
  }

  if (limpo === '' || isNaN(limpo)) {
    return null;
  }
  return Math.round(Number(limpo) * 100);
}

formSimulador.addEventListener('submit', function (evento) {
  evento.preventDefault(); // não recarrega a página

  const centavos = lerCentavos(campoValor.value);
  resultado.textContent = '';

  if (centavos === null || centavos <= 0) {
    erroValor.textContent = 'Digite um valor maior que zero, por exemplo 20 ou 20,50.';
    campoValor.setAttribute('aria-invalid', 'true');
    campoValor.focus();
    return;
  }

  if (centavos > 10000000) {
    erroValor.textContent = 'Digite um valor de até R$ 100.000,00.';
    campoValor.setAttribute('aria-invalid', 'true');
    campoValor.focus();
    return;
  }

  erroValor.textContent = '';
  campoValor.removeAttribute('aria-invalid');
  resultado.textContent = 'Doando ' + formatarReais(centavos) + ' por mês, você ajuda a APAE com '
    + formatarReais(centavos * 12) + ' em um ano. Obrigado!';
});
