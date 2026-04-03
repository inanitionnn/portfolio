import { Resvg } from '@resvg/resvg-js';
import { readFileSync, writeFileSync } from 'fs';
import { resolve } from 'path';

const FONTS_BASE = './node_modules/@fontsource';

const fonts = [
  readFileSync(resolve(FONTS_BASE, 'inter/files/inter-latin-400-normal.woff')),
  readFileSync(resolve(FONTS_BASE, 'inter/files/inter-latin-600-normal.woff')),
  readFileSync(resolve(FONTS_BASE, 'jetbrains-mono/files/jetbrains-mono-latin-400-normal.woff')),
];

const svg = readFileSync('./public/og-image.svg', 'utf-8');

const resvg = new Resvg(svg, {
  fitTo: { mode: 'width', value: 1200 },
  font: {
    fontFiles: [],
    loadSystemFonts: false,
    fonts,
  },
});

const pngData = resvg.render();
writeFileSync('./public/og-image.png', pngData.asPng());

console.log('OG image generated: /public/og-image.png');
