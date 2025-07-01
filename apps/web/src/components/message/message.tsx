import clsx from "clsx";
import { styles } from ".";
import { createElement } from "react";
import { MessageState, MessageTypes } from "~/providers/message";

export const Message = ({ message }: { message: MessageState }) => {
  const { icon, color } = MessageTypes[message.type];
  return (
    <div
      className={clsx(styles.message, message.exiting && styles.fadeOut)}
    >
      {createElement(icon, { className: styles.icon, style: { color } })}
      <span className={styles.content}>{message.content}</span>
    </div>
  );
};
