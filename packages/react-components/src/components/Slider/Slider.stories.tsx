import type { Meta, StoryObj } from '@storybook/react';
import { Slider } from './Slider';

const meta = {
  title: 'Components/Slider',
  component: Slider,
  tags: ['autodocs'],
  argTypes: {
    defaultValue: {
      control: { type: 'object' },
      description: 'The default value of the slider',
    },
    max: {
      control: { type: 'number' },
      description: 'The maximum value',
    },
    min: {
      control: { type: 'number' },
      description: 'The minimum value',
    },
    step: {
      control: { type: 'number' },
      description: 'The step amount',
    },
    disabled: {
      control: { type: 'boolean' },
      description: 'Whether the slider is disabled',
    },
  },
} satisfies Meta<typeof Slider>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    defaultValue: [50],
    max: 100,
    step: 1,
  },
};

export const CustomRange: Story = {
  args: {
    defaultValue: [25],
    min: 0,
    max: 50,
    step: 5,
  },
};

export const MultipleValues: Story = {
  args: {
    defaultValue: [25, 75],
    max: 100,
    step: 1,
  },
};

export const Disabled: Story = {
  args: {
    defaultValue: [50],
    max: 100,
    step: 1,
    disabled: true,
  },
};
