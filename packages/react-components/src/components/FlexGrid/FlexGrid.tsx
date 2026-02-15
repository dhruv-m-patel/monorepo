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

/**
 * Pre-built lookup of responsive width classes for each breakpoint and span.
 *
 * Written as **string literals** so Tailwind CSS's JIT scanner can detect
 * them during source-file scanning.  Dynamic string interpolation
 * (e.g. `` `${prefix}[--col-width:${pct}]` ``) is invisible to the
 * scanner and the resulting CSS rules would never be generated.
 */
/* prettier-ignore */
const responsiveWidthClass: Record<string, Record<ColumnSpan, string>> = {
  xs: { 1: '[--col-width:8.333333%]', 2: '[--col-width:16.666667%]', 3: '[--col-width:25%]', 4: '[--col-width:33.333333%]', 5: '[--col-width:41.666667%]', 6: '[--col-width:50%]', 7: '[--col-width:58.333333%]', 8: '[--col-width:66.666667%]', 9: '[--col-width:75%]', 10: '[--col-width:83.333333%]', 11: '[--col-width:91.666667%]', 12: '[--col-width:100%]' },
  sm: { 1: 'sm:[--col-width:8.333333%]', 2: 'sm:[--col-width:16.666667%]', 3: 'sm:[--col-width:25%]', 4: 'sm:[--col-width:33.333333%]', 5: 'sm:[--col-width:41.666667%]', 6: 'sm:[--col-width:50%]', 7: 'sm:[--col-width:58.333333%]', 8: 'sm:[--col-width:66.666667%]', 9: 'sm:[--col-width:75%]', 10: 'sm:[--col-width:83.333333%]', 11: 'sm:[--col-width:91.666667%]', 12: 'sm:[--col-width:100%]' },
  md: { 1: 'md:[--col-width:8.333333%]', 2: 'md:[--col-width:16.666667%]', 3: 'md:[--col-width:25%]', 4: 'md:[--col-width:33.333333%]', 5: 'md:[--col-width:41.666667%]', 6: 'md:[--col-width:50%]', 7: 'md:[--col-width:58.333333%]', 8: 'md:[--col-width:66.666667%]', 9: 'md:[--col-width:75%]', 10: 'md:[--col-width:83.333333%]', 11: 'md:[--col-width:91.666667%]', 12: 'md:[--col-width:100%]' },
  lg: { 1: 'lg:[--col-width:8.333333%]', 2: 'lg:[--col-width:16.666667%]', 3: 'lg:[--col-width:25%]', 4: 'lg:[--col-width:33.333333%]', 5: 'lg:[--col-width:41.666667%]', 6: 'lg:[--col-width:50%]', 7: 'lg:[--col-width:58.333333%]', 8: 'lg:[--col-width:66.666667%]', 9: 'lg:[--col-width:75%]', 10: 'lg:[--col-width:83.333333%]', 11: 'lg:[--col-width:91.666667%]', 12: 'lg:[--col-width:100%]' },
  xl: { 1: 'xl:[--col-width:8.333333%]', 2: 'xl:[--col-width:16.666667%]', 3: 'xl:[--col-width:25%]', 4: 'xl:[--col-width:33.333333%]', 5: 'xl:[--col-width:41.666667%]', 6: 'xl:[--col-width:50%]', 7: 'xl:[--col-width:58.333333%]', 8: 'xl:[--col-width:66.666667%]', 9: 'xl:[--col-width:75%]', 10: 'xl:[--col-width:83.333333%]', 11: 'xl:[--col-width:91.666667%]', 12: 'xl:[--col-width:100%]' },
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
 * Returns the static responsive width class for a given breakpoint and span.
 * Uses the pre-built `responsiveWidthClass` lookup so Tailwind JIT can
 * detect every possible class string.
 */
function getResponsiveWidthClass(breakpoint: string, span: ColumnSpan): string {
  return responsiveWidthClass[breakpoint]?.[span] ?? '';
}

const FlexGridColumn = React.forwardRef<HTMLDivElement, FlexGridColumnProps>(
  (
    { xs, sm, md, lg, xl, offset, order, className, style, children, ...props },
    ref
  ) => {
    // Build responsive width classes (static lookup — Tailwind-safe)
    const widthClasses: string[] = [];
    widthClasses.push(getResponsiveWidthClass('xs', xs));
    if (sm) widthClasses.push(getResponsiveWidthClass('sm', sm));
    if (md) widthClasses.push(getResponsiveWidthClass('md', md));
    if (lg) widthClasses.push(getResponsiveWidthClass('lg', lg));
    if (xl) widthClasses.push(getResponsiveWidthClass('xl', xl));

    // Build offset classes
    const offsetClasses: string[] = [];
    if (offset) {
      Object.entries(offset).forEach(([breakpoint, span]) => {
        if (span) {
          const bpPrefix = breakpoint === 'xs' ? '' : `${breakpoint}:`;
          offsetClasses.push(
            `${bpPrefix}ml-[${((span / 12) * 100).toFixed(4)}%]`
          );
        }
      });
    }

    // Build order classes
    const orderClasses: string[] = [];
    if (order) {
      Object.entries(order).forEach(([breakpoint, value]) => {
        if (value !== undefined) {
          const bpPrefix = breakpoint === 'xs' ? '' : `${breakpoint}:`;
          orderClasses.push(`${bpPrefix}order-${value}`);
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
