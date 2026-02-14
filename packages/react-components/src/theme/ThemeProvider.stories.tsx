import type { Meta, StoryObj } from '@storybook/react';
import { ThemeProvider } from './ThemeProvider';
import { useTheme } from './useTheme';

function ThemeDemo() {
  const { theme, setTheme, toggleTheme, resolvedTheme } = useTheme();
  return (
    <div className="space-y-4 p-6">
      <div className="rounded-lg border border-border bg-card p-4 text-card-foreground">
        <h3 className="text-lg font-semibold">Theme Engine Demo</h3>
        <p className="text-muted-foreground">
          Current mode: <strong>{theme}</strong> | Resolved:{' '}
          <strong>{resolvedTheme}</strong>
        </p>
      </div>
      <div className="flex gap-2">
        <button
          onClick={() => setTheme('light')}
          className="rounded-md bg-primary px-4 py-2 text-primary-foreground"
        >
          Light
        </button>
        <button
          onClick={() => setTheme('dark')}
          className="rounded-md bg-primary px-4 py-2 text-primary-foreground"
        >
          Dark
        </button>
        <button
          onClick={() => setTheme('system')}
          className="rounded-md bg-secondary px-4 py-2 text-secondary-foreground"
        >
          System
        </button>
        <button
          onClick={toggleTheme}
          className="rounded-md bg-accent px-4 py-2 text-accent-foreground"
        >
          Toggle
        </button>
      </div>
      <div className="grid grid-cols-4 gap-2">
        <div className="rounded bg-primary p-3 text-primary-foreground text-sm">
          Primary
        </div>
        <div className="rounded bg-secondary p-3 text-secondary-foreground text-sm">
          Secondary
        </div>
        <div className="rounded bg-destructive p-3 text-destructive-foreground text-sm">
          Destructive
        </div>
        <div className="rounded bg-muted p-3 text-muted-foreground text-sm">
          Muted
        </div>
        <div className="rounded bg-success p-3 text-success-foreground text-sm">
          Success
        </div>
        <div className="rounded bg-warning p-3 text-warning-foreground text-sm">
          Warning
        </div>
        <div className="rounded bg-accent p-3 text-accent-foreground text-sm">
          Accent
        </div>
        <div className="rounded bg-card p-3 text-card-foreground text-sm border border-border">
          Card
        </div>
      </div>
    </div>
  );
}

const meta = {
  title: 'Theme/ThemeProvider',
  component: ThemeProvider,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
  args: {
    children: <ThemeDemo />,
  },
  render: (args) => <ThemeProvider {...args} />,
} satisfies Meta<typeof ThemeProvider>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    defaultTheme: 'light',
  },
};

export const DarkMode: Story = {
  args: {
    defaultTheme: 'dark',
  },
};

export const CustomOverrides: Story = {
  args: {
    defaultTheme: 'light',
    overrides: {
      primary: 'oklch(0.65 0.25 145)',
      'primary-foreground': 'oklch(0.985 0 0)',
    },
  },
};

export const SystemPreference: Story = {
  args: {
    defaultTheme: 'system',
  },
};
