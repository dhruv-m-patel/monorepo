import * as React from 'react';
import { cn } from '@ui/lib/utils';

/**
 * Textarea component props
 *
 * @example
 * ```tsx
 * <Textarea placeholder="Enter your message..." />
 * <Textarea rows={5} error aria-describedby="error-msg" />
 * <Textarea disabled value="Read only text" />
 * ```
 */
export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  /**
   * Display error state with destructive border and aria-invalid
   */
  error?: boolean;
}

/**
 * Production-grade Textarea component with error states and accessibility support.
 * Multi-line text input element with enhanced styling and error handling.
 */
export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, error, ...props }, ref) => {
    return (
      <textarea
        className={cn(
          'flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
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

Textarea.displayName = 'Textarea';
