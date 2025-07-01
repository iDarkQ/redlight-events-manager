import { useMemo } from "react";
import { styles, MapModel } from ".";
import { useEvent } from "~/providers/event";

export const Map = () => {
  const { selectedEvent } = useEvent();

  const center = useMemo(
    () =>
      selectedEvent?.longitude && selectedEvent?.latitude
        ? ([selectedEvent.longitude, selectedEvent.latitude] as [number, number])
        : undefined,
    [selectedEvent?.longitude, selectedEvent?.latitude],
  );

  return (
    <div className={styles.map}>
      {selectedEvent?.longitude && selectedEvent.latitude && (
        <MapModel center={center!} />
      )}
      <div className={styles.dimmed} />
    </div>
  );
};
