// Barra de meta dos eventos. A conta usa o data-arrecadado e o data-meta do HTML (em centavos)

const metas = document.querySelectorAll('.meta');

for (const meta of metas) {
  const arrecadado = Number(meta.dataset.arrecadado);
  const objetivo = Number(meta.dataset.meta);

  // número errado no HTML: deixa o texto que já está na página
  if (!(arrecadado >= 0) || !(objetivo > 0)) {
    continue;
  }

  // floor para 99,9% não virar 100%
  const porcentagem = Math.floor((arrecadado / objetivo) * 100);

  const barra = meta.querySelector('progress');
  barra.max = objetivo;
  barra.value = Math.min(arrecadado, objetivo);
  barra.textContent = porcentagem + '%';

  meta.querySelector('.meta-texto').textContent =
    formatarReais(arrecadado) + ' de ' + formatarReais(objetivo) + ' (' + porcentagem + '%)';

  const falta = meta.querySelector('.meta-falta');
  if (arrecadado >= objetivo) {
    falta.textContent = 'Meta atingida! Obrigado a todos que ajudaram.';
    meta.classList.add('meta-atingida');
  } else {
    falta.textContent = 'Faltam ' + formatarReais(objetivo - arrecadado) + ' para a meta.';
  }
}
