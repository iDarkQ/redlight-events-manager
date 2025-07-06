import { ReactNode } from "react";
import { styles } from ".";

interface ErrorMessageProps {
  children: ReactNode;
}

export const ErrorMessage = ({ children }: ErrorMessageProps) => <span className={styles.error}>{children}</span>;
