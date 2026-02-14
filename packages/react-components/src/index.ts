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

// Overlay Components
export {
  Dialog,
  DialogPortal,
  DialogOverlay,
  DialogTrigger,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
  type DialogContentProps,
  type DialogTitleProps,
  type DialogDescriptionProps,
} from './components/Dialog';

export {
  Sheet,
  SheetPortal,
  SheetOverlay,
  SheetTrigger,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetFooter,
  SheetTitle,
  SheetDescription,
  type SheetContentProps,
  type SheetTitleProps,
  type SheetDescriptionProps,
} from './components/Sheet';

export {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  TooltipProvider,
  type TooltipContentProps,
} from './components/Tooltip';

export {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverAnchor,
  type PopoverContentProps,
} from './components/Popover';

export {
  HoverCard,
  HoverCardTrigger,
  HoverCardContent,
  type HoverCardContentProps,
} from './components/HoverCard';

// Form Components
export { Checkbox, type CheckboxProps } from './components/Checkbox';

export {
  RadioGroup,
  RadioGroupItem,
  type RadioGroupProps,
  type RadioGroupItemProps,
} from './components/RadioGroup';

export { Switch, type SwitchProps } from './components/Switch';

export {
  Select,
  SelectGroup,
  SelectValue,
  SelectTrigger,
  SelectContent,
  SelectLabel,
  SelectItem,
  SelectSeparator,
  type SelectProps,
  type SelectTriggerProps,
  type SelectValueProps,
  type SelectContentProps,
  type SelectItemProps,
  type SelectGroupProps,
  type SelectLabelProps,
  type SelectSeparatorProps,
} from './components/Select';

export { Slider, type SliderProps } from './components/Slider';

export { Toggle, toggleVariants, type ToggleProps } from './components/Toggle';

export {
  ToggleGroup,
  ToggleGroupItem,
  type ToggleGroupProps,
  type ToggleGroupItemProps,
} from './components/ToggleGroup';

export {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
  InputOTPSeparator,
  type InputOTPProps,
  type InputOTPGroupProps,
  type InputOTPSlotProps,
  type InputOTPSeparatorProps,
} from './components/InputOTP';

// Navigation Components
export {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
  type TabsProps,
  type TabsListProps,
  type TabsTriggerProps,
  type TabsContentProps,
} from './components/Tabs';

export {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
  type AccordionProps,
  type AccordionItemProps,
  type AccordionTriggerProps,
  type AccordionContentProps,
} from './components/Accordion';

export {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
  type CollapsibleProps,
  type CollapsibleTriggerProps,
  type CollapsibleContentProps,
} from './components/Collapsible';

export {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
  BreadcrumbEllipsis,
  type BreadcrumbProps,
  type BreadcrumbListProps,
  type BreadcrumbItemProps,
  type BreadcrumbLinkProps,
  type BreadcrumbPageProps,
  type BreadcrumbSeparatorProps,
  type BreadcrumbEllipsisProps,
} from './components/Breadcrumb';

export {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationPrevious,
  PaginationNext,
  PaginationEllipsis,
  type PaginationProps,
  type PaginationContentProps,
  type PaginationItemProps,
  type PaginationLinkProps,
  type PaginationPreviousProps,
  type PaginationNextProps,
  type PaginationEllipsisProps,
} from './components/Pagination';

// Layout Components
export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardDescription,
  CardContent,
  type CardProps,
  type CardHeaderProps,
  type CardFooterProps,
  type CardTitleProps,
  type CardDescriptionProps,
  type CardContentProps,
} from './components/Card';

export { AspectRatio, type AspectRatioProps } from './components/AspectRatio';

export {
  ScrollArea,
  ScrollBar,
  type ScrollAreaProps,
  type ScrollBarProps,
} from './components/ScrollArea';

export {
  ResizablePanelGroup,
  ResizablePanel,
  ResizableHandle,
  type ResizablePanelGroupProps,
  type ResizablePanelProps,
  type ResizableHandleProps,
} from './components/Resizable';

export {
  FlexGrid,
  type FlexGridProps,
  type FlexGridColumnProps,
  type ColumnSpan,
} from './components/FlexGrid';

// Menu Components
export {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuCheckboxItem,
  DropdownMenuRadioItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuGroup,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuRadioGroup,
  type DropdownMenuSubTriggerProps,
  type DropdownMenuSubContentProps,
  type DropdownMenuContentProps,
  type DropdownMenuItemProps,
  type DropdownMenuCheckboxItemProps,
  type DropdownMenuRadioItemProps,
  type DropdownMenuLabelProps,
  type DropdownMenuSeparatorProps,
  type DropdownMenuShortcutProps,
} from './components/DropdownMenu';

export {
  ContextMenu,
  ContextMenuTrigger,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuCheckboxItem,
  ContextMenuRadioItem,
  ContextMenuLabel,
  ContextMenuSeparator,
  ContextMenuShortcut,
  ContextMenuGroup,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
  ContextMenuRadioGroup,
  type ContextMenuSubTriggerProps,
  type ContextMenuSubContentProps,
  type ContextMenuContentProps,
  type ContextMenuItemProps,
  type ContextMenuCheckboxItemProps,
  type ContextMenuRadioItemProps,
  type ContextMenuLabelProps,
  type ContextMenuSeparatorProps,
  type ContextMenuShortcutProps,
} from './components/ContextMenu';

export {
  Menubar,
  MenubarMenu,
  MenubarTrigger,
  MenubarContent,
  MenubarItem,
  MenubarSeparator,
  MenubarShortcut,
  MenubarCheckboxItem,
  MenubarRadioGroup,
  MenubarRadioItem,
  MenubarSub,
  MenubarSubContent,
  MenubarSubTrigger,
  type MenubarTriggerProps,
  type MenubarSubTriggerProps,
  type MenubarSubContentProps,
  type MenubarContentProps,
  type MenubarItemProps,
  type MenubarCheckboxItemProps,
  type MenubarRadioItemProps,
  type MenubarSeparatorProps,
  type MenubarShortcutProps,
} from './components/Menubar';

// Data Display Components
export {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableHead,
  TableRow,
  TableCell,
  TableCaption,
  type TableProps,
  type TableHeaderProps,
  type TableBodyProps,
  type TableFooterProps,
  type TableHeadProps,
  type TableRowProps,
  type TableCellProps,
  type TableCaptionProps,
} from './components/Table';

export {
  Command,
  CommandDialog,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandShortcut,
  CommandSeparator,
  type CommandProps,
  type CommandDialogProps,
  type CommandInputProps,
  type CommandListProps,
  type CommandEmptyProps,
  type CommandGroupProps,
  type CommandItemProps,
  type CommandShortcutProps,
  type CommandSeparatorProps,
} from './components/Command';
