import { HTMLAttributes, ReactNode } from "react";
import { styles } from ".";
import clsx from "clsx";

interface IconProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  children: ReactNode;
  animation?: boolean;
}

export const Icon = ({ children, className, animation = true, ...props }: IconProps) => (
  <div className={clsx(animation && styles.animation, className && className)} {...props}>{children}</div>
);
