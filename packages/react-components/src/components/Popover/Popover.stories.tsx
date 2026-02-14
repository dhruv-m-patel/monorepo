import type { Meta, StoryObj } from '@storybook/react';
import { Popover, PopoverContent, PopoverTrigger } from './Popover';
import { Button } from '../Button/Button';

const meta = {
  title: 'Components/Popover',
  component: Popover,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div className="flex items-center justify-center min-h-[400px]">
        <Story />
      </div>
    ),
  ],
  parameters: {
    docs: {
      description: {
        component:
          'A popover component built on @radix-ui/react-popover. Displays rich content in a floating panel anchored to a trigger element.',
      },
    },
  },
} satisfies Meta<typeof Popover>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline">Open popover</Button>
      </PopoverTrigger>
      <PopoverContent>
        <div className="space-y-2">
          <h4 className="font-medium leading-none">Popover Title</h4>
          <p className="text-sm text-muted-foreground">
            This is a popover. You can put any content here.
          </p>
        </div>
      </PopoverContent>
    </Popover>
  ),
};

export const Top: Story = {
  render: () => (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline">Top</Button>
      </PopoverTrigger>
      <PopoverContent side="top">
        <div className="space-y-2">
          <h4 className="font-medium leading-none">Top Aligned</h4>
          <p className="text-sm text-muted-foreground">
            This popover appears above the trigger.
          </p>
        </div>
      </PopoverContent>
    </Popover>
  ),
};

export const Right: Story = {
  render: () => (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline">Right</Button>
      </PopoverTrigger>
      <PopoverContent side="right">
        <div className="space-y-2">
          <h4 className="font-medium leading-none">Right Aligned</h4>
          <p className="text-sm text-muted-foreground">
            This popover appears to the right of the trigger.
          </p>
        </div>
      </PopoverContent>
    </Popover>
  ),
};

export const Bottom: Story = {
  render: () => (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline">Bottom</Button>
      </PopoverTrigger>
      <PopoverContent side="bottom">
        <div className="space-y-2">
          <h4 className="font-medium leading-none">Bottom Aligned</h4>
          <p className="text-sm text-muted-foreground">
            This popover appears below the trigger.
          </p>
        </div>
      </PopoverContent>
    </Popover>
  ),
};

export const Left: Story = {
  render: () => (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline">Left</Button>
      </PopoverTrigger>
      <PopoverContent side="left">
        <div className="space-y-2">
          <h4 className="font-medium leading-none">Left Aligned</h4>
          <p className="text-sm text-muted-foreground">
            This popover appears to the left of the trigger.
          </p>
        </div>
      </PopoverContent>
    </Popover>
  ),
};

export const WithForm: Story = {
  render: () => (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline">Settings</Button>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <div className="space-y-4">
          <h4 className="font-medium leading-none">Dimensions</h4>
          <div className="space-y-2">
            <div className="space-y-1">
              <label htmlFor="width" className="text-sm font-medium">
                Width
              </label>
              <input
                id="width"
                type="number"
                defaultValue={100}
                className="w-full px-3 py-2 border rounded-md"
              />
            </div>
            <div className="space-y-1">
              <label htmlFor="height" className="text-sm font-medium">
                Height
              </label>
              <input
                id="height"
                type="number"
                defaultValue={100}
                className="w-full px-3 py-2 border rounded-md"
              />
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  ),
};

export const WithList: Story = {
  render: () => (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline">Actions</Button>
      </PopoverTrigger>
      <PopoverContent className="w-56">
        <div className="space-y-1">
          <button className="w-full px-2 py-1.5 text-left text-sm hover:bg-accent rounded-sm">
            Edit
          </button>
          <button className="w-full px-2 py-1.5 text-left text-sm hover:bg-accent rounded-sm">
            Duplicate
          </button>
          <button className="w-full px-2 py-1.5 text-left text-sm hover:bg-accent rounded-sm">
            Archive
          </button>
          <div className="my-1 h-px bg-border" />
          <button className="w-full px-2 py-1.5 text-left text-sm text-destructive hover:bg-accent rounded-sm">
            Delete
          </button>
        </div>
      </PopoverContent>
    </Popover>
  ),
};

export const CustomWidth: Story = {
  render: () => (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline">Open</Button>
      </PopoverTrigger>
      <PopoverContent className="w-96">
        <div className="space-y-2">
          <h4 className="font-medium leading-none">Custom Width</h4>
          <p className="text-sm text-muted-foreground">
            This popover has a custom width of 24rem (96 in Tailwind scale). You
            can easily adjust the width using the className prop.
          </p>
        </div>
      </PopoverContent>
    </Popover>
  ),
};
