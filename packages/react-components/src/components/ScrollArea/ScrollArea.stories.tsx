import type { Meta, StoryObj } from '@storybook/react';
import { ScrollArea, ScrollBar } from './ScrollArea';

const meta = {
  title: 'Components/ScrollArea',
  component: ScrollArea,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof ScrollArea>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <ScrollArea className="h-[200px] w-[350px] rounded-md border p-4">
      <div className="space-y-4">
        {Array.from({ length: 20 }).map((_, i) => (
          <div key={i} className="text-sm">
            Item {i + 1}: This is a scrollable item in the list.
          </div>
        ))}
      </div>
    </ScrollArea>
  ),
};

export const HorizontalScroll: Story = {
  render: () => (
    <ScrollArea className="w-[350px] whitespace-nowrap rounded-md border">
      <div className="flex w-max space-x-4 p-4">
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={i}
            className="h-[200px] w-[200px] rounded-md bg-muted flex items-center justify-center"
          >
            <span className="text-sm">Card {i + 1}</span>
          </div>
        ))}
      </div>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  ),
};

export const BothDirections: Story = {
  render: () => (
    <ScrollArea className="h-[300px] w-[350px] rounded-md border">
      <div className="w-[800px] p-4">
        {Array.from({ length: 30 }).map((_, i) => (
          <div key={i} className="text-sm whitespace-nowrap">
            Row {i + 1}: This is a wide content that requires horizontal
            scrolling as well as vertical scrolling.
          </div>
        ))}
      </div>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  ),
};

export const Tags: Story = {
  render: () => {
    const tags = Array.from({ length: 50 }).map(
      (_, i, a) => `tag-${a.length - i}`
    );
    return (
      <ScrollArea className="h-72 w-48 rounded-md border">
        <div className="p-4">
          <h4 className="mb-4 text-sm font-medium leading-none">Tags</h4>
          {tags.map((tag) => (
            <div key={tag} className="text-sm py-1">
              {tag}
            </div>
          ))}
        </div>
      </ScrollArea>
    );
  },
};

export const LongContent: Story = {
  render: () => (
    <ScrollArea className="h-[400px] w-[450px] rounded-md border p-4">
      <div className="space-y-4">
        <h2 className="text-xl font-bold">Long Article</h2>
        <p className="text-sm text-muted-foreground">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris.
        </p>
        {Array.from({ length: 10 }).map((_, i) => (
          <div key={i} className="space-y-2">
            <h3 className="text-lg font-semibold">Section {i + 1}</h3>
            <p className="text-sm">
              This is paragraph {i + 1} with more content to demonstrate the
              scrolling behavior. The scroll area should have smooth scrolling
              and a styled scrollbar that appears when hovering.
            </p>
          </div>
        ))}
      </div>
    </ScrollArea>
  ),
};
