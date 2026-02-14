import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@ui/lib/utils';

const toastVariants = cva(
  'group pointer-events-auto relative flex w-full items-center justify-between space-x-4 overflow-hidden rounded-md border p-6 pr-8 shadow-lg transition-all data-[swipe=cancel]:translate-x-0 data-[swipe=end]:translate-x-[var(--radix-toast-swipe-end-x)] data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)] data-[swipe=move]:transition-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[swipe=end]:animate-out data-[state=closed]:fade-out-80 data-[state=closed]:slide-out-to-right-full data-[state=open]:slide-in-from-top-full data-[state=open]:sm:slide-in-from-bottom-full',
  {
    variants: {
      variant: {
        default: 'border bg-background text-foreground',
        destructive:
          'destructive group border-destructive bg-destructive text-destructive-foreground',
        success: 'border-green-500 bg-green-50 text-green-900 dark:bg-green-950 dark:text-green-100',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

/**
 * Toast component props
 *
 * @example
 * ```tsx
 * <Toast variant="success">
 *   <ToastTitle>Success</ToastTitle>
 *   <ToastDescription>Operation completed</ToastDescription>
 *   <ToastClose />
 * </Toast>
 * ```
 */
export interface ToastProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof toastVariants> {
  /**
   * Callback fired when the toast should be closed
   */
  onClose?: () => void;
}

/**
 * Toast component for displaying temporary notifications.
 */
const Toast = React.forwardRef<HTMLDivElement, ToastProps>(
  ({ className, variant, children, onClose, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(toastVariants({ variant }), className)}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Toast.displayName = 'Toast';

/**
 * ToastTitle component props
 *
 * @example
 * ```tsx
 * <ToastTitle>Success</ToastTitle>
 * ```
 */
export interface ToastTitleProps
  extends React.HTMLAttributes<HTMLDivElement> {}

/**
 * ToastTitle component for the toast heading.
 */
const ToastTitle = React.forwardRef<HTMLDivElement, ToastTitleProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn('text-sm font-semibold', className)}
      {...props}
    />
  )
);

ToastTitle.displayName = 'ToastTitle';

/**
 * ToastDescription component props
 *
 * @example
 * ```tsx
 * <ToastDescription>Your changes have been saved</ToastDescription>
 * ```
 */
export interface ToastDescriptionProps
  extends React.HTMLAttributes<HTMLDivElement> {}

/**
 * ToastDescription component for the toast body text.
 */
const ToastDescription = React.forwardRef<
  HTMLDivElement,
  ToastDescriptionProps
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('text-sm opacity-90', className)}
    {...props}
  />
));

ToastDescription.displayName = 'ToastDescription';

/**
 * ToastClose component props
 *
 * @example
 * ```tsx
 * <ToastClose onClick={() => dismiss(id)} />
 * ```
 */
export interface ToastCloseProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

/**
 * ToastClose component for dismissing the toast.
 */
const ToastClose = React.forwardRef<HTMLButtonElement, ToastCloseProps>(
  ({ className, ...props }, ref) => (
    <button
      ref={ref}
      className={cn(
        'absolute right-2 top-2 rounded-md p-1 text-foreground/50 opacity-0 transition-opacity hover:text-foreground focus:opacity-100 focus:outline-none focus:ring-2 group-hover:opacity-100',
        className
      )}
      {...props}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <line x1="18" y1="6" x2="6" y2="18" />
        <line x1="6" y1="6" x2="18" y2="18" />
      </svg>
    </button>
  )
);

ToastClose.displayName = 'ToastClose';

/**
 * ToastAction component props
 *
 * @example
 * ```tsx
 * <ToastAction onClick={handleAction}>Undo</ToastAction>
 * ```
 */
export interface ToastActionProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

/**
 * ToastAction component for action buttons in the toast.
 */
const ToastAction = React.forwardRef<HTMLButtonElement, ToastActionProps>(
  ({ className, ...props }, ref) => (
    <button
      ref={ref}
      className={cn(
        'inline-flex h-8 shrink-0 items-center justify-center rounded-md border bg-transparent px-3 text-sm font-medium ring-offset-background transition-colors hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
        className
      )}
      {...props}
    />
  )
);

ToastAction.displayName = 'ToastAction';

export {
  Toast,
  ToastTitle,
  ToastDescription,
  ToastClose,
  ToastAction,
  toastVariants,
};
