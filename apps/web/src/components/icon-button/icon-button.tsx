import { ButtonHTMLAttributes, ReactNode } from "react";
import { styles } from ".";
import clsx from "clsx";

interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  children: ReactNode;
  animation?: boolean;
}

export const IconButton = ({ children, className, animation = true, ...props }: IconButtonProps) => (
  <button className={clsx(styles.button, animation && styles.animation, className && className)} {...props}>{children}</button>
);
