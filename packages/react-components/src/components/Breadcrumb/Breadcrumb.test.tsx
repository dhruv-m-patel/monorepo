import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { composeStories } from '@storybook/react';
import * as stories from './Breadcrumb.stories';

const { Default, WithEllipsis, CustomSeparator, LongPath } =
  composeStories(stories);

describe('Breadcrumb', () => {
  it('renders default story', () => {
    render(<Default />);
    expect(
      screen.getByRole('navigation', { name: /breadcrumb/i })
    ).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /home/i })).toBeInTheDocument();
    expect(
      screen.getByRole('link', { name: /components/i })
    ).toBeInTheDocument();
    expect(screen.getByText(/breadcrumb/i)).toBeInTheDocument();
  });

  it('renders with ellipsis', () => {
    render(<WithEllipsis />);
    expect(screen.getByText(/more/i)).toBeInTheDocument();
  });

  it('renders custom separator', () => {
    render(<CustomSeparator />);
    expect(
      screen.getByRole('link', { name: /documentation/i })
    ).toBeInTheDocument();
    expect(screen.getByText(/getting started/i)).toBeInTheDocument();
  });

  it('renders long path', () => {
    render(<LongPath />);
    expect(screen.getByRole('link', { name: /products/i })).toBeInTheDocument();
    expect(
      screen.getByRole('link', { name: /electronics/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('link', { name: /computers/i })
    ).toBeInTheDocument();
    expect(screen.getByText(/laptops/i)).toBeInTheDocument();
  });

  it('has proper aria-label on nav element', () => {
    render(<Default />);
    const nav = screen.getByRole('navigation');
    expect(nav).toHaveAttribute('aria-label', 'breadcrumb');
  });
});
