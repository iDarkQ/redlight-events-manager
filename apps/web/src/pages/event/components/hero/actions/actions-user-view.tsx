import clsx from "clsx";
import { CiSettings } from "react-icons/ci";
import { RxAvatar } from "react-icons/rx";
import { Button } from "~/components/button";
import { styles } from ".";
import { UserDto } from "~/lib/api";

interface ActionsUserViewProps {
  user: UserDto | null;
  isCreator: boolean;
  canEdit: boolean;
  handleLogin: () => void;
  turnOnEditMode: () => void;
}

export const ActionsUserView = ({
  user,
  isCreator,
  canEdit,
  handleLogin,
  turnOnEditMode,
}: ActionsUserViewProps) => {
  if (!user) {
    return (
      <Button onClick={handleLogin} color="red" className={styles.action}>
        Login To Join <RxAvatar />
      </Button>
    );
  }

  if (isCreator) {
    return (
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
    );
  }

  return null; // fallback for other users
};
