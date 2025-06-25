import { Notification } from "~/components/notification";
import { useNotification } from "~/providers/notification";
import { styles } from ".";

export const LayoutNotification = () => {
  const { notificationQueue } = useNotification();

  return (
    <div className={styles.notifications}>
      {notificationQueue.map((notification) => (
        <Notification notification={notification} />
      ))}
    </div>
  );
};
