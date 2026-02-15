import type { Meta, StoryObj } from '@storybook/react';
import { Checkbox } from './Checkbox';
import { Label } from '../Label/Label';

const meta = {
  title: 'Components/Checkbox',
  component: Checkbox,
  tags: ['autodocs'],
  argTypes: {
    checked: {
      control: 'boolean',
      description: 'Controlled checked state',
    },
    defaultChecked: {
      control: 'boolean',
      description: 'Default checked state (uncontrolled)',
    },
    disabled: {
      control: 'boolean',
      description: 'Disable the checkbox',
    },
  },
} satisfies Meta<typeof Checkbox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <div className="flex items-center space-x-2">
      <Checkbox id="default" {...args} />
      <Label htmlFor="default">Accept terms and conditions</Label>
    </div>
  ),
};

export const Checked: Story = {
  args: {
    defaultChecked: true,
  },
  render: (args) => (
    <div className="flex items-center space-x-2">
      <Checkbox id="checked" {...args} />
      <Label htmlFor="checked">Subscribe to newsletter</Label>
    </div>
  ),
};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
  render: (args) => (
    <div className="flex items-center space-x-2">
      <Checkbox id="disabled" {...args} />
      <Label htmlFor="disabled">Disabled checkbox</Label>
    </div>
  ),
};

export const DisabledChecked: Story = {
  args: {
    disabled: true,
    defaultChecked: true,
  },
  render: (args) => (
    <div className="flex items-center space-x-2">
      <Checkbox id="disabled-checked" {...args} />
      <Label htmlFor="disabled-checked">Disabled and checked</Label>
    </div>
  ),
};

export const WithText: Story = {
  render: () => (
    <div className="space-y-4">
      <div className="flex items-start space-x-2">
        <Checkbox id="terms" className="mt-1" />
        <div className="grid gap-1.5 leading-none">
          <Label htmlFor="terms">Accept terms and conditions</Label>
          <p className="text-sm text-muted-foreground">
            You agree to our Terms of Service and Privacy Policy.
          </p>
        </div>
      </div>
    </div>
  ),
};
