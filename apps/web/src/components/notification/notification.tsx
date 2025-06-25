import { styles } from ".";
import {
  Notification as BaseNotification,
  NotificationTypes,
  useNotification,
} from "~/providers/notification";
import clsx from "clsx";
import { AiOutlineClose } from "react-icons/ai";
import { createElement } from "react";

interface NotificationProps {
  notification: BaseNotification;
}

export const Notification = ({ notification }: NotificationProps) => {
  const { closeNotification } = useNotification();
  const { icon } = NotificationTypes[notification.type];

  const handleExit = () => {
    closeNotification(notification.id!);
  };

  return (
    <div className={clsx(styles.wrapper, styles.outerShape, styles.outer)}>
      <div className={styles.column}>
        {createElement(icon, { className: styles.icon })}
      </div>

      <div className={styles.column}>
        <div className={styles.heading}>
          <p>{notification.title}</p>
          <AiOutlineClose className={styles.close} onClick={handleExit}/>
        </div>
        <p>{notification.title}</p>
      </div>
    </div>
  );
};
