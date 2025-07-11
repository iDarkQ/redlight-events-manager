import { ButtonHTMLAttributes } from "react";
import { styles } from ".";
import clsx from "clsx";
import { FaLocationDot } from "react-icons/fa6";
import { EventDto } from "~/lib/api";
import { EVENT_CARD_DATE_FORMAT } from "~/utils/date";
import { baseUrl } from "~/utils/url";
import dayjs from "dayjs";

interface EventCardProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  event: EventDto;
}

export const EventCard = ({ event, className, ...props }: EventCardProps) => (
  <button className={clsx(styles.card, className && className)} {...props}>
    <div className={styles.thumbnail}>
      {event.banner ? (
        <img className={styles.image} src={baseUrl + "/" + event.banner} alt="Banner" />
      ) : (
        <div className={styles.banner}>
          <h3>Sport Event</h3>
        </div>
      )}
      <span className={styles.view}>View Event</span>
    </div>
    <div className={styles.container}>
      <p>{dayjs(event.date).format(EVENT_CARD_DATE_FORMAT)}</p>
      <h4>
        <b>{event.title}</b>
      </h4>
      <p>
        <FaLocationDot />
        {event.location}
      </p>
    </div>
  </button>
);
