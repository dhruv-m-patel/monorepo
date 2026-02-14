import type { Meta, StoryObj } from '@storybook/react';
import { RadioGroup, RadioGroupItem } from './RadioGroup';
import { Label } from '../Label/Label';

const meta = {
  title: 'Components/RadioGroup',
  component: RadioGroup,
  tags: ['autodocs'],
  argTypes: {
    defaultValue: {
      control: 'text',
      description: 'Default selected value (uncontrolled)',
    },
    value: {
      control: 'text',
      description: 'Controlled selected value',
    },
    disabled: {
      control: 'boolean',
      description: 'Disable all radio items',
    },
  },
} satisfies Meta<typeof RadioGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <RadioGroup defaultValue="option-one" {...args}>
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="option-one" id="option-one" />
        <Label htmlFor="option-one">Option One</Label>
      </div>
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="option-two" id="option-two" />
        <Label htmlFor="option-two">Option Two</Label>
      </div>
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="option-three" id="option-three" />
        <Label htmlFor="option-three">Option Three</Label>
      </div>
    </RadioGroup>
  ),
};

export const WithDisabled: Story = {
  render: () => (
    <RadioGroup defaultValue="option-one">
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="option-one" id="r1" />
        <Label htmlFor="r1">Default</Label>
      </div>
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="option-two" id="r2" disabled />
        <Label htmlFor="r2">Disabled</Label>
      </div>
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="option-three" id="r3" />
        <Label htmlFor="r3">Comfortable</Label>
      </div>
    </RadioGroup>
  ),
};

export const WithDescription: Story = {
  render: () => (
    <RadioGroup defaultValue="card">
      <div className="flex items-start space-x-2">
        <RadioGroupItem value="card" id="card" className="mt-1" />
        <div className="grid gap-1.5 leading-none">
          <Label htmlFor="card">Credit Card</Label>
          <p className="text-sm text-muted-foreground">
            Pay with your credit or debit card
          </p>
        </div>
      </div>
      <div className="flex items-start space-x-2">
        <RadioGroupItem value="paypal" id="paypal" className="mt-1" />
        <div className="grid gap-1.5 leading-none">
          <Label htmlFor="paypal">PayPal</Label>
          <p className="text-sm text-muted-foreground">
            Pay with your PayPal account
          </p>
        </div>
      </div>
      <div className="flex items-start space-x-2">
        <RadioGroupItem value="apple" id="apple" className="mt-1" />
        <div className="grid gap-1.5 leading-none">
          <Label htmlFor="apple">Apple Pay</Label>
          <p className="text-sm text-muted-foreground">
            Pay with Apple Pay
          </p>
        </div>
      </div>
    </RadioGroup>
  ),
};

export const AllDisabled: Story = {
  args: {
    disabled: true,
    defaultValue: 'option-one',
  },
  render: (args) => (
    <RadioGroup {...args}>
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="option-one" id="d1" />
        <Label htmlFor="d1">Option One</Label>
      </div>
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="option-two" id="d2" />
        <Label htmlFor="d2">Option Two</Label>
      </div>
    </RadioGroup>
  ),
};
