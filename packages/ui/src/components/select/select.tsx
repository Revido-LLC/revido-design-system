import { useRef } from 'react'
import type { Key } from 'react-aria'
import { useSelectState, Item } from 'react-stately'
import {
  useSelect,
  useButton,
  useListBox,
  useOption,
  HiddenSelect,
  useFocusRing,
  mergeProps,
  useOverlayPosition,
} from 'react-aria'
import { cn } from '../../utils/cn'
import type { Size } from '../../types/common'

export interface SelectItem {
  key: string
  label: string
}

export interface SelectProps {
  label: string
  items: SelectItem[]
  placeholder?: string
  selectedKey?: string
  onSelectionChange?: (key: string) => void
  isDisabled?: boolean
  isRequired?: boolean
  errorMessage?: string
  isInvalid?: boolean
  size?: Size
  className?: string
}

const sizeStyles: Record<Size, string> = {
  xs: 'h-8 px-2.5 text-xs',
  sm: 'h-9 px-3 text-sm',
  md: 'h-10 px-3.5 text-sm',
  lg: 'h-11 px-4 text-md',
  xl: 'h-12 px-4 text-md',
}

export function Select({
  label,
  items,
  placeholder = 'Select an option',
  selectedKey,
  onSelectionChange,
  isDisabled = false,
  isRequired = false,
  errorMessage,
  isInvalid = false,
  size = 'md',
  className,
}: SelectProps) {
  const triggerRef = useRef<HTMLButtonElement>(null)
  const listBoxRef = useRef<HTMLUListElement>(null)
  const overlayRef = useRef<HTMLDivElement>(null)

  const state = useSelectState({
    children: (item: SelectItem) => <Item key={item.key}>{item.label}</Item>,
    items,
    selectedKey,
    onSelectionChange: onSelectionChange as ((key: Key) => void) | undefined,
    isDisabled,
    isRequired,
  })

  const { labelProps, triggerProps, valueProps, menuProps } = useSelect(
    {
      label,
      isDisabled,
      isRequired,
      children: (item: SelectItem) => <Item key={item.key}>{item.label}</Item>,
      items,
    },
    state,
    triggerRef,
  )

  const { buttonProps } = useButton(triggerProps, triggerRef)
  const { focusProps, isFocusVisible } = useFocusRing()

  const { overlayProps: positionProps } = useOverlayPosition({
    targetRef: triggerRef,
    overlayRef,
    placement: 'bottom start',
    offset: 4,
    isOpen: state.isOpen,
  })

  return (
    <div className={cn('flex flex-col gap-1.5', className)}>
      <label {...labelProps} className="text-sm font-medium text-foreground">
        {label}
        {isRequired && <span className="text-destructive-500 ml-0.5">*</span>}
      </label>
      <HiddenSelect state={state} triggerRef={triggerRef} label={label} />
      <button
        {...mergeProps(buttonProps, focusProps)}
        ref={triggerRef}
        className={cn(
          'w-full rounded-lg border bg-white text-left flex items-center justify-between',
          'transition-colors',
          'disabled:cursor-not-allowed disabled:opacity-50',
          isFocusVisible && 'outline-none ring-2 ring-ring',
          isInvalid ? 'border-destructive-300' : 'border-secondary-300',
          sizeStyles[size],
        )}
      >
        <span {...valueProps} className={cn(!state.selectedItem && 'text-muted-foreground')}>
          {state.selectedItem ? state.selectedItem.rendered : placeholder}
        </span>
        <svg className="h-4 w-4 text-secondary-400" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
        </svg>
      </button>
      {state.isOpen && (
        <div {...positionProps} ref={overlayRef} className="z-50">
          <ListBox {...menuProps} state={state} listBoxRef={listBoxRef} />
        </div>
      )}
      {isInvalid && errorMessage && (
        <p className="text-sm text-destructive-500">{errorMessage}</p>
      )}
    </div>
  )
}

function ListBox({
  state,
  listBoxRef,
  ...props
}: {
  state: ReturnType<typeof useSelectState>
  listBoxRef: React.RefObject<HTMLUListElement>
} & Record<string, unknown>) {
  const { listBoxProps } = useListBox(props, state, listBoxRef)

  return (
    <ul
      {...listBoxProps}
      ref={listBoxRef}
      className="w-full mt-1 rounded-lg border border-secondary-200 bg-white shadow-lg py-1 max-h-60 overflow-auto"
    >
      {[...state.collection].map((item) => (
        <Option key={item.key} item={item} state={state} />
      ))}
    </ul>
  )
}

function Option({ item, state }: { item: any; state: ReturnType<typeof useSelectState> }) {
  const ref = useRef<HTMLLIElement>(null)
  const { optionProps, isSelected, isFocused } = useOption({ key: item.key }, state, ref)

  return (
    <li
      {...optionProps}
      ref={ref}
      className={cn(
        'px-3.5 py-2 text-sm cursor-pointer outline-none',
        isFocused && 'bg-secondary-50',
        isSelected && 'text-primary-600 font-medium',
        !isSelected && 'text-foreground',
      )}
    >
      {item.rendered}
    </li>
  )
}
