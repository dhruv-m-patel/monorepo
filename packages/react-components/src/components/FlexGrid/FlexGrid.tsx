import * as React from 'react';
import { cn } from '@ui/lib/utils';

type ColumnSpan = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;

const spanToClass: Record<ColumnSpan, string> = {
  1: 'w-1/12',
  2: 'w-2/12',
  3: 'w-3/12',
  4: 'w-4/12',
  5: 'w-5/12',
  6: 'w-6/12',
  7: 'w-7/12',
  8: 'w-8/12',
  9: 'w-9/12',
  10: 'w-10/12',
  11: 'w-11/12',
  12: 'w-full',
};

const breakpointPrefix: Record<string, string> = {
  xs: '',
  sm: 'sm:',
  md: 'md:',
  lg: 'lg:',
  xl: 'xl:',
};

/**
 * FlexGrid component props.
 * @example
 * <FlexGrid gap="4" alignItems="center">
 *   <FlexGrid.Column xs={12} md={6}>Column 1</FlexGrid.Column>
 *   <FlexGrid.Column xs={12} md={6}>Column 2</FlexGrid.Column>
 * </FlexGrid>
 */
export interface FlexGridProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Tailwind gap token
   * @default '4'
   */
  gap?: string;
  /**
   * Flex align-items value
   */
  alignItems?: 'start' | 'center' | 'end' | 'stretch' | 'baseline';
  /**
   * Flex justify-content value
   */
  justifyContent?:
    | 'start'
    | 'center'
    | 'end'
    | 'between'
    | 'around'
    | 'evenly';
  /**
   * Whether to wrap flex items
   * @default true
   */
  wrap?: boolean;
}

const FlexGridRoot = React.forwardRef<HTMLDivElement, FlexGridProps>(
  (
    {
      gap = '4',
      alignItems,
      justifyContent,
      wrap = true,
      className,
      children,
      ...props
    },
    ref
  ) => {
    const gapClass = gap ? `gap-${gap}` : '';
    const alignClass = alignItems ? `items-${alignItems}` : '';
    const justifyClass = justifyContent ? `justify-${justifyContent}` : '';
    const wrapClass = wrap ? 'flex-wrap' : 'flex-nowrap';

    return (
      <div
        ref={ref}
        className={cn(
          'flex',
          gapClass,
          alignClass,
          justifyClass,
          wrapClass,
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);
FlexGridRoot.displayName = 'FlexGrid';

/**
 * FlexGrid.Column component props.
 * @example
 * <FlexGrid.Column xs={12} md={6} lg={4}>
 *   Column content
 * </FlexGrid.Column>
 */
export interface FlexGridColumnProps
  extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Column span for mobile (required)
   */
  xs: ColumnSpan;
  /**
   * Column span for small screens
   */
  sm?: ColumnSpan;
  /**
   * Column span for medium screens
   */
  md?: ColumnSpan;
  /**
   * Column span for large screens
   */
  lg?: ColumnSpan;
  /**
   * Column span for extra large screens
   */
  xl?: ColumnSpan;
  /**
   * Offset values for different breakpoints
   */
  offset?: {
    xs?: ColumnSpan;
    sm?: ColumnSpan;
    md?: ColumnSpan;
    lg?: ColumnSpan;
    xl?: ColumnSpan;
  };
  /**
   * Order values for different breakpoints
   */
  order?: {
    xs?: number;
    sm?: number;
    md?: number;
    lg?: number;
    xl?: number;
  };
}

const FlexGridColumn = React.forwardRef<HTMLDivElement, FlexGridColumnProps>(
  ({ xs, sm, md, lg, xl, offset, order, className, children, ...props }, ref) => {
    // Build width classes
    const widthClasses: string[] = [];

    if (xs) {
      widthClasses.push(spanToClass[xs]);
    }
    if (sm) {
      widthClasses.push(`${breakpointPrefix.sm}${spanToClass[sm]}`);
    }
    if (md) {
      widthClasses.push(`${breakpointPrefix.md}${spanToClass[md]}`);
    }
    if (lg) {
      widthClasses.push(`${breakpointPrefix.lg}${spanToClass[lg]}`);
    }
    if (xl) {
      widthClasses.push(`${breakpointPrefix.xl}${spanToClass[xl]}`);
    }

    // Build offset classes
    const offsetClasses: string[] = [];
    if (offset) {
      Object.entries(offset).forEach(([breakpoint, span]) => {
        if (span) {
          const prefix = breakpointPrefix[breakpoint];
          offsetClasses.push(`${prefix}ml-[${(span / 12) * 100}%]`);
        }
      });
    }

    // Build order classes
    const orderClasses: string[] = [];
    if (order) {
      Object.entries(order).forEach(([breakpoint, value]) => {
        if (value !== undefined) {
          const prefix = breakpointPrefix[breakpoint];
          orderClasses.push(`${prefix}order-${value}`);
        }
      });
    }

    return (
      <div
        ref={ref}
        className={cn(
          'flex-shrink-0',
          ...widthClasses,
          ...offsetClasses,
          ...orderClasses,
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);
FlexGridColumn.displayName = 'FlexGrid.Column';

/**
 * FlexGrid component with compound Column component.
 * @example
 * <FlexGrid gap="4">
 *   <FlexGrid.Column xs={12} md={6}>Column 1</FlexGrid.Column>
 *   <FlexGrid.Column xs={12} md={6}>Column 2</FlexGrid.Column>
 * </FlexGrid>
 */
const FlexGrid = Object.assign(FlexGridRoot, {
  Column: FlexGridColumn,
});

export { FlexGrid, type ColumnSpan };
