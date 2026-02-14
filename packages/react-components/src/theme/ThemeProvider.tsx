'use client';

import {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import type { ColorPalette, ThemeContextValue, ThemeMode } from './types';
import { createTheme } from './create-theme';

const STORAGE_KEY = 'ui-theme';

/**
 * React context for theme state. Use `useTheme()` hook to access.
 */
export const ThemeContext = createContext<ThemeContextValue | undefined>(
  undefined
);
ThemeContext.displayName = 'ThemeContext';

/**
 * Props for the ThemeProvider component.
 */
export interface ThemeProviderProps {
  /** Child components. */
  children: ReactNode;
  /** Initial theme mode. Defaults to 'system'. */
  defaultTheme?: ThemeMode;
  /** Color palette overrides applied as inline CSS variables. */
  overrides?: Partial<ColorPalette>;
  /** localStorage key for persisting theme preference. Defaults to 'ui-theme'. */
  storageKey?: string;
}

/**
 * Provides theme context to the component tree.
 * Manages light/dark mode toggling, localStorage persistence,
 * system preference detection, and CSS variable overrides.
 *
 * @example
 * ```tsx
 * <ThemeProvider defaultTheme="system" overrides={{ primary: 'oklch(0.6 0.2 280)' }}>
 *   <App />
 * </ThemeProvider>
 * ```
 */
export function ThemeProvider({
  children,
  defaultTheme = 'system',
  overrides,
  storageKey = STORAGE_KEY,
}: ThemeProviderProps) {
  const [theme, setThemeState] = useState<ThemeMode>(() => {
    if (typeof window === 'undefined') return defaultTheme;
    try {
      const stored = localStorage.getItem(storageKey);
      if (stored === 'light' || stored === 'dark' || stored === 'system') {
        return stored;
      }
    } catch {
      // localStorage may be unavailable
    }
    return defaultTheme;
  });

  const [systemTheme, setSystemTheme] = useState<'light' | 'dark'>('light');

  // Detect system preference
  useEffect(() => {
    const mql = window.matchMedia('(prefers-color-scheme: dark)');
    const handler = (e: MediaQueryListEvent | MediaQueryList) => {
      setSystemTheme(e.matches ? 'dark' : 'light');
    };
    // Set initial value
    handler(mql);
    mql.addEventListener('change', handler as (e: MediaQueryListEvent) => void);
    return () =>
      mql.removeEventListener(
        'change',
        handler as (e: MediaQueryListEvent) => void
      );
  }, []);

  const resolvedTheme: 'light' | 'dark' =
    theme === 'system' ? systemTheme : theme;

  // Apply .dark class on documentElement
  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove('light', 'dark');
    root.classList.add(resolvedTheme);
  }, [resolvedTheme]);

  const setTheme = useCallback(
    (newTheme: ThemeMode) => {
      setThemeState(newTheme);
      try {
        localStorage.setItem(storageKey, newTheme);
      } catch {
        // localStorage may be unavailable
      }
    },
    [storageKey]
  );

  const toggleTheme = useCallback(() => {
    setTheme(resolvedTheme === 'light' ? 'dark' : 'light');
  }, [resolvedTheme, setTheme]);

  const contextValue = useMemo<ThemeContextValue>(
    () => ({ theme, setTheme, toggleTheme, resolvedTheme }),
    [theme, setTheme, toggleTheme, resolvedTheme]
  );

  const overrideStyles = useMemo(
    () => (overrides ? createTheme(overrides) : undefined),
    [overrides]
  );

  return (
    <ThemeContext.Provider value={contextValue}>
      <div style={overrideStyles}>{children}</div>
    </ThemeContext.Provider>
  );
}
ThemeProvider.displayName = 'ThemeProvider';
