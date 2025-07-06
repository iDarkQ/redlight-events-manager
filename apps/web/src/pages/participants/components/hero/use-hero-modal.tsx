import { ParticipantDto } from "~/lib/api";
import { useUser } from "~/providers/user";

export const useHeroModal = (participant: ParticipantDto) => {
  const { updateUserBan, updateUserRole } = useUser();

  const handleUpdateUserBan = async () => {
    if (!participant) return;
    await updateUserBan(participant.id, !participant.banned);
  };

  const handleUpdateUserRole = async () => {
    if (!participant) return;
    await updateUserRole(
      participant.id,
      participant.role === "PARTICIPANT" ? "ADMIN" : "PARTICIPANT",
    );
  };

  return { handleUpdateUserBan, handleUpdateUserRole };
};
