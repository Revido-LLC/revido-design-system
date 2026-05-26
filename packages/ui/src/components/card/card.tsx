import { forwardRef } from 'react'
import { cn } from '../../utils/cn'

type CardVariant = 'elevated' | 'outline' | 'filled'

export interface CardProps {
  children: React.ReactNode
  variant?: CardVariant
  className?: string
}

const variantStyles: Record<CardVariant, string> = {
  elevated: 'bg-white shadow-md border border-secondary-100',
  outline: 'bg-white border border-secondary-200',
  filled: 'bg-secondary-50 border border-secondary-100',
}

const CardRoot = forwardRef<HTMLDivElement, CardProps>(
  ({ children, variant = 'outline', className }, ref) => (
    <div ref={ref} className={cn('rounded-xl overflow-hidden', variantStyles[variant], className)}>
      {children}
    </div>
  ),
)
CardRoot.displayName = 'Card'

const CardHeader = forwardRef<HTMLDivElement, { children: React.ReactNode; className?: string }>(
  ({ children, className }, ref) => (
    <div ref={ref} className={cn('px-6 pt-6', className)}>{children}</div>
  ),
)
CardHeader.displayName = 'Card.Header'

const CardTitle = forwardRef<HTMLHeadingElement, { children: React.ReactNode; className?: string }>(
  ({ children, className }, ref) => (
    <h3 ref={ref} className={cn('text-lg font-semibold text-foreground', className)}>{children}</h3>
  ),
)
CardTitle.displayName = 'Card.Title'

const CardDescription = forwardRef<HTMLParagraphElement, { children: React.ReactNode; className?: string }>(
  ({ children, className }, ref) => (
    <p ref={ref} className={cn('text-sm text-muted-foreground mt-1', className)}>{children}</p>
  ),
)
CardDescription.displayName = 'Card.Description'

const CardBody = forwardRef<HTMLDivElement, { children: React.ReactNode; className?: string }>(
  ({ children, className }, ref) => (
    <div ref={ref} className={cn('px-6 py-4', className)}>{children}</div>
  ),
)
CardBody.displayName = 'Card.Body'

const CardFooter = forwardRef<HTMLDivElement, { children: React.ReactNode; className?: string }>(
  ({ children, className }, ref) => (
    <div ref={ref} className={cn('px-6 pb-6 pt-0 flex items-center gap-2', className)}>{children}</div>
  ),
)
CardFooter.displayName = 'Card.Footer'

export const Card = Object.assign(CardRoot, {
  Header: CardHeader,
  Title: CardTitle,
  Description: CardDescription,
  Body: CardBody,
  Footer: CardFooter,
})
