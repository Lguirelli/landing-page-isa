# Revisão de UI, UX e engenharia — Isadora Guirelli v3.0

**Modo adotado:** REVISAR_E_CORRIGIR / EVOLUIR.  
**Base de critérios:** comando mestre de criação e revisão de interfaces preparado a partir de `skills-main`, `impeccable-main` e `taste-skill-main`.  
**Escopo:** seis páginas estáticas, componentes globais, fluxo de contato e responsividade.  
**Identidade:** preservadas as cores verde/creme, tipografias Cormorant Garamond/Montserrat, marca, fotografias e ilustrações originais.

## 1. Direção adotada

A proposta é um **site editorial de cuidado e acolhimento**, não um catálogo de serviços nem uma aplicação com interações complexas. O principal objetivo é permitir que a pessoa compreenda os sinais, encontre orientações responsáveis, conheça a abordagem e decida se deseja conversar pelo WhatsApp.

O desenho prioriza conteúdo legível, clareza dos destinos, decisões simples, contraste adequado, espaço em branco e transições curtas. Não foram criados depoimentos, estatísticas, diferenciais clínicos ou promessas comerciais não comprovadas.

## 2. Diagnóstico e correções

| ID | Severidade | Constatação na versão 2 | Solução adotada |
| --- | --- | --- | --- |
| NAV-01 | P1 | Menu e rodapé eram carregados via `fetch`, deixando o conteúdo de navegação dependente da conclusão de um script e de um servidor compatível. | Cabeçalho e rodapé renderizados diretamente no HTML, sincronizados via script de build. |
| NAV-02 | P2 | Menu mobile tinha opções, mas pouca contextualização dos destinos. | Menu móvel com títulos, descrições e CTA contextual, sem esconder as seis rotas. |
| NAV-03 | P2 | Páginas internas não apresentavam claramente o caminho atual nem próximos destinos. | Breadcrumbs, marcação de página atual e links de continuidade em todas as páginas internas. |
| CONV-01 | P2 | O CTA principal da home levava primeiro a outra página antes de disponibilizar o contato. | CTA principal direto ao WhatsApp; a página de contato permanece disponível para esclarecimentos. |
| SYS-01 | P2 | Folha de estilos com camadas sucessivas de substituições, aumentando o risco de regressões visuais. | CSS reorganizado em tokens, componentes e breakpoints, com reduções de movimento. |
| MOB-01 | P1 | No primeiro teste do novo layout, a seção de contato transbordava na home em 320/360 px. | Correção de `minmax(0,1fr)`, tamanho responsivo do título e quebras de texto; reteste sem overflow. |
| MOB-02 | P2 | Rótulos longos da faixa de princípios ultrapassavam a coluna em larguras compactas. | `min-width:0` e quebra controlada nos rótulos; reteste em 320/360 px. |
| ACC-01 | P2 | Dependência de JavaScript para exibir a navegação em todos os dispositivos. | Fallback progressivo: com JS indisponível o menu permanece visível e utilizável. |
| PERF-01 | P2 | A pasta `dist/` duplicava todos os arquivos de mídia, inclusive itens não utilizados. | `build.mjs` copia apenas as imagens efetivamente referenciadas nas páginas. |

**Nota:** a severidade aponta o impacto provável. As constatações de código são verificadas no arquivo recebido; as de navegação visual são hipóteses de melhoria, não resultados de pesquisa com visitantes.

## 3. Experiência de navegação

1. A home oferece quatro atalhos internos para quem já sabe qual assunto procura.
2. O menu principal mostra claramente a página ativa.
3. Páginas internas exibem o caminho `Início / Página atual`, ação contextual e dois destinos complementares.
4. O WhatsApp é identificado como canal externo; o usuário inicia e envia sua mensagem voluntariamente.
5. O menu mobile é um *disclosure*, com estado `aria-expanded` e fechamento por Escape, clique fora, navegação e alteração de viewport.
6. O rodapé traz os destinos essenciais, canais de contato, aviso médico e retorno ao topo.

## 4. Verificações realizadas

