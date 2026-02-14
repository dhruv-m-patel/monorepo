import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { composeStories } from '@storybook/react';
import * as stories from './Slider.stories';

const { Default, CustomRange, MultipleValues, Disabled } =
  composeStories(stories);

describe('Slider', () => {
  it('renders the default story', () => {
    const { container } = render(<Default />);
    expect(container.querySelector('[role="slider"]')).toBeInTheDocument();
  });

  it('renders the custom range story', () => {
    const { container } = render(<CustomRange />);
    expect(container.querySelector('[role="slider"]')).toBeInTheDocument();
  });

  it('renders multiple values story', () => {
    const { container } = render(<MultipleValues />);
    const sliders = container.querySelectorAll('[role="slider"]');
    expect(sliders).toHaveLength(2);
  });

  it('renders disabled story', () => {
    const { container } = render(<Disabled />);
    const slider = container.querySelector('[role="slider"]');
    expect(slider).toHaveAttribute('data-disabled');
  });
});
