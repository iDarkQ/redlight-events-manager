import { HeroSearchBar, HeroDescription, HeroTitle, styles } from ".";
import Wave from "~/assets/images/wave.svg?react";

export const Hero = () => (
  <>
    <section className={styles.wrapper}>
      <div className={styles.texts}>
        <HeroTitle />
        <HeroDescription />
      </div>
      <HeroSearchBar />
    </section>
    <Wave className={styles.wave} preserveAspectRatio="none" />
  </>
);
