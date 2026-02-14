import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { composeStories } from '@storybook/react';
import * as stories from './Skeleton.stories';

const composed = composeStories(stories);

describe('Skeleton', () => {
  it('renders default story', () => {
    const { container } = render(<composed.Default />);
    const skeleton = container.firstChild as HTMLElement;
    expect(skeleton).toBeInTheDocument();
    expect(skeleton).toHaveClass('animate-pulse');
    expect(skeleton).toHaveClass('bg-muted');
  });

  it('renders card story', () => {
    const { container } = render(<composed.Card />);
    const skeletons = container.querySelectorAll('.animate-pulse');
    expect(skeletons.length).toBeGreaterThan(0);
  });

  it('renders paragraph story', () => {
    const { container } = render(<composed.Paragraph />);
    const skeletons = container.querySelectorAll('.animate-pulse');
    expect(skeletons.length).toBe(3);
  });

  it('renders avatar story', () => {
    const { container } = render(<composed.Avatar />);
    const skeleton = container.firstChild as HTMLElement;
    expect(skeleton).toHaveClass('rounded-full');
  });

  it('renders rectangle story', () => {
    const { container } = render(<composed.Rectangle />);
    const skeleton = container.firstChild as HTMLElement;
    expect(skeleton).toHaveClass('w-full');
  });
});
