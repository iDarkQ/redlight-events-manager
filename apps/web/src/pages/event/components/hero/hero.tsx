import { HeroActions, HeroInformation, HeroTitle, styles } from ".";
import { EventProps } from "~/pages/event/event";
import { HeroBackground } from "~/pages/event/components/hero/hero-background";

export const Hero = ({ state }: EventProps) => (
  <section className={styles.wrapper}>
    {/* Background */}
    <HeroBackground />
    {/* Foreground Content */}
    <div className={styles.details}>
      <HeroTitle />
      <div className={styles.sub}>
        <HeroInformation />
        <HeroActions state={state}/>
      </div>
    </div>
  </section>
);
