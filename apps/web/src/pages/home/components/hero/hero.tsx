import { HeroDescription } from "~/pages/home/components/hero/hero-description";
import { HeroTitle } from "~/pages/home/components/hero/hero-title";
import { HeroSearchBar, styles } from ".";

export const Hero = () => (
  <section className={styles.wrapper}>
    <div className={styles.texts}>
      <HeroTitle />
      <HeroDescription />
    </div>
    <HeroSearchBar />
  </section>
);
