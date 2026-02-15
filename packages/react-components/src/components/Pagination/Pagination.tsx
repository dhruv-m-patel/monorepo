import * as React from 'react';
import { ChevronLeft, ChevronRight, MoreHorizontal } from 'lucide-react';
import { cn } from '@ui/lib/utils';

/**
 * Pagination component props
 * @example
 * ```tsx
 * <Pagination>
 *   <PaginationContent>
 *     <PaginationItem>
 *       <PaginationPrevious href="#" />
 *     </PaginationItem>
 *     <PaginationItem>
 *       <PaginationLink href="#" isActive>1</PaginationLink>
 *     </PaginationItem>
 *     <PaginationItem>
 *       <PaginationNext href="#" />
 *     </PaginationItem>
 *   </PaginationContent>
 * </Pagination>
 * ```
 */
export type PaginationProps = React.ComponentPropsWithoutRef<'nav'>;

/**
 * PaginationContent component props
 * @example
 * ```tsx
 * <PaginationContent>
 *   <PaginationItem>...</PaginationItem>
 * </PaginationContent>
 * ```
 */
export type PaginationContentProps = React.ComponentPropsWithoutRef<'ul'>;

/**
 * PaginationItem component props
 * @example
 * ```tsx
 * <PaginationItem>
 *   <PaginationLink href="#">1</PaginationLink>
 * </PaginationItem>
 * ```
 */
export type PaginationItemProps = React.ComponentPropsWithoutRef<'li'>;

/**
 * PaginationLink component props
 * @example
 * ```tsx
 * <PaginationLink href="#" isActive>1</PaginationLink>
 * ```
 */
export interface PaginationLinkProps
  extends React.ComponentPropsWithoutRef<'a'> {
  isActive?: boolean;
}

/**
 * PaginationPrevious component props
 * @example
 * ```tsx
 * <PaginationPrevious href="/page/1" />
 * ```
 */
export type PaginationPreviousProps = React.ComponentPropsWithoutRef<'a'>;

/**
 * PaginationNext component props
 * @example
 * ```tsx
 * <PaginationNext href="/page/3" />
 * ```
 */
export type PaginationNextProps = React.ComponentPropsWithoutRef<'a'>;

/**
 * PaginationEllipsis component props
 * @example
 * ```tsx
 * <PaginationEllipsis />
 * ```
 */
export type PaginationEllipsisProps = React.ComponentPropsWithoutRef<'span'>;

const Pagination = React.forwardRef<HTMLElement, PaginationProps>(
  ({ className, ...props }, ref) => (
    <nav
      ref={ref}
      role="navigation"
      aria-label="pagination"
      className={cn('mx-auto flex w-full justify-center', className)}
      {...props}
    />
  )
);
Pagination.displayName = 'Pagination';

const PaginationContent = React.forwardRef<
  HTMLUListElement,
  PaginationContentProps
>(({ className, ...props }, ref) => (
  <ul
    ref={ref}
    className={cn('flex flex-row items-center gap-1', className)}
    {...props}
  />
));
PaginationContent.displayName = 'PaginationContent';

const PaginationItem = React.forwardRef<HTMLLIElement, PaginationItemProps>(
  ({ className, ...props }, ref) => (
    <li ref={ref} className={cn('', className)} {...props} />
  )
);
PaginationItem.displayName = 'PaginationItem';

const PaginationLink = React.forwardRef<HTMLAnchorElement, PaginationLinkProps>(
  ({ className, isActive, ...props }, ref) => (
    <a
      ref={ref}
      aria-current={isActive ? 'page' : undefined}
      className={cn(
        'inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2',
        isActive && 'bg-accent text-accent-foreground',
        className
      )}
      {...props}
    />
  )
);
PaginationLink.displayName = 'PaginationLink';

const PaginationPrevious = React.forwardRef<
  HTMLAnchorElement,
  PaginationPreviousProps
>(({ className, ...props }, ref) => (
  <a
    ref={ref}
    aria-label="Go to previous page"
    className={cn(
      'inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2 gap-1 pl-2.5',
      className
    )}
    {...props}
  >
    <ChevronLeft className="h-4 w-4" />
    <span>Previous</span>
  </a>
));
PaginationPrevious.displayName = 'PaginationPrevious';

const PaginationNext = React.forwardRef<HTMLAnchorElement, PaginationNextProps>(
  ({ className, ...props }, ref) => (
    <a
      ref={ref}
      aria-label="Go to next page"
      className={cn(
        'inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2 gap-1 pr-2.5',
        className
      )}
      {...props}
    >
      <span>Next</span>
      <ChevronRight className="h-4 w-4" />
    </a>
  )
);
PaginationNext.displayName = 'PaginationNext';

const PaginationEllipsis = ({
  className,
  ...props
}: PaginationEllipsisProps) => (
  <span
    aria-hidden
    className={cn('flex h-9 w-9 items-center justify-center', className)}
    {...props}
  >
    <MoreHorizontal className="h-4 w-4" />
    <span className="sr-only">More pages</span>
  </span>
);
PaginationEllipsis.displayName = 'PaginationEllipsis';

export {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationPrevious,
  PaginationNext,
  PaginationEllipsis,
};
