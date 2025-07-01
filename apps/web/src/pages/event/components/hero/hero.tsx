import { Map } from "./map";
import { HeroActions, HeroInformation, HeroTitle, styles } from ".";
import { EventProps } from "~/pages/event/event";

export const Hero = ({ state }: EventProps) => (
  <section className={styles.wrapper}>
    {/* Background Map */}
    <Map />
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
