/**
 * Theme mode options.
 */
export type ThemeMode = 'light' | 'dark' | 'system';

/**
 * Partial color palette for theme overrides.
 * Each key maps to a CSS custom property (e.g., `primary` → `--color-primary`).
 *
 * @example
 * ```ts
 * const palette: Partial<ColorPalette> = {
 *   primary: 'oklch(0.6 0.2 280)',
 *   destructive: 'oklch(0.5 0.25 30)',
 * };
 * ```
 */
export interface ColorPalette {
  background: string;
  foreground: string;
  card: string;
  'card-foreground': string;
  popover: string;
  'popover-foreground': string;
  primary: string;
  'primary-foreground': string;
  secondary: string;
  'secondary-foreground': string;
  muted: string;
  'muted-foreground': string;
  accent: string;
  'accent-foreground': string;
  destructive: string;
  'destructive-foreground': string;
  success: string;
  'success-foreground': string;
  warning: string;
  'warning-foreground': string;
  border: string;
  input: string;
  ring: string;
}

/**
 * Configuration for the ThemeProvider component.
 *
 * @example
 * ```tsx
 * const config: ThemeConfig = {
 *   defaultTheme: 'system',
 *   overrides: { primary: 'oklch(0.6 0.2 280)' },
 * };
 * ```
 */
export interface ThemeConfig {
  /** Initial theme mode. Defaults to 'system'. */
  defaultTheme?: ThemeMode;
  /** Color palette overrides applied as inline CSS variables. */
  overrides?: Partial<ColorPalette>;
}

/**
 * Value provided by the ThemeContext.
 */
export interface ThemeContextValue {
  /** Current theme mode. */
  theme: ThemeMode;
  /** Set the theme mode. */
  setTheme: (theme: ThemeMode) => void;
  /** Toggle between light and dark. */
  toggleTheme: () => void;
  /** The resolved theme (light or dark), accounting for system preference. */
  resolvedTheme: 'light' | 'dark';
}
