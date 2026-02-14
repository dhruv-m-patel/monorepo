import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import eslintConfigPrettier from 'eslint-config-prettier';
import reactPlugin from 'eslint-plugin-react';
import reactHooksPlugin from 'eslint-plugin-react-hooks';
import jsxA11yPlugin from 'eslint-plugin-jsx-a11y';
import globals from 'globals';

// Flat config objects from plugins (ESLint v9 compatible)
const reactFlatRecommended = reactPlugin.configs.flat.recommended;
const reactFlatJsxRuntime = reactPlugin.configs.flat['jsx-runtime'];
const jsxA11yFlatRecommended = jsxA11yPlugin.flatConfigs.recommended;

export default tseslint.config(
  // Global ignores (replaces .eslintignore)
  {
    ignores: [
      '**/node_modules/',
      '**/build/',
      '**/build-static/',
      '**/dist/',
      '**/.github/',
      '**/.yarn/',
      '**/.pnp.*',
      '**/*.css',
      '**/*.svg',
      '**/public/',
      '**/*.yaml',
      '**/config/',
      '**/webpack.config.js',
      '.ralph-tui/',
      '.turbo/',
      'tasks/',
      'lerna.json',
      '**/storybook-static/',
      'playwright-report/',
      'test-results/',
      'perf-results/',
      'size-report.json',
    ],
  },

  // Base config for all JS/TS files
  js.configs.recommended,

  // TypeScript files config
  ...tseslint.configs.recommended,

  // Prettier must be last to override formatting rules
  eslintConfigPrettier,

  // CommonJS config files (storybook, etc.)
  {
    files: ['**/*.js'],
    languageOptions: {
      globals: {
        ...globals.node,
        ...globals.commonjs,
      },
    },
    rules: {
      '@typescript-eslint/no-require-imports': 'off',
      '@typescript-eslint/no-unused-vars': [
        'warn',
        { argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
      ],
    },
  },

  // Shared settings for all TypeScript files
  {
    files: ['**/*.ts', '**/*.tsx'],
    languageOptions: {
      parserOptions: {
        ecmaVersion: 2022,
        sourceType: 'module',
      },
      globals: {
        ...globals.node,
      },
    },
    rules: {
      'no-use-before-define': 'off',
      '@typescript-eslint/no-unused-vars': [
        'warn',
        { argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
      ],
      '@typescript-eslint/no-require-imports': 'off',
    },
  },

  // Test files - relax strict rules
  {
    files: [
      '**/*.test.ts',
      '**/*.test.tsx',
      '**/*.perf.test.ts',
      '**/tests/**/*.ts',
      '**/*.spec.ts',
      'e2e/**/*.ts',
    ],
    rules: {
      '@typescript-eslint/no-explicit-any': 'off',
    },
  },

  // React-specific config for web-app
  {
    files: ['web-app/src/**/*.tsx', 'web-app/src/**/*.ts'],
    ...reactFlatRecommended,
    ...reactFlatJsxRuntime,
    plugins: {
      ...reactFlatRecommended.plugins,
      ...reactFlatJsxRuntime.plugins,
      ...jsxA11yFlatRecommended.plugins,
      'react-hooks': reactHooksPlugin,
    },
    languageOptions: {
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
      globals: {
        ...globals.browser,
      },
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
    rules: {
      ...reactFlatRecommended.rules,
      ...reactHooksPlugin.configs.recommended.rules,
      ...jsxA11yFlatRecommended.rules,
      'react/react-in-jsx-scope': 'off',
      'react/prop-types': 'off', // Using TypeScript for prop validation
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/ban-ts-comment': 'off',
    },
  },

  // Vite and Storybook config files for web-app
  {
    files: [
      'web-app/vite.config.ts',
      'web-app/vitest.config.ts',
      'web-app/.storybook/*.ts',
    ],
    languageOptions: {
      globals: {
        ...globals.node,
      },
    },
  },

  // Service-specific config
  {
    files: ['service/src/**/*.ts', 'service/tests/**/*.ts'],
    languageOptions: {
      globals: {
        ...globals.node,
      },
    },
  },

  // Express-app package config
  {
    files: [
      'packages/express-app/src/**/*.ts',
      'packages/express-app/tests/**/*.ts',
    ],
    languageOptions: {
      globals: {
        ...globals.node,
      },
    },
  },

  // React-components package config (React + JSX + a11y)
  {
    files: [
      'packages/react-components/src/**/*.tsx',
      'packages/react-components/src/**/*.ts',
    ],
    ...reactFlatRecommended,
    ...reactFlatJsxRuntime,
    plugins: {
      ...reactFlatRecommended.plugins,
      ...reactFlatJsxRuntime.plugins,
      ...jsxA11yFlatRecommended.plugins,
      'react-hooks': reactHooksPlugin,
    },
    languageOptions: {
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
      globals: {
        ...globals.browser,
      },
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
    rules: {
      ...reactFlatRecommended.rules,
      ...reactHooksPlugin.configs.recommended.rules,
      ...jsxA11yFlatRecommended.rules,
      'react/react-in-jsx-scope': 'off',
      'react/prop-types': 'off', // Using TypeScript for prop validation
      // Component library wrappers pass children via ...props spread
      'jsx-a11y/heading-has-content': 'off',
      'jsx-a11y/anchor-has-content': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/ban-ts-comment': 'off',
    },
  },

  // Vite and Storybook config files for react-components
  {
    files: [
      'packages/react-components/vite.config.ts',
      'packages/react-components/vitest.config.ts',
      'packages/react-components/.storybook/*.ts',
    ],
    languageOptions: {
      globals: {
        ...globals.node,
      },
    },
  },

  // Vitest and Playwright config files
  {
    files: [
      'service/vitest.config.ts',
      'service/vitest.perf.config.ts',
      'packages/express-app/vitest.config.ts',
      'vitest.workspace.ts',
      'playwright.config.ts',
    ],
    languageOptions: {
      globals: {
        ...globals.node,
      },
    },
  },

  // E2E test files
  {
    files: ['e2e/**/*.ts'],
    languageOptions: {
      globals: {
        ...globals.node,
      },
    },
  }
);
