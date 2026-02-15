import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@ui/lib/utils';

const badgeVariants = cva(
  'inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
  {
    variants: {
      variant: {
        default:
          'border-transparent bg-primary text-primary-foreground hover:bg-primary/80',
        secondary:
          'border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80',
        destructive:
          'border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80',
        outline: 'text-foreground',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

/**
 * Badge component props
 *
 * @example
 * ```tsx
 * <Badge variant="default">New</Badge>
 * <Badge variant="destructive">Error</Badge>
 * <Badge variant="outline">Draft</Badge>
 * ```
 */
export type BadgeProps = React.HTMLAttributes<HTMLSpanElement> &
  VariantProps<typeof badgeVariants>;

/**
 * Production-grade Badge component for status indicators and labels.
 * Simple span element with rounded styling and color variants.
 */
export const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className, variant, ...props }, ref) => {
    return (
      <span
        ref={ref}
        className={cn(badgeVariants({ variant }), className)}
        {...props}
      />
    );
  }
);

Badge.displayName = 'Badge';
