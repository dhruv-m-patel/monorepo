import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { composeStories } from '@storybook/react';
import * as stories from './Popover.stories';
import { Popover, PopoverContent, PopoverTrigger } from './Popover';

const composed = composeStories(stories);

describe('Popover', () => {
  it('renders default story with trigger button', () => {
    render(<composed.Default />);
    const button = screen.getByRole('button', { name: /open popover/i });
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

  it('renders with form story', () => {
    render(<composed.WithForm />);
    const button = screen.getByRole('button', { name: /settings/i });
    expect(button).toBeInTheDocument();
  });

  it('renders with list story', () => {
    render(<composed.WithList />);
    const button = screen.getByRole('button', { name: /actions/i });
    expect(button).toBeInTheDocument();
  });

  it('renders custom width story', () => {
    render(<composed.CustomWidth />);
    const button = screen.getByRole('button', { name: /open/i });
    expect(button).toBeInTheDocument();
  });

  it('renders popover content with correct styles', () => {
    render(
      <Popover open>
        <PopoverTrigger asChild>
          <button>Trigger</button>
        </PopoverTrigger>
        <PopoverContent>
          <div>
            <h4>Test Title</h4>
            <p>Test content</p>
          </div>
        </PopoverContent>
      </Popover>
    );

    const title = screen.getByText('Test Title');
    expect(title).toBeInTheDocument();

    const content = screen.getByText('Test content');
    expect(content).toBeInTheDocument();

    const popoverContent = title.parentElement?.parentElement;
    expect(popoverContent).toHaveClass('bg-popover', 'rounded-md', 'border', 'shadow-md');
  });

  it('renders with custom side offset', () => {
    render(
      <Popover open>
        <PopoverTrigger asChild>
          <button>Trigger</button>
        </PopoverTrigger>
        <PopoverContent sideOffset={10}>
          <p>Custom offset</p>
        </PopoverContent>
      </Popover>
    );

    const content = screen.getByText('Custom offset');
    expect(content).toBeInTheDocument();
  });
});
