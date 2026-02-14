import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { composeStories } from '@storybook/react';
import * as stories from './Separator.stories';

const composed = composeStories(stories);

describe('Separator', () => {
  it('renders default story', () => {
    const { container } = render(<composed.Default />);
    const separator = container.querySelector(
      '[data-orientation="horizontal"]'
    );
    expect(separator).toBeInTheDocument();
    expect(separator).toHaveAttribute('data-orientation', 'horizontal');
  });

  it('renders horizontal story', () => {
    const { container } = render(<composed.Horizontal />);
    const separator = container.querySelector(
      '[data-orientation="horizontal"]'
    );
    expect(separator).toBeInTheDocument();
    expect(separator).toHaveAttribute('data-orientation', 'horizontal');
  });

  it('renders vertical story', () => {
    const { container } = render(<composed.Vertical />);
    const separator = container.querySelector('[data-orientation="vertical"]');
    expect(separator).toBeInTheDocument();
    expect(separator).toHaveAttribute('data-orientation', 'vertical');
  });
});
