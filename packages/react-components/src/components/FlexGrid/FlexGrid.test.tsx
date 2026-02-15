import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { composeStories } from '@storybook/react';
import * as stories from './FlexGrid.stories';

const {
  EqualColumns,
  ResponsiveLayout,
  MixedWidths,
  NestedGrids,
  WithAlignment,
} = composeStories(stories);

describe('FlexGrid', () => {
  it('renders equal columns', () => {
    const { container } = render(<EqualColumns />);
    const grid = container.querySelector('[data-flex-grid]');
    expect(grid).toBeInTheDocument();
    expect(grid?.className).toContain('flex');
    const columns = container.querySelectorAll('[data-flex-grid-column]');
    expect(columns.length).toBe(3);
  });

  it('renders responsive layout columns', () => {
    const { container } = render(<ResponsiveLayout />);
    const grid = container.querySelector('[data-flex-grid]');
    expect(grid).toBeInTheDocument();
    const columns = container.querySelectorAll('[data-flex-grid-column]');
    expect(columns.length).toBe(6);
  });

  it('renders mixed width columns', () => {
    const { container } = render(<MixedWidths />);
    const grid = container.querySelector('[data-flex-grid]');
    expect(grid).toBeInTheDocument();
    expect(container.textContent).toContain('Sidebar');
    expect(container.textContent).toContain('Main Content');
  });

  it('renders nested grids', () => {
    const { container } = render(<NestedGrids />);
    const grids = container.querySelectorAll('[data-flex-grid]');
    expect(grids.length).toBeGreaterThan(1);
    expect(container.textContent).toContain('Header');
    expect(container.textContent).toContain('Nested');
  });

  it('applies alignment props', () => {
    const { container } = render(<WithAlignment />);
    const grids = container.querySelectorAll('[data-flex-grid]');
    expect(grids.length).toBeGreaterThan(0);
    const centeredGrid = Array.from(grids).find((g) =>
      g.className.includes('items-center')
    );
    expect(centeredGrid).toBeInTheDocument();
  });

  it('injects scoped <style> with width rules for each column', () => {
    const { container } = render(<EqualColumns />);
    const styles = container.querySelectorAll('style');
    expect(styles.length).toBe(3); // 3 columns = 3 style tags
    // Each style should contain a width rule for 33.333333% (xs={4})
    styles.forEach((styleEl) => {
      expect(styleEl.textContent).toContain('width:33.333333%');
    });
  });

  it('generates responsive @media rules for breakpoints', () => {
    const { container } = render(<ResponsiveLayout />);
    const styles = container.querySelectorAll('style');
    const firstStyle = styles[0]?.textContent ?? '';
    // xs=12 → base width 100%
    expect(firstStyle).toContain('width:100%');
    // md=6 → @media(min-width:768px) with 50%
    expect(firstStyle).toContain('@media(min-width:768px)');
    expect(firstStyle).toContain('width:50%');
    // lg=4 → @media(min-width:1024px) with 33.333333%
    expect(firstStyle).toContain('@media(min-width:1024px)');
    expect(firstStyle).toContain('width:33.333333%');
  });

  it('applies gutter via CSS custom property on the grid', () => {
    const { container } = render(<EqualColumns />);
    const grid = container.querySelector('[data-flex-grid]') as HTMLElement;
    // The --fg-gutter custom property should be set
    expect(grid.style.getPropertyValue('--fg-gutter')).toBe('1rem');
    // Negative margin pattern for gutter
    expect(grid.style.getPropertyValue('margin')).toContain(
      'calc(var(--fg-gutter) / -2)'
    );
  });

  it('applies padding gutter on columns', () => {
    const { container } = render(<EqualColumns />);
    const columns = container.querySelectorAll('[data-flex-grid-column]');
    const firstCol = columns[0] as HTMLElement;
    expect(firstCol.style.getPropertyValue('padding')).toContain(
      'calc(var(--fg-gutter, 1rem) / 2)'
    );
  });

  it('renders with flex-wrap by default', () => {
    const { container } = render(<EqualColumns />);
    const grid = container.querySelector('[data-flex-grid]');
    expect(grid?.className).toContain('flex-wrap');
  });
});
