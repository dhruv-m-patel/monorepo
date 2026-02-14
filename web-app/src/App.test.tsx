import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from './App';

function renderApp() {
  return render(
    <MemoryRouter>
      <App />
    </MemoryRouter>
  );
}

describe('App', () => {
  it('should render the application', () => {
    renderApp();
    expect(screen.getByText('Monorepo')).toBeInTheDocument();
  });

  it('should render the homepage with welcome message', () => {
    renderApp();
    expect(screen.getByText(/Welcome to Monorepo/)).toBeInTheDocument();
  });

  it('should render the layout footer', () => {
    renderApp();
    expect(
      screen.getByText(/Built with React 19, Vite, TypeScript/)
    ).toBeInTheDocument();
  });
});
