import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import eslintConfigPrettier from 'eslint-config-prettier';
import reactPlugin from 'eslint-plugin-react';
import reactHooksPlugin from 'eslint-plugin-react-hooks';
import jsxA11yPlugin from 'eslint-plugin-jsx-a11y';
import globals from 'globals';

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
    files: ['**/*.test.ts', '**/*.test.tsx', '**/tests/**/*.ts'],
    rules: {
      '@typescript-eslint/no-explicit-any': 'off',
    },
  },

  // React-specific config for web-app
  {
    files: ['web-app/src/**/*.tsx', 'web-app/src/**/*.ts'],
    plugins: {
      react: reactPlugin,
      'react-hooks': reactHooksPlugin,
      'jsx-a11y': jsxA11yPlugin,
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
      ...reactPlugin.configs.recommended.rules,
      ...reactHooksPlugin.configs.recommended.rules,
      ...jsxA11yPlugin.configs.recommended.rules,
      'react/react-in-jsx-scope': 'off',
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

  // Vitest config files
  {
    files: [
      'service/vitest.config.ts',
      'packages/express-app/vitest.config.ts',
      'vitest.workspace.ts',
    ],
    languageOptions: {
      globals: {
        ...globals.node,
      },
    },
  }
);
