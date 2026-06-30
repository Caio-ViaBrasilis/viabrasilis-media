# Carousel Kit — Via Brasilis

Gera carrosséis 4:5 (2160×2700) no padrão visual da Via Brasilis Turismo a
partir de um arquivo de texto. Sem designer, sem ferramenta paga: você edita os
textos e o script renderiza os PNGs prontos pra postar.

## Instalação (uma vez)

```bash
cd tools/carousel-kit
npm install        # baixa o Playwright + Chromium
```

## Como criar um carrossel novo

1. Copie o exemplo:
   ```bash
   cp content.example.js meu-carrossel.js
   ```
2. Edite os textos em `meu-carrossel.js` (cada item do array `slides` é um slide).
3. Renderize:
   ```bash
   node render.js meu-carrossel.js ../../img/posts/meu-carrossel
   ```
   Saem `slide-01.png`, `slide-02.png`, … prontos pro feed.

## Estrutura de um slide

```js
{ bg: 'navy', logo: 'white', html: `...` }
```

- **bg**: `navy` (escuro) · `cream` (claro) · `blue` (CTA).
- **logo**: `white` (use em navy/blue) · `color` (use em cream) · `none`.
- **html**: o conteúdo, usando as classes abaixo.

### Classes de layout prontas

| Classe | Para quê |
|--------|----------|
| `eyebrow` (+ `on-cream`) | tarja pequena verde acima do título |
| `uline` | risquinho verde abaixo da tarja |
| `htitle` | título da capa (bem grande) |
| `ctitle` (+ `on-cream`) | título de slide de conteúdo |
| `sub` / `body` (+ `on-cream`) | texto de apoio |
| `cover-box` | caixa de destaque numérico na capa |
| `card` (`card-navy`/`card-cream`) | cartão de data com `big-date`, `weekday`, `pill` |
| `tags` + `tag` | linha de etiquetas (ex.: PRAIA, 3 DIAS) |
| `cota` | botão verde "peça sua cotação" |
| `checks` + `ck` | lista com check verde |
| `cta` + `contact` | slide final com logo, WhatsApp e site |

Dentro de qualquer texto:
- `<span class="g">palavra</span>` → destaque verde-limão
- `<b>palavra</b>` → negrito de ênfase

Tokens substituídos automaticamente: `LOGO_WHITE` (logo branco), `WA_SVG`
(ícone WhatsApp), `WEB_SVG` (ícone globo).

## Cores da marca

| | Hex |
|---|---|
| Navy | `#0D2140` |
| Cream | `#F4F1EB` |
| Azul | `#236AAA` |
| Verde-limão | `#90C961` |
| Vermelho (alertas) | `#CB3A2B` |

## Stories (9:16)
O exemplo gera 4:5. Para stories, mude o viewport em `render.js` para
`1080×1920` (mantendo `deviceScaleFactor: 2`) → exporta 2160×3840.

## Observação sobre números/preços
Use "peça sua cotação" em vez de preço fixo, ou confira a tarifa real antes de
publicar um "a partir de R$ ___". Preço errado em material de marca custa
confiança do cliente.
