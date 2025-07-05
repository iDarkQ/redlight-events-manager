import { styles } from ".";
import { LoginForm } from "./login-form";

export const Hero = () => (
  <section className={styles.section}>
    <div className={styles.form}>
      <LoginForm />
    </div>
  </section>
);
