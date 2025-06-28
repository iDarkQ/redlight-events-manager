import { styles } from ".";
import { IoMdPeople } from "react-icons/io";
import { IoMdCalendar } from "react-icons/io";
import { IoLocationOutline } from "react-icons/io5";
import { MdEventAvailable } from "react-icons/md";
import { useEvent } from "~/providers/event";
import dayjs from "dayjs";
import { DATE_FORMAT } from "~/utils/date";

export const HeroInformation = () => {
  const { event } = useEvent();

  return (
    <ul className={styles.information}>
      <li className={styles.detail}>
        <IoMdPeople />
        <span>
          {event?.participants.length}/{event?.maxParticipants}
        </span>
      </li>
      <li className={styles.detail}>
        <IoMdCalendar />
        <span>{dayjs(event?.date).format(DATE_FORMAT)}</span>
      </li>
      <li className={styles.detail}>
        <IoLocationOutline />
        <span>Coimbra</span>
      </li>
      <li className={styles.detail}>
        <MdEventAvailable />
        <span>Planned</span>
      </li>
    </ul>
  );
};
