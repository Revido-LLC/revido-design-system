import { useRef, cloneElement, forwardRef } from 'react'
import { useTooltipTriggerState } from 'react-stately'
import { useTooltipTrigger, useTooltip, useOverlayPosition } from 'react-aria'
import { cn } from '../../utils/cn'

export interface TooltipProps {
  children: React.ReactElement
  content: React.ReactNode
  placement?: 'top' | 'bottom' | 'left' | 'right'
  delay?: number
  className?: string
}

export function Tooltip({
  children,
  content,
  placement = 'top',
  delay = 300,
  className,
}: TooltipProps) {
  const state = useTooltipTriggerState({ delay })
  const triggerRef = useRef<HTMLElement>(null)
  const overlayRef = useRef<HTMLDivElement>(null)

  const { triggerProps, tooltipProps: triggerTooltipProps } = useTooltipTrigger(
    { delay },
    state,
    triggerRef,
  )

  const { overlayProps: positionProps } = useOverlayPosition({
    targetRef: triggerRef,
    overlayRef,
    placement,
    offset: 8,
    isOpen: state.isOpen,
  })

  return (
    <>
      {cloneElement(children, { ...triggerProps, ref: triggerRef })}
      {state.isOpen && (
        <TooltipContent
          ref={overlayRef}
          state={state}
          style={positionProps.style}
          className={className}
          {...triggerTooltipProps}
        >
          {content}
        </TooltipContent>
      )}
    </>
  )
}

const TooltipContent = forwardRef<
  HTMLDivElement,
  {
    state: ReturnType<typeof useTooltipTriggerState>
    children: React.ReactNode
    className?: string
    style?: React.CSSProperties
  }
>(({ state, children, className, style, ...props }, ref) => {
  const { tooltipProps } = useTooltip(props, state)

  return (
    <div
      {...tooltipProps}
      ref={ref}
      style={style}
      className={cn(
        'z-50 rounded-lg bg-secondary-900 px-3 py-1.5 text-xs text-white shadow-lg',
        className,
      )}
    >
      {children}
    </div>
  )
})

TooltipContent.displayName = 'TooltipContent'
