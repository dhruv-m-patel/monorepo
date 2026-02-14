import * as React from 'react';
import { cn } from '@ui/lib/utils';

/**
 * H1 heading component props
 * @example
 * ```tsx
 * <H1>The Joke Tax Chronicles</H1>
 * ```
 */
export interface H1Props extends React.HTMLAttributes<HTMLHeadingElement> {}

const H1 = React.forwardRef<HTMLHeadingElement, H1Props>(
  ({ className, ...props }, ref) => {
    return (
      <h1
        ref={ref}
        className={cn(
          'scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl',
          className
        )}
        {...props}
      />
    );
  }
);

H1.displayName = 'H1';

/**
 * H2 heading component props
 * @example
 * ```tsx
 * <H2>The People of the Kingdom</H2>
 * ```
 */
export interface H2Props extends React.HTMLAttributes<HTMLHeadingElement> {}

const H2 = React.forwardRef<HTMLHeadingElement, H2Props>(
  ({ className, ...props }, ref) => {
    return (
      <h2
        ref={ref}
        className={cn(
          'scroll-m-20 text-3xl font-semibold tracking-tight',
          className
        )}
        {...props}
      />
    );
  }
);

H2.displayName = 'H2';

/**
 * H3 heading component props
 * @example
 * ```tsx
 * <H3>The King's Plan</H3>
 * ```
 */
export interface H3Props extends React.HTMLAttributes<HTMLHeadingElement> {}

const H3 = React.forwardRef<HTMLHeadingElement, H3Props>(
  ({ className, ...props }, ref) => {
    return (
      <h3
        ref={ref}
        className={cn(
          'scroll-m-20 text-2xl font-semibold tracking-tight',
          className
        )}
        {...props}
      />
    );
  }
);

H3.displayName = 'H3';

/**
 * H4 heading component props
 * @example
 * ```tsx
 * <H4>People stopped telling jokes</H4>
 * ```
 */
export interface H4Props extends React.HTMLAttributes<HTMLHeadingElement> {}

const H4 = React.forwardRef<HTMLHeadingElement, H4Props>(
  ({ className, ...props }, ref) => {
    return (
      <h4
        ref={ref}
        className={cn(
          'scroll-m-20 text-xl font-semibold tracking-tight',
          className
        )}
        {...props}
      />
    );
  }
);

H4.displayName = 'H4';

/**
 * Paragraph component props
 * @example
 * ```tsx
 * <P>The king, seeing how much happier his subjects were, realized the error of his ways.</P>
 * ```
 */
export interface PProps extends React.HTMLAttributes<HTMLParagraphElement> {}

const P = React.forwardRef<HTMLParagraphElement, PProps>(
  ({ className, ...props }, ref) => {
    return (
      <p
        ref={ref}
        className={cn('leading-7 [&:not(:first-child)]:mt-6', className)}
        {...props}
      />
    );
  }
);

P.displayName = 'P';

/**
 * Lead paragraph component props
 * @example
 * ```tsx
 * <Lead>A modal dialog that interrupts the user with important content.</Lead>
 * ```
 */
export interface LeadProps extends React.HTMLAttributes<HTMLParagraphElement> {}

const Lead = React.forwardRef<HTMLParagraphElement, LeadProps>(
  ({ className, ...props }, ref) => {
    return (
      <p
        ref={ref}
        className={cn('text-xl text-muted-foreground', className)}
        {...props}
      />
    );
  }
);

Lead.displayName = 'Lead';

/**
 * Large text component props
 * @example
 * ```tsx
 * <Large>Are you absolutely sure?</Large>
 * ```
 */
export interface LargeProps extends React.HTMLAttributes<HTMLDivElement> {}

const Large = React.forwardRef<HTMLDivElement, LargeProps>(
  ({ className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn('text-lg font-semibold', className)}
        {...props}
      />
    );
  }
);

Large.displayName = 'Large';

/**
 * Small text component props
 * @example
 * ```tsx
 * <Small>Email address</Small>
 * ```
 */
export interface SmallProps extends React.HTMLAttributes<HTMLElement> {}

const Small = React.forwardRef<HTMLElement, SmallProps>(
  ({ className, ...props }, ref) => {
    return (
      <small
        ref={ref}
        className={cn('text-sm font-medium leading-none', className)}
        {...props}
      />
    );
  }
);

Small.displayName = 'Small';

/**
 * Muted text component props
 * @example
 * ```tsx
 * <Muted>Enter your email address.</Muted>
 * ```
 */
export interface MutedProps extends React.HTMLAttributes<HTMLParagraphElement> {}

const Muted = React.forwardRef<HTMLParagraphElement, MutedProps>(
  ({ className, ...props }, ref) => {
    return (
      <p
        ref={ref}
        className={cn('text-sm text-muted-foreground', className)}
        {...props}
      />
    );
  }
);

Muted.displayName = 'Muted';

/**
 * Inline code component props
 * @example
 * ```tsx
 * <InlineCode>@radix-ui/react-alert-dialog</InlineCode>
 * ```
 */
export interface InlineCodeProps extends React.HTMLAttributes<HTMLElement> {}

const InlineCode = React.forwardRef<HTMLElement, InlineCodeProps>(
  ({ className, ...props }, ref) => {
    return (
      <code
        ref={ref}
        className={cn(
          'relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold',
          className
        )}
        {...props}
      />
    );
  }
);

InlineCode.displayName = 'InlineCode';

/**
 * Blockquote component props
 * @example
 * ```tsx
 * <Blockquote>
 *   "After all," he said, "everyone enjoys a good joke, so it's only fair that they should pay for the privilege."
 * </Blockquote>
 * ```
 */
export interface BlockquoteProps
  extends React.HTMLAttributes<HTMLQuoteElement> {}

const Blockquote = React.forwardRef<HTMLQuoteElement, BlockquoteProps>(
  ({ className, ...props }, ref) => {
    return (
      <blockquote
        ref={ref}
        className={cn('mt-6 border-l-2 pl-6 italic', className)}
        {...props}
      />
    );
  }
);

Blockquote.displayName = 'Blockquote';

export { H1, H2, H3, H4, P, Lead, Large, Small, Muted, InlineCode, Blockquote };
