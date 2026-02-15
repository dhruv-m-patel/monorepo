import type { StorybookConfig } from '@storybook/react-vite';
import path from 'path';
import remarkGfm from 'remark-gfm';

const config: StorybookConfig = {
  stories: [
    '../src/**/*.mdx',
    '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)',
    '../docs/**/*.mdx',
  ],
  addons: [
    '@storybook/addon-essentials',
    {
      name: '@storybook/addon-docs',
      options: {
        mdxPluginOptions: {
          mdxCompileOptions: {
            remarkPlugins: [remarkGfm],
          },
        },
      },
    },
    '@storybook/addon-interactions',
    '@storybook/addon-links',
  ],
  framework: {
    name: '@storybook/react-vite',
    options: {},
  },
  viteFinal: async (config) => {
    const tailwindcss = (await import('@tailwindcss/vite')).default;

    config.plugins = [...(config.plugins || []), tailwindcss()];

    config.resolve = config.resolve || {};
    config.resolve.alias = {
      ...config.resolve.alias,
      '@ui': path.resolve(__dirname, '../src'),
    };
    return config;
  },
};

export default config;
