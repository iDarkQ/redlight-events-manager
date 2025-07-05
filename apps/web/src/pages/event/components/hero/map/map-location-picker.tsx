import { styles } from ".";
import { useMapLocationPicker } from "~/pages/event/components/hero/map/use-map-location-picker";

export interface MapLocationPickerProps {
  initialCenter?: [number, number];
  initialZoom?: number;
  onLocationSelect: (lngLat: { lng: number; lat: number }) => void;
}

export const MapLocationPicker = ({
  initialCenter = [-8.430937, 40.208858],
  initialZoom = 17,
  onLocationSelect,
}: MapLocationPickerProps) => {
  const { mapContainer } = useMapLocationPicker({ initialCenter, initialZoom, onLocationSelect });

  return (
    <div className={styles.wrapper}>
      <div ref={mapContainer} className={styles.picker} />
    </div>
  );
};
