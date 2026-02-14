import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  plugins: [react() as any],
  resolve: {
    alias: {
      '@ui': path.resolve(__dirname, './src'),
    },
  },
  test: {
    environment: 'jsdom',
    setupFiles: ['./src/setupTests.ts'],
    globals: false,
    exclude: ['dist/**', 'storybook-static/**', 'node_modules/**'],
    css: true,
    coverage: {
      provider: 'v8',
      include: ['src/**/*.{ts,tsx}'],
      exclude: [
        'src/index.ts',
        'src/setupTests.ts',
        'src/**/*.stories.tsx',
        'src/**/*.test.{ts,tsx}',
      ],
      thresholds: {
        statements: 80,
        branches: 80,
        functions: 80,
        lines: 80,
      },
      reporter: ['text', 'text-summary', 'lcov'],
    },
  },
});
