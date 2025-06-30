import { ButtonHTMLAttributes, ReactNode } from "react";
import { styles } from ".";
import clsx from "clsx";
import { Icon } from "~/components/icon";

interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  children: ReactNode;
  animation?: boolean;
}

export const IconButton = ({
  children,
  className,
  animation = true,
  ...props
}: IconButtonProps) => (
  <button
    className={clsx(styles.button, className && className)}
    {...props}
  >
    <Icon animation={animation}>{children}</Icon>
  </button>
);
