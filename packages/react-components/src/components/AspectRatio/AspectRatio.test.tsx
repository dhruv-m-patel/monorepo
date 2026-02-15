import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { composeStories } from '@storybook/react';
import * as stories from './AspectRatio.stories';

const { Default, Square, Portrait, UltraWide } = composeStories(stories);

describe('AspectRatio', () => {
  it('renders default aspect ratio (16/9)', () => {
    const { container } = render(<Default />);
    const aspectRatioDiv = container.querySelector('[style*="padding-bottom"]');
    expect(aspectRatioDiv).toBeInTheDocument();
  });

  it('renders square aspect ratio (1:1)', () => {
    const { container } = render(<Square />);
    const aspectRatioDiv = container.querySelector('[style*="padding-bottom"]');
    expect(aspectRatioDiv).toBeInTheDocument();
  });

  it('renders portrait aspect ratio (3:4)', () => {
    const { container } = render(<Portrait />);
    const aspectRatioDiv = container.querySelector('[style*="padding-bottom"]');
    expect(aspectRatioDiv).toBeInTheDocument();
  });

  it('renders ultra-wide aspect ratio (21:9)', () => {
    const { container } = render(<UltraWide />);
    const aspectRatioDiv = container.querySelector('[style*="padding-bottom"]');
    expect(aspectRatioDiv).toBeInTheDocument();
  });

  it('renders children content', () => {
    const { container } = render(<Default />);
    const img = container.querySelector('img');
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute('alt', 'Drew Beamer photography');
  });
});
