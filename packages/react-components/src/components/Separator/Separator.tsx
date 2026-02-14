import * as React from 'react';
import * as SeparatorPrimitive from '@radix-ui/react-separator';
import { cn } from '@ui/lib/utils';

/**
 * Separator component props
 * @example
 * ```tsx
 * <Separator />
 * <Separator orientation="vertical" className="h-20" />
 * ```
 */
export interface SeparatorProps
  extends React.ComponentPropsWithoutRef<typeof SeparatorPrimitive.Root> {
  /**
   * The orientation of the separator
   * @default "horizontal"
   */
  orientation?: 'horizontal' | 'vertical';
  /**
   * Whether the separator is purely decorative
   * @default true
   */
  decorative?: boolean;
}

const Separator = React.forwardRef<
  React.ElementRef<typeof SeparatorPrimitive.Root>,
  SeparatorProps
>(
  (
    { className, orientation = 'horizontal', decorative = true, ...props },
    ref
  ) => (
    <SeparatorPrimitive.Root
      ref={ref}
      decorative={decorative}
      orientation={orientation}
      className={cn(
        'shrink-0 bg-border',
        orientation === 'horizontal' ? 'h-[1px] w-full' : 'h-full w-[1px]',
        className
      )}
      {...props}
    />
  )
);

Separator.displayName = 'Separator';

export { Separator };
