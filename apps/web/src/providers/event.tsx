import dayjs from "dayjs";
import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";
import { useCookies } from "react-cookie";
import { Configuration, EventApi, EventDto } from "~/lib/api";
import { useMessage } from "~/providers/message";

interface EventContextProps {
  selectedEvent: EventDto | null;
  events: EventDto[];
  setSelectedEvent: Dispatch<SetStateAction<EventDto | null>>;
  createEvent: () => Promise<EventDto | undefined>;
  updateEvent: () => Promise<void>;
  joinEvent: () => Promise<void>;
  leaveEvent: () => Promise<void>;
  deleteEvent: () => Promise<void>;
}

interface EventProviderProps {
  children: ReactNode;
}

const EventContext = createContext<EventContextProps | undefined>(undefined);

export const defaultEvent: EventDto = {
  id: "default",
  title: "Event Title",
  description: "## This is the description for your event",
  createdAt: dayjs().toISOString(),
  date: dayjs().toISOString(),
  type: "",
  maxParticipants: 0,
  participants: [],
  creatorId: "",
  status: "PLANNED",
  longitude: 0,
  latitude: 0,
  location: "Unset",
};

export const EventProvider = ({ children }: EventProviderProps) => {
  const [cookie] = useCookies(["sessionId"]);
  const { throwMessage } = useMessage();

  const config = new Configuration({
    basePath: import.meta.env.VITE_LOCAL_BACKEND_URL,
    accessToken: cookie.sessionId,
  });

  const eventApi = new EventApi(config);

  const [events, setEvents] = useState<EventDto[]>([]);
  const [selectedEvent, setSelectedEvent] = useState<EventDto | null>(null);

  const fetchEvents = async () => {
    try {
      const { data } = await eventApi.eventControllerFindAll();
      setEvents(data);
    } catch (err) {
      throwMessage(err, "Failed to fetch events");
    }
  };

  const createEvent = async (): Promise<EventDto | undefined> => {
    try {
      if (!selectedEvent) return;
      const { data } = await eventApi.eventControllerCreate({ ...selectedEvent });

      setEvents((prev) => [...prev, data]);

      return data;
    } catch (err) {
      throwMessage(err, "Failed to create event");
    }
  };

  const deleteEvent = async () => {
    try {
      if (!selectedEvent) return;
      await eventApi.eventControllerRemove(selectedEvent.id);

      setEvents((prev) => [...prev.filter((e) => e.id !== selectedEvent.id)]);
    } catch (err) {
      throwMessage(err, "Failed to delete event");
    }
  };

  const updateEvent = async () => {
    try {
      if (!selectedEvent) return;
      const { data } = await eventApi.eventControllerUpdate(selectedEvent.id, selectedEvent);

      setEvents((prev) =>
        prev.map((event) =>
          event.id === data.id
            ? {
                ...event,
                ...data,
              }
            : event,
        ),
      );
    } catch (err) {
      throwMessage(err, "Failed to update event");
    }
  };

  const joinEvent = async () => {
    try {
      if (!selectedEvent) return;
      const { data } = await eventApi.eventControllerJoin(selectedEvent.id);

      setEvents((prev) =>
        prev.map((event) =>
          event.id === data.id
            ? {
                ...event,
                ...data,
              }
            : event,
        ),
      );
    } catch (err) {
      throwMessage(err, "Failed to join event");
    }
  };

  const leaveEvent = async () => {
    try {
      if (!selectedEvent) return;
      const { data } = await eventApi.eventControllerLeave(selectedEvent.id);

      setEvents((prev) =>
        prev.map((event) =>
          event.id === data.id
            ? {
                ...event,
                ...data,
              }
            : event,
        ),
      );
    } catch (err) {
      throwMessage(err, "Failed to join event");
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  return (
    <EventContext.Provider
      value={{
        selectedEvent,
        events,
        setSelectedEvent,
        leaveEvent,
        joinEvent,
        createEvent,
        updateEvent,
        deleteEvent,
      }}
    >
      {children}
    </EventContext.Provider>
  );
};

export const useEvent = () => {
  const context = useContext(EventContext);

  if (!context) {
    throw Error("useEvent has to be used within EventProvider");
  }

  return context;
};
