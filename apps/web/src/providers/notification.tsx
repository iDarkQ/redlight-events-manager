import { createContext, ReactNode, useContext, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { AiOutlineCheckCircle } from "react-icons/ai";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { AiOutlineExclamationCircle } from "react-icons/ai";

interface NotificationContextProps {
  notificationQueue: Notification[];
  sendNotification: (notification: NotificationInput) => void;
  closeNotification: (id: string) => void;
}

interface NotificationProviderProps {
  children: ReactNode;
}

export const NotificationTypes = {
  warning: {
    type: "warning",
    color: "#FF9800",
    icon: AiOutlineExclamationCircle,
  },
  success: {
    type: "success",
    color: "#4CAF50",
    icon: AiOutlineCheckCircle,
  },
  info: {
    type: "info",
    color: "#2196F3",
    icon: AiOutlineExclamationCircle,
  },
  error: {
    type: "error",
    color: "#F44336",
    icon: AiOutlineCloseCircle,
  },
} as const;

export type NotificationType = keyof typeof NotificationTypes;

export interface Notification {
  id?: string;
  title: string;
  type: NotificationType;
  label: string;
}

type NotificationInput = Omit<Notification, "id" | "time" | "type"> & {
  id?: string;
  type?: NotificationType;
};

const NotificationContext = createContext<NotificationContextProps | undefined>(undefined);

export const NotificationProvider = ({ children }: NotificationProviderProps) => {
  const [notificationQueue, setNotificationQueue] = useState<Notification[]>([]);

  const sendNotification = ({
    title,
    label,
    id = uuidv4(),
    type = "info",
  }: NotificationInput) => {
    setNotificationQueue((prev) => [
      ...prev,
      {
        id,
        label,
        title,
        type,
      },
    ]);
  };

  const closeNotification = (id: string) => {
    setNotificationQueue((prev) => [...prev.filter((notification) => notification.id !== id)]);
  };

  return (
    <NotificationContext.Provider
      value={{ notificationQueue, closeNotification, sendNotification }}
    >
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotification = () => {
  const context = useContext(NotificationContext);

  if (!context) {
    throw Error("useNotification has to be used within NotificationContext");
  }

  return context;
};
