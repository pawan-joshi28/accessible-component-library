import { InputHTMLAttributes, forwardRef, useId } from "react";

export interface TextFieldProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "size"> {
  label: string;
  hint?: string;
  error?: string;
}

export const TextField = forwardRef<HTMLInputElement, TextFieldProps>(function TextField(
  { label, hint, error, id, className = "", ...rest },
  ref
) {
  const auto = useId();
  const inputId = id ?? auto;
  const hintId = hint ? `${inputId}-hint` : undefined;
  const errId = error ? `${inputId}-err` : undefined;
  const describedBy = [hintId, errId].filter(Boolean).join(" ") || undefined;

  return (
    <div className="ui-field">
      <label htmlFor={inputId} className="ui-label">{label}</label>
      {hint && <span id={hintId} className="ui-hint">{hint}</span>}
      <input
        ref={ref}
        id={inputId}
        className={`ui-input ${className}`.trim()}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy}
        {...rest}
      />
      {error && <span id={errId} className="ui-error" role="alert">{error}</span>}
    </div>
  );
});
