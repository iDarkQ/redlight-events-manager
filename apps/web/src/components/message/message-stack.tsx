import { styles } from ".";
import { Message } from "~/components/message";
import { MessageState } from "~/providers/message";

export const MessagesStack = ({ messages }: { messages: MessageState[] }) => {
  if (!messages.length) return null;
  return (
    <div className={styles.stack}>
      {messages.map((msg) => (
        <Message key={msg.id} message={msg} />
      ))}
    </div>
  );
};
