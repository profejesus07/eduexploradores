// Genera las imágenes de DEMOSTRACIÓN de la galería (ilustraciones vectoriales propias → WebP).
// Uso: node scripts/make-demo-images.mjs   (salida: src/assets/gallery/demo-N.webp)
import sharp from 'sharp'
import { mkdirSync, writeFileSync } from 'node:fs'

const W = 1600, H = 1200
const NAVY = '#061A5E', BLUE = '#0A33AD', GOLD = '#FFCB02', GOLD2 = '#FFD84D', SKY = '#1AB0F9', PALE = '#DCE6FB', WHITE = '#FFFFFF'
const svg = (body, defs = '') => `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}"><defs>${defs}</defs>${body}</svg>`
const grad = (id, a, b, x2 = 1, y2 = 1) => `<linearGradient id="${id}" x1="0" y1="0" x2="${x2}" y2="${y2}"><stop offset="0" stop-color="${a}"/><stop offset="1" stop-color="${b}"/></linearGradient>`
const rings = (cx, cy, rs, c = GOLD2, o = .18) => rs.map((r) => `<circle cx="${cx}" cy="${cy}" r="${r}" fill="none" stroke="${c}" stroke-opacity="${o}" stroke-width="2"/>`).join('')
const spark = (x, y, s = 1, c = GOLD) => `<path transform="translate(${x} ${y}) scale(${s})" d="M0-26Q0 0 26 0Q0 0 0 26Q0 0-26 0Q0 0 0-26Z" fill="${c}"/>`
const dots = (pts, c, o) => pts.map(([x, y, r]) => `<circle cx="${x}" cy="${y}" r="${r}" fill="${c}" fill-opacity="${o}"/>`).join('')

const imgs = {}

// 1 · Ciencia
imgs[1] = svg(`
<rect width="${W}" height="${H}" fill="url(#bg)"/><circle cx="800" cy="560" r="620" fill="url(#glow)"/>
${rings(800, 600, [330, 460, 590])}
<g transform="translate(800 540)" fill="none" stroke="${GOLD2}" stroke-opacity=".55" stroke-width="3">
 <ellipse rx="470" ry="150"/><ellipse rx="470" ry="150" transform="rotate(60)"/><ellipse rx="470" ry="150" transform="rotate(120)"/>
 <circle cx="470" cy="0" r="14" fill="${GOLD}" stroke="none"/><circle cx="-235" cy="-130" r="12" fill="${WHITE}" stroke="none" transform="rotate(0)"/><circle cx="-235" cy="130" r="12" fill="${GOLD}" stroke="none"/>
</g>
<path d="M735 300h130v250l205 320q22 44-28 44H558q-50 0-28-44l205-320Z" fill="${WHITE}" fill-opacity=".14" stroke="${WHITE}" stroke-opacity=".9" stroke-width="7" stroke-linejoin="round"/>
<path d="M655 700q145-46 290 0l130 170q22 44-28 44H558q-50 0-28-44Z" fill="url(#liq)"/>
<rect x="715" y="276" width="170" height="34" rx="10" fill="${WHITE}" fill-opacity=".9"/>
${dots([[790, 600, 16], [850, 540, 10], [770, 470, 12], [820, 400, 8], [800, 345, 6], [690, 780, 14], [900, 770, 11]], WHITE, .75)}
${spark(1180, 300, 1.4)}${spark(420, 880, 1)}${spark(1260, 820, .8, WHITE)}`,
`${grad('bg', NAVY, BLUE)}<radialGradient id="glow"><stop offset="0" stop-color="${SKY}" stop-opacity=".35"/><stop offset="1" stop-color="${SKY}" stop-opacity="0"/></radialGradient>${grad('liq', GOLD2, GOLD, 0, 1)}`)

