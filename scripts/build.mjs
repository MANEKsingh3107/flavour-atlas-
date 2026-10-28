// Builds the offline app bundle in www/ from src/index.html.
// Swaps Google Fonts for bundled font files and adds the Capacitor runtime.
import fs from 'node:fs';
import path from 'node:path';

const root = path.resolve(path.dirname(new URL(import.meta.url).pathname), '..');
const www = path.join(root, 'www');
const nm = p => path.join(root, 'node_modules', p);

fs.rmSync(www, { recursive: true, force: true });
fs.mkdirSync(path.join(www, 'fonts'), { recursive: true });

const fonts = [
  ['Bricolage Grotesque', '@fontsource/bricolage-grotesque/files/bricolage-grotesque-latin-%W-normal.woff2', [500, 700, 800]],
  ['IBM Plex Sans', '@fontsource/ibm-plex-sans/files/ibm-plex-sans-latin-%W-normal.woff2', [400, 500, 600]],
  ['IBM Plex Mono', '@fontsource/ibm-plex-mono/files/ibm-plex-mono-latin-%W-normal.woff2', [400, 500]],
];
let css = '';
for (const [family, pattern, weights] of fonts) {
  for (const w of weights) {
    const src = nm(pattern.replace('%W', w));
    const file = path.basename(src);
    fs.copyFileSync(src, path.join(www, 'fonts', file));
    css += `@font-face{font-family:'${family}';font-style:normal;font-weight:${w};font-display:swap;src:url(${file}) format('woff2');}\n`;
  }
}
fs.writeFileSync(path.join(www, 'fonts', 'fonts.css'), css);
fs.copyFileSync(nm('@capacitor/core/dist/capacitor.js'), path.join(www, 'capacitor.js'));

let html = fs.readFileSync(path.join(root, 'src', 'index.html'), 'utf8');
const start = html.indexOf('<!--FONTS-->'), end = html.indexOf('<!--/FONTS-->');
if (start < 0 || end < 0) throw new Error('FONTS markers missing in src/index.html');
html = html.slice(0, start) + '<link rel="stylesheet" href="fonts/fonts.css">\n<script src="capacitor.js"></script>' + html.slice(end + '<!--/FONTS-->'.length);
fs.writeFileSync(path.join(www, 'index.html'), html);
fs.copyFileSync(path.join(root, 'src', 'privacy.html'), path.join(www, 'privacy.html'));
console.log('Built www/ (' + Math.round(html.length / 1024) + ' KB page, fonts bundled, works offline)');
