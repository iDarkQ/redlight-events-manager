import { EventProps } from "~/pages/event/event";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { useEvent as useEventProvider } from "~/providers/event";
import { useUser } from "~/providers/user";
import { Routes } from "~/utils/routes";
import { useMessage } from "~/providers/message";

export const useEvent = ({ state }: EventProps) => {
  const { id } = useParams<{ id: string }>();
  const { setSelectedEvent, selectedEvent, events, fetched } = useEventProvider();
  const { user, fetched: userFetched } = useUser();
  const navigate = useNavigate();
  const { showMessage } = useMessage();
  const [showLoader, setShowLoader] = useState(true);

  useEffect(() => {
    if (!userFetched) return;
    if (state !== "view" && !user) {
      showMessage("You don't have permissions to do it", "error");
      navigate(Routes.HOME);
      return;
    }
  }, [userFetched, user]);

  useEffect(() => {
    if (!id || !fetched || !userFetched || state === "create") return;

    const event = events.find((e) => e.id === id);
    if (!event) {
      showMessage("This event does not exist", "error");
      navigate(Routes.HOME);
      return;
    }

    if (state === "edit") {
      if (user && event.creatorId !== user!.id && user!.role !== "ADMIN") {
        showMessage("You don't have permissions to do it", "error");
        navigate(Routes.HOME);
        return;
      }
    }

    setSelectedEvent(event);
  }, [id, events, state, setSelectedEvent, user, userFetched]);

  useEffect(() => {
    if (state === "create" || !selectedEvent || !showLoader) return;

    const t = setTimeout(() => {
      setShowLoader(false);
    }, 2500);

    return () => clearTimeout(t);
  }, [selectedEvent, showLoader, state, id]);

  const isLoading = state !== "create" && (!selectedEvent || showLoader);

  return { selectedEvent, isLoading };
};