// 2 · Lectura
const rays = [-70, -50, -30, -10, 10, 30, 50, 70].map((a) => `<line x1="800" y1="720" x2="800" y2="250" stroke="${GOLD2}" stroke-opacity=".38" stroke-width="4" stroke-linecap="round" transform="rotate(${a} 800 720)"/>`).join('')
const page = (m) => `<path d="M800 ${760} C ${800 + m * 100} 700 ${800 + m * 280} 690 ${800 + m * 420} 730 L${800 + m * 420} 940 C ${800 + m * 280} 900 ${800 + m * 100} 910 800 970Z"`
imgs[2] = svg(`
<rect width="${W}" height="${H}" fill="url(#bg)"/><circle cx="800" cy="700" r="640" fill="url(#glow)"/>
${rings(800, 720, [300, 430, 560], GOLD2, .14)}${rays}
${page(-1)} transform="translate(0 28)" fill="${NAVY}" fill-opacity=".55"/>${page(1)} transform="translate(0 28)" fill="${NAVY}" fill-opacity=".55"/>
${page(-1)} transform="translate(0 14)" fill="${PALE}"/>${page(1)} transform="translate(0 14)" fill="${PALE}"/>
${page(-1)} fill="${WHITE}"/>${page(1)} fill="#F3F6FD"/>
<g stroke="${BLUE}" stroke-opacity=".28" stroke-width="5" stroke-linecap="round" fill="none">
 <path d="M420 790c140-40 270-34 340 6M420 830c140-40 270-34 340 6M420 870c140-40 270-34 340 6"/><path d="M1180 790c-140-40-270-34-340 6M1180 830c-140-40-270-34-340 6M1180 870c-140-40-270-34-340 6"/></g>
<path d="M792 752v250l8-18 8 18V752Z" fill="${GOLD}"/>
${spark(560, 360, 1.6)}${spark(1090, 300, 1.1)}${spark(900, 210, .8, WHITE)}${spark(1250, 520, 1.2)}${spark(330, 560, .9, WHITE)}
${dots([[640, 460, 7], [980, 400, 9], [760, 330, 6], [1160, 640, 6], [450, 650, 8]], GOLD2, .7)}`,
`${grad('bg', BLUE, NAVY)}<radialGradient id="glow"><stop offset="0" stop-color="${SKY}" stop-opacity=".4"/><stop offset="1" stop-color="${SKY}" stop-opacity="0"/></radialGradient>`)

// 3 · Naturaleza
const leaf = (x, y, r, s, c, o = 1) => `<g transform="translate(${x} ${y}) rotate(${r}) scale(${s})" opacity="${o}"><path d="M0 0C70-150 230-200 340-190 330-60 230 70 0 0Z" fill="${c}"/><path d="M6 -4C110-60 210-110 320-180" stroke="${WHITE}" stroke-opacity=".5" stroke-width="5" fill="none" stroke-linecap="round"/></g>`
imgs[3] = svg(`
<rect width="${W}" height="${H}" fill="url(#bg)"/>
<circle cx="1130" cy="330" r="150" fill="${GOLD}"/><circle cx="1130" cy="330" r="230" fill="${GOLD}" fill-opacity=".18"/><circle cx="1130" cy="330" r="320" fill="${GOLD}" fill-opacity=".09"/>
<path d="M0 760C220 640 420 660 640 740S1060 820 1280 720 1500 660 1600 700V1200H0Z" fill="${PALE}"/>
<path d="M0 860C260 760 480 800 720 880S1180 940 1380 860 1520 820 1600 840V1200H0Z" fill="#9DB6EE"/>
<path d="M0 980C300 900 560 940 820 1000S1300 1060 1600 960V1200H0Z" fill="${BLUE}"/>
${leaf(210, 1040, -62, 1.5, NAVY, .95)}${leaf(260, 1060, -22, 1.25, BLUE, .95)}${leaf(1390, 1080, 242, 1.5, NAVY, .95)}${leaf(1330, 1100, 202, 1.2, '#2A57D1', .95)}
${leaf(620, 1100, -80, .8, NAVY, .9)}${leaf(990, 1100, 260, .8, NAVY, .9)}
${dots([[330, 330, 9], [480, 250, 6], [700, 410, 8], [880, 250, 6], [540, 520, 5]], BLUE, .5)}
<g stroke="${BLUE}" stroke-opacity=".35" stroke-width="3" fill="none" stroke-linecap="round"><path d="M240 360q50-30 100-10M590 300q50-30 100-10M840 450q50-30 100-10"/></g>`,
`${grad('bg', '#EAF0FD', WHITE, 0, 1)}`)

// 4 · Creatividad
imgs[4] = svg(`
<rect width="${W}" height="${H}" fill="#F3F6FD"/>
<circle cx="800" cy="790" r="330" fill="#8FB0F5"/>
<circle cx="960" cy="520" r="330" fill="${GOLD}" fill-opacity=".95"/>
<circle cx="640" cy="520" r="330" fill="${BLUE}" fill-opacity=".82"/>
<circle cx="800" cy="610" r="90" fill="${NAVY}" fill-opacity=".92"/>
<path d="M180 980C420 800 640 1100 900 960S1300 760 1440 880" fill="none" stroke="${GOLD}" stroke-width="46" stroke-linecap="round"/>
<path d="M200 1040C440 900 660 1160 920 1020S1300 840 1420 940" fill="none" stroke="${BLUE}" stroke-width="12" stroke-linecap="round" stroke-opacity=".7"/>
${spark(1300, 250, 1.8, BLUE)}${spark(260, 290, 1.2, GOLD)}${spark(1400, 640, .9, NAVY)}
${dots([[210, 600, 12], [330, 700, 7], [1380, 400, 10], [1290, 470, 6], [420, 190, 8], [1180, 180, 6]], NAVY, .55)}`)

