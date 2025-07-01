import { styles } from ".";
import { IoMdPeople } from "react-icons/io";
import { IoMdCalendar } from "react-icons/io";
import { MdEventAvailable } from "react-icons/md";
import { useEvent } from "~/providers/event";
import dayjs from "dayjs";
import { DATE_FORMAT } from "~/utils/date";
import { RxAvatar } from "react-icons/rx";

export const HeroInformation = () => {
  const { selectedEvent } = useEvent();

  return (
    <ul className={styles.information}>
      <li className={styles.detail}>
        <IoMdPeople />
        <span>
          {selectedEvent?.participants.length}/{selectedEvent?.maxParticipants}
        </span>
      </li>
      <li className={styles.detail}>
        <IoMdCalendar />
        <span>{dayjs(selectedEvent?.date).format(DATE_FORMAT)}</span>
      </li>
      <li className={styles.detail}>
        <RxAvatar />
        <span>@{selectedEvent?.participants.find((participant) => participant.id === selectedEvent.creatorId)?.name ?? "Unknown"}</span>
      </li>
      <li className={styles.detail}>
        <MdEventAvailable />
        <span>{String(selectedEvent?.status ?? "")}</span>
      </li>
    </ul>
  );
};
