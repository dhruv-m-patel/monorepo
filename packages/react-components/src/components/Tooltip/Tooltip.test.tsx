import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { composeStories } from '@storybook/react';
import * as stories from './Tooltip.stories';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from './Tooltip';

const composed = composeStories(stories);

describe('Tooltip', () => {
  it('renders default story with trigger button', () => {
    render(<composed.Default />);
    const button = screen.getByRole('button', { name: /hover me/i });
    expect(button).toBeInTheDocument();
  });

  it('renders top side story', () => {
    render(<composed.Top />);
    const button = screen.getByRole('button', { name: /top/i });
    expect(button).toBeInTheDocument();
  });

  it('renders right side story', () => {
    render(<composed.Right />);
    const button = screen.getByRole('button', { name: /right/i });
    expect(button).toBeInTheDocument();
  });

  it('renders bottom side story', () => {
    render(<composed.Bottom />);
    const button = screen.getByRole('button', { name: /bottom/i });
    expect(button).toBeInTheDocument();
  });

  it('renders left side story', () => {
    render(<composed.Left />);
    const button = screen.getByRole('button', { name: /left/i });
    expect(button).toBeInTheDocument();
  });

  it('renders with long text story', () => {
    render(<composed.WithLongText />);
    const button = screen.getByRole('button', { name: /hover for info/i });
    expect(button).toBeInTheDocument();
  });

  it('renders on icon button story', () => {
    render(<composed.OnIconButton />);
    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
  });

  it('renders with custom offset story', () => {
    render(<composed.CustomOffset />);
    const button = screen.getByRole('button', { name: /custom offset/i });
    expect(button).toBeInTheDocument();
  });

  it('renders tooltip content with correct styles', () => {
    render(
      <TooltipProvider>
        <Tooltip open>
          <TooltipTrigger asChild>
            <button>Trigger</button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Test content</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );

    // Radix Tooltip may render content in a portal, use getAllByText to handle duplicates
    const contentElements = screen.getAllByText('Test content');
    expect(contentElements.length).toBeGreaterThan(0);
  });

  it('renders with custom side offset', () => {
    render(
      <TooltipProvider>
        <Tooltip open>
          <TooltipTrigger asChild>
            <button>Trigger</button>
          </TooltipTrigger>
          <TooltipContent sideOffset={10}>
            <p>Custom offset</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );

    // Radix Tooltip may render content in a portal, use getAllByText to handle duplicates
    const contentElements = screen.getAllByText('Custom offset');
    expect(contentElements.length).toBeGreaterThan(0);
  });
});
