import { ButtonHTMLAttributes } from "react";
import { styles } from ".";
import Football from "~/assets/images/football.png";
import clsx from "clsx";
import { FaLocationDot } from "react-icons/fa6";

interface EventCardProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
}

export const EventCard = ({ className, ...props }: EventCardProps) => (
  <button className={clsx(styles.card, className && className)} {...props}>
    <img className={styles.image} src={Football} alt="Avatar" />
    <div className={styles.container}>
      <p>Sunday 12th April | 10:00 am</p>
      <h4>
        <b>Football Match</b>
      </h4>
      <p>
        <FaLocationDot />
        Coimbra
      </p>
    </div>
  </button>
);
