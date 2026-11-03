# Revisão 3.7: hairlines e estados de interação

## Escopo executado

Base: `isadora-guirelli-v3.6-header-vidro-fosco.zip`.

**Modificados somente:**
- `index.html`, dentro dos quatro cards de **Como funciona**, substituindo links de texto por um único link que envolve cada card.
- `styles.css`, nas regras de **O que você procura?**, botão **Entenda os cuidados** de **Sinais de atenção**, e **Como funciona**, além de estados de hover, foco e ajustes móveis desses componentes.
- `dist/index.html` e `dist/styles.css`, gerados pelo build.
- `package.json`, `package-lock.json` (versão e teste), e teste/revisão técnica novos.

**Preservado:** cabeçalho flutuante, hero e bordas de 16px, princípios do cuidado, seção Cuidados, texto dos Sinais, conteúdo de Como funciona, Contato, footer, assets, scripts e cinco páginas internas (`sinais`, `cuidados`, `sobre`, `abordagem` e `contato`). Nenhuma seção removida.

## Evidência de preservação

A comparação do HTML da home com a v3.6 confirmou seis seções na mesma ordem (`inicio`, `stats`, `sinais`, `cuidados`, `etapas`, `contato`). O conteúdo das cinco seções fora de `etapas` permaneceu idêntico; dentro de `etapas`, apenas os wrappers de link foram modificados. As demais cinco páginas HTML, além de cabeçalho e rodapé compartilhados, permaneceram idênticas à v3.6.

## Alterações funcionais e visuais

- Atalhos da home: hairline de 1px contornando a área clicável inteira; fundo suave, borda acentuada e elevação leve no hover; foco visível, estado pressionado.
- Sinais de atenção: link **Entenda os cuidados** recebeu fundo verde escuro, contraste alto, contorno e hover. Linhas de conteúdo informativo mantidas.
- Como funciona: quatro cards com área clicável integral, links para `abordagem.html`, contorno hairline completo, indicação de ação no rodapé interno, foco/hover/active.
- Animações curtas, desativáveis pela regra já existente `prefers-reduced-motion`.

## Validação

- `npm run build`: aprovado (6 páginas, assets e distribuição).
- `npm test`: aprovado (validação estática original + teste específico da v3.7).
- Renderização HTML/CSS sem acesso à rede: 320, 360, 390, 430, 768, 1024, 1440 e 1920 px. Em todos: 6 seções, 4 atalhos, 3 itens informativos de Sinais e 4 cards clicáveis. Regras de borda, cor, hover e foco verificadas.
- Transbordamento horizontal não aumentou em nenhuma largura: a v3.6 já apresentava 21px em 320px e 6px em 360px neste ambiente de renderização sem fontes externas; a v3.7 manteve exatamente esses valores. Essa correção seria fora do escopo e permanece pendente.

## Limitação dos testes

O navegador permitiu renderizar HTML/CSS e inspecionar os estados computados, mas bloqueou `http://localhost` e `file://` com `ERR_BLOCKED_BY_ADMINISTRATOR`. Por isso o teste de navegação real entre páginas e os downloads remotos de fontes/imagens não pôde ser concluído no browser. Os caminhos foram checados pelo build e pela validação estática. Testar novamente no domínio publicado quando disponível.
