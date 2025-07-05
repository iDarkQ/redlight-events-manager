// components/ParticipantsList.tsx
import { AvatarUser } from "~/components/avatar";
import { styles } from ".";
import { ParticipantDto } from "~/lib/api";

interface DetailsParticipantsListProps {
  participants: ParticipantDto[];
}

export const DetailsParticipantsList = ({ participants }: DetailsParticipantsListProps) => {
  if (!participants || participants.length === 0) {
    return null;
  }

  return (
    <div className={styles.participantsSection}>
      <h2>Participants</h2>
      <div className={styles.participantsList}>
        {participants.map((participant, idx) => (
          <AvatarUser key={idx} name={participant.name} profile={participant.profile} />
        ))}
      </div>
    </div>
  );
};
