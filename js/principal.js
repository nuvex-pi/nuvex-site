// Funções usadas em todas as páginas: menu do celular, tamanho da letra
// e aviso antes de abrir o WhatsApp.

// Avisa o CSS que o JavaScript está rodando (ver .js .menu no estilo.css)
document.documentElement.classList.add('js');

// Formata um valor em centavos como dinheiro: 150000 -> "R$ 1.500,00".
// Os valores ficam em centavos (número inteiro) porque conta com decimal no JS
// pode dar erro de arredondamento: 0.1 + 0.2 dá 0.30000000000000004.
function formatarReais(centavos) {
  return (centavos / 100).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

// ---------- Menu do celular ----------

const botaoMenu = document.getElementById('botao-menu');
const menu = document.getElementById('menu');

botaoMenu.hidden = false;

botaoMenu.addEventListener('click', function () {
  const aberto = menu.classList.toggle('aberto');
  // aria-expanded avisa o leitor de tela se o menu está aberto
  botaoMenu.setAttribute('aria-expanded', aberto);
});

// ---------- Tamanho da letra (A+ e A-) ----------

const tamanhos = [100, 112.5, 125, 137.5, 150]; // em %, 112.5% = 18px
const botaoMenos = document.getElementById('diminuir-letra');
const botaoMais = document.getElementById('aumentar-letra');
let tamanhoAtual = 1;

// A escolha fica salva no navegador para valer nas outras páginas.
// O try/catch é porque o localStorage pode estar bloqueado (ex.: janela anônima).
try {
  const salvo = localStorage.getItem('tamanhoLetra');
  if (salvo !== null && tamanhos[salvo] !== undefined) {
    tamanhoAtual = Number(salvo);
  }
} catch (erro) {
  // sem localStorage, fica o tamanho padrão
}

function aplicarTamanho() {
  document.documentElement.style.fontSize = tamanhos[tamanhoAtual] + '%';
  botaoMenos.disabled = tamanhoAtual === 0;
  botaoMais.disabled = tamanhoAtual === tamanhos.length - 1;
  try {
    localStorage.setItem('tamanhoLetra', tamanhoAtual);
  } catch (erro) {
    // não salvou, mas a letra muda do mesmo jeito
  }
}

botaoMenos.addEventListener('click', function () {
  if (tamanhoAtual > 0) {
    tamanhoAtual--;
    aplicarTamanho();
  }
});

botaoMais.addEventListener('click', function () {
  if (tamanhoAtual < tamanhos.length - 1) {
    tamanhoAtual++;
    aplicarTamanho();
  }
});

document.getElementById('controle-letra').hidden = false;
aplicarTamanho();

// ---------- Aviso antes de sair para o WhatsApp ----------

const linksWhatsapp = document.querySelectorAll('a[data-whatsapp]');

for (const link of linksWhatsapp) {
  link.addEventListener('click', function (evento) {
    const continuar = confirm('Você vai sair do site e abrir o WhatsApp. Deseja continuar?');
    if (!continuar) {
      evento.preventDefault();
    }
  });
}
