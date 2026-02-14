// @dhruv-m-patel/react-components
// Production-grade, themeable React component library

// Utilities
export { cn } from './lib/utils';

// Theme
export {
  ThemeProvider,
  type ThemeProviderProps,
} from './theme/ThemeProvider';
export { useTheme } from './theme/useTheme';
export { createTheme } from './theme/create-theme';
export type {
  ThemeMode,
  ThemeConfig,
  ColorPalette,
  ThemeContextValue,
} from './theme/types';

// Components
export { Button, type ButtonProps } from './components/Button';
export { Badge, type BadgeProps } from './components/Badge';
export { Input, type InputProps } from './components/Input';
export { Label, type LabelProps } from './components/Label';
export { Textarea, type TextareaProps } from './components/Textarea';

// Display Components
export { Separator, type SeparatorProps } from './components/Separator';
export { Skeleton, type SkeletonProps } from './components/Skeleton';
export {
  Avatar,
  AvatarImage,
  AvatarFallback,
  type AvatarProps,
  type AvatarImageProps,
  type AvatarFallbackProps,
} from './components/Avatar';
export { Spinner, type SpinnerProps } from './components/Spinner';
export {
  H1,
  H2,
  H3,
  H4,
  P,
  Lead,
  Large,
  Small,
  Muted,
  InlineCode,
  Blockquote,
  type H1Props,
  type H2Props,
  type H3Props,
  type H4Props,
  type PProps,
  type LeadProps,
  type LargeProps,
  type SmallProps,
  type MutedProps,
  type InlineCodeProps,
  type BlockquoteProps,
} from './components/Typography';

// Feedback Components
export {
  Alert,
  AlertTitle,
  AlertDescription,
  type AlertProps,
  type AlertTitleProps,
  type AlertDescriptionProps,
} from './components/Alert';

export {
  Progress,
  type ProgressProps,
} from './components/Progress';

export {
  Toast,
  ToastTitle,
  ToastDescription,
  ToastClose,
  ToastAction,
  ToastProvider,
  Toaster,
  useToast,
  type ToastProps,
  type ToastTitleProps,
  type ToastDescriptionProps,
  type ToastCloseProps,
  type ToastActionProps,
  type ToastProviderProps,
  type ToasterProps,
  type ToastData,
} from './components/Toast';
