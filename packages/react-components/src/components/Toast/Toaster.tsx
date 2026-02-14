import * as React from 'react';
import { createPortal } from 'react-dom';
import { useToast } from './useToast';
import { Toast, ToastTitle, ToastDescription, ToastClose } from './Toast';

/**
 * Toaster component props
 *
 * @example
 * ```tsx
 * <Toaster />
 * ```
 */
export interface ToasterProps {
  /**
   * Custom class name for the toaster container
   */
  className?: string;
}

/**
 * Toaster component that renders all active toasts.
 * Should be placed at the root level of your app, typically inside the ToastProvider.
 *
 * @example
 * ```tsx
 * <ToastProvider>
 *   <App />
 *   <Toaster />
 * </ToastProvider>
 * ```
 */
export function Toaster({ className }: ToasterProps) {
  const { toasts, dismiss } = useToast();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return createPortal(
    <div
      className={`fixed bottom-0 right-0 z-[100] flex max-h-screen w-full flex-col-reverse gap-2 p-4 sm:bottom-0 sm:right-0 sm:top-auto sm:flex-col md:max-w-[420px] ${
        className || ''
      }`}
    >
      {toasts.map((toast) => (
        <Toast key={toast.id} variant={toast.variant}>
          <div className="grid gap-1">
            {toast.title && <ToastTitle>{toast.title}</ToastTitle>}
            {toast.description && (
              <ToastDescription>{toast.description}</ToastDescription>
            )}
          </div>
          {toast.action}
          <ToastClose onClick={() => dismiss(toast.id)} />
        </Toast>
      ))}
    </div>,
    document.body
  );
}

Toaster.displayName = 'Toaster';
