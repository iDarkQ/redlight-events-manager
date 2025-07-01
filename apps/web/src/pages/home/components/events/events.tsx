import { EventCard } from "~/components/event-card";
import { styles } from ".";
import { Button } from "~/components/button";
import { AiOutlinePlus } from "react-icons/ai";
import { useNavigate } from "react-router";
import { routeCreateEvent, routeViewEvent } from "~/utils/routes";
import { defaultEvent, useEvent } from "~/providers/event";

export const Events = () => {
  const navigate = useNavigate();
  const { events, setSelectedEvent } = useEvent();

  const createEvent = () => {
    setSelectedEvent(defaultEvent);
    navigate(routeCreateEvent());
  };

  return (
    <div className={styles.wrapper}>
      <section className={styles.section}>
        <div className={styles.planned}>
          <h3>Planned Events</h3>
          <Button onClick={createEvent} color="red">
            Create Event <AiOutlinePlus />
          </Button>
        </div>
        <div className={styles.events}>
          {events.map((event, index) => (
            <EventCard
              key={index}
              event={event}
              onClick={() => {
                setSelectedEvent(event);
                navigate(routeViewEvent(event.id));
              }}
              className={styles.card}
            />
          ))}
        </div>
        <Button>Load More...</Button>
      </section>
    </div>
  );
};
