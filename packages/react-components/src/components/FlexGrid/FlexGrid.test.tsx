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
    const grid = container.querySelector('.flex');
    expect(grid).toBeInTheDocument();
    expect(grid?.className).toContain('gap-4');
    const columns = container.querySelectorAll('[class*="w-4/12"]');
    expect(columns.length).toBeGreaterThan(0);
  });

  it('renders responsive layout columns', () => {
    const { container } = render(<ResponsiveLayout />);
    const grid = container.querySelector('.flex');
    expect(grid).toBeInTheDocument();
    const columns = container.querySelectorAll('[class*="w-full"]');
    expect(columns.length).toBeGreaterThan(0);
  });

  it('renders mixed width columns', () => {
    const { container } = render(<MixedWidths />);
    const grid = container.querySelector('.flex');
    expect(grid).toBeInTheDocument();
    expect(container.textContent).toContain('Sidebar');
    expect(container.textContent).toContain('Main Content');
  });

  it('renders nested grids', () => {
    const { container } = render(<NestedGrids />);
    const grids = container.querySelectorAll('.flex');
    expect(grids.length).toBeGreaterThan(1);
    expect(container.textContent).toContain('Header');
    expect(container.textContent).toContain('Nested');
  });

  it('applies alignment props', () => {
    const { container } = render(<WithAlignment />);
    const grids = container.querySelectorAll('.flex');
    expect(grids.length).toBeGreaterThan(0);
    const centeredGrid = Array.from(grids).find((g) =>
      g.className.includes('items-center')
    );
    expect(centeredGrid).toBeInTheDocument();
  });

  it('applies column span classes correctly', () => {
    const { container } = render(<EqualColumns />);
    const columns = container.querySelectorAll('[class*="flex-shrink-0"]');
    expect(columns.length).toBe(3);
    columns.forEach((column) => {
      expect(column.className).toContain('w-4/12');
    });
  });

  it('applies responsive classes', () => {
    const { container } = render(<ResponsiveLayout />);
    const columns = container.querySelectorAll('[class*="flex-shrink-0"]');
    const firstColumn = columns[0];
    expect(firstColumn?.className).toContain('w-full');
    expect(firstColumn?.className).toContain('md:w-6/12');
    expect(firstColumn?.className).toContain('lg:w-4/12');
  });

  it('renders with gap spacing', () => {
    const { container } = render(<EqualColumns />);
    const grid = container.querySelector('.flex');
    expect(grid?.className).toContain('gap-4');
  });

  it('renders with flex-wrap by default', () => {
    const { container } = render(<EqualColumns />);
    const grid = container.querySelector('.flex');
    expect(grid?.className).toContain('flex-wrap');
  });
});
