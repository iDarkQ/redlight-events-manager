import { useCallback, useEffect, useImperativeHandle, useRef } from "react";
import mapboxgl from "mapbox-gl";
import MapboxDraw from "@mapbox/mapbox-gl-draw";
import {
  FilterFormMapProps,
  FilterFormMapRef,
} from "~/pages/home/components/hero/filter-form/filter-form-map";

export const useFilterFormMap = (
  { updateArea }: FilterFormMapProps,
  ref: React.ForwardedRef<FilterFormMapRef>,
) => {
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<mapboxgl.Map | null>(null);
  const drawRef = useRef<MapboxDraw | null>(null);

  const resizeObserverRef = useRef<ResizeObserver | null>(null);

  const handleResize = useCallback(() => {
    if (mapRef.current && mapContainerRef.current) {
      setTimeout(() => {
        mapRef.current?.resize();
      }, 100);
    }
  }, []);

  useImperativeHandle(ref, () => ({
    clearDraw: () => {
      drawRef.current?.trash();
    },
  }));

  useEffect(() => {
    if (!mapContainerRef.current) return;

    mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_PUBLIC_TOKEN;

    mapRef.current = new mapboxgl.Map({
      container: mapContainerRef.current as HTMLElement,
      center: [-8.430974, 40.208846],
      style: "mapbox://styles/mapbox/standard-satellite",
      zoom: 16.5,
      antialias: true,
    });

    const draw = new MapboxDraw({
      displayControlsDefault: false,
      controls: {
        polygon: true,
        trash: true,
      },
      defaultMode: "draw_polygon",
    });
    mapRef.current.addControl(draw);
    drawRef.current = draw;

    const handleDrawChange = () => {
      const data = draw.getAll();
      if (data.features.length > 0) {
        const firstFeature = data.features[0];
        if (firstFeature.geometry.type === "Polygon") {
          updateArea(firstFeature.geometry.coordinates);
        }
      } else {
        updateArea([]);
      }
    };

    mapRef.current.on("draw.create", handleDrawChange);
    mapRef.current.on("draw.delete", handleDrawChange);
    mapRef.current.on("draw.update", handleDrawChange);

    mapRef.current.on("load", () => {
      setTimeout(() => {
        mapRef.current?.resize();
      }, 200);
    });

    if (window.ResizeObserver) {
      resizeObserverRef.current = new ResizeObserver(() => {
        handleResize();
      });
      resizeObserverRef.current.observe(mapContainerRef.current);
    }

    window.addEventListener("resize", handleResize);

    const initialResizeTimeout = setTimeout(() => {
      mapRef.current?.resize();
    }, 300);

    return () => {
      if (resizeObserverRef.current) {
        resizeObserverRef.current.disconnect();
      }
      window.removeEventListener("resize", handleResize);
      clearTimeout(initialResizeTimeout);
      mapRef.current?.remove();
    };
  }, [handleResize, updateArea]);

  return { mapContainerRef };
};