- `npm run build`: **aprovado** para seis páginas e seus recursos relativos. `dist/` gerada com sete imagens necessárias.
- `npm test`: **aprovado**, verificando HTML, H1 único, navegação e rodapé presentes, estado ativo, referências locais, skip link, CTA e ausência de componentes dependentes de `fetch`.
- `node --check site.js`: **aprovado**.
- Parser CSS (`tinycss2`): **nenhum erro de sintaxe de nível superior**.
- Verificação de IDs e links de âncora locais: **sem duplicatas ou destinos ausentes** nas seis páginas.
- Renderização por Chromium/Playwright com conteúdo local incorporado: **48 combinações de páginas × larguras** (320, 360, 390, 430, 768, 1024, 1440 e 1920 px), sem overflow horizontal ou exceções JavaScript. Abertura e fechamento por Escape do menu mobile testados em todas as combinações mobile/tablet.
- Capturas locais analisadas da home, contato e sinais em 390 e 1440 px, com correção posterior de enquadramento da foto principal.

**Limitação:** o ambiente de execução bloqueou a navegação HTTP/file direta do Chromium. Portanto, o QA visual acima usou `page.set_content()` com CSS, imagens e script incorporados para simular a renderização das páginas. Isso testa layout e interações locais, mas **não substitui um teste navegando no site hospedado**. As fontes externas podem usar fallback durante as capturas. O teste `npm run test:e2e` está disponível para rodar em ambiente que permita acesso ao servidor.

## 5. Verificações recomendadas antes da publicação

- Rodar `npm run test:e2e` em um navegador com servidor HTTP acessível.
- Checar links de WhatsApp e Instagram manualmente em celular, sem enviar mensagens de teste.
- Avaliar a leitura das fontes externas após carregamento real, sobretudo em dispositivos de 320 px e zoom 200%.
- Executar axe/Lighthouse com a página publicada para obter achados adicionais de acessibilidade e desempenho.
- Conferir enquadramento final das imagens em dispositivos reais e orientação paisagem.

## 6. Arquivos alterados

`index.html`, `sinais.html`, `cuidados.html`, `sobre.html`, `abordagem.html`, `contato.html`, `styles.css`, `site.js`, `partials/header.html`, `partials/footer.html`, `sync-components.mjs`, `build.mjs`, `package.json`, `package-lock.json`, `README.md`, `tests/validacao-estatica.mjs`, `tests/e2e.cjs` e a distribuição `dist/`.

**Pendências de conteúdo:** não há confirmação independente de horários, títulos profissionais, modalidades e números de contato além do material fornecido. Essas informações foram preservadas, não validadas externamente.

## Atualização pontual v3.2 — Seção Cuidados

- Incluído subtítulo na coluna esquerda, abaixo do título “CUIDADOS”, com leitura responsiva e contraste sobre o fundo verde.
- Removidos os quatro números decorativos dos itens da coluna direita.
- Os textos da lista passaram a ocupar toda a largura útil, sem coluna reservada à numeração.
- Alterações localizadas em `index.html` e `styles.css`, refletidas no build `dist/`.
- `npm run build` e `npm test` aprovados. Validação em navegador indisponível nesta rodada por bloqueio de acesso local (`ERR_BLOCKED_BY_ADMINISTRATOR`).


## Ajuste v3.4 — agrupamento do título e subtítulo em Cuidados

- O bloco verde mantém o título e a descrição originais.
- O conteúdo foi centralizado verticalmente, reduzindo a área vazia inferior.
- O espaçamento entre o título e a descrição foi reduzido para 12 px, com entrelinha ajustada para favorecer a leitura.
- O comportamento é responsivo e preserva a estrutura HTML atual.

- Teste v3.4: build e validação estática aprovados; captura de navegador não executada devido a bloqueio de acesso local (`ERR_BLOCKED_BY_ADMINISTRATOR`).


## Ajuste v3.6 — Header flutuante com efeito fosco

- O cabeçalho mantém a posição sticky, com afastamento de 8 px da borda superior e margens externas de 8 px.
- Fundo creme semitransparente (`rgba(245,243,237,.78)`) com `backdrop-filter: blur(20px) saturate(125%)` e alternativa opaca caso o navegador não suporte blur.
- Borda fina, sombra discreta e cantos de 14 px para reforçar a separação visual.
- Navegação, CTA, responsividade e menu mobile preservados.
