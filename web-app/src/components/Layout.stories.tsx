import type { Meta, StoryObj } from '@storybook/react';
import Layout from './Layout';
import { ThemeProvider } from '@/context/ThemeContext';

const meta = {
  title: 'Components/Layout',
  component: Layout,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <ThemeProvider>
        <Story />
      </ThemeProvider>
    ),
  ],
} satisfies Meta<typeof Layout>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: (
      <div className="flex items-center justify-center py-24">
        <p className="text-lg text-muted-foreground">Page content goes here</p>
      </div>
    ),
  },
};

export const WithContent: Story = {
  args: {
    children: (
      <div className="mx-auto max-w-4xl px-4 py-12">
        <h1 className="text-3xl font-bold">Example Page</h1>
        <p className="mt-4 text-muted-foreground">
          This story demonstrates the Layout component with realistic page
          content. The header includes a dark mode toggle and the footer shows
          tech stack information.
        </p>
      </div>
    ),
  },
};
