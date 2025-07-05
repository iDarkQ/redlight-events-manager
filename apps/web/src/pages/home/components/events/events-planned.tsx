import { AiOutlinePlus } from "react-icons/ai";
import { useNavigate } from "react-router";
import { Button } from "~/components/button";
import { styles, EventsEmpty } from ".";
import { defaultEvent, useEvent } from "~/providers/event";
import { routeCreateEvent, routeViewEvent } from "~/utils/routes";
import { EventDto } from "~/lib/api";
import { EventCard } from "~/components/event-card";

interface EventsPlannedProps {
  events: EventDto[];
}

export const EventsPlanned = ({ events }: EventsPlannedProps) => {
  const { setSelectedEvent } = useEvent();
  const navigate = useNavigate();

  const handleCreateEvent = () => {
    setSelectedEvent(defaultEvent);
    navigate(routeCreateEvent());
  };

  const handleEventCardClick = (event: EventDto) => {
    setSelectedEvent(event);
    navigate(routeViewEvent(event.id));
  };

  return (
    <>
      <div className={styles.planned}>
        <h3>Planned Events</h3>
        <Button onClick={handleCreateEvent} color="red">
          Create Event <AiOutlinePlus />
        </Button>
      </div>
      {events.length === 0 && <EventsEmpty />}
      <div className={styles.events}>
        {events.map((event, index) => (
          <EventCard
            key={index}
            event={event}
            onClick={() => handleEventCardClick(event)}
            className={styles.card}
          />
        ))}
      </div>
    </>
  );
};
