import type { Meta, StoryObj } from '@storybook/react';
import { Separator } from './Separator';

const meta = {
  title: 'Components/Separator',
  component: Separator,
  tags: ['autodocs'],
  argTypes: {
    orientation: {
      control: 'radio',
      options: ['horizontal', 'vertical'],
    },
    decorative: {
      control: 'boolean',
    },
  },
} satisfies Meta<typeof Separator>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    orientation: 'horizontal',
    decorative: true,
  },
  render: (args) => (
    <div className="w-full max-w-md space-y-4">
      <div>
        <p className="text-sm">Above separator</p>
      </div>
      <Separator {...args} />
      <div>
        <p className="text-sm">Below separator</p>
      </div>
    </div>
  ),
};

export const Horizontal: Story = {
  args: {
    orientation: 'horizontal',
  },
  render: (args) => (
    <div className="w-full max-w-md space-y-4">
      <div>
        <h4 className="text-sm font-medium">Section 1</h4>
        <p className="text-sm text-muted-foreground">Content above</p>
      </div>
      <Separator {...args} />
      <div>
        <h4 className="text-sm font-medium">Section 2</h4>
        <p className="text-sm text-muted-foreground">Content below</p>
      </div>
    </div>
  ),
};

export const Vertical: Story = {
  args: {
    orientation: 'vertical',
  },
  render: (args) => (
    <div className="flex h-20 items-center space-x-4">
      <div>
        <p className="text-sm">Left</p>
      </div>
      <Separator {...args} />
      <div>
        <p className="text-sm">Right</p>
      </div>
    </div>
  ),
};
