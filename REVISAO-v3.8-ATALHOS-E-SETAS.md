# Revisão v3.8 — atalhos da home e direção das setas

Base: `isadora-guirelli-v3.7-hairlines-clicaveis.zip`.

## Mudanças

- Título **O que você procura?** acima dos quatro cards, sem coluna exclusiva à esquerda.
- Quatro atalhos em uma única linha a partir de 1051px; duas colunas entre 761–1050px; uma coluna até 760px.
- Tamanho e alinhamento de título, descrição e seta adaptados para cada largura.
- Troca de todas as 61 ocorrências de `↗` em HTMLs, cabeçalho, rodapé e script de sincronização para `→`.
- Movimentos de hover das setas ajustados de deslocamento diagonal para horizontal, preservando os efeitos de cor, borda e foco.

## Preservação

- Mantidas as seis páginas (`index`, `sinais`, `cuidados`, `sobre`, `abordagem` e `contato`) e as seis seções da home.
- Comparação do conteúdo HTML com a v3.7: alteração **somente do caractere da seta**, sem exclusão ou reescrita de nenhuma seção. A nova distribuição dos atalhos foi feita apenas em CSS.
- Demais componentes, fotografias, textos, cabeçalho glassmorphism e cards clicáveis da v3.7 preservados.

## Verificações realizadas

- `npm run build`: aprovado.
- `npm test`: aprovado, incluindo teste novo `tests/atalhos-v3.8.mjs`.
- Capturas isoladas dos atalhos, com HTML e CSS local renderizados em Chromium, em 1440px e 390px.
- Medições de layout em Chromium em 320, 360, 390, 760, 768, 1024, 1050, 1200 e 1440px: título acima dos links, quatro cards na mesma linha acima de 1050px, 2 colunas em tablet, 1 coluna em mobile, sem overflow horizontal **no componente testado**.

**Limitação:** testes de renderização foram isolados na seção de atalhos, sem carregar imagens/fontes externas nem navegar entre páginas em servidor. Isso não comprova ausência de problemas em todo o site publicado.
