import { useNavigate } from "react-router";
import { EventDto } from "~/lib/api";
import { useEvent } from "~/providers/event";
import { routeViewEvent } from "~/utils/routes";
import { styles } from ".";
import { EventCard } from "~/components/event-card";

interface EventsCompletedProps {
  events: EventDto[];
}

export const EventsCompleted = ({ events }: EventsCompletedProps) => {
  const { setSelectedEvent } = useEvent();
  const navigate = useNavigate();

  const handleEventCardClick = (event: EventDto) => {
    setSelectedEvent(event);
    navigate(routeViewEvent(event.id));
  };

  return (
    <>
      <h3>Completed Events</h3>
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
