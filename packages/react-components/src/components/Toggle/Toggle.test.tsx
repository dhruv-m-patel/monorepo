import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { composeStories } from '@storybook/react';
import * as stories from './Toggle.stories';

const { Default, Outline, Small, Large, WithIcon, Disabled } =
  composeStories(stories);

describe('Toggle', () => {
  it('renders the default story', () => {
    render(<Default />);
    expect(screen.getByRole('button')).toBeInTheDocument();
    expect(screen.getByText('Toggle')).toBeInTheDocument();
  });

  it('renders the outline variant', () => {
    render(<Outline />);
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('renders small size', () => {
    render(<Small />);
    expect(screen.getByText('Small')).toBeInTheDocument();
  });

  it('renders large size', () => {
    render(<Large />);
    expect(screen.getByText('Large')).toBeInTheDocument();
  });

  it('renders with icon', () => {
    render(<WithIcon />);
    expect(screen.getByText('Favorite')).toBeInTheDocument();
  });

  it('renders disabled state', () => {
    render(<Disabled />);
    expect(screen.getByRole('button')).toBeDisabled();
  });
});
