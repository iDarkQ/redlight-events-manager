import { useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";


import { styles } from ".";

interface MapModelProps {
  center: [number, number];
}

export const MapModel = ({ center }: MapModelProps) => {
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<mapboxgl.Map | null>(null);
  const animationFrameRef = useRef<number | null>(null);

  useEffect(() => {
    mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_SECRET;

    mapRef.current = new mapboxgl.Map({
      style: "mapbox://styles/mapbox/standard",
      center: center,
      zoom: 16.5,
      pitch: 45,
      bearing: -17.6,
      container: mapContainerRef.current!,
      antialias: true,
    });

    mapRef.current.on("style.load", () => {
      const layers = mapRef.current!.getStyle().layers!;
      const labelLayer = layers.find(
        (l) =>
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          l.type === "symbol" && (l as any).layout["text-field"],
      );
      if (labelLayer) {
        mapRef.current!.addLayer(
          {
            id: "add-3d-buildings",
            source: "composite",
            "source-layer": "building",
            filter: ["==", "extrude", "true"],
            type: "fill-extrusion",
            minzoom: 15,
            paint: {
              "fill-extrusion-color": "#aaa",
              "fill-extrusion-height": [
                "interpolate",
                ["linear"],
                ["zoom"],
                15,
                0,
                15.05,
                ["get", "height"],
              ],
              "fill-extrusion-base": [
                "interpolate",
                ["linear"],
                ["zoom"],
                15,
                0,
                15.05,
                ["get", "min_height"],
              ],
              "fill-extrusion-opacity": 0.6,
            },
          },
          labelLayer.id,
        );
      }

      new mapboxgl.Marker({ color: "red" }).setLngLat(center).addTo(mapRef.current!);
    });

    // Rotation loop
    const rotateCamera = (timestamp?: number) => {
      if (!mapRef.current) return;

      mapRef.current.rotateTo(((timestamp ?? 0) / 100) % 360, { duration: 0 });
      animationFrameRef.current = requestAnimationFrame(rotateCamera);
    };

    animationFrameRef.current = requestAnimationFrame(rotateCamera);

    return () => {
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
      mapRef.current?.remove();
    };
  }, [center]);

  return <div id="map" ref={mapContainerRef} className={styles.model} />;
};
