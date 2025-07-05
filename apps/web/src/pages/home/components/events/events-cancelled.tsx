import { EventCard } from "~/components/event-card";
import { styles } from ".";
import { EventDto } from "~/lib/api";
import { useNavigate } from "react-router";
import { useEvent } from "~/providers/event";
import { routeViewEvent } from "~/utils/routes";

interface EventsCancelledProps {
  events: EventDto[];
}

export const EventsCancelled = ({ events }: EventsCancelledProps) => {
  const { setSelectedEvent } = useEvent();
  const navigate = useNavigate();

  const handleEventCardClick = (event: EventDto) => {
    setSelectedEvent(event);
    navigate(routeViewEvent(event.id));
  };

  return (
    <>
      <h3>Cancelled Events</h3>
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
