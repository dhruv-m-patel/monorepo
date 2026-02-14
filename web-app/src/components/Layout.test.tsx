import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ThemeProvider } from '@/context/ThemeContext';
import Layout from './Layout';

function renderWithTheme(ui: React.ReactElement) {
  return render(<ThemeProvider>{ui}</ThemeProvider>);
}

describe('Layout', () => {
  it('should render the header with app title', () => {
    renderWithTheme(<Layout>Content</Layout>);
    expect(screen.getByText('Lerna Monorepo')).toBeInTheDocument();
  });

  it('should render children in main area', () => {
    renderWithTheme(
      <Layout>
        <div>Test Content</div>
      </Layout>
    );
    expect(screen.getByText('Test Content')).toBeInTheDocument();
  });

  it('should render the footer', () => {
    renderWithTheme(<Layout>Content</Layout>);
    expect(
      screen.getByText(/Built with React 19, Vite, TypeScript/)
    ).toBeInTheDocument();
  });

  it('should render dark mode toggle button', () => {
    renderWithTheme(<Layout>Content</Layout>);
    expect(
      screen.getByRole('button', { name: /switch to dark mode/i })
    ).toBeInTheDocument();
  });

  it('should toggle dark mode on button click', async () => {
    const user = userEvent.setup();
    renderWithTheme(<Layout>Content</Layout>);

    const toggleBtn = screen.getByRole('button', {
      name: /switch to dark mode/i,
    });
    await user.click(toggleBtn);

    expect(
      screen.getByRole('button', { name: /switch to light mode/i })
    ).toBeInTheDocument();
  });
});
