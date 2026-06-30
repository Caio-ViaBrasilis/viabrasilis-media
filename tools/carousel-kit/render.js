/**
 * Gerador de carrosséis Via Brasilis.
 * Uso:  node render.js <arquivo-de-conteudo.js> [pasta-de-saida]
 * Ex.:  node render.js content.example.js ../../img/posts/meu-carrossel
 *
 * O arquivo de conteúdo exporta { slides }. Cada slide tem:
 *   { bg: 'navy'|'cream'|'blue', logo: 'white'|'color'|'white-center'|'none', html: '<...>' }
 * As classes de layout estão documentadas no README.md.
 */
const fs = require('fs');
const path = require('path');

let chromium;
try { ({ chromium } = require('playwright')); }
catch { ({ chromium } = require('playwright-core')); }

const contentPath = process.argv[2] || './content.example.js';
const OUT = process.argv[3] || './out';
fs.mkdirSync(OUT, { recursive: true });

const { slides } = require(path.resolve(contentPath));

const ASSETS = path.join(__dirname, 'assets');
const logoWhite = 'data:image/png;base64,' + fs.readFileSync(path.join(ASSETS, 'logo-white.png')).toString('base64');
const logoColor = 'data:image/png;base64,' + fs.readFileSync(path.join(ASSETS, 'logo-color.png')).toString('base64');

const WA_SVG = `<svg viewBox="0 0 24 24" fill="#fff" width="32" height="32"><path d="M.057 24l1.687-6.163a11.867 11.867 0 01-1.587-5.946C.16 5.335 5.495 0 12.05 0a11.817 11.817 0 018.413 3.488 11.824 11.824 0 013.48 8.414c-.003 6.557-5.338 11.892-11.893 11.892a11.9 11.9 0 01-5.688-1.448L.057 24zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884a9.86 9.86 0 001.515 5.26l-.999 3.648 3.74-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.247-.694.247-1.289.173-1.413z"/></svg>`;
const WEB_SVG = `<svg viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="1.7" width="30" height="30"><circle cx="12" cy="12" r="9.2"/><ellipse cx="12" cy="12" rx="4" ry="9.2"/><path d="M2.8 12h18.4"/></svg>`;

