import * as React from 'react';
import * as AspectRatioPrimitive from '@radix-ui/react-aspect-ratio';
import { cn } from '@ui/lib/utils';

/**
 * AspectRatio component props.
 * @example
 * <AspectRatio ratio={16/9}>
 *   <img src="..." alt="..." className="object-cover" />
 * </AspectRatio>
 */
export interface AspectRatioProps
  extends React.ComponentPropsWithoutRef<typeof AspectRatioPrimitive.Root> {
  /**
   * The desired aspect ratio
   * @default 16/9
   */
  ratio?: number;
}

const AspectRatio = React.forwardRef<
  React.ElementRef<typeof AspectRatioPrimitive.Root>,
  AspectRatioProps
>(({ className, ratio = 16 / 9, ...props }, ref) => (
  <AspectRatioPrimitive.Root
    ref={ref}
    ratio={ratio}
    className={cn(className)}
    {...props}
  />
));
AspectRatio.displayName = 'AspectRatio';

export { AspectRatio };
