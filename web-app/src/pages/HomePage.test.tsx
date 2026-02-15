import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import HomePage from './HomePage';

describe('HomePage', () => {
  it('should render the welcome message', () => {
    render(
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>
    );
    expect(screen.getByText(/Welcome to Monorepo/)).toBeInTheDocument();
  });

  it('should render feature cards', () => {
    render(
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>
    );
    expect(screen.getByText('Express')).toBeInTheDocument();
    expect(screen.getByText('Vite')).toBeInTheDocument();
    expect(screen.getByText('Vitest')).toBeInTheDocument();
    expect(screen.getByText('TypeScript')).toBeInTheDocument();
    expect(screen.getByText('Tailwind CSS')).toBeInTheDocument();
    expect(screen.getByText('ESLint v9')).toBeInTheDocument();
  });

  it('should render feature cards using FlexGrid layout', () => {
    const { container } = render(
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>
    );
    const grids = container.querySelectorAll('[data-flex-grid]');
    expect(grids.length).toBeGreaterThanOrEqual(2);
    const columns = container.querySelectorAll('[data-flex-grid-column]');
    expect(columns.length).toBeGreaterThanOrEqual(11);
  });

  it('should render all feature cards as links', () => {
    render(
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>
    );
    const links = screen.getAllByRole('link');
    expect(links.length).toBe(11);
    links.forEach((link) => {
      expect(link).toHaveAttribute('target', '_blank');
      expect(link).toHaveAttribute('rel', 'noreferrer noopener');
    });
  });
});
