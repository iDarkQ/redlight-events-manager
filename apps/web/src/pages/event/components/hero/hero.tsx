import { HeroInformation, HeroTitle, styles } from ".";
import { HeroBackground } from "~/pages/event/components/hero/hero-background";
import { Actions } from "~/pages/event/components/hero/actions";
import { EventProps } from "~/pages/event";

export const Hero = ({ state }: EventProps) => (
  <section className={styles.wrapper}>
    {/* Background */}
    <HeroBackground />
    {/* Foreground Content */}
    <div className={styles.details}>
      <HeroTitle />
      <div className={styles.sub}>
        <HeroInformation />
        <Actions state={state} />
      </div>
    </div>
  </section>
);
