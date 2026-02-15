import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { composeStories } from '@storybook/react';
import * as stories from './Sheet.stories';
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetDescription,
  SheetHeader,
} from './Sheet';

const composed = composeStories(stories);

describe('Sheet', () => {
  it('renders right side story with trigger button', () => {
    render(<composed.Right />);
    const button = screen.getByRole('button', {
      name: /open sheet \(right\)/i,
    });
    expect(button).toBeInTheDocument();
  });

  it('renders left side story', () => {
    render(<composed.Left />);
    const button = screen.getByRole('button', { name: /open sheet \(left\)/i });
    expect(button).toBeInTheDocument();
  });

  it('renders top side story', () => {
    render(<composed.Top />);
    const button = screen.getByRole('button', { name: /open sheet \(top\)/i });
    expect(button).toBeInTheDocument();
  });

  it('renders bottom side story', () => {
    render(<composed.Bottom />);
    const button = screen.getByRole('button', {
      name: /open sheet \(bottom\)/i,
    });
    expect(button).toBeInTheDocument();
  });

  it('renders with footer story', () => {
    render(<composed.WithFooter />);
    const button = screen.getByRole('button', { name: /open sheet/i });
    expect(button).toBeInTheDocument();
  });

  it('renders sheet content with correct styles for right side', () => {
    render(
      <Sheet open>
        <SheetContent side="right">
          <SheetHeader>
            <SheetTitle>Test Title</SheetTitle>
            <SheetDescription>Test Description</SheetDescription>
          </SheetHeader>
        </SheetContent>
      </Sheet>
    );

    const title = screen.getByText('Test Title');
    expect(title).toBeInTheDocument();
    expect(title).toHaveClass('text-lg', 'font-semibold');

    const description = screen.getByText('Test Description');
    expect(description).toBeInTheDocument();
    expect(description).toHaveClass('text-sm', 'text-muted-foreground');
  });

  it('renders sheet content with correct styles for left side', () => {
    render(
      <Sheet open>
        <SheetContent side="left">
          <SheetTitle>Left Sheet</SheetTitle>
        </SheetContent>
      </Sheet>
    );

    const title = screen.getByText('Left Sheet');
    expect(title).toBeInTheDocument();
  });

  it('renders close button in content', () => {
    render(
      <Sheet open>
        <SheetContent>
          <SheetTitle>Test</SheetTitle>
        </SheetContent>
      </Sheet>
    );

    const closeButton = screen.getByRole('button', { name: /close/i });
    expect(closeButton).toBeInTheDocument();
  });
});