// 5 · Juego y construcción
const cube = (cx, cy, u, t, l, r) => `<g stroke="${NAVY}" stroke-opacity=".25" stroke-width="3" stroke-linejoin="round"><polygon points="${cx},${cy - u} ${cx + u * .87},${cy - u / 2} ${cx},${cy} ${cx - u * .87},${cy - u / 2}" fill="${t}"/><polygon points="${cx - u * .87},${cy - u / 2} ${cx},${cy} ${cx},${cy + u} ${cx - u * .87},${cy + u / 2}" fill="${l}"/><polygon points="${cx},${cy} ${cx + u * .87},${cy - u / 2} ${cx + u * .87},${cy + u / 2} ${cx},${cy + u}" fill="${r}"/></g>`
const u = 150
imgs[5] = svg(`
<rect width="${W}" height="${H}" fill="url(#bg)"/>${rings(800, 640, [300, 430, 560], BLUE, .12)}
<ellipse cx="800" cy="1010" rx="520" ry="70" fill="${NAVY}" fill-opacity=".14"/>
${cube(800 - u * 1.74, 860, u, '#DCE6FB', '#B5C8F2', '#9DB6EE')}${cube(800, 860, u, GOLD2, GOLD, '#E0AE00')}${cube(800 + u * 1.74, 860, u, '#4F76E0', BLUE, '#082B94')}
${cube(800 - u * .87, 860 - u * 1.5, u, WHITE, '#DCE6FB', '#B5C8F2')}${cube(800 + u * .87, 860 - u * 1.5, u, '#4F76E0', BLUE, '#082B94')}
${cube(800, 860 - u * 3, u, GOLD2, GOLD, '#E0AE00')}
<g transform="translate(1210 360) rotate(14)">${cube(0, 0, 90, '#4F76E0', BLUE, '#082B94')}</g>
<g transform="translate(380 330) rotate(-12)">${cube(0, 0, 70, GOLD2, GOLD, '#E0AE00')}</g>
${spark(1290, 640, 1, GOLD)}${spark(300, 650, .8, BLUE)}`,
`${grad('bg', '#F3F6FD', '#DCE6FB', 0, 1)}`)

// 6 · Exploración
const meridians = [0, 40, 80, 120, 160].map((a) => `<ellipse cx="800" cy="600" rx="${Math.abs(Math.cos(a * Math.PI / 180)) * 300 + 10}" ry="300" fill="none" stroke="${WHITE}" stroke-opacity=".28" stroke-width="3"/>`).join('')
const lat = [-200, -100, 0, 100, 200].map((d) => { const rx = Math.sqrt(300 * 300 - d * d); return `<ellipse cx="800" cy="${600 + d}" rx="${rx}" ry="${rx * .13}" fill="none" stroke="${WHITE}" stroke-opacity=".25" stroke-width="3"/>` }).join('')
imgs[6] = svg(`
<rect width="${W}" height="${H}" fill="url(#bg)"/>${rings(800, 600, [380, 480, 600, 720], GOLD2, .14)}
<circle cx="800" cy="600" r="300" fill="url(#globe)"/>${meridians}${lat}
<circle cx="800" cy="600" r="300" fill="none" stroke="${WHITE}" stroke-opacity=".6" stroke-width="5"/>
<path d="M440 900C600 1020 900 1040 1120 930S1360 700 1330 520" fill="none" stroke="${GOLD}" stroke-width="6" stroke-dasharray="4 22" stroke-linecap="round"/>
<g transform="translate(1330 500)"><path d="M0 0c-34-46-34-92 0-92s34 46 0 92Z" fill="${GOLD}" transform="translate(0 40) scale(1.4)"/><circle cy="-20" r="14" fill="${NAVY}" transform="translate(0 0)"/></g>
<g transform="translate(300 330)"><circle r="110" fill="${NAVY}" fill-opacity=".6" stroke="${GOLD2}" stroke-opacity=".7" stroke-width="3"/>
 <path d="M0-92L20-20 92 0 20 20 0 92-20 20-92 0-20-20Z" fill="${GOLD}"/><path d="M0-92L10-10 0 0Z" fill="${WHITE}" fill-opacity=".7"/><circle r="8" fill="${NAVY}"/></g>
${spark(1180, 250, 1.3)}${spark(520, 1000, .9, WHITE)}${spark(1400, 900, .8)}`,
`${grad('bg', NAVY, '#0B2A8A')}<radialGradient id="globe" cx=".35" cy=".3"><stop offset="0" stop-color="#3A6BE8"/><stop offset=".6" stop-color="${BLUE}"/><stop offset="1" stop-color="${NAVY}"/></radialGradient>`)

mkdirSync('src/assets/gallery', { recursive: true })
for (const [n, s] of Object.entries(imgs)) {
  writeFileSync(`/tmp/demo-${n}.svg`, s)
  await sharp(Buffer.from(s)).resize(W, H).webp({ quality: 82 }).toFile(`src/assets/gallery/demo-${n}.webp`)
  console.log('demo-' + n + '.webp')
}
