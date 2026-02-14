import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { composeStories } from '@storybook/react';
import * as stories from './HoverCard.stories';
import { HoverCard, HoverCardContent, HoverCardTrigger } from './HoverCard';

const composed = composeStories(stories);

describe('HoverCard', () => {
  it('renders default story with trigger link', () => {
    render(<composed.Default />);
    const link = screen.getByRole('link', { name: /@username/i });
    expect(link).toBeInTheDocument();
  });

  it('renders with avatar story', () => {
    render(<composed.WithAvatar />);
    const link = screen.getByRole('link', { name: /@johndoe/i });
    expect(link).toBeInTheDocument();
  });

  it('renders product preview story', () => {
    render(<composed.ProductPreview />);
    const link = screen.getByRole('link', { name: /view product details/i });
    expect(link).toBeInTheDocument();
  });

  it('renders document preview story', () => {
    render(<composed.DocumentPreview />);
    const link = screen.getByRole('link', { name: /readme\.md/i });
    expect(link).toBeInTheDocument();
  });

  it('renders stat card story', () => {
    render(<composed.StatCard />);
    const button = screen.getByRole('button', { name: /1,234 views/i });
    expect(button).toBeInTheDocument();
  });

  it('renders custom side story', () => {
    render(<composed.CustomSide />);
    const link = screen.getByRole('link', { name: /hover me \(left\)/i });
    expect(link).toBeInTheDocument();
  });

  it('renders custom offset story', () => {
    render(<composed.CustomOffset />);
    const link = screen.getByRole('link', { name: /custom offset/i });
    expect(link).toBeInTheDocument();
  });

  it('renders hover card content with correct styles', () => {
    render(
      <HoverCard open>
        <HoverCardTrigger asChild>
          {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
          <a href="#">@test</a>
        </HoverCardTrigger>
        <HoverCardContent>
          <div>
            <h4>Test Title</h4>
            <p>Test content</p>
          </div>
        </HoverCardContent>
      </HoverCard>
    );

    const title = screen.getByText('Test Title');
    expect(title).toBeInTheDocument();

    const content = screen.getByText('Test content');
    expect(content).toBeInTheDocument();

    const hoverCardContent = title.parentElement?.parentElement;
    expect(hoverCardContent).toHaveClass('bg-popover', 'rounded-md', 'border', 'shadow-md', 'w-64');
  });

  it('renders with custom side offset', () => {
    render(
      <HoverCard open>
        <HoverCardTrigger asChild>
          {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
          <a href="#">Trigger</a>
        </HoverCardTrigger>
        <HoverCardContent sideOffset={10}>
          <p>Custom offset</p>
        </HoverCardContent>
      </HoverCard>
    );

    const content = screen.getByText('Custom offset');
    expect(content).toBeInTheDocument();
  });

  it('renders with custom width', () => {
    render(
      <HoverCard open>
        <HoverCardTrigger asChild>
          {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
          <a href="#">Trigger</a>
        </HoverCardTrigger>
        <HoverCardContent className="w-80">
          <p>Custom width</p>
        </HoverCardContent>
      </HoverCard>
    );

    const content = screen.getByText('Custom width');
    expect(content).toBeInTheDocument();
    expect(content.parentElement).toHaveClass('w-80');
  });
});
