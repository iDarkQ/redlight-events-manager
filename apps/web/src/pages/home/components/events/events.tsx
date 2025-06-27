import { EventCard } from "~/components/event-card";
import { styles } from ".";
import { Button } from "~/components/button";
import { AiOutlinePlus } from "react-icons/ai";
import { useNavigate } from "react-router";
import { Routes } from "~/utils/routes";

export const Events = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.wrapper}>
      {/* <EventsCreateForm /> */}
      <section className={styles.section}>
        <div className={styles.planned}>
          <h3>Planned Events</h3>
          <Button color="red">
            Create Event <AiOutlinePlus />
          </Button>
        </div>
        <div className={styles.events}>
          <EventCard onClick={() => {
            navigate(Routes.EVENT);
          }} className={styles.card} />
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
};
