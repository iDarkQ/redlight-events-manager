import { ButtonHTMLAttributes } from "react";
import { styles } from ".";
import Football from "~/assets/images/football.png";
import clsx from "clsx";
import { FaLocationDot } from "react-icons/fa6";
import dayjs from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";
import localizedFormat from "dayjs/plugin/localizedFormat";
import { EventDto } from "~/lib/api";

dayjs.extend(advancedFormat);
dayjs.extend(localizedFormat);

interface EventCardProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  event: EventDto;
}

export const EventCard = ({ event, className, ...props }: EventCardProps) => (
  <button className={clsx(styles.card, className && className)} {...props}>
    <img className={styles.image} src={Football} alt="Avatar" />
    <div className={styles.container}>
      <p>{dayjs(event.date).format("dddd Do MMMM | hh:mm a")}</p>
      <h4>
        <b>{event.title}</b>
      </h4>
      <p>
        <FaLocationDot />
        Coimbra
      </p>
    </div>
  </button>
);