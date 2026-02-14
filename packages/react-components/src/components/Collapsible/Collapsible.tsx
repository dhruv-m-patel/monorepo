import * as React from 'react';
import * as CollapsiblePrimitive from '@radix-ui/react-collapsible';

/**
 * Collapsible component props
 * @example
 * ```tsx
 * <Collapsible>
 *   <CollapsibleTrigger>Toggle</CollapsibleTrigger>
 *   <CollapsibleContent>Content here</CollapsibleContent>
 * </Collapsible>
 * ```
 */
export type CollapsibleProps = React.ComponentPropsWithoutRef<
  typeof CollapsiblePrimitive.Root
>;

/**
 * CollapsibleTrigger component props
 * @example
 * ```tsx
 * <CollapsibleTrigger asChild>
 *   <button>Toggle content</button>
 * </CollapsibleTrigger>
 * ```
 */
export type CollapsibleTriggerProps = React.ComponentPropsWithoutRef<
  typeof CollapsiblePrimitive.Trigger
>;

/**
 * CollapsibleContent component props
 * @example
 * ```tsx
 * <CollapsibleContent>
 *   <div>Hidden content that can be toggled</div>
 * </CollapsibleContent>
 * ```
 */
export type CollapsibleContentProps = React.ComponentPropsWithoutRef<
  typeof CollapsiblePrimitive.Content
>;

const Collapsible = CollapsiblePrimitive.Root;

const CollapsibleTrigger = CollapsiblePrimitive.Trigger;

const CollapsibleContent = CollapsiblePrimitive.Content;

export { Collapsible, CollapsibleTrigger, CollapsibleContent };
