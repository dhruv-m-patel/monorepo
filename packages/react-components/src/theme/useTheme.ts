'use client';

import { useContext } from 'react';
import { ThemeContext } from './ThemeProvider';
import type { ThemeContextValue } from './types';

/**
 * Hook to access the current theme state and controls.
 * Must be used within a `<ThemeProvider>`.
 *
 * @returns Theme context with `theme`, `setTheme`, `toggleTheme`, and `resolvedTheme`
 * @throws Error if used outside a ThemeProvider
 *
 * @example
 * ```tsx
 * function ThemeToggle() {
 *   const { theme, toggleTheme, resolvedTheme } = useTheme();
 *   return (
 *     <button onClick={toggleTheme}>
 *       Current: {resolvedTheme}
 *     </button>
 *   );
 * }
 * ```
 */
export function useTheme(): ThemeContextValue {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
