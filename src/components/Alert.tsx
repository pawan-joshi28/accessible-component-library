import { ReactNode } from "react";

export interface AlertProps {
  tone?: "info" | "success" | "error";
  children: ReactNode;
}

export function Alert({ tone = "info", children }: AlertProps) {
  return (
    <div role={tone === "error" ? "alert" : "status"} className={`ui-alert ui-alert--${tone}`}>
      {children}
    </div>
  );
}
