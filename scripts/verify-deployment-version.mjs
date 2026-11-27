const [rawOrigin, expectedCommit] = process.argv.slice(2);

if (!rawOrigin || !expectedCommit || !/^[a-f0-9]{40}$/i.test(expectedCommit)) {
  console.error('Usage: npm run verify:deployed-version -- https://your-domain <full-40-character-commit-sha>');
  process.exit(2);
}

let origin;
try {
  origin = new URL(rawOrigin);
} catch {
  console.error('Deployment version verification requires a valid origin URL.');
  process.exit(2);
}

const isLoopbackHttp = origin.protocol === 'http:' && ['localhost', '127.0.0.1', '[::1]'].includes(origin.hostname);
if (origin.protocol !== 'https:' && !isLoopbackHttp) {
  console.error('Deployment version verification requires HTTPS (HTTP is allowed only for loopback tests).');
  process.exit(2);
}

origin.pathname = '/';
origin.search = '';
origin.hash = '';

try {
  const response = await fetch(new URL('/build-info.json', origin), {
    redirect: 'follow',
    signal: AbortSignal.timeout(10_000),
    headers: { accept: 'application/json' },
  });
  if (!response.ok) throw new Error(`/build-info.json returned HTTP ${response.status}`);
  if (!response.headers.get('content-type')?.includes('application/json')) {
    throw new Error('/build-info.json did not return JSON; this deployment may predate build identity stamping.');
  }
  if (!response.headers.get('cache-control')?.toLowerCase().includes('no-store')) {
    throw new Error('/build-info.json is cacheable; refusing to trust a potentially stale deployment marker.');
  }

  const buildInfo = await response.json();
  if (buildInfo.sourceCommit !== expectedCommit) {
    throw new Error(`Deployed commit ${String(buildInfo.sourceCommit)} does not match expected commit ${expectedCommit}.`);
  }

  console.log(`Deployment source commit verified: ${expectedCommit}`);
} catch (error) {
  console.error(`Deployment version verification failed: ${error.message}`);
  process.exitCode = 1;
}
