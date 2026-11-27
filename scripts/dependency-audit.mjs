import { lstatSync, readdirSync } from 'node:fs';
import { dirname, join, relative, resolve } from 'node:path';
import { spawnSync } from 'node:child_process';

const root = resolve(new URL('..', import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, '$1'));
const ignored = new Set(['.git', '.cache', '.local', 'node_modules', 'dist', 'coverage', 'playwright-report', 'test-results', 'tmp']);
const lockfiles = [];

function visit(directory) {
  for (const entry of readdirSync(directory)) {
    if (ignored.has(entry)) continue;
    const path = join(directory, entry);
    const stat = lstatSync(path);
    if (stat.isSymbolicLink()) continue;
    if (stat.isDirectory()) visit(path);
    else if (entry === 'package-lock.json') lockfiles.push(path);
  }
}

visit(root);
if (!lockfiles.length) {
  console.error('Dependency audit failed: no package-lock.json files were found.');
  process.exit(1);
}

let failed = false;
const npmCli = process.env.npm_execpath;
if (!npmCli) {
  console.error('Dependency audit must run through npm run audit:dependencies.');
  process.exit(2);
}
for (const lockfile of lockfiles.sort()) {
  const directory = dirname(lockfile);
  console.log(`Auditing ${relative(root, lockfile) || 'package-lock.json'}...`);
  const result = spawnSync(process.execPath, [npmCli, 'audit', '--package-lock-only', '--audit-level=high'], {
    cwd: directory,
    stdio: 'inherit',
  });
  if (result.error) {
    console.error(`Unable to run npm audit in ${relative(root, directory) || '.'}: ${result.error.message}`);
    failed = true;
  } else if (result.status !== 0) {
    failed = true;
  }
}

if (failed) process.exit(1);
console.log(`Recursive dependency audit passed for ${lockfiles.length} lockfile(s).`);
