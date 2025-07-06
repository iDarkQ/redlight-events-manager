import { Button } from "~/components/button";
import { styles } from ".";
import { ParticipantDto } from "~/lib/api";
import { CiSettings } from "react-icons/ci";
import clsx from "clsx";

interface ActionsJoinLeaveButtonProps {
  event: {
    status: "COMPLETED" | "CANCELLED" | "PLANNED";
    maxParticipants: number;
    participants: ParticipantDto[];
  };
  alreadyJoined?: boolean;
  canEdit: boolean;
  onJoin: () => void;
  onLeave: () => void;
  turnOnEditMode: () => void;
}

export const ActionsJoinLeaveButton = ({
  event,
  alreadyJoined,
  canEdit,
  onJoin,
  onLeave,
  turnOnEditMode,
}: ActionsJoinLeaveButtonProps) => {
  let mainButton;

  if (event.status === "COMPLETED") {
    mainButton = (
      <Button disabled color="red" className={clsx(styles.action, styles.creatorButton)}>
        Event Already Completed
      </Button>
    );
  } else if (event.status === "CANCELLED") {
    mainButton = (
      <Button disabled color="red" className={clsx(styles.action, styles.creatorButton)}>
        Event Cancelled
      </Button>
    );
  } else if (alreadyJoined) {
    mainButton = (
      <Button onClick={onLeave} color="red" className={clsx(styles.action, styles.creatorButton)}>
        Leave
      </Button>
    );
  } else {
    const isFull = event.maxParticipants <= event.participants.length;
    mainButton = (
      <Button
        onClick={onJoin}
        disabled={isFull}
        color="red"
        className={clsx(styles.action, styles.creatorButton)}
      >
        {isFull ? "Event is full" : "Join"}
      </Button>
    );
  }

  return (
    <div className={styles.creator}>
      {mainButton}
      {canEdit && (
        <Button
          onClick={turnOnEditMode}
          color="white"
          className={clsx(styles.action, styles.editButton)}
        >
          <CiSettings />
        </Button>
      )}
    </div>
  );
};
