import { useEffect, useState, useRef } from "react";
import { useNavigate, useParams } from "react-router";
import { PageLoading } from "~/components/page-loading";
import { Details } from "~/pages/event/components/details";
import { Hero } from "~/pages/event/components/hero";
import { useEvent } from "~/providers/event";
import { useUser } from "~/providers/user";
import { Routes } from "~/utils/routes";

export interface EventProps {
  state: "edit" | "create" | "view";
}

export const Event = ({ state }: EventProps) => {
  const { id } = useParams();
  const { setSelectedEvent, selectedEvent, events } = useEvent();
  const { user } = useUser();
  const navigate = useNavigate();

  const [showLoader, setShowLoader] = useState(true);
  const startTimeRef = useRef<number>(Date.now());

  useEffect(() => {
    if (state === "create") {
      if (!user) {
        navigate(Routes.HOME);
      }
      return;
    }

    const event = events.find((event) => event.id === id);
    if (!event) return;

    if (
      state === "edit" &&
      (!user || (event.creatorId !== user.id && user.role !== "ADMIN"))
    ) {
      navigate(Routes.HOME);
      return;
    }

    setSelectedEvent(event);
  }, [id, events, state, user, navigate, setSelectedEvent]);

  useEffect(() => {
    if (state === "create") {
      setShowLoader(false);
      return;
    }

    if (selectedEvent) {
      const elapsed = Date.now() - startTimeRef.current;
      const remaining = 2500 - elapsed;
      if (remaining <= 0) {
        setShowLoader(false);
      } else {
        const t = setTimeout(() => setShowLoader(false), remaining);
        return () => clearTimeout(t);
      }
    }
  }, [selectedEvent, state]);

  const isLoading = state !== "create" && (!selectedEvent || showLoader);

  return (
    <main>
      <PageLoading loading={isLoading} />
      <Hero state={state} />
      {selectedEvent && <Details state={state} />}
    </main>
  );
};
