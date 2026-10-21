import { defineConfig } from 'cypress';

export default defineConfig({
  projectId: 'zapy3u',
  e2e: {
    baseUrl: process.env['CYPRESS_BASE_URL'] || 'http://localhost:3000',
    specPattern: 'src/e2e/**/*.cy.{js,jsx,ts,tsx}',
    supportFile: 'cypress/support/e2e.ts',
    video: false,
    screenshotOnRunFailure: false,
  },
});
