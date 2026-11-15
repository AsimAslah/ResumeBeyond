import { lstatSync, readFileSync, readdirSync } from 'node:fs';
import { extname, join, relative, resolve } from 'node:path';

const root = resolve(new URL('..', import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, '$1'));
// Replit's local tooling is not application source or published content.
const ignored = new Set(['.git', '.local', '.cache', '.agents', '.reference', 'node_modules', 'dist', 'coverage', 'playwright-report', 'test-results', 'tmp']);
const findings = [];

function visit(directory) {
  for (const entry of readdirSync(directory)) {
    if (ignored.has(entry)) continue;
    const path = join(directory, entry);
    const stat = lstatSync(path);
    if (stat.isSymbolicLink()) continue;
    if (stat.isDirectory()) visit(path);
    else inspect(path);
  }
}

function inspect(path) {
  const extension = extname(path).toLowerCase();
  const buffer = readFileSync(path);
  if (extension !== '.pdf' && buffer.includes(0)) return;
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
    ['GitHub token', /\b(?:ghp_|github_pat_)[A-Za-z0-9_]{20,}\b/g],
    ['provider token', /\bsk-[A-Za-z0-9_-]{20,}\b/g],
    ['AWS access key', /\bAKIA[A-Z0-9]{16}\b/g],
    ['bearer credential', /\bBearer\s+[A-Za-z0-9._~-]{20,}\b/gi],
    ['credential-bearing URL', /https?:\/\/[^\s/:]+:[^\s/@]+@[^\s/]+/gi],
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
console.log('Privacy and credential scan passed: no direct email, international phone, WhatsApp link, private key, access token, credential URL, or committed secret pattern found.');

