import { HTMLAttributes, ReactNode } from "react";
import { styles } from ".";
import clsx from "clsx";

interface TooltipProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  children: ReactNode;
  title?: string;
}

export const Tooltip = ({ children, className, title = "Tooltip text" }: TooltipProps) => (
  <div className={clsx(styles.tooltip, className && className)}>
    {children}
    <span className={styles.text}>{title}</span>
  </div>
);
