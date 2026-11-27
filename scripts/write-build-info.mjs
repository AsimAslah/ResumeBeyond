import { execFileSync } from 'node:child_process';
import { mkdirSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';

const sourceCommit = process.env.GITHUB_SHA?.trim()
  || execFileSync('git', ['rev-parse', 'HEAD'], { encoding: 'utf8' }).trim();

if (!/^[a-f0-9]{40}$/i.test(sourceCommit)) {
  throw new Error('Build source commit must be a full 40-character Git SHA.');
}

const distDirectory = resolve('dist');
mkdirSync(distDirectory, { recursive: true });
writeFileSync(
  resolve(distDirectory, 'build-info.json'),
  `${JSON.stringify({ sourceCommit })}\n`,
  { encoding: 'utf8', mode: 0o644 },
);

console.log(`Wrote build identity for ${sourceCommit}.`);
