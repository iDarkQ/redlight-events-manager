import { ButtonHTMLAttributes, ReactNode, useState } from "react";
import { styles } from ".";
import clsx from "clsx";
import { LoadingIndicator } from "~/components/loading-indicator";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  children?: ReactNode;
  color?: "red" | "white";
  loading?: boolean;
  onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void | Promise<void>;
}

export const Button = ({
  className,
  children,
  color = "red",
  onClick,
  disabled,
  loading: loadingProp,
  ...props
}: ButtonProps) => {
  const [internalLoading, setInternalLoading] = useState(false);
  const loading = loadingProp ?? internalLoading;

  // HACK: Detect whether button onClick is happening and cause loading animation
  const handleClick = async (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    if (!onClick) return;
    const result = onClick(event);
    if (result instanceof Promise && loadingProp === undefined) {
      setInternalLoading(true);
      try {
        await result;
      } finally {
        setInternalLoading(false);
      }
    }
  };

  return (
    <button
      className={clsx(styles.button, styles[color], (loading || disabled) && styles.loading, className && className)}
      disabled={loading || disabled}
      onClick={handleClick}
      {...props}
    >
      {!loading && children}
      {loading && <LoadingIndicator />}
    </button>
  );
};