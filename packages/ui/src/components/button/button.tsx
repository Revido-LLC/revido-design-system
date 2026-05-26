import { forwardRef, useRef } from 'react'
import { useButton, mergeProps, useFocusRing } from 'react-aria'
import { cn } from '../../utils/cn'
import type { Size, Variant } from '../../types/common'

export interface ButtonProps {
  children: React.ReactNode
  variant?: Variant
  size?: Size
  isDisabled?: boolean
  isLoading?: boolean
  onPress?: () => void
  type?: 'button' | 'submit' | 'reset'
  className?: string
}

const variantStyles: Record<Variant, string> = {
  solid: 'bg-primary-600 text-white hover:bg-primary-700 active:bg-primary-800',
  outline: 'border border-secondary-300 bg-white text-secondary-700 hover:bg-secondary-50 active:bg-secondary-100',
  ghost: 'text-secondary-700 hover:bg-secondary-50 active:bg-secondary-100',
  soft: 'bg-primary-50 text-primary-700 hover:bg-primary-100 active:bg-primary-200',
  link: 'text-primary-600 hover:text-primary-700 underline-offset-4 hover:underline',
}

const sizeStyles: Record<Size, string> = {
  xs: 'h-8 px-3 text-xs gap-1.5 rounded-md',
  sm: 'h-9 px-3.5 text-sm gap-1.5 rounded-md',
  md: 'h-10 px-4 text-sm gap-2 rounded-lg',
  lg: 'h-11 px-5 text-md gap-2 rounded-lg',
  xl: 'h-12 px-6 text-md gap-2.5 rounded-lg',
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      variant = 'solid',
      size = 'md',
      isDisabled = false,
      isLoading = false,
      onPress,
      type = 'button',
      className,
      ...rest
    },
    forwardedRef,
  ) => {
    const internalRef = useRef<HTMLButtonElement>(null)
    const ref = (forwardedRef as React.RefObject<HTMLButtonElement>) ?? internalRef

    const { buttonProps } = useButton(
      {
        isDisabled: isDisabled || isLoading,
        onPress,
        type,
        ...rest,
      },
      ref,
    )

    const { focusProps, isFocusVisible } = useFocusRing()

    return (
      <button
        {...mergeProps(buttonProps, focusProps)}
        ref={ref}
        className={cn(
          'inline-flex items-center justify-center font-medium transition-colors',
          'disabled:pointer-events-none disabled:opacity-50',
          isFocusVisible && 'outline-none ring-2 ring-ring ring-offset-2',
          variantStyles[variant],
          sizeStyles[size],
          className,
        )}
      >
        {isLoading ? (
          <>
            <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
            {children}
          </>
        ) : (
          children
        )}
      </button>
    )
  },
)

Button.displayName = 'Button'
