import { ReactNode } from "react";
import { styles } from ".";
import clsx from "clsx";

interface IconButtonProps {
  className?: string;
  children: ReactNode;
}

export const IconButton = ({ children, className }: IconButtonProps) => (
  <button className={clsx(styles.button, className && className)}>{children}</button>
);
