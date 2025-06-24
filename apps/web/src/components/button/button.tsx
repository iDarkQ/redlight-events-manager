import { HTMLAttributes, ReactNode } from "react";
import { styles } from ".";
import clsx from "clsx";

interface ButtonProps extends HTMLAttributes<HTMLButtonElement> {
  className?: string;
  children?: ReactNode;
}

export const Button = ({ className, children, ...props }: ButtonProps) => (
  <button className={clsx(styles.button, className && className)} {...props}>
    {children}
  </button>
);
