import { forwardRef } from 'react'
import { cn } from '../../utils/cn'

type HeadingLevel = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
type HeadingSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl'

export interface HeadingProps {
  children: React.ReactNode
  as?: HeadingLevel
  size?: HeadingSize
  className?: string
}

const sizeStyles: Record<HeadingSize, string> = {
  xs: 'text-xs', sm: 'text-sm', md: 'text-md', lg: 'text-lg',
  xl: 'text-xl', '2xl': 'text-2xl', '3xl': 'text-3xl', '4xl': 'text-4xl',
}

const defaultSizeForLevel: Record<HeadingLevel, HeadingSize> = {
  h1: '4xl', h2: '3xl', h3: '2xl', h4: 'xl', h5: 'lg', h6: 'md',
}

export const Heading = forwardRef<HTMLHeadingElement, HeadingProps>(
  ({ children, as = 'h2', size, className }, ref) => {
    const Tag = as
    const resolvedSize = size ?? defaultSizeForLevel[as]
    return (
      <Tag ref={ref} className={cn('font-semibold tracking-tight text-foreground', sizeStyles[resolvedSize], className)}>
        {children}
      </Tag>
    )
  },
)
Heading.displayName = 'Heading'
