import { Button } from "~/components/button";
import { HeroEditForm, styles } from ".";
import { EventProps } from "~/pages/event/event";
import { Modal } from "~/components/modal";
import { useState } from "react";
import { useEvent } from "~/providers/event";
import { useUser } from "~/providers/user";
import { useNavigate } from "react-router";
import { routeEditEvent, Routes, routeViewEvent } from "~/utils/routes";
import clsx from "clsx";
import { CiSettings } from "react-icons/ci";
import { AiOutlineDelete } from "react-icons/ai";
import { AiOutlineEdit } from "react-icons/ai";
import { MdOutlinePublish } from "react-icons/md";
import { RxAvatar } from "react-icons/rx";
import { TbCancel } from "react-icons/tb";
import { useMessage } from "~/providers/message";
import { EventDto } from "~/lib/api";

export const HeroActions = ({ state }: EventProps) => {
  const [open, setOpen] = useState(false);
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
      navigate(routeViewEvent(selectedEvent.id));
      showMessage("You left edit mode", "info");
    }
  };

  const alreadyJoined = !!user && selectedEvent?.participants.some((p) => p.id === user.id);
  const isCreator = !!user && selectedEvent?.creatorId === user.id;
  const canEdit = !!user && (user.role === "ADMIN" || isCreator);

  const getJoinLeaveButtons = () => {
    if (selectedEvent?.status === "COMPLETED") {
      return (
        <Button disabled color="red" className={styles.action}>
          Event Already Completed
        </Button>
      );
    }

    if (selectedEvent?.status === "CANCELLED") {
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

    return (
      <>
        {selectedEvent && selectedEvent.maxParticipants < selectedEvent.participants.length ? (
          <Button onClick={onJoin} color="red" className={styles.action}>
            Join
          </Button>
        ) : (
          <Button disabled color="red" className={styles.action}>
            Event is full
          </Button>
        )}
      </>
    );
  };

  return (
    <>
      <Modal title="Edit Event" open={open} onClose={() => setOpen(false)}>
        <HeroEditForm defaultValues={selectedEvent ?? undefined} onFinish={onFinish} />
      </Modal>
      {state === "view" ? (
        !user ? (
          <Button onClick={handleLogin} color="red" className={styles.action}>
            Login To Join
            <RxAvatar />
          </Button>
        ) : isCreator ? (
          <div className={styles.creator}>
            <Button disabled className={clsx(styles.action, styles.creatorButton)}>
              You are the host
            </Button>
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
        ) : (
          getJoinLeaveButtons()
        )
      ) : (
        <div className={styles.group}>
          <div className={styles.manageButtons}>
            <Button
              onClick={() => setOpen(true)}
              color="white"
              className={clsx(styles.action, styles.edit)}
            >
              Edit
              <AiOutlineEdit />
            </Button>
            <Button onClick={handleCancel} color="white" className={styles.action}>
              Cancel
              <TbCancel />
            </Button>
            {state === "edit" && (
              <Button onClick={handleDeleteEvent} color="white" className={styles.action}>
                Delete
                <AiOutlineDelete />
              </Button>
            )}
          </div>
          <Button onClick={onPublish} color="red" className={styles.action}>
            {state === "create" ? "Publish" : "Update"}
            <MdOutlinePublish />
          </Button>
        </div>
      )}
    </>
  );
};
