import { styles } from ".";

interface FormTitleProps {
  signingUp: boolean;
}

export const FormTitle = ({ signingUp }: FormTitleProps) => (
  <h1 className={styles.title}>{signingUp ? "Sign Up" : "Sign In"}</h1>
);
