# Isadora Guirelli — cuidado capilar

Site estático com página inicial e cinco subpáginas: Sinais, Cuidados, Sobre, Abordagem e Contato.

Para visualizar localmente, execute `npm run dev` e abra `http://localhost:4173`. Também é possível abrir `index.html` diretamente no navegador.

O WhatsApp oficial está ativo: **(19) 99910-3510**, centralizado em `whatsapp.js`. O Instagram [@isadoraguirelli](https://www.instagram.com/isadoraguirelli/) permanece como alternativa. Os botões de contato abrem uma nova aba.

## Revisão visual e responsividade — 29/10/2026

Consulte [RELATORIO_RESPONSIVIDADE.md](RELATORIO_RESPONSIVIDADE.md) e abra [a galeria de antes/depois](relatorio/index.html). Os seis HTMLs e todas as imagens são idênticos aos do ZIP recebido; as correções do site estão em `styles.css` e `menu.js`.

Para repetir os testes, mantenha `npm run dev` em um terminal. Em outro, instale as ferramentas opcionais com `npm install --no-save playwright` e `npx playwright install chromium`. Execute `node tests/responsividade.cjs depois` e `node tests/interacoes.cjs`. A prévia padrão dos testes é `http://127.0.0.1:4173/`; use `BASE_URL` para outro endereço. `BROWSER_CHANNEL=msedge` é opcional para testar com o Edge instalado. Os testes de contato interceptam os destinos externos e não enviam mensagens.

A fotografia de Isadora em seu consultório aparece apenas na página inicial. As cinco subpáginas usam ilustrações editoriais neutras criadas para este site. O conteúdo é informativo; não inclui promessas de resultado nem substitui avaliação dermatológica.

## Base informativa

A redação sobre sinais, histórico e encaminhamento foi revisada com base em fontes da Academia Americana de Dermatologia:

- https://www.aad.org/public/diseases/hair-loss/treatment/diagnosis-treat
- https://www.aad.org/public/diseases/hair-loss/insider/begin
- https://www.aad.org/public/everyday-care/itchy-skin/itch-relief/relieve-scalp-itch

Essas fontes descrevem a importância do histórico de saúde, da observação do couro cabeludo e da avaliação dermatológica para diagnóstico e tratamento quando indicados.
