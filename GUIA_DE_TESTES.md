# Guia de testes do site

Roteiro para testar o site sozinho, no Windows.

## Abrir o site

- **Mais simples:** dois cliques no `index.html`.
- **Recomendado:** VS Code com a extensão **Live Server** → clique em *Go Live* no rodapé. A página recarrega sozinha quando você salva.
  - Quando o site passar a ler arquivos JSON com `fetch` (2027), ele **não funciona** abrindo o arquivo direto: aí é obrigatório usar o Live Server.

## O que conferir

| Teste | Como fazer | O que esperar |
|-------|------------|---------------|
| Erros de JavaScript | Chrome → `F12` → aba **Console** | Nenhuma mensagem em vermelho |
| Celular | `F12` → `Ctrl+Shift+M` → escolha um celular pequeno | Nada cortado nem com rolagem lateral |
| Acessibilidade | `F12` → aba **Lighthouse** → marque *Acessibilidade* → *Analisar* | Nota 90 ou mais |
| HTML válido | Cole o código em `validator.w3.org` (opção *Validate by Direct Input*) | Nenhum erro |
| Teclado | Navegue só com `Tab` e `Enter` | Todo link e botão é alcançado, e o foco aparece |
| Zoom | `Ctrl` e `+` até 200% | Nada fica sobreposto |
| Barra de meta | Abra a página inicial | A barra e o texto ao lado mostram os mesmos valores |

## Problemas comuns

- **O CSS não aplicou:** confira o caminho no `<link href="css/estilo.css">` e se o arquivo foi salvo.
- **O script não roda:** veja o Console; confira o caminho no `<script src="js/principal.js">`.
- **Acentos estranhos (ex.: "Ã©"):** o arquivo precisa estar salvo em UTF-8 (no VS Code, canto inferior direito).
