# Ajuste de espaçamento entre seções

**Data:** 29/10/2026  
**Base:** `landing-page-isa-repositorio-corrigido (1).zip`

## Critério de layout

O espaço vertical entre as seções das páginas usa a mesma variável CSS que o espaço entre cards e containers na horizontal:

```css
--layout-gap: clamp(12px, 1.5vw, 20px);
```

- **Até aproximadamente 800 px de viewport:** 12 px.
- **Entre aproximadamente 800 px e 1333 px:** crescimento proporcional (1,5vw).
- **A partir de aproximadamente 1333 px:** 20 px.

A distância entre seções é controlada por `main.wrap { display: flex; flex-direction: column; gap: var(--layout-gap) }`.

Foram removidas somente as margens externas redundantes de `.stats`, `.features`, `.service-row`, `.page-hero`, `.page-section`, `.cta-band` e `.external-contact`. Cards `.features`, `.detail-grid`, `.service-row` e `.external-contact` compartilham a mesma medida. Margens e preenchimentos internos necessários à legibilidade foram preservados.

## Validação

Renderização de HTML/CSS com Playwright (Chromium) usando conteúdo e estilos locais, para as seis páginas (`index`, `sinais`, `cuidados`, `sobre`, `abordagem`, `contato`) e as larguras **320, 360, 390, 520, 600, 760, 768, 1024, 1280, 1378 e 1920 px**.

Verificações realizadas:

- Distância vertical entre todos os blocos principais igual ao `--layout-gap` calculado.
- Distância horizontal de cards igual ao `--layout-gap` calculado.
- Ausência de overflow horizontal da página em todos os tamanhos avaliados.
- Conteúdo HTML, JavaScript, imagens e outros arquivos mantidos sem alterações.

A renderização de teste foi feita com fontes alternativas locais, sem requisitar arquivos externos. Recomenda-se uma última revisão visual em um navegador normal após a publicação.
