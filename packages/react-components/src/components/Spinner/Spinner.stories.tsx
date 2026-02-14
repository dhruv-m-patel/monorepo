import type { Meta, StoryObj } from '@storybook/react';
import { Spinner } from './Spinner';

const meta = {
  title: 'Components/Spinner',
  component: Spinner,
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'radio',
      options: ['sm', 'default', 'lg'],
    },
  },
} satisfies Meta<typeof Spinner>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    size: 'default',
  },
};

export const Small: Story = {
  args: {
    size: 'sm',
  },
};

export const Large: Story = {
  args: {
    size: 'lg',
  },
};

export const WithText: Story = {
  render: () => (
    <div className="flex items-center gap-2">
      <Spinner />
      <span>Loading...</span>
    </div>
  ),
};

export const Colored: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Spinner className="text-primary" />
      <Spinner className="text-destructive" />
      <Spinner className="text-muted-foreground" />
    </div>
  ),
};

export const AllSizes: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Spinner size="sm" />
      <Spinner size="default" />
      <Spinner size="lg" />
    </div>
  ),
};
