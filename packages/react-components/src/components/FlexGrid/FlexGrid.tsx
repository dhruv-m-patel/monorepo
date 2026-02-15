'use client';

import * as React from 'react';

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
 * Tailwind v4 default breakpoints in px.
 * @see https://tailwindcss.com/docs/responsive-design
 */
const breakpointPx: Record<string, number> = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
};

/** Maps align-items prop values to CSS values. */
const alignMap: Record<string, string> = {
  start: 'flex-start',
  center: 'center',
  end: 'flex-end',
  stretch: 'stretch',
  baseline: 'baseline',
};

/** Maps justify-content prop values to CSS values. */
const justifyMap: Record<string, string> = {
  start: 'flex-start',
  center: 'center',
  end: 'flex-end',
  between: 'space-between',
  around: 'space-around',
  evenly: 'space-evenly',
};

/**
 * CSS custom property name used to thread the gutter size from
 * FlexGrid (the row) down to FlexGrid.Column items.
 */
const GUTTER_VAR = '--fg-gutter';

/**
 * Converts React.useId() output (like ":r0:") into a CSS-safe class name.
 */
function cssId(reactId: string): string {
  return 'fg' + reactId.replace(/:/g, '');
}

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

/**
 * FlexGrid root container.
 *
 * Uses the negative-margin / padding pattern (same as Bootstrap,
 * Material UI) so that percentage-based column widths always add up
 * to exactly 100%, regardless of the gap value.
 *
 * All layout-critical CSS is applied via inline styles so the component
 * works in any consumer without depending on Tailwind CSS scanning.
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

    return (
      <div
        ref={ref}
        className={className}
        style={{
          display: 'flex',
          flexWrap: wrap ? 'wrap' : 'nowrap',
          ...(alignItems ? { alignItems: alignMap[alignItems] } : {}),
          ...(justifyContent
            ? { justifyContent: justifyMap[justifyContent] }
            : {}),
          [GUTTER_VAR]: gutterValue,
          margin: `calc(var(${GUTTER_VAR}) / -2)`,
          ...style,
        } as React.CSSProperties}
        data-flex-grid=""
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

/**
 * Builds a CSS string with `@media` rules that set `width` at each
 * responsive breakpoint.  This approach is self-contained and does
 * NOT depend on the consumer's Tailwind configuration scanning the
 * component library source.
 */
function buildResponsiveCSS(
  selector: string,
  spans: {
    xs: ColumnSpan;
    sm?: ColumnSpan;
    md?: ColumnSpan;
    lg?: ColumnSpan;
    xl?: ColumnSpan;
  },
  offsetMap?: {
    xs?: ColumnSpan;
    sm?: ColumnSpan;
    md?: ColumnSpan;
    lg?: ColumnSpan;
    xl?: ColumnSpan;
  },
  orderMap?: {
    xs?: number;
    sm?: number;
    md?: number;
    lg?: number;
    xl?: number;
  }
): string {
  const rules: string[] = [];

  // Base (xs) — no media query
  rules.push(`.${selector}{width:${spanToWidth[spans.xs]}}`);

  if (offsetMap?.xs) {
    rules.push(`.${selector}{margin-left:${spanToWidth[offsetMap.xs]}}`);
  }
  if (orderMap?.xs !== undefined) {
    rules.push(`.${selector}{order:${orderMap.xs}}`);
  }

  // Responsive breakpoints
  const bpNames = ['sm', 'md', 'lg', 'xl'] as const;
  for (const bp of bpNames) {
    const mediaRules: string[] = [];

    if (spans[bp]) {
      mediaRules.push(`.${selector}{width:${spanToWidth[spans[bp]!]}}`);
    }
    if (offsetMap?.[bp]) {
      mediaRules.push(
        `.${selector}{margin-left:${spanToWidth[offsetMap[bp]!]}}`
      );
    }
    if (orderMap?.[bp] !== undefined) {
      mediaRules.push(`.${selector}{order:${orderMap[bp]}}`);
    }

    if (mediaRules.length > 0) {
      rules.push(
        `@media(min-width:${breakpointPx[bp]}px){${mediaRules.join('')}}`
      );
    }
  }

  return rules.join('');
}

const FlexGridColumn = React.forwardRef<HTMLDivElement, FlexGridColumnProps>(
  (
    { xs, sm, md, lg, xl, offset, order, className, style, children, ...props },
    ref
  ) => {
    // useId is SSR-safe — produces matching IDs on server and client
    const colClass = cssId(React.useId());

    const cssText = buildResponsiveCSS(
      colClass,
      { xs, sm, md, lg, xl },
      offset,
      order
    );

    return (
      <>
        <style dangerouslySetInnerHTML={{ __html: cssText }} />
        <div
          ref={ref}
          className={className ? `${colClass} ${className}` : colClass}
          style={{
            flexShrink: 0,
            boxSizing: 'border-box',
            padding: `calc(var(${GUTTER_VAR}, 1rem) / 2)`,
            ...style,
          }}
          data-flex-grid-column=""
          {...props}
        >
          {children}
        </div>
      </>
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
 * All layout-critical CSS is applied via inline styles and scoped
 * `<style>` elements with real CSS `@media` queries. This makes the
 * component fully self-contained — it works in any consuming app
 * regardless of its CSS tooling configuration.
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
