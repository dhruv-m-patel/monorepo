import * as React from 'react';
import { cn } from '@ui/lib/utils';

/**
 * Input component props
 *
 * @example
 * ```tsx
 * <Input type="email" placeholder="Email" />
 * <Input type="text" error aria-describedby="error-msg" />
 * <Input disabled value="Read only" />
 * ```
 */
export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  /**
   * Display error state with destructive border and aria-invalid
   */
  error?: boolean;
}

/**
 * Production-grade Input component with error states and accessibility support.
 * Standard HTML input element with enhanced styling and error handling.
 */
export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, error, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          'flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
          error && 'border-destructive focus-visible:ring-destructive',
          className
        )}
        ref={ref}
        aria-invalid={error ? 'true' : undefined}
        {...props}
      />
    );
  }
);

Input.displayName = 'Input';
