import { createContext, ReactNode, useContext, useState, useCallback } from "react";
import {
  AiOutlineCheckCircle,
  AiOutlineCloseCircle,
  AiOutlineExclamationCircle,
} from "react-icons/ai";
import { v4 as uuidv4 } from "uuid";
import { MessagesStack } from "~/components/message";
import { AxiosError } from "axios";

export const MessageTypes = {
  success: { icon: AiOutlineCheckCircle, color: "#52c41a" },
  error: { icon: AiOutlineCloseCircle, color: "#ff4d4f" },
  info: { icon: AiOutlineExclamationCircle, color: "#1890ff" },
  warning: { icon: AiOutlineExclamationCircle, color: "#faad14" },
} as const;

export type MessageType = keyof typeof MessageTypes;

export interface MessageState {
  id: string;
  content: string;
  type: MessageType;
  exiting?: boolean;
}

interface MessageContextProps {
  showMessage: (content: string, type?: MessageType, duration?: number) => void;
  throwMessage: (err: unknown, message: string) => void;
}

const MessageContext = createContext<MessageContextProps | undefined>(undefined);

export const MessageProvider = ({ children }: { children: ReactNode }) => {
  const [messages, setMessages] = useState<MessageState[]>([]);

  const throwMessage = (err: unknown, message: string): void => {
    console.log({ err });
    if (err instanceof AxiosError) {
      showMessage(
        err.response?.data?.message?.message ?? err.response?.data?.message ?? message,
        "error"
      );
      return;
    }

    showMessage(message, "error");
  };

  const showMessage = useCallback(
    (content: string, type: MessageType = "info", duration = 3000) => {
      const id = uuidv4();
      setMessages((msgs) => [...msgs, { id, content, type }]);
      setTimeout(() => {
        setMessages((msgs) => msgs.map((msg) => (msg.id === id ? { ...msg, exiting: true } : msg)));

        // Remove after fade-out duration
        setTimeout(() => {
          setMessages((msgs) => msgs.filter((msg) => msg.id !== id));
        }, 400);
      }, duration);
    },
    [],
  );

  return (
    <MessageContext.Provider value={{ showMessage, throwMessage }}>
      {children}
      <MessagesStack messages={messages} />
    </MessageContext.Provider>
  );
};

export const useMessage = () => {
  const context = useContext(MessageContext);
  if (!context) throw new Error("useMessage must be used within a MessageProvider");
  return context;
};
