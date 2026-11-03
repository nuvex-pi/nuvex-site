// Barra de meta dos eventos.
// O HTML já vem com a barra e o texto escritos (funciona sem JS).
// Aqui o JS refaz a conta a partir do data-arrecadado e do data-meta (em centavos),
// então para atualizar um evento basta mudar esses dois números no HTML.

const metas = document.querySelectorAll('.meta');

for (const meta of metas) {
  const arrecadado = Number(meta.dataset.arrecadado);
  const objetivo = Number(meta.dataset.meta);

  // Se algum número estiver errado no HTML, deixa o texto que já está lá
  if (!(arrecadado >= 0) || !(objetivo > 0)) {
    continue;
  }

  // Math.floor para 99,9% não aparecer como 100% antes da hora
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
