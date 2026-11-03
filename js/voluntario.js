// Formulário de voluntário: confere os campos e abre o WhatsApp com a mensagem pronta.
// Nada é salvo nem enviado pelo site (LGPD). A mensagem só chega à APAE
// se a própria pessoa tocar em "Enviar" no WhatsApp.

// TODO: número oficial da APAE, só com números (ex.: 5519...). Enquanto estiver vazio,
// o WhatsApp pede para a pessoa escolher para quem mandar.
const whatsappApae = '';

const formVoluntario = document.getElementById('form-voluntario');
const campoNome = document.getElementById('nome');
const campoArea = document.getElementById('area');
const campoMensagem = document.getElementById('mensagem');

// Sem JS o formulário fica escondido: se fosse enviado, o nome iria parar na URL
formVoluntario.hidden = false;

// Mostra ou apaga a mensagem de erro de um campo
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

  // Leva o foco para o primeiro campo com problema
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

  // encodeURIComponent troca espaços, acentos e quebras de linha por códigos que podem ir no link
  const link = 'https://wa.me/' + whatsappApae + '?text=' + encodeURIComponent(texto);

  if (confirm('O WhatsApp vai abrir com a sua mensagem pronta. Ela só é enviada se você tocar em "Enviar". Deseja continuar?')) {
    window.open(link, '_blank', 'noopener');
  }
});
