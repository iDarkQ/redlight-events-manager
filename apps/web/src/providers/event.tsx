import { EventDto } from "@redlight-events-manager/constants/event.dto";
import { createContext, Dispatch, ReactNode, SetStateAction, useContext, useState } from "react";

interface EventContextProps {
  event: EventDto | null;
  setEvent: Dispatch<SetStateAction<EventDto | null>>;
}

interface EventProviderProps {
  children: ReactNode;
}

const EventContext = createContext<EventContextProps | undefined>(undefined);

export const EventProvider = ({ children }: EventProviderProps) => {
  const [event, setEvent] = useState<EventDto | null>({
    id: "ckv9p34s50000svef8bl7w2gb",
    title: "Football Match",
    description: "A friendly soccer tournament for local teams.",
    createdAt: new Date("2024-06-25T12:00:00.000Z"),
    date: new Date("2024-07-10T15:00:00.000Z"),
    type: "SPORT",
    maxParticipants: 22,
    participants: [
      { id: "user1", name: "Alice" },
      { id: "user2", name: "Bob" },
    ],
    creatorId: "user1",
    status: "PLANNED",
    longitude: 19.9449799,
    latitude: 50.0646501,
    location: "Alma Coimbra",
  });

  return <EventContext.Provider value={{ event, setEvent }}>{children}</EventContext.Provider>;
};

export const useEvent = () => {
  const context = useContext(EventContext);

  if (!context) {
    throw Error("useEvent has to be used within EventProvider");
  }

  return context;
};
