# Página "Feriadões 2026" (link-na-bio)

Página estática de conversão: mostra a oferta dos feriados de 2026 e leva direto
pro WhatsApp com a mensagem já preenchida (inclusive uma por destino). Ideal pro
link da bio do Instagram. **Custo de hospedagem: R$ 0.**

## Como publicar de graça

### Opção A — GitHub Pages (mais simples)
1. No GitHub: **Settings → Pages**.
2. Em *Build and deployment*, escolha **Deploy from a branch**.
3. Branch: a deste projeto · pasta: `/ (root)` ou configure para servir `site/`.
4. A página fica em `https://<usuario>.github.io/<repo>/site/feriadoes-2026/`.

> Dica: para um link mais curto, mova o conteúdo de `site/feriadoes-2026/` para
> a raiz de um repositório dedicado (ex.: `feriadoes-viabrasilis`) e ative o Pages.

### Opção B — Vercel / Netlify (grátis)
1. Importe o repositório.
2. Em *Root Directory*, aponte para `site/feriadoes-2026`.
3. Sem build (é HTML puro). Publique. Você recebe uma URL pública.

### Opção C — domínio próprio
Aponte um subdomínio (ex.: `feriados.viabrasilis.com.br`) para o Pages/Vercel.

## Conteúdo
- `index.html` — a página (HTML + CSS inline, sem dependências além da fonte Google).
- `logo-white.png`, `logo-color.png` — logos da marca.

## Onde usar o link
- **Bio do Instagram** (link único ou no "link na bio").
- **Stories** com figurinha de link.
- **Status do WhatsApp**.
- Fim das legendas dos carrosséis.

## Número de WhatsApp
Todos os botões usam **+55 41 99175-5415**. Se mudar, troque `5541991755415`
nos links `wa.me` do `index.html`.
