import { forwardRef } from 'react'
import { cn } from '../../utils/cn'
import type { ColorScheme } from '../../types/common'

type BadgeVariant = 'solid' | 'outline' | 'soft'
type BadgeSize = 'sm' | 'md' | 'lg'

export interface BadgeProps {
  children: React.ReactNode
  variant?: BadgeVariant
  size?: BadgeSize
  colorScheme?: ColorScheme
  className?: string
}

const colorSchemeStyles: Record<ColorScheme, Record<BadgeVariant, string>> = {
  primary: {
    solid: 'bg-primary-600 text-white',
    outline: 'border border-primary-300 text-primary-700',
    soft: 'bg-primary-50 text-primary-700',
  },
  secondary: {
    solid: 'bg-secondary-600 text-white',
    outline: 'border border-secondary-300 text-secondary-700',
    soft: 'bg-secondary-50 text-secondary-700',
  },
  destructive: {
    solid: 'bg-destructive-600 text-white',
    outline: 'border border-destructive-300 text-destructive-700',
    soft: 'bg-destructive-50 text-destructive-700',
  },
  success: {
    solid: 'bg-success-600 text-white',
    outline: 'border border-success-300 text-success-700',
    soft: 'bg-success-50 text-success-700',
  },
  warning: {
    solid: 'bg-warning-600 text-white',
    outline: 'border border-warning-300 text-warning-700',
    soft: 'bg-warning-50 text-warning-700',
  },
  muted: {
    solid: 'bg-secondary-500 text-white',
    outline: 'border border-secondary-200 text-secondary-500',
    soft: 'bg-secondary-50 text-secondary-500',
  },
}

const sizeStyles: Record<BadgeSize, string> = {
  sm: 'px-2 py-0.5 text-xs',
  md: 'px-2.5 py-0.5 text-xs',
  lg: 'px-3 py-1 text-sm',
}

export const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
  ({ children, variant = 'soft', size = 'md', colorScheme = 'primary', className }, ref) => {
    return (
      <span
        ref={ref}
        className={cn(
          'inline-flex items-center font-medium rounded-full',
          colorSchemeStyles[colorScheme][variant],
          sizeStyles[size],
          className,
        )}
      >
        {children}
      </span>
    )
  },
)

Badge.displayName = 'Badge'
