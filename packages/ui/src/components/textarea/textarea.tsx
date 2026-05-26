import { forwardRef, useRef } from 'react'
import { useTextField } from 'react-aria'
import { cn } from '../../utils/cn'

export interface TextareaProps {
  label: string
  description?: string
  errorMessage?: string
  isInvalid?: boolean
  isDisabled?: boolean
  isRequired?: boolean
  placeholder?: string
  value?: string
  defaultValue?: string
  onChange?: (value: string) => void
  rows?: number
  className?: string
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    {
      label,
      description,
      errorMessage,
      isInvalid = false,
      isDisabled = false,
      isRequired = false,
      placeholder,
      value,
      defaultValue,
      onChange,
      rows = 3,
      className,
    },
    forwardedRef,
  ) => {
    const internalRef = useRef<HTMLTextAreaElement>(null)
    const ref = (forwardedRef as React.RefObject<HTMLTextAreaElement>) ?? internalRef

    const { labelProps, inputProps, descriptionProps, errorMessageProps } = useTextField(
      {
        label,
        description,
        errorMessage,
        isInvalid,
        isDisabled,
        isRequired,
        placeholder,
        value,
        defaultValue,
        onChange,
        inputElementType: 'textarea',
      },
      ref,
    )

    return (
      <div className={cn('flex flex-col gap-1.5', className)}>
        <label {...labelProps} className="text-sm font-medium text-foreground">
          {label}
          {isRequired && <span className="text-destructive-500 ml-0.5">*</span>}
        </label>
        <textarea
          {...inputProps}
          ref={ref}
          rows={rows}
          className={cn(
            'w-full rounded-lg border bg-white text-foreground placeholder:text-muted-foreground',
            'transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:border-primary-300',
            'disabled:cursor-not-allowed disabled:opacity-50 resize-y',
            isInvalid ? 'border-destructive-300 focus:ring-destructive-500' : 'border-secondary-300',
            'px-3.5 py-2.5 text-sm',
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

Textarea.displayName = 'Textarea'
