import type { Meta, StoryObj } from '@storybook/react';
import { Label } from './Label';
import { Input } from '../Input/Input';

const meta = {
  title: 'Components/Label',
  component: Label,
  tags: ['autodocs'],
  argTypes: {
    htmlFor: {
      control: 'text',
      description: 'ID of the associated form element',
    },
  },
} satisfies Meta<typeof Label>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'Label',
    htmlFor: 'input-id',
  },
};

export const WithInput: Story = {
  render: () => (
    <div className="space-y-2">
      <Label htmlFor="email">Email</Label>
      <Input id="email" type="email" placeholder="email@example.com" />
    </div>
  ),
};

export const Required: Story = {
  render: () => (
    <div className="space-y-2">
      <Label htmlFor="password">
        Password <span className="text-destructive">*</span>
      </Label>
      <Input id="password" type="password" required />
    </div>
  ),
};

export const Disabled: Story = {
  render: () => (
    <div className="space-y-2">
      <Label htmlFor="disabled-input" className="peer-disabled:opacity-70">
        Disabled Field
      </Label>
      <Input id="disabled-input" disabled value="Cannot edit" />
    </div>
  ),
};

export const WithError: Story = {
  render: () => (
    <div className="space-y-2">
      <Label htmlFor="error-input" className="text-destructive">
        Username
      </Label>
      <Input
        id="error-input"
        error
        value="invalid-username!"
        aria-describedby="error-message"
      />
      <p id="error-message" className="text-sm text-destructive">
        Username can only contain letters and numbers
      </p>
    </div>
  ),
};
