import { SiGooglecalendar } from "react-icons/si";
import { Button } from "~/components/button";
import { Link } from "~/components/link";
import { styles } from ".";
import { useEvent } from "~/providers/event";

export const HeroJoinModal = () => {
  const { selectedEvent, getGoogleCalendarLink } = useEvent();

  const addToCalendar = () => {
    if (!selectedEvent) return;
    const link = getGoogleCalendarLink();

    return (
      <Link isExternalLink={true} link={link}>
        <Button color="red" className={styles.action}>
          Add To Google Calendar <SiGooglecalendar />
        </Button>
      </Link>
    );
  };

  return (
    <div className={styles.modal}>
      <p>
        You have successfully marked your spot in this event!
        <br />
        If you'd like, you can add it to your Google Calendar to receive reminders.
      </p>
      {addToCalendar()}
    </div>
  );
};
