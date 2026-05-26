import { forwardRef } from 'react'
import { useSeparator } from 'react-aria'
import { cn } from '../../utils/cn'

export interface SeparatorProps {
  orientation?: 'horizontal' | 'vertical'
  className?: string
}

export const Separator = forwardRef<HTMLDivElement, SeparatorProps>(
  ({ orientation = 'horizontal', className }, ref) => {
    const { separatorProps } = useSeparator({ orientation })

    return (
      <div
        {...separatorProps}
        ref={ref}
        className={cn(
          'shrink-0 bg-border',
          orientation === 'horizontal' ? 'h-px w-full' : 'w-px h-full',
          className,
        )}
      />
    )
  },
)

Separator.displayName = 'Separator'
