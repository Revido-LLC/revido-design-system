import { useRef } from 'react'
import { useCheckbox, useFocusRing, mergeProps, VisuallyHidden } from 'react-aria'
import { useToggleState } from 'react-stately'
import { cn } from '../../utils/cn'

export interface CheckboxProps {
  children: React.ReactNode
  isSelected?: boolean
  defaultSelected?: boolean
  onChange?: (isSelected: boolean) => void
  isDisabled?: boolean
  isIndeterminate?: boolean
  value?: string
  className?: string
}

export function Checkbox({
  children,
  isSelected,
  defaultSelected,
  onChange,
  isDisabled = false,
  isIndeterminate = false,
  value,
  className,
}: CheckboxProps) {
  const ref = useRef<HTMLInputElement>(null)
  const state = useToggleState({ isSelected, defaultSelected, onChange })
  const { inputProps } = useCheckbox(
    { children, isDisabled, isIndeterminate, value, 'aria-label': typeof children === 'string' ? children : undefined },
    state,
    ref,
  )
  const { focusProps, isFocusVisible } = useFocusRing()

  const isChecked = state.isSelected

  return (
    <label
      className={cn(
        'inline-flex items-center gap-2 cursor-pointer',
        isDisabled && 'cursor-not-allowed opacity-50',
        className,
      )}
    >
      <VisuallyHidden>
        <input {...mergeProps(inputProps, focusProps)} ref={ref} />
      </VisuallyHidden>
      <div
        className={cn(
          'h-4 w-4 rounded border-2 flex items-center justify-center transition-colors',
          isChecked || isIndeterminate
            ? 'bg-primary-600 border-primary-600'
            : 'border-secondary-300 bg-white',
          isFocusVisible && 'ring-2 ring-ring ring-offset-2',
        )}
      >
        {isChecked && (
          <svg viewBox="0 0 12 10" className="h-3 w-3 text-white" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="1.5 6 4.5 9 10.5 1" />
          </svg>
        )}
        {isIndeterminate && !isChecked && (
          <div className="h-0.5 w-2.5 bg-white rounded-full" />
        )}
      </div>
      <span className="text-sm text-foreground">{children}</span>
    </label>
  )
}
