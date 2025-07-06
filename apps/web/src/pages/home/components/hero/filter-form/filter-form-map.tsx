import { forwardRef } from "react";

import "mapbox-gl/dist/mapbox-gl.css";
import "@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css";
import { useFilterFormMap, styles } from ".";

export interface FilterFormMapProps {
  updateArea: (geometry: number[][][]) => void;
}

export interface FilterFormMapRef {
  clearDraw: () => void;
}

export const FilterFormMap = forwardRef<FilterFormMapRef, FilterFormMapProps>(
  ({ updateArea }: FilterFormMapProps, ref) => {
    const { mapContainerRef } = useFilterFormMap({ updateArea }, ref);

    return <div ref={mapContainerRef} className={styles.map}></div>;
  },
);
