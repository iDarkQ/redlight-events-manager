import "mapbox-gl/dist/mapbox-gl.css";

import { styles } from ".";
import React from "react";
import { useMapModel } from "~/pages/event/components/hero/map/use-map-model";

export interface MapModelProps {
  center: [number, number];
}

export const MapModel = React.memo(({ center }: MapModelProps) => {
  const { mapContainerRef } = useMapModel({ center });
  return <div ref={mapContainerRef} className={styles.model} />;
});
