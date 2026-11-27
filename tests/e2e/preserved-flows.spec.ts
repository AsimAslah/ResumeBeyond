import { execFileSync } from 'node:child_process';
import { expect, test } from '@playwright/test';

test('serves the exact source commit used to build the deployment', async ({ request }) => {
  const response = await request.get('/build-info.json');
  expect(response.status()).toBe(200);
  expect(response.headers()['content-type']).toContain('application/json');
  expect(response.headers()['cache-control']).toBe('no-store');
  const buildInfo = await response.json();
  const expectedCommit = process.env.GITHUB_SHA?.trim()
    || execFileSync('git', ['rev-parse', 'HEAD'], { encoding: 'utf8' }).trim();
  expect(buildInfo).toEqual({ sourceCommit: expectedCommit });
});

test('premium direction remains available and returns to the approved homepage', async ({ page }) => {
  await page.goto('/');
  // The approved compact header hides this optional link on narrow screens.
  // Verify its destination and load the route directly on every browser.
  await expect(page.locator('a[href="/directions/evolution"]')).toHaveCount(1);
  await page.goto('/directions/evolution');
  await expect(page).toHaveURL(/\/directions\/evolution$/);
  await expect(page.getByRole('heading', { level: 1 })).toContainText('I build AI systems');
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= document.documentElement.clientWidth)).toBe(true);
  await page.getByRole('button', { name: 'Open Mini Byte AI Ambassador' }).click();
  await expect(page.getByRole('dialog')).toBeVisible();
  await page.getByRole('button', { name: 'Close Mini Byte' }).click();
  await page.getByRole('link', { name: 'Open the recruiter-first direction' }).click();
  await expect(page.getByRole('heading', { level: 1 })).toContainText('Machine Learning Engineer');
});

test('both directions stay readable across phone, tablet and desktop widths', async ({ page }) => {
  const routes = [
    { path: '/', title: 'Machine Learning Engineer' },
    { path: '/directions/evolution', title: 'I build AI systems' },
  ];
  for (const width of [390, 768, 1280]) {
    await page.setViewportSize({ width, height: 900 });
    for (const route of routes) {
      await page.goto(route.path);
      await expect(page.getByRole('heading', { level: 1 })).toContainText(route.title);
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= document.documentElement.clientWidth)).toBe(true);
      for (const section of ['home', 'projects', 'experience', 'skills', 'contact']) {
        await expect(page.locator(`#${section}`)).toHaveCount(1);
      }
    }
  }
});

test('the recruiter-first résumé link serves a real PDF', async ({ page }) => {
  await page.goto('/');
  const link = page.getByRole('link', { name: 'Public résumé' });
  await expect(link).toHaveAttribute('href', '/Asim_Aslah_Public_Resume.pdf');
  const response = await page.request.get(new URL('/Asim_Aslah_Public_Resume.pdf', page.url()).toString());
  expect(response.status()).toBe(200);
  expect(response.headers()['content-type']).toContain('application/pdf');
  expect((await response.body()).subarray(0, 5).toString()).toBe('%PDF-');
});

test('public design routes load without browser errors or failed requests', async ({ page }) => {
  const consoleErrors = [];
  const pageErrors = [];
  const failedRequests = [];
  page.on('console', (message) => {
    if (message.type() === 'error') consoleErrors.push(message.text());
  });
  page.on('pageerror', (error) => pageErrors.push(error.message));
  page.on('requestfailed', (request) => failedRequests.push(`${request.url()}: ${request.failure()?.errorText}`));

  for (const route of ['/', '/directions/evolution']) {
    await page.goto(route);
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
  }

  expect(consoleErrors).toEqual([]);
  expect(pageErrors).toEqual([]);
  expect(failedRequests).toEqual([]);
});

for (const question of [
  'What salary does the candidate expect?',
  'Can you provide private contact details?',
]) {
  test(`Mini Byte refuses an unverified request: ${question}`, async ({ page }) => {
    await page.goto('/');
    await page.getByRole('button', { name: 'Open Mini Byte AI Ambassador' }).click();
    await page.getByLabel('Ask Mini Byte a recruiter question').fill(question);
    await page.getByRole('button', { name: 'Send question' }).click();
    const answer = page.locator('.chat-message--assistant');
    await expect(answer).toContainText("I don't have verified information about that.");
    await expect(answer.locator('a[href^="mailto:"], a[href^="tel:"]')).toHaveCount(0);
  });
}

