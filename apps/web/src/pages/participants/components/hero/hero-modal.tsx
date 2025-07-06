import { AvatarUser } from "~/components/avatar";
import { Button } from "~/components/button";
import { Modal } from "~/components/modal";
import { ParticipantDto } from "~/lib/api";
import { useHeroModal } from "~/pages/participants/components/hero/use-hero-modal";
import { styles } from ".";

interface HeroModalProps {
  participant: ParticipantDto;
  open: boolean;
  onClose: () => void;
}

export const HeroModal = ({ participant, onClose, open }: HeroModalProps) => {
  const { handleUpdateUserBan, handleUpdateUserRole } = useHeroModal(participant);

  return (
    <Modal title="Participant Manager" onClose={onClose} open={open}>
      <div className={styles.profile}>
        <AvatarUser name={participant.name} profile={participant.profile} />
        <h3>{participant.name}</h3>
      </div>

      <div className={styles.buttons}>
        <Button className={styles.button} color="red" onClick={handleUpdateUserBan}>
          {participant.banned ? "Unban" : "Ban"}
        </Button>
        <Button className={styles.button} color="red" onClick={handleUpdateUserRole}>
          {participant.role === "ADMIN" ? "Devoke To User" : "Promote To Admin"}
        </Button>
      </div>
    </Modal>
  );
};
