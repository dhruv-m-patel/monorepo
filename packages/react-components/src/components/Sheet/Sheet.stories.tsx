import type { Meta, StoryObj } from '@storybook/react';
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
  SheetClose,
} from './Sheet';
import { Button } from '../Button/Button';

const meta = {
  title: 'Components/Sheet',
  component: Sheet,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'A sheet (drawer) component built on @radix-ui/react-dialog. Slides in from the top, right, bottom, or left edge of the screen.',
      },
    },
  },
} satisfies Meta<typeof Sheet>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Right: Story = {
  render: () => (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline">Open Sheet (Right)</Button>
      </SheetTrigger>
      <SheetContent side="right">
        <SheetHeader>
          <SheetTitle>Sheet Title</SheetTitle>
          <SheetDescription>
            This sheet slides in from the right side. Click the close button or
            press Escape to dismiss.
          </SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  ),
};

export const Left: Story = {
  render: () => (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline">Open Sheet (Left)</Button>
      </SheetTrigger>
      <SheetContent side="left">
        <SheetHeader>
          <SheetTitle>Navigation</SheetTitle>
          <SheetDescription>
            This sheet slides in from the left side, commonly used for
            navigation menus.
          </SheetDescription>
        </SheetHeader>
        <div className="py-4 space-y-2">
          <Button variant="ghost" className="w-full justify-start">
            Home
          </Button>
          <Button variant="ghost" className="w-full justify-start">
            About
          </Button>
          <Button variant="ghost" className="w-full justify-start">
            Contact
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  ),
};

export const Top: Story = {
  render: () => (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline">Open Sheet (Top)</Button>
      </SheetTrigger>
      <SheetContent side="top">
        <SheetHeader>
          <SheetTitle>Notification</SheetTitle>
          <SheetDescription>
            This sheet slides in from the top of the screen.
          </SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  ),
};

export const Bottom: Story = {
  render: () => (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline">Open Sheet (Bottom)</Button>
      </SheetTrigger>
      <SheetContent side="bottom">
        <SheetHeader>
          <SheetTitle>Cookie Settings</SheetTitle>
          <SheetDescription>
            This sheet slides in from the bottom of the screen.
          </SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  ),
};

export const WithFooter: Story = {
  render: () => (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline">Open Sheet</Button>
      </SheetTrigger>
      <SheetContent side="right">
        <SheetHeader>
          <SheetTitle>Edit Profile</SheetTitle>
          <SheetDescription>
            Make changes to your profile here. Click save when you&apos;re done.
          </SheetDescription>
        </SheetHeader>
        <div className="py-4 space-y-4">
          <div className="space-y-2">
            <label htmlFor="name-input" className="text-sm font-medium">
              Name
            </label>
            <input
              id="name-input"
              type="text"
              className="w-full px-3 py-2 border rounded-md"
              placeholder="Enter your name"
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="email-input" className="text-sm font-medium">
              Email
            </label>
            <input
              id="email-input"
              type="email"
              className="w-full px-3 py-2 border rounded-md"
              placeholder="Enter your email"
            />
          </div>
        </div>
        <SheetFooter>
          <SheetClose asChild>
            <Button variant="outline">Cancel</Button>
          </SheetClose>
          <Button>Save changes</Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  ),
};
