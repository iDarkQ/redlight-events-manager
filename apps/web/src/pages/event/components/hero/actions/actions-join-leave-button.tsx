import { Button } from "~/components/button";
import { styles } from ".";
import { ParticipantDto } from "~/lib/api";

interface ActionsJoinLeaveButtonProps {
  event: {
    status: "COMPLETED" | "CANCELLED" | "PLANNED";
    maxParticipants: number;
    participants: ParticipantDto[];
  };
  alreadyJoined?: boolean;
  onJoin: () => void;
  onLeave: () => void;
}

export const ActionsJoinLeaveButton = ({
  event,
  alreadyJoined,
  onJoin,
  onLeave,
}: ActionsJoinLeaveButtonProps) => {
  if (event.status === "COMPLETED") {
    return (
      <Button disabled color="red" className={styles.action}>
        Event Already Completed
      </Button>
    );
  }

  if (event.status === "CANCELLED") {
    return (
      <Button disabled color="red" className={styles.action}>
        Event Cancelled
      </Button>
    );
  }

  if (alreadyJoined) {
    return (
      <Button onClick={onLeave} color="red" className={styles.action}>
        Leave
      </Button>
    );
  }

  const isFull = event.maxParticipants <= event.participants.length;
  return (
    <Button onClick={onJoin} disabled={isFull} color="red" className={styles.action}>
      {isFull ? "Event is full" : "Join"}
    </Button>
  );
};