// ---- Sistema de design da marca (1080x1350, exportado em 2x = 2160x2700) ----
const CSS = `
:root{ --navy:#0D2140; --cream:#F4F1EB; --blue:#236AAA; --green:#90C961; --red:#CB3A2B; }
*{margin:0;padding:0;box-sizing:border-box;-webkit-font-smoothing:antialiased;}
html,body{width:1080px;height:1350px;}
.slide{position:relative;width:1080px;height:1350px;overflow:hidden;
  font-family:'Poppins',sans-serif;padding:78px;display:flex;flex-direction:column;}
.bg-navy{background:var(--navy);color:#fff;}
.bg-cream{background:var(--cream);color:var(--navy);}
.bg-blue{background:var(--blue);color:#fff;}
.ring{position:absolute;border-radius:50%;border:2px solid rgba(255,255,255,.05);}
.ring.r1{width:640px;height:640px;right:-160px;bottom:-200px;}
.ring.r2{width:420px;height:420px;right:-60px;bottom:-90px;}
.bg-cream .ring{border-color:rgba(13,33,64,.05);}
.logo-tl{position:absolute;top:64px;left:78px;height:62px;z-index:3;}
.arraste{position:absolute;top:74px;right:78px;font-size:19px;font-weight:700;letter-spacing:4px;color:rgba(255,255,255,.42);z-index:3;}
.bg-cream .arraste{color:rgba(13,33,64,.32);}
.arraste span{margin-left:6px;}
.block{position:relative;z-index:2;margin-top:auto;margin-bottom:40px;}
.cover{margin-bottom:auto;margin-top:330px;}
.eyebrow{font-size:21px;font-weight:700;letter-spacing:4px;color:var(--green);text-transform:uppercase;margin-bottom:14px;}
.eyebrow.on-cream{color:#5BA32E;}
.uline{width:74px;height:5px;background:var(--green);border-radius:3px;margin-bottom:40px;}
.htitle{font-size:92px;line-height:1.0;font-weight:800;letter-spacing:-1.5px;}
.ctitle{font-size:86px;line-height:0.98;font-weight:800;letter-spacing:-1.5px;margin-bottom:30px;}
.ctitle.on-cream{color:var(--navy);}
.g{color:var(--green);}
.sub{font-size:30px;line-height:1.42;font-weight:400;color:#9DB0C6;margin-top:34px;max-width:760px;}
.body{font-size:30px;line-height:1.46;font-weight:400;color:#A9BACE;max-width:830px;margin-bottom:46px;}
.body.on-cream{color:#43505F;}
.body b,.sub b{font-weight:700;color:#fff;}
.body.on-cream b{color:var(--navy);}
.cover-box{display:inline-flex;align-items:center;gap:30px;margin-top:54px;background:rgba(255,255,255,.05);border:1px solid rgba(144,201,97,.4);border-radius:22px;padding:30px 44px;}
.cover-num{font-size:112px;font-weight:800;color:var(--green);line-height:.9;}
.cover-txt{font-size:28px;line-height:1.3;color:#C7D2DF;font-weight:400;}
.cover-txt b{font-weight:700;color:#fff;font-size:32px;}
.card{display:flex;align-items:center;justify-content:space-between;border-radius:24px;padding:40px 48px;}
.card-cream{background:#fff;box-shadow:0 18px 50px rgba(13,33,64,.10);border-left:10px solid var(--blue);}
.card-navy{background:rgba(255,255,255,.05);border:1px solid rgba(255,255,255,.14);border-left:10px solid var(--green);}
.big-date{font-size:88px;font-weight:800;letter-spacing:-2px;line-height:1;}
.card-cream .big-date{color:var(--navy);}
.weekday{font-size:24px;font-weight:600;letter-spacing:3px;margin-top:8px;color:#8597AB;}
.card-cream .weekday{color:#7C8896;}
.pill{background:var(--green);color:var(--navy);font-weight:700;font-size:26px;padding:16px 30px;border-radius:999px;white-space:nowrap;}
.dest-sub{font-size:24px;font-weight:700;letter-spacing:3px;text-transform:uppercase;margin-top:6px;color:#8597AB;}
.bg-cream .dest-sub{color:#7C8896;}
.tags{display:flex;gap:14px;flex-wrap:wrap;margin-top:36px;margin-bottom:46px;}
.tag{font-size:23px;font-weight:600;letter-spacing:1px;padding:13px 24px;border-radius:999px;}
.bg-navy .tag{background:rgba(255,255,255,.07);border:1px solid rgba(255,255,255,.16);color:#C7D2DF;}
.bg-cream .tag{background:#fff;border:1px solid rgba(13,33,64,.12);color:#43505F;}
.cota{display:inline-flex;align-items:center;gap:14px;background:var(--green);color:var(--navy);font-weight:800;font-size:28px;padding:20px 38px;border-radius:999px;}
.cota .arw{font-size:30px;}
.checks{list-style:none;margin-top:14px;}
.checks li{font-size:33px;line-height:1.35;font-weight:400;color:#C7D2DF;display:flex;align-items:flex-start;gap:22px;padding:22px 0;border-bottom:1px solid rgba(255,255,255,.08);}
.checks li:last-child{border-bottom:none;}
.checks b{font-weight:700;color:#fff;}
.ck{color:var(--green);font-weight:800;font-size:34px;line-height:1.2;flex:0 0 auto;}
.cta{margin:auto 0;display:flex;flex-direction:column;align-items:center;text-align:center;}
.cta-logo{height:120px;margin-bottom:30px;}
.cta-div{width:80px;height:6px;background:var(--green);border-radius:4px;margin-bottom:48px;}
.cta-title{font-size:62px;line-height:1.12;font-weight:800;letter-spacing:-1px;}
.cta-sub{font-size:29px;color:rgba(255,255,255,.78);margin-top:26px;font-weight:400;}
.contact{margin-top:64px;display:flex;flex-direction:column;gap:30px;align-items:center;}
.crow{font-size:33px;font-weight:500;display:flex;align-items:center;gap:18px;}
.crow b{font-weight:800;}
.ico{display:inline-flex;align-items:center;justify-content:center;width:62px;height:62px;border-radius:50%;flex:0 0 auto;}
.ico svg{display:block;}
.ico.wa{background:#25D366;}
.ico.web{background:rgba(255,255,255,.16);}
`;

function pageHTML(slide) {
  const html = (slide.html || '')
    .replace(/LOGO_WHITE/g, logoWhite)
    .replace(/WA_SVG/g, WA_SVG)
    .replace(/WEB_SVG/g, WEB_SVG);
  const logoImg = slide.logo === 'color'
    ? `<img class="logo-tl" src="${logoColor}">`
    : (slide.logo === 'white' ? `<img class="logo-tl" src="${logoWhite}">` : '');
  return `<!DOCTYPE html><html><head><meta charset="utf-8">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800&display=swap" rel="stylesheet">
  <style>${CSS}</style></head>
  <body><div class="slide bg-${slide.bg}">
    <div class="ring r1"></div><div class="ring r2"></div>
    ${logoImg}${html}
  </div></body></html>`;
}

(async () => {
  const browser = await chromium.launch({ args: ['--no-sandbox'] });
  const page = await browser.newPage({ viewport: { width: 1080, height: 1350 }, deviceScaleFactor: 2 });
  for (let i = 0; i < slides.length; i++) {
    await page.setContent(pageHTML(slides[i]), { waitUntil: 'networkidle' });
    await page.evaluate(async () => { await document.fonts.ready; });
    await page.waitForTimeout(250);
    const n = String(i + 1).padStart(2, '0');
    await page.locator('.slide').screenshot({ path: path.join(OUT, `slide-${n}.png`) });
    console.log('✓ slide-' + n);
  }
  await browser.close();
  console.log(`\nPronto: ${slides.length} slides em ${OUT} (2160x2700).`);
})();
