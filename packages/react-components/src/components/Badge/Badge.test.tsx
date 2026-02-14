import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { composeStories } from '@storybook/react';
import * as stories from './Badge.stories';
import { Badge } from './Badge';

const composed = composeStories(stories);

describe('Badge', () => {
  it('renders default story', () => {
    render(<composed.Default />);
    const badge = screen.getByText('Badge');
    expect(badge).toBeInTheDocument();
    expect(badge).toHaveClass('bg-primary');
  });

  it('renders secondary variant', () => {
    render(<composed.Secondary />);
    const badge = screen.getByText('Secondary');
    expect(badge).toBeInTheDocument();
    expect(badge).toHaveClass('bg-secondary');
  });

  it('renders destructive variant', () => {
    render(<composed.Destructive />);
    const badge = screen.getByText('Destructive');
    expect(badge).toBeInTheDocument();
    expect(badge).toHaveClass('bg-destructive');
  });

  it('renders outline variant', () => {
    render(<composed.Outline />);
    const badge = screen.getByText('Outline');
    expect(badge).toBeInTheDocument();
    expect(badge).toHaveClass('text-foreground');
  });

  it('applies custom className', () => {
    const { container } = render(<Badge className="custom-class">Test</Badge>);
    const badge = container.querySelector('.custom-class');
    expect(badge).toBeInTheDocument();
  });
});
