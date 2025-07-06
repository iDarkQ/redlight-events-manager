import { useEvent } from "~/providers/event";
import { styles } from ".";
import { SiGooglecalendar } from "react-icons/si";
import dayjs from "dayjs";

import utcFormat from "dayjs/plugin/utc";
import { Link } from "~/components/link";
import { IconButton } from "~/components/icon-button";
import { Tooltip } from "~/components/tooltip";
import { useUser } from "~/providers/user";

dayjs.extend(utcFormat);

export const HeroTitle = () => {
  const { selectedEvent, getGoogleCalendarLink } = useEvent();
  const { user } = useUser();

  const alreadyJoined = !!user && selectedEvent?.participants.some((p) => p.id === user.id);
  
  const addToCalendar = () => {
    if (!selectedEvent || !alreadyJoined) return;
    const link = getGoogleCalendarLink();

    return (
      <Tooltip title="Add To Google Calendar">
        <Link isExternalLink={true} link={link} className={styles.iconButton}>
          <IconButton>
            <SiGooglecalendar className={styles.icon} />
          </IconButton>
        </Link>
      </Tooltip>
    );
  };

  return (
    <div className={styles.heading}>
      <h1>
        <strong>
          {selectedEvent?.title} {addToCalendar()}
        </strong>
      </h1>
      <h4 className={styles.location}>{selectedEvent?.location}</h4>
    </div>
  );
};
