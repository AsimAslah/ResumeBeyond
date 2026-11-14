import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests/e2e',
  fullyParallel: true,
  retries: process.env.CI ? 2 : 0,
  reporter: [['list'], ['html', { open: 'never' }]],
  use: { baseURL: 'http://127.0.0.1:3000', trace: 'retain-on-failure' },
  webServer: { command: 'npm run start', port: 3000, reuseExistingServer: !process.env.CI },
  projects: [
    { name: 'desktop-chromium', use: { ...devices['Desktop Chrome'] } },
    { name: 'mobile-webkit-390', use: { ...devices['iPhone 13'], viewport: { width: 390, height: 844 } } },
  ],
});

