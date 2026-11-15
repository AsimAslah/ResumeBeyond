import { sources, unsupportedResponse } from '../server.mjs';

const rawOrigin = process.argv[2] || process.env.PUBLIC_SITE_URL || '';
if (!rawOrigin) {
  console.error('Usage: npm run verify:deployed -- https://your-replit-domain');
  process.exit(2);
}

const origin = new URL(rawOrigin);
if (origin.protocol !== 'https:') {
  console.error('Deployment verification requires an HTTPS origin.');
  process.exit(2);
}
origin.pathname = '/';
origin.search = '';
origin.hash = '';

async function request(path, init) {
  const response = await fetch(new URL(path, origin), {
    redirect: 'follow',
    signal: AbortSignal.timeout(15_000),
    ...init,
  });
  if (!response.ok) throw new Error(`${path}: HTTP ${response.status}`);
  return response;
}

const home = await request('/');
if (!home.headers.get('content-type')?.includes('text/html')) throw new Error('/: expected HTML');

const evolution = await request('/directions/evolution');
if (!evolution.headers.get('content-type')?.includes('text/html')) throw new Error('/directions/evolution: expected HTML');

const health = await request('/api/health');
const healthBody = await health.json();
if (healthBody.status !== 'ok' || healthBody.chatStorage !== false) throw new Error('/api/health: invalid no-storage contract');

const resume = await request('/Asim_Aslah_Public_Resume.pdf');
if (!resume.headers.get('content-type')?.includes('application/pdf')) throw new Error('resume: expected application/pdf');
const resumeHeader = new TextDecoder().decode(new Uint8Array(await resume.arrayBuffer()).slice(0, 5));
if (resumeHeader !== '%PDF-') throw new Error('resume: invalid PDF signature');

const sitemap = await request('/sitemap.xml');
const sitemapBody = await sitemap.text();
if (!sitemapBody.includes(new URL('/', origin).href)) throw new Error('sitemap: deployed origin is missing');

const ambassador = await request('/api/ambassador', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ messages: [{ role: 'user', content: 'Explain EvalLens and its rubric design.' }] }),
});
const ambassadorBody = await ambassador.json();
if (!ambassadorBody.answer || !ambassadorBody.citations?.length) throw new Error('ambassador: grounded answer or citations missing');
if (!ambassadorBody.citations.every((citation) => citation.id in sources)) throw new Error('ambassador: unapproved citation returned');

const refusal = await request('/api/ambassador', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ messages: [{ role: 'user', content: 'What salary does the candidate expect?' }] }),
});
if ((await refusal.json()).answer !== unsupportedResponse) throw new Error('ambassador: unsupported request did not return the exact refusal');

const externalUrls = new Set([
  ...Object.values(sources).map((source) => source.url),
  'https://github.com/AsimAslah',
  'https://www.linkedin.com/in/asim-aslah-pm-05906a222',
]);
const externalWarnings = [];
for (const url of externalUrls) {
  const response = await fetch(url, { redirect: 'follow', signal: AbortSignal.timeout(15_000) });
  if (response.ok) continue;
  if ([401, 403, 429, 999].includes(response.status)) {
    externalWarnings.push(`${url} returned bot/access-control status ${response.status}`);
    continue;
  }
  throw new Error(`external link failed: ${url} (HTTP ${response.status})`);
}

console.log(`Deployment verification passed for ${origin.href}`);
console.log(`Checked core routes, PDF download, no-storage health, grounded citations, refusal behavior, and ${externalUrls.size} external links.`);
if (externalWarnings.length) console.warn(`External-link warnings:\n- ${externalWarnings.join('\n- ')}`);
