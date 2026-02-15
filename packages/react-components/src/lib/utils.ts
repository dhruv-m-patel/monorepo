import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Merges class names using clsx and tailwind-merge.
 * Combines conditional classes and resolves Tailwind CSS conflicts.
 *
 * @param inputs - Class values to merge
 * @returns Merged class string with Tailwind conflicts resolved
 *
 * @example
 * ```tsx
 * cn('px-2 py-1', 'px-4') // => 'py-1 px-4'
 * cn('text-red-500', condition && 'text-blue-500')
 * ```
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
