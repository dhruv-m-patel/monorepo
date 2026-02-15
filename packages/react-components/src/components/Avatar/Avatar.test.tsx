import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { composeStories } from '@storybook/react';
import * as stories from './Avatar.stories';

const composed = composeStories(stories);

describe('Avatar', () => {
  it('renders default story', () => {
    const { container } = render(<composed.Default />);
    const avatar = container.querySelector('.rounded-full');
    expect(avatar).toBeInTheDocument();
  });

  it('renders with image story', () => {
    render(<composed.WithImage />);
    // In jsdom, images don't load so fallback renders
    expect(screen.getByText('CN')).toBeInTheDocument();
  });

  it('renders fallback story', () => {
    render(<composed.Fallback />);
    expect(screen.getByText('JD')).toBeInTheDocument();
  });

  it('renders small story', () => {
    const { container } = render(<composed.Small />);
    const avatar = container.querySelector('.rounded-full');
    expect(avatar).toHaveClass('h-8');
    expect(avatar).toHaveClass('w-8');
  });

  it('renders large story', () => {
    const { container } = render(<composed.Large />);
    const avatar = container.querySelector('.rounded-full');
    expect(avatar).toHaveClass('h-14');
    expect(avatar).toHaveClass('w-14');
  });

  it('renders group story', () => {
    render(<composed.Group />);
    expect(screen.getByText('U1')).toBeInTheDocument();
    expect(screen.getByText('U2')).toBeInTheDocument();
    expect(screen.getByText('U3')).toBeInTheDocument();
  });
});
