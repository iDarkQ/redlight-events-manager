import { useNavigate } from "react-router";
import { EventDto } from "~/lib/api";
import { EventProps } from "~/pages/event/event";
import { useEvent } from "~/providers/event";
import { useMessage } from "~/providers/message";
import { useUser } from "~/providers/user";
import { routeViewEvent, Routes, routeEditEvent } from "~/utils/routes";

interface UseHeroActionsProps extends EventProps {
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    setJoinModalState: React.Dispatch<React.SetStateAction<boolean>>;
}

export const useHeroActions = ({ state, setOpen, setJoinModalState }: UseHeroActionsProps) => {
    const {
        selectedEvent,
        setSelectedEvent,
        createEvent,
        updateEvent,
        joinEvent,
        leaveEvent,
        deleteEvent,
    } = useEvent();
    const { user } = useUser();
    const navigate = useNavigate();
    const { showMessage } = useMessage();

    const onFinish = async (data: EventDto) => {
        setSelectedEvent((prev) => (prev ? { ...prev, ...data } : data));
        setOpen(false);
    };

    const onPublish = async () => {
        if (state === "edit") {
            await updateEvent();

            if (!selectedEvent) return;
            navigate(routeViewEvent(selectedEvent!.id));
            showMessage("Successfully published changes", "success");
        }

        if (state === "create") {
            const newEvent = await createEvent();
            if (!newEvent) return;
            setSelectedEvent(newEvent);
            navigate(routeViewEvent(newEvent!.id));
            showMessage("Successfully published new event", "success");
        }
    };

    const onJoin = async () => {
        await joinEvent();

        showMessage("You joined this event", "info");
        setJoinModalState(true);
    };

    const onLeave = async () => {
        await leaveEvent();
        showMessage("You left this event", "info");
    };

    const turnOnEditMode = () => {
        showMessage("You are now in edit mode", "info");
        if (!selectedEvent) {
            return;
        }

        navigate(routeEditEvent(selectedEvent.id));
    };

    const handleDeleteEvent = async () => {
        await deleteEvent();
        navigate(Routes.HOME);
        showMessage("Successfully deleted event", "success");
    };

    const handleLogin = () => navigate(Routes.LOGIN);

    const handleCancel = () => {
        if (state === "create") {
            navigate(Routes.HOME);
            showMessage("You abandoned your event", "info");
        }

        if (state === "edit" && selectedEvent) {
            navigate(routeViewEvent(selectedEvent.id), { replace: true });
            showMessage("You left edit mode", "info");
        }
    };

    const alreadyJoined = !!user && selectedEvent?.participants.some((p) => p.id === user.id);
    const isCreator =
        !!user && (selectedEvent?.creatorId === user.id || selectedEvent?.id === "default");
    const canEdit = !!user && (user.role === "ADMIN" || isCreator);

    return { canEdit, alreadyJoined, selectedEvent, user, isCreator, handleCancel, handleLogin, handleDeleteEvent, turnOnEditMode, onLeave, onJoin, onFinish, onPublish };
}