import { describe, it, expect, vi } from 'vitest';
import { render, screen, act, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { composeStories } from '@storybook/react';
import * as stories from './Toast.stories';
import {
  Toast,
  ToastTitle,
  ToastDescription,
  ToastClose,
} from './Toast';
import { ToastProvider, useToast } from './useToast';
import { Toaster } from './Toaster';
import * as React from 'react';

const { StaticToast } = composeStories(stories);

describe('Toast', () => {
  describe('StaticToast story', () => {
    it('renders static toast with title and description', () => {
      render(<StaticToast />);
      expect(screen.getByText('Notification')).toBeInTheDocument();
      expect(
        screen.getByText('This is a static toast component.')
      ).toBeInTheDocument();
    });

    it('renders close button', () => {
      render(<StaticToast />);
      const closeButton = screen.getByRole('button');
      expect(closeButton).toBeInTheDocument();
    });
  });

  describe('Toast component variants', () => {
    it('renders default variant with correct classes', () => {
      const { container } = render(
        <Toast variant="default">
          <ToastTitle>Test</ToastTitle>
        </Toast>
      );
      const toast = container.firstChild as HTMLElement;
      expect(toast).toHaveClass('border');
      expect(toast).toHaveClass('bg-background');
      expect(toast).toHaveClass('text-foreground');
    });

    it('renders destructive variant with correct classes', () => {
      const { container } = render(
        <Toast variant="destructive">
          <ToastTitle>Error</ToastTitle>
        </Toast>
      );
      const toast = container.firstChild as HTMLElement;
      expect(toast).toHaveClass('destructive');
      expect(toast).toHaveClass('border-destructive');
      expect(toast).toHaveClass('bg-destructive');
      expect(toast).toHaveClass('text-destructive-foreground');
    });

    it('renders success variant with correct classes', () => {
      const { container } = render(
        <Toast variant="success">
          <ToastTitle>Success</ToastTitle>
        </Toast>
      );
      const toast = container.firstChild as HTMLElement;
      expect(toast).toHaveClass('border-green-500');
      expect(toast).toHaveClass('bg-green-50');
      expect(toast).toHaveClass('text-green-900');
    });

    it('renders title and description', () => {
      render(
        <Toast>
          <ToastTitle>Test Title</ToastTitle>
          <ToastDescription>Test Description</ToastDescription>
        </Toast>
      );
      expect(screen.getByText('Test Title')).toBeInTheDocument();
      expect(screen.getByText('Test Description')).toBeInTheDocument();
    });

    it('calls onClose when ToastClose is clicked', async () => {
      const user = userEvent.setup();
      const onClose = vi.fn();

      render(
        <Toast onClose={onClose}>
          <ToastTitle>Test</ToastTitle>
          <ToastClose onClick={onClose} />
        </Toast>
      );

      const closeButton = screen.getByRole('button');
      await user.click(closeButton);

      expect(onClose).toHaveBeenCalledTimes(1);
    });
  });

  describe('useToast hook with ToastProvider', () => {
    it('shows toast when toast() is called', async () => {
      function TestComponent() {
        const { toast } = useToast();

        return (
          <div>
            <button
              onClick={() =>
                toast({
                  title: 'Test Toast',
                  description: 'Test description',
                  duration: 10000,
                })
              }
            >
              Show Toast
            </button>
            <Toaster />
          </div>
        );
      }

      const user = userEvent.setup();
      render(
        <ToastProvider>
          <TestComponent />
        </ToastProvider>
      );

      const button = screen.getByText('Show Toast');
      await user.click(button);

      // Use find* which has built-in waiting
      expect(await screen.findByText('Test Toast')).toBeInTheDocument();
      expect(screen.getByText('Test description')).toBeInTheDocument();
    });

    it('auto-dismisses toast after duration', async () => {
      vi.useFakeTimers();

      function TestComponent() {
        const { toast } = useToast();

        return (
          <div>
            <button
              onClick={() => toast({ title: 'Auto Dismiss', duration: 1000 })}
            >
              Show Toast
            </button>
            <Toaster />
          </div>
        );
      }

      render(
        <ToastProvider>
          <TestComponent />
        </ToastProvider>
      );

      const button = screen.getByText('Show Toast');

      // Click the button
      act(() => {
        button.click();
      });

      // Wait for toast to appear (use real async wait since portal mount uses real timer)
      await vi.waitFor(
        () => {
          expect(screen.getByText('Auto Dismiss')).toBeInTheDocument();
        },
        { timeout: 3000 }
      );

      // Advance timers by the duration
      act(() => {
        vi.advanceTimersByTime(1000);
      });

      // Wait for toast to disappear
      await vi.waitFor(
        () => {
          expect(screen.queryByText('Auto Dismiss')).not.toBeInTheDocument();
        },
        { timeout: 3000 }
      );

      vi.useRealTimers();
    });

    it('dismisses toast when close button is clicked', async () => {
      function TestComponent() {
        const { toast } = useToast();

        return (
          <div>
            <button
              onClick={() => toast({ title: 'Dismissible', duration: 10000 })}
            >
              Show Toast
            </button>
            <Toaster />
          </div>
        );
      }

      const user = userEvent.setup();
      render(
        <ToastProvider>
          <TestComponent />
        </ToastProvider>
      );

      const button = screen.getByText('Show Toast');
      await user.click(button);

      // Wait for toast to appear
      expect(await screen.findByText('Dismissible')).toBeInTheDocument();

      // Find all buttons and identify the close button (has SVG, is not the trigger button)
      const allButtons = screen.getAllByRole('button');
      const closeButton = allButtons.find(
        (btn) => btn !== button && btn.querySelector('svg')
      );

      expect(closeButton).toBeDefined();
      await user.click(closeButton!);

      // Wait for toast to disappear
      await waitFor(() => {
        expect(screen.queryByText('Dismissible')).not.toBeInTheDocument();
      });
    });

    it('renders multiple toasts', async () => {
      function TestComponent() {
        const { toast } = useToast();

        return (
          <div>
            <button
              onClick={() => {
                toast({ title: 'Toast 1', duration: 10000 });
                toast({ title: 'Toast 2', duration: 10000 });
                toast({ title: 'Toast 3', duration: 10000 });
              }}
            >
              Show Multiple
            </button>
            <Toaster />
          </div>
        );
      }

      const user = userEvent.setup();
      render(
        <ToastProvider>
          <TestComponent />
        </ToastProvider>
      );

      const button = screen.getByText('Show Multiple');
      await user.click(button);

      // Wait for all toasts to appear
      expect(await screen.findByText('Toast 1')).toBeInTheDocument();
      expect(screen.getByText('Toast 2')).toBeInTheDocument();
      expect(screen.getByText('Toast 3')).toBeInTheDocument();
    });

    it('applies correct variant classes for success toast', async () => {
      function TestComponent() {
        const { toast } = useToast();

        return (
          <div>
            <button
              onClick={() =>
                toast({ title: 'Success', variant: 'success', duration: 10000 })
              }
            >
              Show Success
            </button>
            <Toaster />
          </div>
        );
      }

      const user = userEvent.setup();
      render(
        <ToastProvider>
          <TestComponent />
        </ToastProvider>
      );

      const button = screen.getByText('Show Success');
      await user.click(button);

      // Wait for toast to appear
      await screen.findByText('Success');

      const successToast = screen.getByText('Success').parentElement?.parentElement;
      expect(successToast).toHaveClass('border-green-500');
    });

    it('applies correct variant classes for destructive toast', async () => {
      function TestComponent() {
        const { toast } = useToast();

        return (
          <div>
            <button
              onClick={() =>
                toast({
                  title: 'Error',
                  variant: 'destructive',
                  duration: 10000,
                })
              }
            >
              Show Error
            </button>
            <Toaster />
          </div>
        );
      }

      const user = userEvent.setup();
      render(
        <ToastProvider>
          <TestComponent />
        </ToastProvider>
      );

      const button = screen.getByText('Show Error');
      await user.click(button);

      // Wait for toast to appear
      await screen.findByText('Error');

      const errorToast = screen.getByText('Error').parentElement?.parentElement;
      expect(errorToast).toHaveClass('border-destructive');
    });

    it('throws error when useToast is used outside ToastProvider', () => {
      function TestComponent() {
        const { toast } = useToast();
        return <button onClick={() => toast({ title: 'Test' })}>Test</button>;
      }

      // Suppress console.error for this test
      const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

      expect(() => render(<TestComponent />)).toThrow(
        'useToast must be used within a ToastProvider'
      );

      consoleSpy.mockRestore();
    });
  });
});
