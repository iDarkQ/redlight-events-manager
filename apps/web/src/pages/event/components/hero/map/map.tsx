import { styles, MapModel } from ".";
import { useEvent } from "~/providers/event";

export const HeroEventMap = () => {
  const { event } = useEvent();

  return (
    <div className={styles.map}>
      {event?.longitude && event.latitude && (
        <MapModel center={[event?.longitude, event?.latitude]} />
      )}
      <div className={styles.dimmed} />
    </div>
  );
};
