import React, { useEffect, useRef } from "react";
import mapboxgl, { Map, Marker } from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

interface MapLocationPickerProps {
  initialCenter?: [number, number];
  initialZoom?: number;
  onLocationSelect: (lngLat: { lng: number; lat: number }) => void;
}

export const MapLocationPicker = ({
  initialCenter = [0, 0],
  initialZoom = 2,
  onLocationSelect,
}: MapLocationPickerProps) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const mapRef = useRef<Map | null>(null);
  const markerRef = useRef<Marker | null>(null);

  useEffect(() => {
    mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_SECRET;
    if (!mapContainer.current) return;

    const map = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/standard",
      center: initialCenter,
      zoom: initialZoom,
    });
    mapRef.current = map;

    map.addControl(new mapboxgl.NavigationControl());

    if (initialCenter && (initialCenter[0] !== 0 || initialCenter[1] !== 0)) {
      markerRef.current = new mapboxgl.Marker().setLngLat(initialCenter).addTo(map);
    }

    map.on("click", (e) => {
      const coords = e.lngLat;
      if (!markerRef.current) {
        markerRef.current = new mapboxgl.Marker().setLngLat(coords).addTo(map);
      } else {
        markerRef.current.setLngLat(coords);
      }
      onLocationSelect({ lng: coords.lng, lat: coords.lat });
    });

    return () => {
      map.remove();
    };
  }, []);

  return (
    <div ref={mapContainer} style={{ width: "100%", height: "400px", position: "relative" }} />
  );
};
