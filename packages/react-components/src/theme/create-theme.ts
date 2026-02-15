import type { ColorPalette } from './types';

/**
 * Creates a CSS variable override map from a partial color palette.
 * Maps palette keys to `--color-{key}` CSS custom properties.
 *
 * @param palette - Partial color palette with OKLCH (or any valid CSS color) values
 * @returns Record mapping CSS variable names to color values
 *
 * @example
 * ```ts
 * const vars = createTheme({
 *   primary: 'oklch(0.6 0.2 280)',
 *   destructive: 'oklch(0.5 0.25 30)',
 * });
 * // => { '--color-primary': 'oklch(0.6 0.2 280)', '--color-destructive': 'oklch(0.5 0.25 30)' }
 * ```
 */
export function createTheme(
  palette: Partial<ColorPalette>
): Record<string, string> {
  const vars: Record<string, string> = {};

  for (const [key, value] of Object.entries(palette)) {
    if (value !== undefined) {
      vars[`--color-${key}`] = value;
    }
  }

  return vars;
}
