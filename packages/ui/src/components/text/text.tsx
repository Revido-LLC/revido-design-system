import { forwardRef } from 'react'
import { cn } from '../../utils/cn'

type TextElement = 'p' | 'span' | 'div' | 'label'
type TextSize = 'xs' | 'sm' | 'md' | 'lg'
type TextColor = 'default' | 'muted' | 'destructive' | 'success'

export interface TextProps {
  children: React.ReactNode
  as?: TextElement
  size?: TextSize
  color?: TextColor
  weight?: 'normal' | 'medium' | 'semibold' | 'bold'
  className?: string
}

const sizeStyles: Record<TextSize, string> = {
  xs: 'text-xs', sm: 'text-sm', md: 'text-md', lg: 'text-lg',
}

const colorStyles: Record<TextColor, string> = {
  default: 'text-foreground',
  muted: 'text-muted-foreground',
  destructive: 'text-destructive-500',
  success: 'text-success-600',
}

const weightStyles: Record<string, string> = {
  normal: 'font-normal', medium: 'font-medium', semibold: 'font-semibold', bold: 'font-bold',
}

export const Text = forwardRef<HTMLElement, TextProps>(
  ({ children, as = 'p', size = 'md', color = 'default', weight = 'normal', className }, ref) => {
    const Tag = as as keyof JSX.IntrinsicElements
    return (
      <Tag ref={ref as any} className={cn(sizeStyles[size], colorStyles[color], weightStyles[weight], className)}>
        {children}
      </Tag>
    )
  },
)
Text.displayName = 'Text'
