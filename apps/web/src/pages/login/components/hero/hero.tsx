import { HeroForm } from "~/pages/login/components/hero/hero-form";
import { styles } from ".";

export const Hero = () => (
  <section className={styles.section}>
    <div className={styles.form}>
      <HeroForm />
    </div>
  </section>
);
