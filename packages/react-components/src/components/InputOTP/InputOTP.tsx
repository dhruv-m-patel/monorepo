'use client';

import * as React from 'react';
import { cn } from '@ui/lib/utils';

interface InputOTPContextValue {
  value: string;
  onChange: (value: string) => void;
  maxLength: number;
  pattern?: string;
  slots: number[];
  activeIndex: number;
  setActiveIndex: (index: number) => void;
}

const InputOTPContext = React.createContext<InputOTPContextValue | undefined>(
  undefined
);

const useInputOTP = () => {
  const context = React.useContext(InputOTPContext);
  if (!context) {
    throw new Error('useInputOTP must be used within an InputOTP');
  }
  return context;
};

/**
 * Props for the InputOTP component
 *
 * @example
 * ```tsx
 * <InputOTP maxLength={6} value={code} onChange={setCode}>
 *   <InputOTPGroup>
 *     <InputOTPSlot index={0} />
 *     <InputOTPSlot index={1} />
 *     <InputOTPSlot index={2} />
 *   </InputOTPGroup>
 *   <InputOTPSeparator />
 *   <InputOTPGroup>
 *     <InputOTPSlot index={3} />
 *     <InputOTPSlot index={4} />
 *     <InputOTPSlot index={5} />
 *   </InputOTPGroup>
 * </InputOTP>
 * ```
 */
export interface InputOTPProps {
  maxLength: number;
  value?: string;
  onChange?: (value: string) => void;
  pattern?: string;
  children: React.ReactNode;
  className?: string;
}

const InputOTP = React.forwardRef<HTMLDivElement, InputOTPProps>(
  ({ maxLength, value = '', onChange, pattern, children, className }, ref) => {
    const [internalValue, setInternalValue] = React.useState(value);
    const [activeIndex, setActiveIndex] = React.useState(0);
    const inputRef = React.useRef<HTMLInputElement>(null);

    const currentValue = value !== undefined ? value : internalValue;

    const handleChange = React.useCallback(
      (newValue: string) => {
        if (pattern) {
          const regex = new RegExp(pattern);
          if (!regex.test(newValue) && newValue !== '') {
            return;
          }
        }

        if (newValue.length <= maxLength) {
          if (value === undefined) {
            setInternalValue(newValue);
          }
          onChange?.(newValue);
        }
      },
      [maxLength, onChange, pattern, value]
    );

    const slots = Array.from({ length: maxLength }, (_, i) => i);

    const contextValue: InputOTPContextValue = {
      value: currentValue,
      onChange: handleChange,
      maxLength,
      pattern,
      slots,
      activeIndex,
      setActiveIndex,
    };

    return (
      <InputOTPContext.Provider value={contextValue}>
        <div ref={ref} className={cn('relative', className)}>
          <input
            ref={inputRef}
            type="text"
            className="sr-only"
            value={currentValue}
            onChange={(e) => handleChange(e.target.value)}
            maxLength={maxLength}
            aria-hidden="true"
            tabIndex={-1}
          />
          {children}
        </div>
      </InputOTPContext.Provider>
    );
  }
);

InputOTP.displayName = 'InputOTP';

/**
 * Props for the InputOTPGroup component
 *
 * @example
 * ```tsx
 * <InputOTPGroup>
 *   <InputOTPSlot index={0} />
 *   <InputOTPSlot index={1} />
 * </InputOTPGroup>
 * ```
 */
export interface InputOTPGroupProps {
  children: React.ReactNode;
  className?: string;
}

const InputOTPGroup = React.forwardRef<HTMLDivElement, InputOTPGroupProps>(
  ({ children, className }, ref) => {
    return (
      <div ref={ref} className={cn('flex items-center', className)}>
        {children}
      </div>
    );
  }
);

InputOTPGroup.displayName = 'InputOTPGroup';

/**
 * Props for the InputOTPSlot component
 *
 * @example
 * ```tsx
 * <InputOTPSlot index={0} />
 * ```
 */
export interface InputOTPSlotProps {
  index: number;
  className?: string;
}

const InputOTPSlot = React.forwardRef<HTMLDivElement, InputOTPSlotProps>(
  ({ index, className }, ref) => {
    const { value, onChange, activeIndex, setActiveIndex } = useInputOTP();
    const char = value[index] || '';
    const isActive = activeIndex === index;

    const handleClick = () => {
      setActiveIndex(index);
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
      if (e.key >= '0' && e.key <= '9') {
        e.preventDefault();
        const newValue =
          value.substring(0, index) + e.key + value.substring(index + 1);
        onChange(newValue);
        // Auto-advance to next slot
        if (index < value.length) {
          setActiveIndex(Math.min(index + 1, value.length));
        }
      } else if (e.key === 'Backspace') {
        e.preventDefault();
        if (char) {
          // Delete current character
          const newValue =
            value.substring(0, index) + value.substring(index + 1);
          onChange(newValue);
        } else if (index > 0) {
          // Move to previous slot and delete
          const newValue =
            value.substring(0, index - 1) + value.substring(index);
          onChange(newValue);
          setActiveIndex(index - 1);
        }
      } else if (e.key === 'ArrowLeft' && index > 0) {
        e.preventDefault();
        setActiveIndex(index - 1);
      } else if (e.key === 'ArrowRight' && index < value.length) {
        e.preventDefault();
        setActiveIndex(index + 1);
      }
    };

    return (
      <div
        ref={ref}
        className={cn(
          'relative flex h-10 w-10 items-center justify-center border-y border-r border-input text-sm transition-all first:rounded-l-md first:border-l last:rounded-r-md',
          isActive && 'z-10 ring-2 ring-ring ring-offset-background',
          className
        )}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        tabIndex={0}
        role="textbox"
        aria-label={`Digit ${index + 1}`}
      >
        {char}
        {isActive && !char && (
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
            <div className="h-4 w-px animate-pulse bg-foreground" />
          </div>
        )}
      </div>
    );
  }
);

InputOTPSlot.displayName = 'InputOTPSlot';

/**
 * Props for the InputOTPSeparator component
 *
 * @example
 * ```tsx
 * <InputOTPSeparator />
 * ```
 */
export interface InputOTPSeparatorProps {
  className?: string;
}

const InputOTPSeparator = React.forwardRef<
  HTMLDivElement,
  InputOTPSeparatorProps
>(({ className }, ref) => {
  return (
    <div
      ref={ref}
      role="separator"
      className={cn('flex items-center justify-center', className)}
    >
      <div className="h-4 w-px bg-border" />
    </div>
  );
});

InputOTPSeparator.displayName = 'InputOTPSeparator';

export { InputOTP, InputOTPGroup, InputOTPSlot, InputOTPSeparator };
