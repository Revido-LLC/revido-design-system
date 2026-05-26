import { useRef, forwardRef, cloneElement } from 'react'
import { useOverlayTriggerState } from 'react-stately'
import {
  useOverlayTrigger,
  useDialog,
  useModalOverlay,
  useButton,
  FocusScope,
  OverlayContainer,
} from 'react-aria'
import { cn } from '../../utils/cn'

export interface DialogProps {
  trigger: React.ReactElement
  title: string
  children: React.ReactNode
  isDismissable?: boolean
  className?: string
}

export function Dialog({
  trigger,
  title,
  children,
  isDismissable = true,
  className,
}: DialogProps) {
  const state = useOverlayTriggerState({})
  const triggerRef = useRef<HTMLButtonElement>(null)
  const overlayRef = useRef<HTMLDivElement>(null)

  const { triggerProps, overlayProps } = useOverlayTrigger(
    { type: 'dialog' },
    state,
    triggerRef,
  )

  // Clone the trigger element and merge the trigger props so we avoid nested <button> elements.
  // We also map React Aria's `onPress` to `onClick` for compatibility with standard HTML elements.
  const { onPress, ...restTriggerProps } = triggerProps as typeof triggerProps & { onPress?: () => void }
  const clonedTrigger = cloneElement(trigger, {
    ...restTriggerProps,
    ref: triggerRef,
    onClick: (e: React.MouseEvent) => {
      // Call any existing onClick on the trigger
      if (typeof (trigger.props as { onClick?: (e: React.MouseEvent) => void }).onClick === 'function') {
        ;(trigger.props as { onClick: (e: React.MouseEvent) => void }).onClick(e)
      }
      state.toggle()
    },
  })

  return (
    <>
      {clonedTrigger}
      {state.isOpen && (
        <OverlayContainer>
          <DialogOverlay state={state} overlayRef={overlayRef} isDismissable={isDismissable}>
            <DialogContent
              {...overlayProps}
              ref={overlayRef}
              title={title}
              onClose={() => state.close()}
              className={className}
            >
              {children}
            </DialogContent>
          </DialogOverlay>
        </OverlayContainer>
      )}
    </>
  )
}

function DialogOverlay({
  state,
  overlayRef,
  isDismissable,
  children,
}: {
  state: ReturnType<typeof useOverlayTriggerState>
  overlayRef: React.RefObject<HTMLDivElement>
  isDismissable: boolean
  children: React.ReactNode
}) {
  const { modalProps, underlayProps } = useModalOverlay(
    { isDismissable },
    state,
    overlayRef,
  )

  return (
    <div
      {...underlayProps}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
    >
      <div {...modalProps}>{children}</div>
    </div>
  )
}

const DialogContent = forwardRef<
  HTMLDivElement,
  {
    title: string
    children: React.ReactNode
    onClose: () => void
    className?: string
  }
>(({ title, children, onClose, className, ...props }, ref) => {
  const { dialogProps, titleProps } = useDialog({ role: 'dialog' }, ref as React.RefObject<HTMLDivElement>)
  const closeRef = useRef<HTMLButtonElement>(null)
  const { buttonProps: closeButtonProps } = useButton({ onPress: onClose, 'aria-label': 'Close' }, closeRef)

  return (
    <FocusScope contain restoreFocus autoFocus>
      <div
        {...dialogProps}
        {...props}
        ref={ref}
        className={cn(
          'relative w-full max-w-lg rounded-xl bg-white p-6 shadow-xl',
          'border border-secondary-200',
          className,
        )}
      >
        <div className="flex items-center justify-between mb-4">
          <h2 {...titleProps} className="text-lg font-semibold text-foreground">
            {title}
          </h2>
          <button
            {...closeButtonProps}
            ref={closeRef}
            className="rounded-lg p-1 text-secondary-400 hover:text-secondary-600 hover:bg-secondary-50 transition-colors"
          >
            <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>
        {children}
      </div>
    </FocusScope>
  )
})

DialogContent.displayName = 'DialogContent'
