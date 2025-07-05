import { styles, useEvents, EventsCompleted, EventsCancelled, EventsPlanned } from ".";
import { Button } from "~/components/button";
import { useState } from "react";

export const Events = () => {
  const [showRest, setShowRest] = useState(false);

  const { plannedEvents, cancelledEvents, completedEvents } = useEvents();

  const cancelledAndCompletedEvents = (
    <>
      {completedEvents.length > 0 && <EventsCompleted events={completedEvents} />}
      {cancelledEvents.length > 0 && <EventsCancelled events={cancelledEvents} />}
    </>
  );

  return (
    <div className={styles.wrapper}>
      <section className={styles.section}>
        <EventsPlanned events={plannedEvents} />
        {showRest && cancelledAndCompletedEvents}
        {(cancelledEvents.length > 0 || completedEvents.length > 0) && (
          <Button onClick={() => setShowRest((prev) => !prev)}>
            {showRest ? "Hide" : "Load"} {cancelledEvents.length > 0 && "cancelled and "}completed
            events...
          </Button>
        )}
      </section>
    </div>
  );
};
