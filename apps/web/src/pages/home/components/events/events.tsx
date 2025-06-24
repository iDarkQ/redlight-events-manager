import { EventCard } from "~/components/event-card";
import { styles } from ".";
import { Button } from "~/components/button";

export const Events = () => (
  <section className={styles.wrapper}>
    <h3>Planned Events</h3>
    <div className={styles.events}>
      <EventCard className={styles.card} />
      <EventCard className={styles.card} />
      <EventCard className={styles.card} />
      <EventCard className={styles.card} />
      <EventCard className={styles.card} />
      <EventCard className={styles.card} />
    </div>
    <Button>
      Load More...
    </Button>
  </section>
);
