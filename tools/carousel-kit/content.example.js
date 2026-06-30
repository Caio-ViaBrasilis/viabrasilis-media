/**
 * Conteúdo de exemplo de um carrossel. Copie este arquivo, edite os textos
 * e rode:  node render.js meu-conteudo.js ../../img/posts/meu-carrossel
 *
 * Backgrounds: 'navy' | 'cream' | 'blue'
 * Logo: 'white' (use em navy/blue) | 'color' (use em cream) | 'none'
 * Em qualquer texto, <span class="g">verde</span> destaca em verde-limão,
 * e <b>negrito</b> dá ênfase.
 */
const drag = `<div class="arraste">ARRASTE <span>&rarr;</span></div>`;
const head = (num, label, cream) =>
  `<div class="eyebrow ${cream ? 'on-cream' : ''}">${num} / ${label}</div><div class="uline"></div>`;
const card = (date, weekday, tag, cream) =>
  `<div class="card ${cream ? 'card-cream' : 'card-navy'}">
     <div><div class="big-date">${date}</div><div class="weekday">${weekday}</div></div>
     <div class="pill">${tag}</div>
   </div>`;

const slides = [
  // CAPA
  { bg: 'navy', logo: 'white', html: `${drag}
    <div class="block cover">
      <div class="eyebrow">SUA TARJA DE TOPO</div>
      <h1 class="htitle">Título grande<br>com <span class="g">destaque</span></h1>
      <p class="sub">Subtítulo de apoio explicando a promessa do carrossel em uma ou duas linhas.</p>
      <div class="cover-box">
        <div class="cover-num">5</div>
        <div class="cover-txt"><b>itens</b><br>linha secundária</div>
      </div>
    </div>` },

  // CONTEÚDO (cream)
  { bg: 'cream', logo: 'color', html: `${drag}
    <div class="block">
      ${head('01', 'SEÇÃO', true)}
      <h2 class="ctitle on-cream">Título da<br>seção</h2>
      <p class="body on-cream">Texto explicativo com um <b>ponto importante</b> em negrito para guiar a leitura.</p>
      ${card('07/09', 'SEGUNDA-FEIRA', '3 dias', true)}
    </div>` },

  // CONTEÚDO (navy)
  { bg: 'navy', logo: 'white', html: `${drag}
    <div class="block">
      ${head('02', 'SEÇÃO', false)}
      <h2 class="ctitle">Outra<br>seção</h2>
      <p class="body">Mesma estrutura no fundo escuro. Use para alternar o ritmo visual do carrossel.</p>
      ${card('12/10', 'SEGUNDA-FEIRA', '3 dias', false)}
    </div>` },

  // LISTA COM CHECKS
  { bg: 'navy', logo: 'white', html: `${drag}
    <div class="block">
      ${head('03', 'BENEFÍCIOS', false)}
      <h2 class="ctitle">Por que <span class="g">você</span></h2>
      <ul class="checks">
        <li><span class="ck">&#10003;</span> Primeiro <b>benefício</b></li>
        <li><span class="ck">&#10003;</span> Segundo <b>benefício</b></li>
        <li><span class="ck">&#10003;</span> Terceiro <b>benefício</b></li>
      </ul>
    </div>` },

  // CTA FINAL
  { bg: 'blue', logo: 'white-center', html: `${drag}
    <div class="block cta">
      <img class="cta-logo" src="LOGO_WHITE" />
      <div class="cta-div"></div>
      <h2 class="cta-title">Chamada final<br>com a <span class="g">Via Brasilis</span>.</h2>
      <p class="cta-sub">Frase de apoio do CTA.</p>
      <div class="contact">
        <div class="crow"><span class="ico wa">WA_SVG</span> WhatsApp: <b>&nbsp;(41) 99175-5415</b></div>
        <div class="crow"><span class="ico web">WEB_SVG</span> viabrasilis.com.br</div>
      </div>
    </div>` },
];

module.exports = { slides };
