import type { Meta, StoryObj } from '@storybook/react';
import {
  Toast,
  ToastTitle,
  ToastDescription,
  ToastClose,
  ToastAction,
} from './Toast';
import { ToastProvider, useToast } from './useToast';
import { Toaster } from './Toaster';

// Wrapper component to demonstrate toast functionality
function ToastDemo({
  variant,
}: {
  variant?: 'default' | 'destructive' | 'success';
}) {
  const { toast } = useToast();

  return (
    <div>
      <button
        onClick={() => {
          toast({
            title:
              variant === 'destructive'
                ? 'Error'
                : variant === 'success'
                ? 'Success'
                : 'Notification',
            description:
              variant === 'destructive'
                ? 'There was a problem with your request.'
                : variant === 'success'
                ? 'Your action was completed successfully.'
                : 'This is a notification message.',
            variant: variant || 'default',
          });
        }}
        className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground ring-offset-background transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
      >
        Show Toast
      </button>
      <Toaster />
    </div>
  );
}

const meta = {
  title: 'Feedback/Toast',
  component: Toast,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <ToastProvider>
        <Story />
      </ToastProvider>
    ),
  ],
} satisfies Meta<typeof Toast>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default toast notification
 */
export const Default: Story = {
  render: () => <ToastDemo />,
};

/**
 * Destructive toast for errors
 */
export const Destructive: Story = {
  render: () => <ToastDemo variant="destructive" />,
};

/**
 * Success toast for successful operations
 */
export const Success: Story = {
  render: () => <ToastDemo variant="success" />,
};

/**
 * Toast with action button
 */
export const WithAction: Story = {
  render: () => {
    function ToastWithActionDemo() {
      const { toast } = useToast();

      return (
        <div>
          <button
            onClick={() => {
              toast({
                title: 'File deleted',
                description: 'Your file has been moved to trash.',
                action: (
                  <ToastAction onClick={() => console.log('Undo clicked')}>
                    Undo
                  </ToastAction>
                ),
              });
            }}
            className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground ring-offset-background transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          >
            Show Toast with Action
          </button>
          <Toaster />
        </div>
      );
    }

    return <ToastWithActionDemo />;
  },
};

/**
 * Static toast component (without provider)
 */
export const StaticToast: Story = {
  render: () => (
    <Toast variant="default">
      <div className="grid gap-1">
        <ToastTitle>Notification</ToastTitle>
        <ToastDescription>This is a static toast component.</ToastDescription>
      </div>
      <ToastClose />
    </Toast>
  ),
};

/**
 * Toast with custom duration
 */
export const CustomDuration: Story = {
  render: () => {
    function ToastCustomDurationDemo() {
      const { toast } = useToast();

      return (
        <div>
          <button
            onClick={() => {
              toast({
                title: 'Quick message',
                description: 'This will disappear in 2 seconds.',
                duration: 2000,
              });
            }}
            className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground ring-offset-background transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          >
            Show Quick Toast (2s)
          </button>
          <Toaster />
        </div>
      );
    }

    return <ToastCustomDurationDemo />;
  },
};
