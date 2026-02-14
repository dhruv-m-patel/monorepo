import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { composeStories } from '@storybook/react';
import * as stories from './Spinner.stories';

const composed = composeStories(stories);

describe('Spinner', () => {
  it('renders default story', () => {
    render(<composed.Default />);
    const spinner = screen.getByRole('status');
    expect(spinner).toBeInTheDocument();
    expect(spinner).toHaveAttribute('aria-label', 'Loading');
  });

  it('renders small story', () => {
    const { container } = render(<composed.Small />);
    const svg = container.querySelector('svg');
    expect(svg).toHaveClass('h-4');
    expect(svg).toHaveClass('w-4');
  });

  it('renders large story', () => {
    const { container } = render(<composed.Large />);
    const svg = container.querySelector('svg');
    expect(svg).toHaveClass('h-8');
    expect(svg).toHaveClass('w-8');
  });

  it('renders with text story', () => {
    render(<composed.WithText />);
    expect(screen.getByText('Loading...')).toBeInTheDocument();
    expect(screen.getByRole('status')).toBeInTheDocument();
  });

  it('renders colored story', () => {
    const { container } = render(<composed.Colored />);
    const spinners = container.querySelectorAll('[role="status"]');
    expect(spinners.length).toBe(3);
  });

  it('renders all sizes story', () => {
    const { container } = render(<composed.AllSizes />);
    const spinners = container.querySelectorAll('[role="status"]');
    expect(spinners.length).toBe(3);
  });
});
