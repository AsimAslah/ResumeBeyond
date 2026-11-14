import { readFileSync, readdirSync, statSync } from 'node:fs';
import { extname, join, relative, resolve } from 'node:path';

const root = resolve(new URL('..', import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, '$1'));
const roots = ['components', 'data', 'src', 'server.mjs'];
const failures = [];
const forbidden = [
  ['unsafe HTML rendering', /dangerouslySetInnerHTML|\.innerHTML\s*=|document\.write\s*\(/],
  ['dynamic code execution', /\beval\s*\(|new\s+Function\s*\(/],
  ['abandoned runtime import', /from\s+['"](?:next|@cloudflare|vinext)/],
  ['browser-exposed model key', /VITE_(?:OPENAI|MODEL|API).*KEY/i],
];

function inspect(path) {
  if (!['.ts', '.tsx', '.js', '.mjs'].includes(extname(path))) return;
  const content = readFileSync(path, 'utf8');
  for (const [label, pattern] of forbidden) {
    if (pattern.test(content)) failures.push(`${relative(root, path)}: ${label}`);
  }
  if (path.endsWith('components\\ambassador.tsx') || path.endsWith('components/ambassador.tsx')) {
    if (/localStorage|sessionStorage|indexedDB/.test(content)) failures.push(`${relative(root, path)}: chat persistence API`);
  }
}

function visit(path) {
  const stat = statSync(path);
  if (stat.isFile()) return inspect(path);
  for (const entry of readdirSync(path)) visit(join(path, entry));
}

for (const entry of roots) visit(join(root, entry));

if (failures.length) {
  console.error(`Source lint failed:\n${failures.join('\n')}`);
  process.exit(1);
}
console.log('Source lint passed: no unsafe HTML, dynamic execution, abandoned runtime imports, exposed model keys, or chat persistence APIs found.');

