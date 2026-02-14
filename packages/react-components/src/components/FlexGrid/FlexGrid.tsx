'use client';

import * as React from 'react';
import { cn } from '@ui/lib/utils';

type ColumnSpan = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;

/**
 * Maps Tailwind spacing tokens to their CSS values.
 * Covers the standard Tailwind v4 spacing scale.
 */
const gapTokenToValue: Record<string, string> = {
  '0': '0px',
  px: '1px',
  '0.5': '0.125rem',
  '1': '0.25rem',
  '1.5': '0.375rem',
  '2': '0.5rem',
  '2.5': '0.625rem',
  '3': '0.75rem',
  '3.5': '0.875rem',
  '4': '1rem',
  '5': '1.25rem',
  '6': '1.5rem',
  '7': '1.75rem',
  '8': '2rem',
  '9': '2.25rem',
  '10': '2.5rem',
  '11': '2.75rem',
  '12': '3rem',
  '14': '3.5rem',
  '16': '4rem',
};

const spanToWidth: Record<ColumnSpan, string> = {
  1: '8.333333%',
  2: '16.666667%',
  3: '25%',
  4: '33.333333%',
  5: '41.666667%',
  6: '50%',
  7: '58.333333%',
  8: '66.666667%',
  9: '75%',
  10: '83.333333%',
  11: '91.666667%',
  12: '100%',
};

const breakpointPrefix: Record<string, string> = {
  xs: '',
  sm: 'sm:',
  md: 'md:',
  lg: 'lg:',
  xl: 'xl:',
};

/**
 * CSS custom property name used to thread the gutter size from
 * FlexGrid (the row) down to FlexGrid.Column items.
 */
const GUTTER_VAR = '--fg-gutter';

/**
 * Context to pass the gutter CSS value from FlexGrid to FlexGrid.Column.
 * The value is a CSS length like "1rem".
 */
const FlexGridContext = React.createContext<string>('1rem');

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
   * Tailwind spacing token for the gap between columns and rows.
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
  justifyContent?: 'start' | 'center' | 'end' | 'between' | 'around' | 'evenly';
  /**
   * Whether to wrap flex items
   * @default true
   */
  wrap?: boolean;
}

/**
 * FlexGrid root container.
 *
 * Uses the negative-margin / padding pattern (same as Bootstrap,
 * Material UI) so that percentage-based column widths always add up
 * to exactly 100%, regardless of the gap value.
 *
 * The container applies `margin: -(gap/2)` and each Column applies
 * `padding: gap/2`, giving the visual appearance of gaps between
 * columns without breaking the width maths.
 */
const FlexGridRoot = React.forwardRef<HTMLDivElement, FlexGridProps>(
  (
    {
      gap = '4',
      alignItems,
      justifyContent,
      wrap = true,
      className,
      style,
      children,
      ...props
    },
    ref
  ) => {
    const gutterValue = gapTokenToValue[gap] ?? '1rem';
    const alignClass = alignItems ? `items-${alignItems}` : '';
    const justifyClass = justifyContent ? `justify-${justifyContent}` : '';
    const wrapClass = wrap ? 'flex-wrap' : 'flex-nowrap';

    return (
      <FlexGridContext.Provider value={gutterValue}>
        <div
          ref={ref}
          className={cn('flex', alignClass, justifyClass, wrapClass, className)}
          style={
            {
              [GUTTER_VAR]: gutterValue,
              margin: `calc(var(${GUTTER_VAR}) / -2)`,
              ...style,
            } as React.CSSProperties
          }
          data-flex-grid=""
          {...props}
        >
          {children}
        </div>
      </FlexGridContext.Provider>
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

/**
 * Builds a responsive width class using Tailwind's arbitrary property
 * syntax to set --col-width at each breakpoint. The actual `width`
 * is applied via inline style as `var(--col-width)`.
 */
function buildResponsiveWidthClasses(
  breakpoint: string,
  span: ColumnSpan
): string {
  const prefix = breakpointPrefix[breakpoint];
  const pctWidth = spanToWidth[span];
  return `${prefix}[--col-width:${pctWidth}]`;
}

const FlexGridColumn = React.forwardRef<HTMLDivElement, FlexGridColumnProps>(
  (
    { xs, sm, md, lg, xl, offset, order, className, style, children, ...props },
    ref
  ) => {
    // Build responsive width classes
    const widthClasses: string[] = [];
    widthClasses.push(buildResponsiveWidthClasses('xs', xs));
    if (sm) widthClasses.push(buildResponsiveWidthClasses('sm', sm));
    if (md) widthClasses.push(buildResponsiveWidthClasses('md', md));
    if (lg) widthClasses.push(buildResponsiveWidthClasses('lg', lg));
    if (xl) widthClasses.push(buildResponsiveWidthClasses('xl', xl));

    // Build offset classes
    const offsetClasses: string[] = [];
    if (offset) {
      Object.entries(offset).forEach(([breakpoint, span]) => {
        if (span) {
          const prefix = breakpointPrefix[breakpoint];
          offsetClasses.push(
            `${prefix}ml-[${((span / 12) * 100).toFixed(4)}%]`
          );
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
          'flex-shrink-0 box-border',
          ...widthClasses,
          ...offsetClasses,
          ...orderClasses,
          className
        )}
        style={
          {
            '--col-width': spanToWidth[xs],
            width: 'var(--col-width)',
            padding: `calc(var(${GUTTER_VAR}, 1rem) / 2)`,
            ...style,
          } as React.CSSProperties
        }
        data-flex-grid-column=""
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
 *
 * Uses the negative-margin / padding gutter pattern to ensure columns
 * with percentage widths always fit correctly regardless of gap size.
 * Supports responsive column spans via breakpoint props (xs, sm, md, lg, xl).
 *
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
