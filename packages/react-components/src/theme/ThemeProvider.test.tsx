import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { composeStories } from '@storybook/react';
import * as stories from './ThemeProvider.stories';
import { ThemeProvider } from './ThemeProvider';
import { useTheme } from './useTheme';
import { createTheme } from './create-theme';

const { Default, DarkMode, CustomOverrides, SystemPreference } =
  composeStories(stories);

// Helper component to expose theme context for testing
function ThemeConsumer() {
  const { theme, resolvedTheme, setTheme, toggleTheme } = useTheme();
  return (
    <div>
      <span data-testid="theme">{theme}</span>
      <span data-testid="resolved">{resolvedTheme}</span>
      <button onClick={() => setTheme('dark')} data-testid="set-dark">
        Set Dark
      </button>
      <button onClick={() => setTheme('light')} data-testid="set-light">
        Set Light
      </button>
      <button onClick={() => setTheme('system')} data-testid="set-system">
        Set System
      </button>
      <button onClick={toggleTheme} data-testid="toggle">
        Toggle
      </button>
    </div>
  );
}

describe('ThemeProvider', () => {
  beforeEach(() => {
    localStorage.clear();
    document.documentElement.classList.remove('light', 'dark');
  });

  describe('composeStories', () => {
    it('renders Default story without errors', () => {
      render(<Default />);
      expect(screen.getByText('Theme Engine Demo')).toBeInTheDocument();
    });

    it('renders DarkMode story without errors', () => {
      render(<DarkMode />);
      expect(screen.getByText('Theme Engine Demo')).toBeInTheDocument();
    });

    it('renders CustomOverrides story without errors', () => {
      render(<CustomOverrides />);
      expect(screen.getByText('Theme Engine Demo')).toBeInTheDocument();
    });

    it('renders SystemPreference story without errors', () => {
      render(<SystemPreference />);
      expect(screen.getByText('Theme Engine Demo')).toBeInTheDocument();
    });
  });

  describe('default theme', () => {
    it('defaults to system when no defaultTheme provided', () => {
      render(
        <ThemeProvider>
          <ThemeConsumer />
        </ThemeProvider>
      );
      expect(screen.getByTestId('theme').textContent).toBe('system');
    });

    it('applies light theme by default', () => {
      render(
        <ThemeProvider defaultTheme="light">
          <ThemeConsumer />
        </ThemeProvider>
      );
      expect(screen.getByTestId('theme').textContent).toBe('light');
      expect(screen.getByTestId('resolved').textContent).toBe('light');
    });

    it('applies dark theme when specified', () => {
      render(
        <ThemeProvider defaultTheme="dark">
          <ThemeConsumer />
        </ThemeProvider>
      );
      expect(screen.getByTestId('theme').textContent).toBe('dark');
      expect(screen.getByTestId('resolved').textContent).toBe('dark');
    });
  });

  describe('theme toggling', () => {
    it('toggles from light to dark', async () => {
      const user = userEvent.setup();
      render(
        <ThemeProvider defaultTheme="light">
          <ThemeConsumer />
        </ThemeProvider>
      );
      expect(screen.getByTestId('resolved').textContent).toBe('light');
      await act(async () => {
        await user.click(screen.getByTestId('toggle'));
      });
      expect(screen.getByTestId('resolved').textContent).toBe('dark');
    });

    it('toggles from dark to light', async () => {
      const user = userEvent.setup();
      render(
        <ThemeProvider defaultTheme="dark">
          <ThemeConsumer />
        </ThemeProvider>
      );
      expect(screen.getByTestId('resolved').textContent).toBe('dark');
      await act(async () => {
        await user.click(screen.getByTestId('toggle'));
      });
      expect(screen.getByTestId('resolved').textContent).toBe('light');
    });

    it('sets theme to dark via setTheme', async () => {
      const user = userEvent.setup();
      render(
        <ThemeProvider defaultTheme="light">
          <ThemeConsumer />
        </ThemeProvider>
      );
      await act(async () => {
        await user.click(screen.getByTestId('set-dark'));
      });
      expect(screen.getByTestId('theme').textContent).toBe('dark');
      expect(screen.getByTestId('resolved').textContent).toBe('dark');
    });
  });

  describe('localStorage persistence', () => {
    it('persists theme to localStorage on change', async () => {
      const user = userEvent.setup();
      render(
        <ThemeProvider defaultTheme="light">
          <ThemeConsumer />
        </ThemeProvider>
      );
      await act(async () => {
        await user.click(screen.getByTestId('set-dark'));
      });
      expect(localStorage.getItem('ui-theme')).toBe('dark');
    });

    it('reads persisted theme from localStorage', () => {
      localStorage.setItem('ui-theme', 'dark');
      render(
        <ThemeProvider defaultTheme="light">
          <ThemeConsumer />
        </ThemeProvider>
      );
      expect(screen.getByTestId('theme').textContent).toBe('dark');
    });

    it('uses custom storage key', async () => {
      const user = userEvent.setup();
      render(
        <ThemeProvider defaultTheme="light" storageKey="custom-theme">
          <ThemeConsumer />
        </ThemeProvider>
      );
      await act(async () => {
        await user.click(screen.getByTestId('set-dark'));
      });
      expect(localStorage.getItem('custom-theme')).toBe('dark');
    });
  });

  describe('CSS variable overrides', () => {
    it('injects override CSS variables as inline styles', () => {
      const { container } = render(
        <ThemeProvider
          defaultTheme="light"
          overrides={{ primary: 'oklch(0.65 0.25 145)' }}
        >
          <span>child</span>
        </ThemeProvider>
      );
      const wrapper = container.querySelector('[style]');
      expect(wrapper).not.toBeNull();
      expect(wrapper?.getAttribute('style')).toContain('--color-primary');
      expect(wrapper?.getAttribute('style')).toContain('oklch(0.65 0.25 145)');
    });

    it('does not inject styles when no overrides provided', () => {
      const { container } = render(
        <ThemeProvider defaultTheme="light">
          <span>child</span>
        </ThemeProvider>
      );
      const wrapper = container.firstElementChild;
      expect(wrapper?.getAttribute('style')).toBeNull();
    });
  });

  describe('system preference', () => {
    it('resolves to light when system prefers light', () => {
      render(
        <ThemeProvider defaultTheme="system">
          <ThemeConsumer />
        </ThemeProvider>
      );
      // matchMedia mock defaults to matches: false (light)
      expect(screen.getByTestId('resolved').textContent).toBe('light');
    });

    it('sets theme to system mode', async () => {
      const user = userEvent.setup();
      render(
        <ThemeProvider defaultTheme="light">
          <ThemeConsumer />
        </ThemeProvider>
      );
      await act(async () => {
        await user.click(screen.getByTestId('set-system'));
      });
      expect(screen.getByTestId('theme').textContent).toBe('system');
    });
  });

  describe('.dark class on documentElement', () => {
    it('adds dark class when theme is dark', () => {
      render(
        <ThemeProvider defaultTheme="dark">
          <ThemeConsumer />
        </ThemeProvider>
      );
      expect(document.documentElement.classList.contains('dark')).toBe(true);
    });

    it('adds light class when theme is light', () => {
      render(
        <ThemeProvider defaultTheme="light">
          <ThemeConsumer />
        </ThemeProvider>
      );
      expect(document.documentElement.classList.contains('light')).toBe(true);
    });
  });
});

