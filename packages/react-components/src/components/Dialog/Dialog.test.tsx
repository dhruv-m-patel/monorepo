import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { composeStories } from '@storybook/react';
import * as stories from './Dialog.stories';
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogHeader,
} from './Dialog';

const composed = composeStories(stories);

describe('Dialog', () => {
  it('renders default story with trigger button', () => {
    render(<composed.Default />);
    const button = screen.getByRole('button', { name: /open dialog/i });
    expect(button).toBeInTheDocument();
  });

  it('renders with footer story', () => {
    render(<composed.WithFooter />);
    const button = screen.getByRole('button', { name: /open dialog/i });
    expect(button).toBeInTheDocument();
  });

  it('renders destructive story', () => {
    render(<composed.Destructive />);
    const button = screen.getByRole('button', { name: /delete account/i });
    expect(button).toBeInTheDocument();
  });

  it('renders long content story', () => {
    render(<composed.LongContent />);
    const button = screen.getByRole('button', { name: /open dialog/i });
    expect(button).toBeInTheDocument();
  });

  it('renders dialog content with correct styles', () => {
    render(
      <Dialog open>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Test Title</DialogTitle>
            <DialogDescription>Test Description</DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    );

    const title = screen.getByText('Test Title');
    expect(title).toBeInTheDocument();
    expect(title).toHaveClass('text-lg', 'font-semibold');

    const description = screen.getByText('Test Description');
    expect(description).toBeInTheDocument();
    expect(description).toHaveClass('text-sm', 'text-muted-foreground');
  });

  it('renders close button in content', () => {
    render(
      <Dialog open>
        <DialogContent>
          <DialogTitle>Test</DialogTitle>
        </DialogContent>
      </Dialog>
    );

    const closeButton = screen.getByRole('button', { name: /close/i });
    expect(closeButton).toBeInTheDocument();
  });
});
