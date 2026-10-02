import { ButtonHTMLAttributes, forwardRef } from "react";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "danger";
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  { variant = "primary", type = "button", className = "", ...rest },
  ref
) {
  return <button ref={ref} type={type} className={`ui-btn ui-btn--${variant} ${className}`.trim()} {...rest} />;
});
