import { InputHTMLAttributes } from "react";
import { styles } from ".";
import clsx from "clsx";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  className?: string;
  type?: string;
  placeholder?: string;
}

export const Input = ({
  className,
  type = "text",
  placeholder = "Search event",
  ...props
}: InputProps) => (
  <input
    className={clsx(styles.input, className && className)}
    type={type}
    placeholder={placeholder}
    {...props}
  />
);
