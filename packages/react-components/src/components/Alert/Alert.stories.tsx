import type { Meta, StoryObj } from '@storybook/react';
import { Alert, AlertTitle, AlertDescription } from './Alert';

const meta = {
  title: 'Feedback/Alert',
  component: Alert,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'destructive'],
    },
  },
} satisfies Meta<typeof Alert>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default alert variant with information styling
 */
export const Default: Story = {
  render: (args) => (
    <Alert {...args}>
      <AlertTitle>Heads up!</AlertTitle>
      <AlertDescription>
        You can add components to your app using the cli.
      </AlertDescription>
    </Alert>
  ),
  args: {
    variant: 'default',
  },
};

/**
 * Destructive alert variant for errors and warnings
 */
export const Destructive: Story = {
  render: (args) => (
    <Alert {...args}>
      <AlertTitle>Error</AlertTitle>
      <AlertDescription>
        Your session has expired. Please log in again.
      </AlertDescription>
    </Alert>
  ),
  args: {
    variant: 'destructive',
  },
};

/**
 * Alert with an icon slot
 */
export const WithIcon: Story = {
  render: (args) => (
    <Alert
      {...args}
      icon={
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="12" cy="12" r="10" />
          <line x1="12" y1="8" x2="12" y2="12" />
          <line x1="12" y1="16" x2="12.01" y2="16" />
        </svg>
      }
    >
      <AlertTitle>Warning</AlertTitle>
      <AlertDescription>
        This action cannot be undone. Please proceed with caution.
      </AlertDescription>
    </Alert>
  ),
  args: {
    variant: 'default',
  },
};

/**
 * Destructive alert with an icon
 */
export const DestructiveWithIcon: Story = {
  render: (args) => (
    <Alert
      {...args}
      icon={
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="12" cy="12" r="10" />
          <line x1="15" y1="9" x2="9" y2="15" />
          <line x1="9" y1="9" x2="15" y2="15" />
        </svg>
      }
    >
      <AlertTitle>Critical Error</AlertTitle>
      <AlertDescription>
        Failed to save your changes. Please try again or contact support.
      </AlertDescription>
    </Alert>
  ),
  args: {
    variant: 'destructive',
  },
};
