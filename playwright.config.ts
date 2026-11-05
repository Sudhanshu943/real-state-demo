import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './e2e',
  fullyParallel: false,
  workers: 1,
  reporter: 'list',
  use: {
    baseURL: 'http://localhost:4174',
    trace: 'on-first-retry',
    viewport: { width: 1440, height: 900 },
    launchOptions: {
      args: [
        '--enable-webgl',
        '--use-gl=angle',
        '--ignore-gpu-blocklist',
        '--use-angle=swiftshader'
      ]
    }
  },
  webServer: {
    command: 'npm run preview',
    url: 'http://localhost:4174',
    reuseExistingServer: false,
    timeout: 30000
  },
  projects: [
    {
      name: 'desktop-chrome',
      use: { ...devices['Desktop Chrome'] }
    },
    {
      name: 'mobile-chrome',
      use: { ...devices['Pixel 7'] }
    }
  ]
});
