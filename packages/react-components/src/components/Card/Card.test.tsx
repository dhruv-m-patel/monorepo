import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { composeStories } from '@storybook/react';
import * as stories from './Card.stories';

const { Default, WithoutDescription, WithoutFooter, ContentOnly } =
  composeStories(stories);

describe('Card', () => {
  it('renders default card with all sections', () => {
    const { container } = render(<Default />);
    const card = container.querySelector('[class*="rounded-lg"]');
    expect(card).toBeInTheDocument();
    expect(card?.querySelector('h3')).toHaveTextContent('Card Title');
    expect(card?.querySelector('p')).toHaveTextContent(
      'Card description goes here'
    );
  });

  it('renders card without description', () => {
    const { container } = render(<WithoutDescription />);
    const card = container.querySelector('[class*="rounded-lg"]');
    expect(card).toBeInTheDocument();
    expect(card?.querySelector('h3')).toHaveTextContent('Simple Card');
    expect(container.textContent).not.toContain('Card description');
  });

  it('renders card without footer', () => {
    const { container } = render(<WithoutFooter />);
    const card = container.querySelector('[class*="rounded-lg"]');
    expect(card).toBeInTheDocument();
    expect(card?.querySelector('h3')).toHaveTextContent('Card Title');
    expect(container.querySelector('button')).not.toBeInTheDocument();
  });

  it('renders content only card', () => {
    const { container } = render(<ContentOnly />);
    const card = container.querySelector('[class*="rounded-lg"]');
    expect(card).toBeInTheDocument();
    expect(card?.querySelector('h3')).not.toBeInTheDocument();
    expect(container.textContent).toContain(
      'A card with only content, no header or footer.'
    );
  });

  it('applies custom className', () => {
    const { container } = render(<Default />);
    const card = container.querySelector('[class*="w-"]');
    expect(card).toBeInTheDocument();
    expect(card?.className).toContain('w-[350px]');
  });
});
