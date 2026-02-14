import * as React from 'react';
import * as ProgressPrimitive from '@radix-ui/react-progress';
import { cn } from '@ui/lib/utils';

/**
 * Progress component props
 *
 * @example
 * ```tsx
 * <Progress value={60} max={100} />
 * ```
 */
export interface ProgressProps
  extends React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root> {
  /**
   * Current value (0-100 by default)
   */
  value?: number;
  /**
   * Maximum value (defaults to 100)
   */
  max?: number;
}

/**
 * Progress component for displaying progress indicators.
 * Built on @radix-ui/react-progress with animated transitions.
 */
const Progress = React.forwardRef<
  React.ElementRef<typeof ProgressPrimitive.Root>,
  ProgressProps
>(({ className, value = 0, max = 100, ...props }, ref) => (
  <ProgressPrimitive.Root
    ref={ref}
    className={cn(
      'relative h-4 w-full overflow-hidden rounded-full bg-secondary',
      className
    )}
    value={value}
    max={max}
    {...props}
  >
    <ProgressPrimitive.Indicator
      className="h-full w-full flex-1 bg-primary transition-all"
      style={{ transform: `translateX(-${100 - (value / max) * 100}%)` }}
    />
  </ProgressPrimitive.Root>
));

Progress.displayName = ProgressPrimitive.Root.displayName;

export { Progress };
