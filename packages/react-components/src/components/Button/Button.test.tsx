import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { composeStories } from '@storybook/react';
import * as stories from './Button.stories';
import { Button } from './Button';

const composed = composeStories(stories);

describe('Button', () => {
  it('renders default story', () => {
    render(<composed.Default />);
    const button = screen.getByRole('button', { name: 'Button' });
    expect(button).toBeInTheDocument();
    expect(button).not.toBeDisabled();
  });

  it('renders destructive variant', () => {
    render(<composed.Destructive />);
    const button = screen.getByRole('button', { name: 'Delete' });
    expect(button).toBeInTheDocument();
    expect(button).toHaveClass('bg-destructive');
  });

  it('renders outline variant', () => {
    render(<composed.Outline />);
    const button = screen.getByRole('button', { name: 'Outline' });
    expect(button).toBeInTheDocument();
    expect(button).toHaveClass('border');
  });

  it('renders secondary variant', () => {
    render(<composed.Secondary />);
    const button = screen.getByRole('button', { name: 'Secondary' });
    expect(button).toBeInTheDocument();
    expect(button).toHaveClass('bg-secondary');
  });

  it('renders ghost variant', () => {
    render(<composed.Ghost />);
    const button = screen.getByRole('button', { name: 'Ghost' });
    expect(button).toBeInTheDocument();
  });

  it('renders link variant', () => {
    render(<composed.Link />);
    const button = screen.getByRole('button', { name: 'Link' });
    expect(button).toBeInTheDocument();
    expect(button).toHaveClass('underline-offset-4');
  });

  it('renders small size', () => {
    render(<composed.Small />);
    const button = screen.getByRole('button', { name: 'Small Button' });
    expect(button).toBeInTheDocument();
    expect(button).toHaveClass('h-9');
  });

  it('renders large size', () => {
    render(<composed.Large />);
    const button = screen.getByRole('button', { name: 'Large Button' });
    expect(button).toBeInTheDocument();
    expect(button).toHaveClass('h-11');
  });

  it('renders icon size', () => {
    render(<composed.Icon />);
    const button = screen.getByRole('button', { name: '✓' });
    expect(button).toBeInTheDocument();
    expect(button).toHaveClass('h-10', 'w-10');
  });

  it('renders loading state', () => {
    render(<composed.Loading />);
    const button = screen.getByRole('button', { name: /Loading/i });
    expect(button).toBeInTheDocument();
    expect(button).toBeDisabled();
    expect(button).toHaveAttribute('aria-busy', 'true');
    expect(button.querySelector('svg')).toBeInTheDocument();
  });

  it('renders disabled state', () => {
    render(<composed.Disabled />);
    const button = screen.getByRole('button', { name: 'Disabled' });
    expect(button).toBeInTheDocument();
    expect(button).toBeDisabled();
  });

  it('renders as child element', () => {
    render(
      <Button asChild>
        <a href="https://example.com">Link Button</a>
      </Button>
    );
    const link = screen.getByRole('link', { name: 'Link Button' });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', 'https://example.com');
  });
});
