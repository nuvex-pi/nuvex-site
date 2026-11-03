# Guia de testes do site

Roteiro para testar o site sozinho, no Windows.

## Abrir o site

- **Mais simples:** dois cliques no `index.html`.
- **Recomendado:** VS Code com a extensão **Live Server** → clique em *Go Live* no rodapé. A página recarrega sozinha quando você salva.
  - O botão "Copiar chave Pix" só aparece em `https://` ou no próprio computador (Live Server ou arquivo aberto direto). Isso é do navegador, não é erro.

## Funcionalidades em JavaScript

| Página | Teste | O que esperar |
|--------|-------|---------------|
| Todas | Clique em **A+** e **A-** | A letra aumenta e diminui. Ao trocar de página, o tamanho escolhido continua |
| Todas | Janela estreita (`Ctrl+Shift+M` no F12) → botão **Menu** | O menu abre e fecha |
| Início e Eventos | Mude `data-arrecadado` de um evento no HTML e recarregue | A barra, o texto e o "Faltam R$ ..." mudam juntos |
| Eventos | Festa junina (arrecadou mais que a meta) | Barra cheia e verde, "Meta atingida!" |
| Como ajudar | **Copiar chave Pix** | Aparece "Chave copiada!" e a chave cola no Bloco de Notas |
| Como ajudar | Simulador com `20`, `20,50`, `1.500,00` | Mostra o valor por mês e o total do ano |
| Como ajudar | Simulador vazio, com `0`, `-5` ou `abc` | Mensagem de erro em vermelho e o cursor volta para o campo |
| Como ajudar | Voluntário: enviar tudo vazio | Três mensagens de erro e o cursor vai para "Seu nome" |
| Como ajudar | Voluntário preenchido → Enviar | Pergunta se pode abrir o WhatsApp; ao confirmar, abre com a mensagem pronta |
| Como ajudar e Contato | Link "Falar no WhatsApp" → **Cancelar** | Continua no site |

## O que conferir

| Teste | Como fazer | O que esperar |
|-------|------------|---------------|
| Erros de JavaScript | Chrome → `F12` → aba **Console** | Nenhuma mensagem em vermelho |
| Celular | `F12` → `Ctrl+Shift+M` → escolha um celular pequeno | Nada cortado nem com rolagem lateral |
| Acessibilidade | `F12` → aba **Lighthouse** → marque *Acessibilidade* → *Analisar* | Nota 90 ou mais |
| HTML válido | Cole o código em `validator.w3.org` (opção *Validate by Direct Input*) | Nenhum erro |
| Teclado | Navegue só com `Tab` e `Enter` | Todo link e botão é alcançado, e o foco aparece |
| Zoom | `Ctrl` e `+` até 200% | Nada fica sobreposto |
| Sem JavaScript | `F12` → `Ctrl+Shift+P` → digite *Disable JavaScript* | O site continua legível, com menu aberto, barras de meta e chave Pix. Somem só A+/A-, o simulador e o formulário |

## Problemas comuns

- **O CSS não aplicou:** confira o caminho no `<link href="css/estilo.css">` e se o arquivo foi salvo.
- **O script não roda:** veja o Console; confira o caminho no `<script src="js/...">`. O `principal.js` precisa vir antes dos outros, porque eles usam a função `formatarReais` dele.
- **Acentos estranhos (ex.: "Ã©"):** o arquivo precisa estar salvo em UTF-8 (no VS Code, canto inferior direito).
- **A letra ficou enorme e não volta:** clique em A- algumas vezes, ou limpe os dados do site (`F12` → *Application* → *Local storage*).
