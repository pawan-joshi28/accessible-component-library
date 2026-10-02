import { KeyboardEvent, ReactNode, useEffect, useId, useRef } from "react";
import { createPortal } from "react-dom";

export interface ModalProps {
  open: boolean;
  title: string;
  onClose: () => void;
  children: ReactNode;
}

const FOCUSABLE = 'a[href], button:not([disabled]), input:not([disabled]), select, textarea, [tabindex]:not([tabindex="-1"])';

// Dialog with focus trap, Escape to close, scroll lock and focus restoration.
export function Modal({ open, title, onClose, children }: ModalProps) {
  const titleId = useId();
  const dialogRef = useRef<HTMLDivElement>(null);
  const previous = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!open) return;
    previous.current = document.activeElement as HTMLElement | null;
    const overflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const first = dialogRef.current?.querySelector<HTMLElement>(FOCUSABLE);
    (first ?? dialogRef.current)?.focus();
    return () => {
      document.body.style.overflow = overflow;
      previous.current?.focus();
    };
  }, [open]);

  if (!open) return null;

  const onKeyDown = (e: KeyboardEvent) => {
    if (e.key === "Escape") {
      e.stopPropagation();
      onClose();
      return;
    }
    if (e.key !== "Tab") return;
    const nodes = dialogRef.current?.querySelectorAll<HTMLElement>(FOCUSABLE);
    if (!nodes || nodes.length === 0) return e.preventDefault();
    const first = nodes[0];
    const last = nodes[nodes.length - 1];
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  };

  return createPortal(
    <div className="ui-overlay" onMouseDown={(e) => e.target === e.currentTarget && onClose()}>
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        tabIndex={-1}
        className="ui-modal"
        onKeyDown={onKeyDown}
      >
        <h2 id={titleId}>{title}</h2>
        <button type="button" className="ui-close" aria-label="Close dialog" onClick={onClose}>×</button>
        {children}
      </div>
    </div>,
    document.body
  );
}