describe('useTheme', () => {
  it('throws when used outside ThemeProvider', () => {
    // Suppress console.error for expected error
    const spy = vi.spyOn(console, 'error').mockImplementation(() => {});
    expect(() => {
      render(<ThemeConsumer />);
    }).toThrow('useTheme must be used within a ThemeProvider');
    spy.mockRestore();
  });
});

describe('createTheme', () => {
  it('maps palette keys to CSS custom properties', () => {
    const result = createTheme({
      primary: 'oklch(0.6 0.2 280)',
      destructive: 'oklch(0.5 0.25 30)',
    });
    expect(result).toEqual({
      '--color-primary': 'oklch(0.6 0.2 280)',
      '--color-destructive': 'oklch(0.5 0.25 30)',
    });
  });

  it('returns empty object for empty palette', () => {
    const result = createTheme({});
    expect(result).toEqual({});
  });

  it('handles all palette keys', () => {
    const result = createTheme({
      background: 'oklch(0.98 0 0)',
      foreground: 'oklch(0.1 0 0)',
      ring: 'oklch(0.5 0.2 292)',
    });
    expect(result['--color-background']).toBe('oklch(0.98 0 0)');
    expect(result['--color-foreground']).toBe('oklch(0.1 0 0)');
    expect(result['--color-ring']).toBe('oklch(0.5 0.2 292)');
  });
});
