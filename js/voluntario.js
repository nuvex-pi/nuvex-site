// Formulário de voluntário: confere os campos e abre o WhatsApp com a mensagem pronta.
// O site não salva nem envia nada

// TODO: número oficial da APAE, só números (ex.: 5519...). Vazio, o WhatsApp pede o contato
const whatsappApae = '';

const formVoluntario = document.getElementById('form-voluntario');
const campoNome = document.getElementById('nome');
const campoArea = document.getElementById('area');
const campoMensagem = document.getElementById('mensagem');

// o form começa escondido: sem JS ele mandaria o nome pela URL
formVoluntario.hidden = false;

function marcarErro(idErro, campo, mensagem) {
  document.getElementById(idErro).textContent = mensagem;
  if (campo) {
    if (mensagem) {
      campo.setAttribute('aria-invalid', 'true');
    } else {
      campo.removeAttribute('aria-invalid');
    }
  }
}

formVoluntario.addEventListener('submit', function (evento) {
  evento.preventDefault();

  const nome = campoNome.value.trim();
  const area = campoArea.value;
  const periodos = [];
  for (const caixa of document.querySelectorAll('input[name="periodo"]:checked')) {
    periodos.push(caixa.value);
  }

  let primeiroErro = null;

  if (nome.length < 2) {
    marcarErro('erro-nome', campoNome, 'Digite o seu nome.');
    primeiroErro = primeiroErro || campoNome;
  } else {
    marcarErro('erro-nome', campoNome, '');
  }

  if (area === '') {
    marcarErro('erro-area', campoArea, 'Escolha como você quer ajudar.');
    primeiroErro = primeiroErro || campoArea;
  } else {
    marcarErro('erro-area', campoArea, '');
  }

  if (periodos.length === 0) {
    marcarErro('erro-periodo', null, 'Marque pelo menos um horário.');
    primeiroErro = primeiroErro || document.querySelector('input[name="periodo"]');
  } else {
    marcarErro('erro-periodo', null, '');
  }

  if (primeiroErro) {
    primeiroErro.focus();
    return;
  }

  let texto = 'Olá! Meu nome é ' + nome + ' e quero ser voluntário(a) da APAE.\n'
    + 'Como quero ajudar: ' + area.toLowerCase() + '.\n'
    + 'Posso ajudar: ' + periodos.join(', ') + '.';

  const mensagem = campoMensagem.value.trim();
  if (mensagem !== '') {
    texto += '\n' + mensagem;
  }

  const link = 'https://wa.me/' + whatsappApae + '?text=' + encodeURIComponent(texto);

  if (confirm('O WhatsApp vai abrir com a sua mensagem pronta. Ela só é enviada se você tocar em "Enviar". Deseja continuar?')) {
    window.open(link, '_blank', 'noopener');
  }
});
