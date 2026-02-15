import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { composeStories } from '@storybook/react';
import * as stories from './Resizable.stories';

const { Horizontal, Vertical, WithHandle, ThreePanels, Nested } =
  composeStories(stories);

describe('Resizable', () => {
  it('renders horizontal resizable panels', () => {
    const { container } = render(<Horizontal />);
    const panelGroup = container.querySelector('[data-panel-group]');
    expect(panelGroup).toBeInTheDocument();
    expect(container.textContent).toContain('Left Panel');
    expect(container.textContent).toContain('Right Panel');
  });

  it('renders vertical resizable panels', () => {
    const { container } = render(<Vertical />);
    const panelGroup = container.querySelector('[data-panel-group]');
    expect(panelGroup).toBeInTheDocument();
    expect(container.textContent).toContain('Top Panel');
    expect(container.textContent).toContain('Bottom Panel');
  });

  it('renders with handle grip indicator', () => {
    const { container } = render(<WithHandle />);
    const handle = container.querySelector('svg');
    expect(handle).toBeInTheDocument();
  });

  it('renders three panels', () => {
    const { container } = render(<ThreePanels />);
    const panelGroup = container.querySelector('[data-panel-group]');
    expect(panelGroup).toBeInTheDocument();
    expect(container.textContent).toContain('Sidebar');
    expect(container.textContent).toContain('Main Content');
    expect(container.textContent).toContain('Side Panel');
  });

  it('renders nested panel groups', () => {
    const { container } = render(<Nested />);
    const panelGroups = container.querySelectorAll('[data-panel-group]');
    expect(panelGroups.length).toBeGreaterThan(1);
    expect(container.textContent).toContain('Sidebar');
    expect(container.textContent).toContain('Top Content');
    expect(container.textContent).toContain('Bottom Content');
  });

  it('applies custom classes', () => {
    const { container } = render(<Horizontal />);
    const panelGroup = container.querySelector('[data-panel-group]');
    expect(panelGroup?.className).toContain('rounded-lg');
  });
});
