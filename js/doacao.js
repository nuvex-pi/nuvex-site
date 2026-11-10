// Como ajudar: copiar a chave Pix e simulador de doação

const botaoCopiar = document.getElementById('copiar-pix');
const avisoPix = document.getElementById('aviso-pix');

// o clipboard só funciona com https ou no localhost. Sem ele o botão nem aparece
if (navigator.clipboard) {
  botaoCopiar.hidden = false;

  botaoCopiar.addEventListener('click', function () {
    const chave = document.getElementById('chave-pix').textContent.trim();

    navigator.clipboard.writeText(chave)
      .then(function () {
        avisoPix.textContent = 'Chave copiada! Agora cole no aplicativo do seu banco.';
        avisoPix.classList.remove('aviso-erro');
      })
      .catch(function () {
        avisoPix.textContent = 'Não foi possível copiar. Selecione a chave e copie à mão.';
        avisoPix.classList.add('aviso-erro');
      });
  });
}

// Simulador

const formSimulador = document.getElementById('form-simulador');
const campoValor = document.getElementById('valor-mensal');
const erroValor = document.getElementById('erro-valor');
const resultado = document.getElementById('resultado-simulador');

document.getElementById('simulador').hidden = false;

// "20", "20,50", "20.50" ou "1.500,00" -> centavos. Retorna null se não for número
function lerCentavos(texto) {
  let limpo = texto.trim().replace('R$', '').trim();

  if (limpo.includes(',')) {
    // ponto de milhar e vírgula nos centavos
    limpo = limpo.replaceAll('.', '').replace(',', '.');
  } else if (!/^\d+\.\d{1,2}$/.test(limpo)) {
    // "1.500" é mil e quinhentos, não 1,5
    limpo = limpo.replaceAll('.', '');
  }

  if (limpo === '' || isNaN(limpo)) {
    return null;
  }
  return Math.round(Number(limpo) * 100);
}

formSimulador.addEventListener('submit', function (evento) {
  evento.preventDefault();

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
