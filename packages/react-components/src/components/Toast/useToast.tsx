import * as React from 'react';

/**
 * Toast data structure
 *
 * @example
 * ```tsx
 * const toastData: ToastData = {
 *   id: '123',
 *   title: 'Success',
 *   description: 'Operation completed',
 *   variant: 'success',
 *   duration: 5000,
 * };
 * ```
 */
export interface ToastData {
  id: string;
  title?: string;
  description?: string;
  variant?: 'default' | 'destructive' | 'success';
  action?: React.ReactNode;
  duration?: number;
}

type ToastActionType =
  | { type: 'ADD_TOAST'; toast: ToastData }
  | { type: 'REMOVE_TOAST'; id: string }
  | { type: 'DISMISS_TOAST'; id: string };

interface ToastState {
  toasts: ToastData[];
}

const toastReducer = (
  state: ToastState,
  action: ToastActionType
): ToastState => {
  switch (action.type) {
    case 'ADD_TOAST':
      return {
        ...state,
        toasts: [...state.toasts, action.toast],
      };
    case 'REMOVE_TOAST':
      return {
        ...state,
        toasts: state.toasts.filter((t) => t.id !== action.id),
      };
    case 'DISMISS_TOAST':
      return {
        ...state,
        toasts: state.toasts.filter((t) => t.id !== action.id),
      };
    default:
      return state;
  }
};

interface ToastContextValue {
  toasts: ToastData[];
  toast: (data: Omit<ToastData, 'id'>) => string;
  dismiss: (id: string) => void;
}

const ToastContext = React.createContext<ToastContextValue | undefined>(
  undefined
);

/**
 * ToastProvider props
 *
 * @example
 * ```tsx
 * <ToastProvider>
 *   <App />
 * </ToastProvider>
 * ```
 */
export interface ToastProviderProps {
  children: React.ReactNode;
}

/**
 * ToastProvider component to wrap your app for toast functionality.
 */
export function ToastProvider({ children }: ToastProviderProps) {
  const [state, dispatch] = React.useReducer(toastReducer, { toasts: [] });

  const toast = React.useCallback(
    (data: Omit<ToastData, 'id'>): string => {
      const id = Math.random().toString(36).substr(2, 9);
      const duration = data.duration ?? 5000;

      dispatch({
        type: 'ADD_TOAST',
        toast: { ...data, id },
      });

      if (duration > 0) {
        setTimeout(() => {
          dispatch({ type: 'REMOVE_TOAST', id });
        }, duration);
      }

      return id;
    },
    []
  );

  const dismiss = React.useCallback((id: string) => {
    dispatch({ type: 'DISMISS_TOAST', id });
  }, []);

  const value = React.useMemo(
    () => ({
      toasts: state.toasts,
      toast,
      dismiss,
    }),
    [state.toasts, toast, dismiss]
  );

  return (
    <ToastContext.Provider value={value}>{children}</ToastContext.Provider>
  );
}

/**
 * Hook to access toast functionality
 *
 * @returns Toast context value with toast(), dismiss(), and toasts array
 *
 * @example
 * ```tsx
 * const { toast, dismiss, toasts } = useToast();
 *
 * const handleClick = () => {
 *   toast({
 *     title: 'Success',
 *     description: 'Operation completed successfully',
 *     variant: 'success',
 *   });
 * };
 * ```
 */
export function useToast(): ToastContextValue {
  const context = React.useContext(ToastContext);

  if (context === undefined) {
    throw new Error('useToast must be used within a ToastProvider');
  }

  return context;
}
