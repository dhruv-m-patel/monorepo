import type { Meta, StoryObj } from '@storybook/react';
import { HoverCard, HoverCardContent, HoverCardTrigger } from './HoverCard';

const meta = {
  title: 'Components/HoverCard',
  component: HoverCard,
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
          'A hover card component built on @radix-ui/react-hover-card. Displays rich preview content when hovering over a trigger element.',
      },
    },
  },
} satisfies Meta<typeof HoverCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <HoverCard>
      <HoverCardTrigger asChild>
        {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
        <a
          href="#"
          className="underline text-primary hover:text-primary/80"
          onClick={(e) => e.preventDefault()}
        >
          @username
        </a>
      </HoverCardTrigger>
      <HoverCardContent>
        <div className="space-y-2">
          <h4 className="text-sm font-semibold">@username</h4>
          <p className="text-sm text-muted-foreground">
            Software developer and open source enthusiast. Building tools for developers.
          </p>
          <div className="flex items-center pt-2">
            <span className="text-xs text-muted-foreground">Joined December 2023</span>
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
  ),
};

export const WithAvatar: Story = {
  render: () => (
    <HoverCard>
      <HoverCardTrigger asChild>
        {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
        <a
          href="#"
          className="underline text-primary hover:text-primary/80"
          onClick={(e) => e.preventDefault()}
        >
          @johndoe
        </a>
      </HoverCardTrigger>
      <HoverCardContent className="w-80">
        <div className="flex gap-4">
          <div className="h-12 w-12 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white font-semibold">
            JD
          </div>
          <div className="space-y-1">
            <h4 className="text-sm font-semibold">John Doe</h4>
            <p className="text-sm">@johndoe</p>
            <p className="text-sm text-muted-foreground">
              Full-stack developer passionate about React and TypeScript.
            </p>
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
  ),
};

export const ProductPreview: Story = {
  render: () => (
    <HoverCard>
      <HoverCardTrigger asChild>
        {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
        <a
          href="#"
          className="underline text-primary hover:text-primary/80"
          onClick={(e) => e.preventDefault()}
        >
          View product details
        </a>
      </HoverCardTrigger>
      <HoverCardContent className="w-80">
        <div className="space-y-2">
          <div className="h-40 w-full rounded-md bg-gradient-to-br from-blue-500 to-cyan-500" />
          <div className="space-y-1">
            <h4 className="text-sm font-semibold">Premium Widget</h4>
            <p className="text-sm text-muted-foreground">
              High-quality widget with advanced features and premium support.
            </p>
            <div className="flex items-center justify-between pt-2">
              <span className="text-lg font-bold">$99.99</span>
              <span className="text-xs text-muted-foreground">In stock</span>
            </div>
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
  ),
};

export const DocumentPreview: Story = {
  render: () => (
    <HoverCard>
      <HoverCardTrigger asChild>
        {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
        <a
          href="#"
          className="underline text-primary hover:text-primary/80"
          onClick={(e) => e.preventDefault()}
        >
          README.md
        </a>
      </HoverCardTrigger>
      <HoverCardContent className="w-96">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-5 w-5"
            >
              <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
              <polyline points="14 2 14 8 20 8" />
            </svg>
            <h4 className="text-sm font-semibold">README.md</h4>
          </div>
          <p className="text-xs text-muted-foreground font-mono">
            # My Project
            <br />
            <br />
            A comprehensive guide to getting started with this project...
          </p>
          <div className="flex items-center gap-4 pt-2 text-xs text-muted-foreground">
            <span>2.5 KB</span>
            <span>Modified 2 hours ago</span>
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
  ),
};

export const StatCard: Story = {
  render: () => (
    <HoverCard>
      <HoverCardTrigger asChild>
        <button className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90">
          1,234 views
        </button>
      </HoverCardTrigger>
      <HoverCardContent>
        <div className="space-y-3">
          <h4 className="text-sm font-semibold">View Statistics</h4>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">This week</span>
              <span className="font-medium">234</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">This month</span>
              <span className="font-medium">892</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">All time</span>
              <span className="font-medium">1,234</span>
            </div>
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
  ),
};

export const CustomSide: Story = {
  render: () => (
    <HoverCard>
      <HoverCardTrigger asChild>
        {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
        <a
          href="#"
          className="underline text-primary hover:text-primary/80"
          onClick={(e) => e.preventDefault()}
        >
          Hover me (left)
        </a>
      </HoverCardTrigger>
      <HoverCardContent side="left">
        <div className="space-y-2">
          <h4 className="text-sm font-semibold">Left Side</h4>
          <p className="text-sm text-muted-foreground">
            This hover card appears to the left of the trigger.
          </p>
        </div>
      </HoverCardContent>
    </HoverCard>
  ),
};

export const CustomOffset: Story = {
  render: () => (
    <HoverCard>
      <HoverCardTrigger asChild>
        {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
        <a
          href="#"
          className="underline text-primary hover:text-primary/80"
          onClick={(e) => e.preventDefault()}
        >
          Custom offset
        </a>
      </HoverCardTrigger>
      <HoverCardContent sideOffset={20}>
        <div className="space-y-2">
          <h4 className="text-sm font-semibold">Custom Offset</h4>
          <p className="text-sm text-muted-foreground">
            This hover card has a custom side offset of 20px.
          </p>
        </div>
      </HoverCardContent>
    </HoverCard>
  ),
};
