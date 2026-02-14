import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import App from './App';

describe('App', () => {
  it('should render the application', () => {
    render(<App />);
    expect(screen.getByText('Lerna Monorepo')).toBeInTheDocument();
  });

  it('should render the homepage with welcome message', () => {
    render(<App />);
    expect(screen.getByText(/Welcome to Lerna Monorepo/)).toBeInTheDocument();
  });

  it('should render the layout footer', () => {
    render(<App />);
    expect(
      screen.getByText(/Built with React 19, Vite, TypeScript/)
    ).toBeInTheDocument();
  });
});
