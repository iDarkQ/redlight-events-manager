import { Button } from "~/components/button";
import { HeroEditForm, styles } from ".";
import { EventProps } from "~/pages/event/event";
import { Modal } from "~/components/modal";
import { useState } from "react";
import { useEvent } from "~/providers/event";
import { EventDto } from "@redlight-events-manager/constants/event.dto";

export const HeroActions = ({ state }: EventProps) => {
  const [open, setOpen] = useState(false);
  const { event, setEvent } = useEvent();

  const onFinish = async (data: EventDto) => {
    console.log({data})
    setEvent((prev) => (prev ? { ...prev, ...data } : data));
    setOpen(false);
  };

  return (
    <>
      <Modal title="Edit Event" open={open} onClose={() => setOpen(false)}>
        <HeroEditForm defaultValues={event ?? undefined} onFinish={onFinish} />
      </Modal>
      {state === "view" ? (
        <Button color="red" className={styles.action}>
          Join
        </Button>
      ) : (
        <div>
          <Button onClick={() => setOpen(true)} color="white" className={styles.action}>
            Edit
          </Button>
          <Button color="red" className={styles.action}>
            {state === "create" ? "Publish" : "Update"}
          </Button>
        </div>
      )}
    </>
  );
};
