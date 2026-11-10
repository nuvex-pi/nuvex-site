// Usado em todas as páginas: menu do celular, tamanho da letra e aviso do WhatsApp

// o CSS usa essa classe para fechar o menu do celular (sem JS ele fica aberto)
document.documentElement.classList.add('js');

// valores em centavos para não ter erro de arredondamento. Ex.: 150000 -> R$ 1.500,00
function formatarReais(centavos) {
  return (centavos / 100).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

// Menu do celular

const botaoMenu = document.getElementById('botao-menu');
const menu = document.getElementById('menu');

botaoMenu.hidden = false;

botaoMenu.addEventListener('click', function () {
  const aberto = menu.classList.toggle('aberto');
  botaoMenu.setAttribute('aria-expanded', aberto);
});

// Tamanho da letra

const tamanhos = [100, 112.5, 125, 137.5, 150]; // em %, 112.5% = 18px
const botaoMenos = document.getElementById('diminuir-letra');
const botaoMais = document.getElementById('aumentar-letra');
let tamanhoAtual = 1;

// pega o tamanho salvo nas outras páginas (o localStorage pode estar bloqueado)
try {
  const salvo = localStorage.getItem('tamanhoLetra');
  if (salvo !== null && tamanhos[salvo] !== undefined) {
    tamanhoAtual = Number(salvo);
  }
} catch (erro) {
  // fica o tamanho padrão
}

function aplicarTamanho() {
  document.documentElement.style.fontSize = tamanhos[tamanhoAtual] + '%';
  botaoMenos.disabled = tamanhoAtual === 0;
  botaoMais.disabled = tamanhoAtual === tamanhos.length - 1;
  try {
    localStorage.setItem('tamanhoLetra', tamanhoAtual);
  } catch (erro) {
    // não salvou, mas a letra muda igual
  }
}

// scrollIntoView: com a letra maior o menu cresce e o botão saía da tela
botaoMenos.addEventListener('click', function () {
  if (tamanhoAtual > 0) {
    tamanhoAtual--;
    aplicarTamanho();
    botaoMenos.scrollIntoView({ block: 'nearest' });
  }
});

botaoMais.addEventListener('click', function () {
  if (tamanhoAtual < tamanhos.length - 1) {
    tamanhoAtual++;
    aplicarTamanho();
    botaoMais.scrollIntoView({ block: 'nearest' });
  }
});

document.getElementById('controle-letra').hidden = false;
aplicarTamanho();

// Aviso antes de sair para o WhatsApp

const linksWhatsapp = document.querySelectorAll('a[data-whatsapp]');

for (const link of linksWhatsapp) {
  link.addEventListener('click', function (evento) {
    const continuar = confirm('Você vai sair do site e abrir o WhatsApp. Deseja continuar?');
    if (!continuar) {
      evento.preventDefault();
    }
  });
}
