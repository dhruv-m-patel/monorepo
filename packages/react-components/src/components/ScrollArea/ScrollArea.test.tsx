import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { composeStories } from '@storybook/react';
import * as stories from './ScrollArea.stories';

const { Default, HorizontalScroll, BothDirections, Tags } =
  composeStories(stories);

describe('ScrollArea', () => {
  it('renders default scroll area', () => {
    const { container } = render(<Default />);
    const scrollArea = container.querySelector('[class*="relative"]');
    expect(scrollArea).toBeInTheDocument();
  });

  it('renders scrollable content', () => {
    const { container } = render(<Default />);
    const items = container.querySelectorAll('[class*="text-sm"]');
    expect(items.length).toBeGreaterThan(0);
    expect(items[0]).toHaveTextContent('Item 1');
  });

  it('renders horizontal scroll area', () => {
    const { container } = render(<HorizontalScroll />);
    const scrollArea = container.querySelector('[class*="relative"]');
    expect(scrollArea).toBeInTheDocument();
  });

  it('renders scroll area with both directions', () => {
    const { container } = render(<BothDirections />);
    const scrollArea = container.querySelector('[class*="relative"]');
    expect(scrollArea).toBeInTheDocument();
  });

  it('renders tags scroll area', () => {
    const { container } = render(<Tags />);
    const scrollArea = container.querySelector('[class*="relative"]');
    expect(scrollArea).toBeInTheDocument();
    expect(container.textContent).toContain('Tags');
  });

  it('applies custom height and width classes', () => {
    const { container } = render(<Default />);
    const scrollArea = container.querySelector('[class*="h-"]');
    expect(scrollArea).toBeInTheDocument();
    expect(scrollArea?.className).toContain('h-[200px]');
    expect(scrollArea?.className).toContain('w-[350px]');
  });
});
