import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
  InputOTPSeparator,
} from './InputOTP';

const meta: Meta<typeof InputOTP> = {
  title: 'Components/InputOTP',
  component: InputOTP,
  tags: ['autodocs'],
  argTypes: {
    maxLength: {
      control: { type: 'number' },
      description: 'Maximum length of the OTP code',
    },
    pattern: {
      control: { type: 'text' },
      description: 'Regex pattern for validation',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

function DefaultComponent(args: any) {
  const [value, setValue] = useState('');
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <InputOTP {...args} maxLength={6} value={value} onChange={setValue}>
        <InputOTPGroup>
          <InputOTPSlot index={0} />
          <InputOTPSlot index={1} />
          <InputOTPSlot index={2} />
          <InputOTPSlot index={3} />
          <InputOTPSlot index={4} />
          <InputOTPSlot index={5} />
        </InputOTPGroup>
      </InputOTP>
      <div style={{ fontSize: '0.875rem', color: '#666' }}>
        Value: {value || '(empty)'}
      </div>
    </div>
  );
}

export const Default: Story = {
  render: (args) => <DefaultComponent {...args} />,
};

function WithSeparatorComponent(args: any) {
  const [value, setValue] = useState('');
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <InputOTP {...args} maxLength={6} value={value} onChange={setValue}>
        <InputOTPGroup>
          <InputOTPSlot index={0} />
          <InputOTPSlot index={1} />
          <InputOTPSlot index={2} />
        </InputOTPGroup>
        <InputOTPSeparator />
        <InputOTPGroup>
          <InputOTPSlot index={3} />
          <InputOTPSlot index={4} />
          <InputOTPSlot index={5} />
        </InputOTPGroup>
      </InputOTP>
      <div style={{ fontSize: '0.875rem', color: '#666' }}>
        Value: {value || '(empty)'}
      </div>
    </div>
  );
}

export const WithSeparator: Story = {
  render: (args) => <WithSeparatorComponent {...args} />,
};

function FourDigitComponent(args: any) {
  const [value, setValue] = useState('');
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <InputOTP {...args} maxLength={4} value={value} onChange={setValue}>
        <InputOTPGroup>
          <InputOTPSlot index={0} />
          <InputOTPSlot index={1} />
          <InputOTPSlot index={2} />
          <InputOTPSlot index={3} />
        </InputOTPGroup>
      </InputOTP>
      <div style={{ fontSize: '0.875rem', color: '#666' }}>
        Value: {value || '(empty)'}
      </div>
    </div>
  );
}

export const FourDigit: Story = {
  render: (args) => <FourDigitComponent {...args} />,
};

function WithPatternComponent(args: any) {
  const [value, setValue] = useState('');
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <InputOTP
        {...args}
        maxLength={6}
        value={value}
        onChange={setValue}
        pattern="[0-9]*"
      >
        <InputOTPGroup>
          <InputOTPSlot index={0} />
          <InputOTPSlot index={1} />
          <InputOTPSlot index={2} />
        </InputOTPGroup>
        <InputOTPSeparator />
        <InputOTPGroup>
          <InputOTPSlot index={3} />
          <InputOTPSlot index={4} />
          <InputOTPSlot index={5} />
        </InputOTPGroup>
      </InputOTP>
      <div style={{ fontSize: '0.875rem', color: '#666' }}>
        Value: {value || '(empty)'} (digits only)
      </div>
    </div>
  );
}

export const WithPattern: Story = {
  render: (args) => <WithPatternComponent {...args} />,
};
