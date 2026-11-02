# Isadora Guirelli — Site v3.8

Site institucional estático de saúde capilar e tricologia. Construído em **HTML, CSS e JavaScript puro**, preparado para publicar em GitHub Pages ou qualquer servidor de arquivos estáticos.

## O que mudou na v3

- **Navegação permanente e compreensível**: cabeçalho fixo, seis destinos, página atual identificada visualmente e por `aria-current`.
- **Menu mobile funcional**: botão com estado, descrições dos destinos, fechamento por Escape, clique fora, escolha de link e mudança de tamanho da janela.
- **Páginas conectadas**: trilha de navegação, links contextuais e sugestões para continuar a leitura.
- **Home mais orientadora**: atalhos para sinais, cuidados, etapas e contato; CTA principal direto ao WhatsApp, sem passar obrigatoriamente por outra página.
- **Visual editorial aprimorado**: hierarquia tipográfica, ritmo de seções, maior legibilidade, estados de foco, hover e toque, fotografias e ilustrações existentes.
- **Sem dependência de `fetch` para desenhar menus e rodapé**: o HTML completo de cada página está no próprio arquivo, funcionando mesmo se a inicialização JavaScript falhar.
- **Acessibilidade e movimento**: skip link, semântica de navegação, alvos de toque, foco visível, suporte a `prefers-reduced-motion` e menu navegável pelo teclado.
- **Build estático mais leve**: `dist/` recebe apenas os arquivos e imagens efetivamente usados pelas páginas.

A redação principal, a identificação da profissional, os canais e informações institucionais foram preservados. Os textos adicionados destinam-se apenas a orientar a navegação. Não foram inventados resultados, avaliações ou garantias de atendimento.

## Estrutura

```text
index.html               Página inicial
sinais.html              Sinais de atenção
cuidados.html            Cuidados
abordagem.html           Etapas do acompanhamento
sobre.html               Sobre Isadora
contato.html             Contato e dúvidas frequentes
styles.css               Design system e responsividade
site.js                  Menu e indicador de leitura
partials/header.html     Modelo do cabeçalho
partials/footer.html     Modelo do rodapé
sync-components.mjs      Sincroniza os parciais nos 6 arquivos HTML
build.mjs                Gera a distribuição estática
assets/                  Imagens originais e versões otimizadas
dist/                    Distribuição pronta para hospedagem
tests/                   Validação estática e testes E2E opcionais
REVISAO-UI-UX.md         Diagnóstico e relatório de alterações
```

## Como usar

Você pode abrir `index.html` diretamente no navegador para conferir o site sem instalar dependências. Para desenvolvimento com servidor local, use:

```sh
npm run dev
```

O servidor abre em `http://127.0.0.1:4389`.

Para validar os arquivos e gerar a versão de distribuição:

```sh
npm test
npm run build
```

O build sincroniza automaticamente o cabeçalho e rodapé a partir dos modelos em `partials/`, e em seguida prepara a pasta `dist/`. Para sincronizar sem gerar `dist/`:

```sh
npm run sync
```

**Importante:** edite cabeçalho e rodapé em `partials/`, e edite o conteúdo específico de cada página diretamente no respectivo HTML. Antes de publicar mudanças nos parciais, execute `npm run sync` ou `npm run build`. O HTML raiz já está sincronizado neste ZIP.

## GitHub Pages

Para hospedar pela raiz do repositório, configure **Settings → Pages → Deploy from a branch → main / (root)**. O `index.html` já está na raiz, e os caminhos de CSS, JS e imagens são relativos. Também é possível publicar o conteúdo da pasta `dist/` em outra hospedagem estática. Não é necessário executar Node no servidor.

## Testes de navegador

Para rodar o teste automatizado de navegação, responsividade e FAQ em um navegador real:

```sh
npm install
npx playwright install chromium
npm run dev
```

Em outro terminal:

```sh
npm run test:e2e
```

O teste usa 8 larguras (320, 360, 390, 430, 768, 1024, 1440 e 1920 px) nas 6 páginas, perfazendo 48 combinações. Também verifica o menu mobile e o FAQ. Use `CHROMIUM_PATH` se quiser apontar para um Chromium já instalado.

O arquivo `REVISAO-UI-UX.md` distingue testes executados durante a criação do ZIP e testes que ainda devem ser feitos após o deploy.

## Conteúdo e conformidade

- O WhatsApp e o Instagram permanecem nos canais informados no projeto original.
- O site não coleta dados de saúde, não envia mensagens automaticamente e não simula agendamentos.
- O aviso sobre a necessidade de avaliação médica é mantido.
- O projeto usa fontes externas do Google Fonts; há fontes substitutas caso a rede não esteja disponível.
