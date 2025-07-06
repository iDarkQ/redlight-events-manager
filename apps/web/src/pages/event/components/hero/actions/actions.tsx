import { useState } from "react";
import { Modal } from "~/components/modal";
import dayjs from "dayjs";
import utcFormat from "dayjs/plugin/utc";

import { EventForm } from "../event-form";
import { HeroJoinModal } from "~/pages/event/components/hero/hero-join-modal";
import { useHeroActions } from "~/pages/event/components/hero/use-hero-actions";
import { ActionsManage } from "~/pages/event/components/hero/actions/actions-manage";
import { ActionsJoinLeaveButton } from "~/pages/event/components/hero/actions/actions-join-leave-button";
import { ActionsUserView } from "~/pages/event/components/hero/actions/actions-user-view";
import { EventProps } from "~/pages/event/event";

dayjs.extend(utcFormat);

export const Actions = ({ state }: EventProps) => {
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [isJoinModalOpen, setJoinModalOpen] = useState(false);

  const {
    canEdit,
    alreadyJoined,
    selectedEvent,
    user,
    isCreator,
    handleCancel,
    handleLogin,
    handleDeleteEvent,
    turnOnEditMode,
    onLeave,
    onJoin,
    onFinish,
    onPublish,
  } = useHeroActions({ state, setOpen: setEditModalOpen, setJoinModalState: setJoinModalOpen });

  if (!selectedEvent) return null;

  return (
    <>
      {/* Edit Event Modal */}
      {canEdit && (
        <Modal title="Edit Event" open={isEditModalOpen} onClose={() => setEditModalOpen(false)}>
          <EventForm defaultValues={selectedEvent} onFinish={onFinish} />
        </Modal>
      )}

      {/* Join Success Modal */}
      {user && alreadyJoined && (
        <Modal
          title="🎉 Congratulations! 🎉"
          open={isJoinModalOpen}
          onClose={() => setJoinModalOpen(false)}
        >
          <HeroJoinModal />
        </Modal>
      )}

      {/* Main Action Buttons */}
      {state === "view" ? (
        user && !isCreator ? (
          <ActionsJoinLeaveButton
            event={selectedEvent}
            alreadyJoined={alreadyJoined}
            canEdit={canEdit}
            onJoin={onJoin}
            onLeave={onLeave}
            turnOnEditMode={turnOnEditMode}
          />
        ) : (
          <ActionsUserView
            user={user}
            isCreator={isCreator}
            canEdit={canEdit}
            handleLogin={handleLogin}
            turnOnEditMode={turnOnEditMode}
          />
        )
      ) : (
        <ActionsManage
          state={state}
          setOpen={setEditModalOpen}
          handleCancel={handleCancel}
          handleDeleteEvent={handleDeleteEvent}
          onPublish={onPublish}
        />
      )}
    </>
  );
};
