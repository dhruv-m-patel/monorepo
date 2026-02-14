import { defineWorkspace } from 'vitest/config';

export default defineWorkspace([
  'service/vitest.config.ts',
  'web-app/vitest.config.ts',
  'packages/express-app/vitest.config.ts',
  'packages/react-components/vitest.config.ts',
]);