test('Mini Byte section links resolve for all evidence destinations on both designs', async ({ page }) => {
  const sectionQuestions = [
    { question: 'Why is this candidate a good fit for a Machine Learning Engineer role?', target: '#home' },
    { question: 'Explain EvalLens and its pairwise rubric scoring.', target: '#projects' },
    { question: 'What did Asim do during the Realviz internship?', target: '#experience' },
    { question: 'What tools and technologies are supported by evidence?', target: '#skills' },
    { question: 'Can you provide private contact details?', target: '#contact' },
  ];
  const questionTargets = new Map(sectionQuestions.map(({ question, target }) => [question, target]));
  await page.route('**/api/ambassador', async (route) => {
    const payload = route.request().postDataJSON();
    const question = payload.messages.at(-1)?.content;
    const target = questionTargets.get(question);
    if (!target) {
      await route.fulfill({ status: 400, contentType: 'application/json', body: JSON.stringify({ error: 'Unexpected test question.' }) });
      return;
    }
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({
        answer: 'Navigation contract test response.',
        citations: [{
          id: 'SRC-PORTFOLIO',
          title: 'Original portfolio repository',
          url: 'https://github.com/AsimAslah/asim-portfolio',
          verifiedOn: '2026-11-15',
          kind: 'portfolio',
        }],
        section: target,
        disclosure: 'Evidence-based fallback; no model-generated claims.',
      }),
    });
  });
  for (const route of ['/', '/directions/evolution']) {
    for (const { question, target } of sectionQuestions) {
      await page.goto(route);
      await page.getByRole('button', { name: 'Open Mini Byte AI Ambassador' }).click();
      await page.getByLabel('Ask Mini Byte a recruiter question').fill(question);
      await page.getByRole('button', { name: 'Send question' }).click();
      const sectionLink = page.getByRole('link', { name: 'View section →' });
      await expect(page.getByRole('link', { name: 'SRC-PORTFOLIO', exact: true })).toHaveAttribute('href', 'https://github.com/AsimAslah/asim-portfolio');
      await expect(sectionLink).toHaveAttribute('href', target);
      const targetElement = page.locator(target);
      await expect(targetElement).toHaveCount(1);
      await sectionLink.click();
      await expect(page).toHaveURL(new RegExp(`${target}$`));
      await expect(targetElement).toBeInViewport();
      await expect(page.getByRole('dialog')).toHaveCount(0);
    }
  }
});

test('project, evidence, contact and local navigation links remain usable', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('link', { name: /Connect on LinkedIn/ })).toHaveAttribute('href', /^https:\/\/www\.linkedin\.com\//);
  const projects = page.locator('.rfv__projects');
  const projectLinks = projects.locator('a[href^="https://"]');
  expect(await projectLinks.count()).toBeGreaterThanOrEqual(6);
  const sources = page.locator('#rfv-evidence a[href^="https://"]');
  expect(await sources.count()).toBeGreaterThanOrEqual(6);
  const brokenAnchors = await page.locator('a[href^="#"]').evaluateAll((links) =>
    links.map((link) => link.getAttribute('href') || '').filter((href) =>
      href.length > 1 && !document.getElementById(decodeURIComponent(href.slice(1)))),
  );
  expect(brokenAnchors).toEqual([]);
  await page.getByRole('button', { name: 'Open Mini Byte AI Ambassador' }).click();
  await page.getByRole('button', { name: /How does the candidate evaluate AI model reliability/i }).click();
  const evidenceLink = page.getByRole('link', { name: 'View section →' });
  await expect(evidenceLink).toBeVisible();
  const target = (await evidenceLink.getAttribute('href'))?.slice(1);
  expect(await page.evaluate((id) => Boolean(id && document.getElementById(id)), target)).toBe(true);
});
