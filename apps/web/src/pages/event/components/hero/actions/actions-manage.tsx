import clsx from "clsx";
import { AiOutlineEdit, AiOutlineDelete } from "react-icons/ai";
import { MdOutlinePublish } from "react-icons/md";
import { TbCancel } from "react-icons/tb";
import { Button } from "~/components/button";
import { styles } from ".";

interface ActionsManageProps {
  state: "view" | "edit" | "create";
  setOpen: (open: boolean) => void;
  handleCancel: () => void;
  handleDeleteEvent: () => void;
  onPublish: () => void;
}

export const ActionsManage = ({
  state,
  setOpen,
  handleCancel,
  handleDeleteEvent,
  onPublish,
}: ActionsManageProps) => {
  const isEditing = state === "edit";
  const isCreating = state === "create";

  return (
    <div className={styles.group}>
      <div className={styles.manageButtons}>
        <Button
          onClick={() => setOpen(true)}
          color="white"
          className={clsx(styles.action, styles.edit)}
        >
          Edit <AiOutlineEdit />
        </Button>
        <Button onClick={handleCancel} color="white" className={styles.action}>
          Cancel <TbCancel />
        </Button>
        {isEditing && (
          <Button onClick={handleDeleteEvent} color="white" className={styles.action}>
            Delete <AiOutlineDelete />
          </Button>
        )}
      </div>
      <Button onClick={onPublish} color="red" className={styles.action}>
        {isCreating ? "Publish" : "Update"} <MdOutlinePublish />
      </Button>
    </div>
  );
};
