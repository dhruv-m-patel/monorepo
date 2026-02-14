import * as React from 'react';
import { cn } from '@ui/lib/utils';

/**
 * Props for the Table component
 */
export type TableProps = React.HTMLAttributes<HTMLTableElement>;

/**
 * A responsive table component with overflow handling
 */
const Table = React.forwardRef<HTMLTableElement, TableProps>(
  ({ className, ...props }, ref) => (
    <div className="relative w-full overflow-auto">
      <table
        ref={ref}
        className={cn('w-full caption-bottom text-sm', className)}
        {...props}
      />
    </div>
  )
);
Table.displayName = 'Table';

/**
 * Props for the TableHeader component
 */
export type TableHeaderProps = React.HTMLAttributes<HTMLTableSectionElement>;

/**
 * Table header section with bottom borders on rows
 */
const TableHeader = React.forwardRef<HTMLTableSectionElement, TableHeaderProps>(
  ({ className, ...props }, ref) => (
    <thead ref={ref} className={cn('[&_tr]:border-b', className)} {...props} />
  )
);
TableHeader.displayName = 'TableHeader';

/**
 * Props for the TableBody component
 */
export type TableBodyProps = React.HTMLAttributes<HTMLTableSectionElement>;

/**
 * Table body section with no border on last row
 */
const TableBody = React.forwardRef<HTMLTableSectionElement, TableBodyProps>(
  ({ className, ...props }, ref) => (
    <tbody
      ref={ref}
      className={cn('[&_tr:last-child]:border-0', className)}
      {...props}
    />
  )
);
TableBody.displayName = 'TableBody';

/**
 * Props for the TableFooter component
 */
export type TableFooterProps = React.HTMLAttributes<HTMLTableSectionElement>;

/**
 * Table footer section with top border and muted background
 */
const TableFooter = React.forwardRef<HTMLTableSectionElement, TableFooterProps>(
  ({ className, ...props }, ref) => (
    <tfoot
      ref={ref}
      className={cn('border-t bg-muted/50 font-medium', className)}
      {...props}
    />
  )
);
TableFooter.displayName = 'TableFooter';

/**
 * Props for the TableRow component
 */
export type TableRowProps = React.HTMLAttributes<HTMLTableRowElement>;

/**
 * Table row with hover and selection states
 */
const TableRow = React.forwardRef<HTMLTableRowElement, TableRowProps>(
  ({ className, ...props }, ref) => (
    <tr
      ref={ref}
      className={cn(
        'border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted',
        className
      )}
      {...props}
    />
  )
);
TableRow.displayName = 'TableRow';

/**
 * Props for the TableHead component
 */
export type TableHeadProps = React.ThHTMLAttributes<HTMLTableCellElement>;

/**
 * Table header cell with left-aligned text and muted color
 */
const TableHead = React.forwardRef<HTMLTableCellElement, TableHeadProps>(
  ({ className, ...props }, ref) => (
    <th
      ref={ref}
      className={cn(
        'h-12 px-4 text-left align-middle font-medium text-muted-foreground',
        className
      )}
      {...props}
    />
  )
);
TableHead.displayName = 'TableHead';

/**
 * Props for the TableCell component
 */
export type TableCellProps = React.TdHTMLAttributes<HTMLTableCellElement>;

/**
 * Table data cell with padding and middle alignment
 */
const TableCell = React.forwardRef<HTMLTableCellElement, TableCellProps>(
  ({ className, ...props }, ref) => (
    <td ref={ref} className={cn('p-4 align-middle', className)} {...props} />
  )
);
TableCell.displayName = 'TableCell';

/**
 * Props for the TableCaption component
 */
export type TableCaptionProps = React.HTMLAttributes<HTMLTableCaptionElement>;

/**
 * Table caption with muted text
 */
const TableCaption = React.forwardRef<
  HTMLTableCaptionElement,
  TableCaptionProps
>(({ className, ...props }, ref) => (
  <caption
    ref={ref}
    className={cn('mt-4 text-sm text-muted-foreground', className)}
    {...props}
  />
));
TableCaption.displayName = 'TableCaption';

export {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableHead,
  TableRow,
  TableCell,
  TableCaption,
};
