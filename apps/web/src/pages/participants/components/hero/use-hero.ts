import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { ParticipantDto } from "~/lib/api";
import { useMessage } from "~/providers/message";
import { useUser } from "~/providers/user";
import { Routes } from "~/utils/routes";

interface UseHeroProps {
    participants: ParticipantDto[];
}

export const useHero = ({ participants }: UseHeroProps) => {
    const { fetchParticipants, user, fetched } = useUser();
    const [selectedParticipant, setSelctedParticipant] = useState<string | undefined>();
    const navigate = useNavigate();
    const { showMessage } = useMessage();

    const participant = participants.find((participant) => participant.id === selectedParticipant);

    useEffect(() => {
        if (!fetched) return;

        if (!user || user.role !== "ADMIN") {
            showMessage("You need to be an admin access participants", "error");
            navigate(Routes.HOME);
            return;
        }

        if (participants.length <= 0) {
            fetchParticipants();
        }
    }, [fetched, user]);


    return { participant, setSelctedParticipant };
}