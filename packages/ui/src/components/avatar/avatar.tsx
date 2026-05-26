import { forwardRef, useState } from 'react'
import { cn } from '../../utils/cn'
import type { Size } from '../../types/common'

export interface AvatarProps {
  src?: string
  alt: string
  size?: Size
  className?: string
}

const sizeStyles: Record<Size, string> = {
  xs: 'h-6 w-6 text-xs',
  sm: 'h-8 w-8 text-xs',
  md: 'h-10 w-10 text-sm',
  lg: 'h-12 w-12 text-md',
  xl: 'h-14 w-14 text-lg',
}

function getInitials(name: string): string {
  const parts = name.trim().split(/\s+/)
  if (parts.length === 1) return parts[0][0].toUpperCase()
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase()
}

export const Avatar = forwardRef<HTMLDivElement, AvatarProps>(
  ({ src, alt, size = 'md', className }, ref) => {
    const [imgError, setImgError] = useState(false)
    const showImage = src && !imgError

    return (
      <div
        ref={ref}
        className={cn(
          'relative inline-flex items-center justify-center rounded-full bg-secondary-100 overflow-hidden',
          sizeStyles[size],
          className,
        )}
      >
        {showImage ? (
          <img src={src} alt={alt} className="h-full w-full object-cover" onError={() => setImgError(true)} />
        ) : (
          <span className="font-medium text-secondary-600">{getInitials(alt)}</span>
        )}
      </div>
    )
  },
)

Avatar.displayName = 'Avatar'
