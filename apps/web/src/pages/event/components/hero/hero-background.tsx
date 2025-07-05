import { useEvent } from "~/providers/event";
import { Map } from "./map";
import { baseUrl } from "~/utils/url";
import { styles } from ".";

export const HeroBackground = () => {
  const { selectedEvent } = useEvent();

  return selectedEvent?.banner ? (
    <div className={styles.background}>
      <img className={styles.image} src={baseUrl + "/" + selectedEvent.banner} />
      <div className={styles.dimmed} />
    </div>
  ) : (
    <Map />
  );
};
