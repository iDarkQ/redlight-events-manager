import { styles } from ".";

interface LoginFormTitleProps {
  signingUp: boolean;
}

export const LoginFormTitle = ({ signingUp }: LoginFormTitleProps) => (
  <h1 className={styles.title}>{signingUp ? "Sign Up" : "Sign In"}</h1>
);
