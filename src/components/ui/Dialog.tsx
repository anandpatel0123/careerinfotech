import { useEffect, useRef, type ReactNode } from 'react';
import { X } from 'lucide-react';

interface DialogProps {
  open: boolean;
  onClose: () => void;
  labelledBy: string;
  className?: string;
  children: ReactNode;
}

/**
 * Wraps the native <dialog>, which supplies the focus trap, inert background,
 * Escape handling and focus restoration without any extra code.
 */
export function Dialog({ open, onClose, labelledBy, className = '', children }: DialogProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const pressStartedOnBackdrop = useRef(false);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (open && !dialog.open) {
      dialog.showModal();
      // Touch devices skip input focus, so the keyboard does not cover the form on open.
      const hasFinePointer = window.matchMedia('(pointer: fine)').matches;
      dialog
        .querySelector<HTMLElement>(
          hasFinePointer ? '[data-initial-focus], [data-initial-focus-desktop]' : '[data-initial-focus]',
        )
        ?.focus();
    } else if (!open && dialog.open) {
      dialog.close();
    }
  }, [open]);

  return (
    <dialog
      ref={dialogRef}
      className="dialog"
      aria-labelledby={labelledBy}
      onCancel={(event) => {
        event.preventDefault();
        onClose();
      }}
      // Checking the press as well as the click stops a text selection dragged
      // out of the form from closing the dialog and losing what was typed.
      onPointerDown={(event) => {
        pressStartedOnBackdrop.current = event.target === event.currentTarget;
      }}
      onClick={(event) => {
        if (event.target === event.currentTarget && pressStartedOnBackdrop.current) onClose();
      }}
    >
      {open && (
        <div className={`dialog__panel ${className}`}>
          <button type="button" className="dialog__close" onClick={onClose} aria-label="Close">
            <X aria-hidden="true" size={22} />
          </button>
          {children}
        </div>
      )}
    </dialog>
  );
}
