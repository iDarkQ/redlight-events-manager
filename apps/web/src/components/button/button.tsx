import { ButtonHTMLAttributes, ReactNode } from "react";
import { styles } from ".";
import clsx from "clsx";
import { LoadingIndicator } from "~/components/loading-indicator";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  children?: ReactNode;
  loading?: boolean;
  color?: "red" | "white";
}

export const Button = ({
  className,
  children,
  color = "red",
  loading = false,
  ...props
}: ButtonProps) => (
  <button
    className={clsx(styles.button, styles[color], loading && styles.loading, className && className)}
    disabled={loading || props.disabled}
    {...props}
  >
    {!loading && children}
    {loading && <LoadingIndicator />}
  </button>
);
