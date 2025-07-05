import { EventProps } from "~/pages/event/event";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useEvent as useEventProvider } from "~/providers/event";
import { useUser } from "~/providers/user";
const alreadyLoadedIds = new Set<string>();

export const useEvent = ({ state }: EventProps) => {
  const { id } = useParams<{ id: string }>();
  const { setSelectedEvent, selectedEvent, events } = useEventProvider();
  const { user } = useUser();
  const [showLoader, setShowLoader] = useState(true);

  useEffect(() => {
    if (!id) return;
    if (state === "create" || alreadyLoadedIds.has(id)) {
      setShowLoader(false);
    } else {
      setShowLoader(true);
    }
  }, [id, state]);

  useEffect(() => {
    if (!id) return;
    const event = events.find((e) => e.id === id);
    if (!event) return;
    if (state === "edit" && event.creatorId !== user!.id && user!.role !== "ADMIN") {
      return;
    }
    setSelectedEvent(event);
  }, [id, events, state, setSelectedEvent, user]);

  useEffect(() => {
    if (state === "create" || !selectedEvent || !showLoader) return;
    const t = setTimeout(() => {
      setShowLoader(false);
      alreadyLoadedIds.add(id!);
    }, 2500);
    return () => clearTimeout(t);
  }, [selectedEvent, showLoader, state, id]);

  const isLoading = state !== "create" && (!selectedEvent || showLoader);

  return { selectedEvent, isLoading };
};
