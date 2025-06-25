import { EventCard } from "~/components/event-card";
import { styles } from ".";
import { Button } from "~/components/button";

export const Events = () => (
  <div className={styles.wrapper}>
    <section className={styles.section}>
      <h3>Planned Events</h3>
      <div className={styles.events}>
        <EventCard className={styles.card} />
        <EventCard className={styles.card} />
        <EventCard className={styles.card} />
        <EventCard className={styles.card} />
        <EventCard className={styles.card} />
        <EventCard className={styles.card} />
      </div>
      <Button>Load More...</Button>
    </section>
  </div>
);
