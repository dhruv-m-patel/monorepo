import type { Meta, StoryObj } from '@storybook/react';
import { Textarea } from './Textarea';

const meta = {
  title: 'Components/Textarea',
  component: Textarea,
  tags: ['autodocs'],
  argTypes: {
    error: {
      control: 'boolean',
      description: 'Show error state',
    },
    disabled: {
      control: 'boolean',
      description: 'Disable the textarea',
    },
    placeholder: {
      control: 'text',
      description: 'Placeholder text',
    },
    rows: {
      control: 'number',
      description: 'Number of visible text rows',
    },
  },
} satisfies Meta<typeof Textarea>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    placeholder: 'Type your message here...',
  },
};

export const WithValue: Story = {
  args: {
    value: 'This is a sample text that has been entered into the textarea.\n\nIt supports multiple lines.',
  },
};

export const WithRows: Story = {
  args: {
    placeholder: 'This textarea has 10 rows',
    rows: 10,
  },
};

export const Error: Story = {
  args: {
    placeholder: 'Invalid input',
    error: true,
    value: 'This text exceeds the maximum character limit',
  },
};

export const Disabled: Story = {
  args: {
    placeholder: 'This textarea is disabled',
    disabled: true,
    value: 'Cannot edit this content',
  },
};

export const WithMaxLength: Story = {
  args: {
    placeholder: 'Maximum 100 characters',
    maxLength: 100,
  },
};
