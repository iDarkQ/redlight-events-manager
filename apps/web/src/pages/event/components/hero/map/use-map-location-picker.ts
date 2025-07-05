import { MapLocationPickerProps } from "~/pages/event/components/hero/map/map-location-picker";
import { useEffect, useRef, useCallback } from "react";
import mapboxgl, { Map, Marker } from "mapbox-gl";

export const useMapLocationPicker = ({ initialCenter, initialZoom, onLocationSelect }: MapLocationPickerProps) => {
    const mapContainer = useRef<HTMLDivElement>(null);
    const mapRef = useRef<Map | null>(null);
    const markerRef = useRef<Marker | null>(null);
    const resizeObserverRef = useRef<ResizeObserver | null>(null);

    const handleResize = useCallback(() => {
        if (mapRef.current && mapContainer.current) {
            setTimeout(() => {
                mapRef.current?.resize();
            }, 100);
        }
    }, []);

    useEffect(() => {
        mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_PUBLIC_TOKEN;
        if (!mapContainer.current) return;

        const container = mapContainer.current;

        const map = new mapboxgl.Map({
            container: container,
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


        map.on("load", () => {
            setTimeout(() => {
                map.resize();
            }, 200);
        });

        if (window.ResizeObserver) {
            resizeObserverRef.current = new ResizeObserver(() => {
                handleResize();
            });
            resizeObserverRef.current.observe(container);
        }

        window.addEventListener('resize', handleResize);

        const initialResizeTimeout = setTimeout(() => {
            map.resize();
        }, 300);

        return () => {
            if (resizeObserverRef.current) {
                resizeObserverRef.current.disconnect();
            }
            window.removeEventListener('resize', handleResize);
            clearTimeout(initialResizeTimeout);
            map.remove();
        };
    }, [handleResize]);

    return { mapContainer };
}