import { readFileSync, readdirSync, statSync } from 'node:fs';
import { extname, join, relative, resolve } from 'node:path';

const root = resolve(new URL('..', import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, '$1'));
const ignored = new Set(['.git', '.reference', 'node_modules', 'dist', 'coverage', 'playwright-report', 'test-results', 'tmp']);
const textExtensions = new Set(['.ts', '.tsx', '.js', '.mjs', '.json', '.md', '.html', '.css', '.yml', '.yaml', '.toml', '.replit', '.txt']);
const findings = [];

function visit(directory) {
  for (const entry of readdirSync(directory)) {
    if (ignored.has(entry)) continue;
    const path = join(directory, entry);
    const stat = statSync(path);
    if (stat.isDirectory()) visit(path);
    else inspect(path);
  }
}

function inspect(path) {
  const extension = extname(path).toLowerCase();
  if (!textExtensions.has(extension) && extension !== '.pdf') return;
  const buffer = readFileSync(path);
  const content = buffer.toString(extension === '.pdf' ? 'latin1' : 'utf8');
  if (extension === '.pdf') {
    const pdfChecks = [
      ['email link', /mailto:/gi],
      ['telephone link', /tel:/gi],
      ['WhatsApp link', /wa\.me\//gi],
      ['international phone-like value', /\+\d[\d\s()-]{8,}\d/g],
    ];
    for (const [label, pattern] of pdfChecks) {
      if (pattern.test(content)) findings.push(`${relative(root, path)}: ${label}`);
    }
    return;
  }
  const checks = [
    ['email address', /[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/gi],
    ['international phone-like value', /\+\d[\d\s()-]{8,}\d/g],
    ['private key header', /-----BEGIN (?:RSA |EC |OPENSSH )?PRIVATE KEY-----/g],
    ['secret assignment', /(?:api[_-]?key|secret|token)\s*[=:]\s*["'][A-Za-z0-9_\-]{16,}/gi],
    ['WhatsApp deep link', /wa\.me\//gi],
  ];
  for (const [label, pattern] of checks) {
    const matches = content.match(pattern) || [];
    for (const match of matches) findings.push(`${relative(root, path)}: ${label}: ${match.slice(0, 30)}`);
  }
}

visit(root);
if (findings.length) {
  console.error(`Privacy scan failed with ${findings.length} finding(s):\n${findings.join('\n')}`);
  process.exit(1);
}
console.log('Privacy scan passed: no direct email, international phone, WhatsApp link, private key, or committed secret pattern found.');

