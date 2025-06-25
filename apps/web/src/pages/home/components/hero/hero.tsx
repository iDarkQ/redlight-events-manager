import { HeroDescription } from "~/pages/home/components/hero/hero-description";
import { HeroTitle } from "~/pages/home/components/hero/hero-title";
import { HeroSearchBar, styles } from ".";
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
    <Wave
      className={styles.wave}
      style={{ width: "100%", height: "auto", display: "block" }}
      preserveAspectRatio="none"
    />
  </>
);
