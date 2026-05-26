import { useRef } from 'react'
import { useSwitch, useFocusRing, VisuallyHidden } from 'react-aria'
import { useToggleState } from 'react-stately'
import { cn } from '../../utils/cn'
import type { Size } from '../../types/common'

export interface SwitchProps {
  children?: React.ReactNode
  isSelected?: boolean
  defaultSelected?: boolean
  onChange?: (isSelected: boolean) => void
  isDisabled?: boolean
  size?: Extract<Size, 'sm' | 'md' | 'lg'>
  className?: string
}

const trackSizes: Record<string, string> = {
  sm: 'h-4 w-7',
  md: 'h-5 w-9',
  lg: 'h-6 w-11',
}

const thumbSizes: Record<string, string> = {
  sm: 'h-3 w-3',
  md: 'h-4 w-4',
  lg: 'h-5 w-5',
}

const thumbTranslate: Record<string, string> = {
  sm: 'translate-x-3',
  md: 'translate-x-4',
  lg: 'translate-x-5',
}

export function Switch({
  children,
  isSelected,
  defaultSelected,
  onChange,
  isDisabled = false,
  size = 'md',
  className,
}: SwitchProps) {
  const ref = useRef<HTMLInputElement>(null)
  const state = useToggleState({ isSelected, defaultSelected, onChange })
  const { inputProps } = useSwitch(
    { children, isDisabled, 'aria-label': typeof children === 'string' ? children : undefined },
    state,
    ref,
  )
  const { focusProps, isFocusVisible } = useFocusRing()

  return (
    <label
      className={cn(
        'inline-flex items-center gap-2 cursor-pointer',
        isDisabled && 'cursor-not-allowed opacity-50',
        className,
      )}
    >
      <VisuallyHidden>
        <input {...inputProps} {...focusProps} ref={ref} />
      </VisuallyHidden>
      <div
        className={cn(
          'relative inline-flex shrink-0 rounded-full transition-colors',
          trackSizes[size],
          state.isSelected ? 'bg-primary-600' : 'bg-secondary-200',
          isFocusVisible && 'ring-2 ring-ring ring-offset-2',
        )}
      >
        <span
          className={cn(
            'inline-block rounded-full bg-white shadow-xs transition-transform',
            thumbSizes[size],
            'absolute top-0.5 left-0.5',
            state.isSelected && thumbTranslate[size],
          )}
        />
      </div>
      {children && <span className="text-sm text-foreground">{children}</span>}
    </label>
  )
}
