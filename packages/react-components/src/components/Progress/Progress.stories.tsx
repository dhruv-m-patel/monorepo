import type { Meta, StoryObj } from '@storybook/react';
import { Progress } from './Progress';

const meta = {
  title: 'Feedback/Progress',
  component: Progress,
  tags: ['autodocs'],
  argTypes: {
    value: {
      control: { type: 'range', min: 0, max: 100, step: 1 },
    },
    max: {
      control: { type: 'number' },
    },
  },
} satisfies Meta<typeof Progress>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default progress bar at 0%
 */
export const Default: Story = {
  args: {
    value: 0,
    max: 100,
  },
};

/**
 * Progress bar at 25%
 */
export const Quarter: Story = {
  args: {
    value: 25,
    max: 100,
  },
};

/**
 * Progress bar at 50%
 */
export const Half: Story = {
  args: {
    value: 50,
    max: 100,
  },
};

/**
 * Progress bar at 75%
 */
export const ThreeQuarters: Story = {
  args: {
    value: 75,
    max: 100,
  },
};

/**
 * Progress bar at 100% (complete)
 */
export const Complete: Story = {
  args: {
    value: 100,
    max: 100,
  },
};

/**
 * Progress bar with custom max value
 */
export const CustomMax: Story = {
  args: {
    value: 30,
    max: 50,
  },
};
