import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { composeStories } from '@storybook/react';
import * as stories from './Pagination.stories';

const { Default, WithEllipsis, ManyPages, FirstPage, LastPage } =
  composeStories(stories);

describe('Pagination', () => {
  it('renders default story', () => {
    render(<Default />);
    expect(
      screen.getByRole('navigation', { name: /pagination/i })
    ).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /previous/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /next/i })).toBeInTheDocument();
  });

  it('renders with ellipsis', () => {
    render(<WithEllipsis />);
    expect(screen.getByText(/more pages/i)).toBeInTheDocument();
  });

  it('renders many pages', () => {
    render(<ManyPages />);
    const activeLink = screen.getByRole('link', { current: 'page' });
    expect(activeLink).toBeInTheDocument();
    expect(activeLink).toHaveTextContent('6');
  });

  it('renders first page state', () => {
    render(<FirstPage />);
    const activeLink = screen.getByRole('link', { current: 'page' });
    expect(activeLink).toHaveTextContent('1');
  });

  it('renders last page state', () => {
    render(<LastPage />);
    const activeLink = screen.getByRole('link', { current: 'page' });
    expect(activeLink).toHaveTextContent('10');
  });

  it('has proper aria-label on nav element', () => {
    render(<Default />);
    const nav = screen.getByRole('navigation');
    expect(nav).toHaveAttribute('aria-label', 'pagination');
  });

  it('displays page number links', () => {
    render(<Default />);
    expect(screen.getByRole('link', { name: '1' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: '2' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: '3' })).toBeInTheDocument();
  });
});
