import { forwardRef, useRef } from 'react'
import { useTextField } from 'react-aria'
import { cn } from '../../utils/cn'
import type { Size } from '../../types/common'

export interface InputProps {
  label: string
  description?: string
  errorMessage?: string
  isInvalid?: boolean
  isDisabled?: boolean
  isRequired?: boolean
  placeholder?: string
  type?: 'text' | 'email' | 'password' | 'url' | 'tel' | 'search' | 'number'
  value?: string
  defaultValue?: string
  onChange?: (value: string) => void
  size?: Size
  className?: string
}

const sizeStyles: Record<Size, string> = {
  xs: 'h-8 px-2.5 text-xs',
  sm: 'h-9 px-3 text-sm',
  md: 'h-10 px-3.5 text-sm',
  lg: 'h-11 px-4 text-md',
  xl: 'h-12 px-4 text-md',
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      description,
      errorMessage,
      isInvalid = false,
      isDisabled = false,
      isRequired = false,
      placeholder,
      type = 'text',
      value,
      defaultValue,
      onChange,
      size = 'md',
      className,
    },
    forwardedRef,
  ) => {
    const internalRef = useRef<HTMLInputElement>(null)
    const ref = (forwardedRef as React.RefObject<HTMLInputElement>) ?? internalRef

    const { labelProps, inputProps, descriptionProps, errorMessageProps } = useTextField(
      {
        label,
        description,
        errorMessage,
        isInvalid,
        isDisabled,
        isRequired,
        placeholder,
        type,
        value,
        defaultValue,
        onChange,
      },
      ref,
    )

    return (
      <div className={cn('flex flex-col gap-1.5', className)}>
        <label {...labelProps} className="text-sm font-medium text-foreground">
          {label}
          {isRequired && <span className="text-destructive-500 ml-0.5">*</span>}
        </label>
        <input
          {...inputProps}
          ref={ref}
          className={cn(
            'w-full rounded-lg border bg-white text-foreground placeholder:text-muted-foreground',
            'transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:border-primary-300',
            'disabled:cursor-not-allowed disabled:opacity-50',
            isInvalid ? 'border-destructive-300 focus:ring-destructive-500' : 'border-secondary-300',
            sizeStyles[size],
          )}
        />
        {description && !isInvalid && (
          <p {...descriptionProps} className="text-sm text-muted-foreground">{description}</p>
        )}
        {isInvalid && errorMessage && (
          <p {...errorMessageProps} className="text-sm text-destructive-500">{errorMessage}</p>
        )}
      </div>
    )
  },
)

Input.displayName = 'Input'
