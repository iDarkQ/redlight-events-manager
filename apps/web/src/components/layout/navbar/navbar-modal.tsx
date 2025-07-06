import { AvatarUser } from "~/components/avatar";
import { ProfileForm } from "~/components/layout/navbar/profile-form";
import { Modal } from "~/components/modal";
import { useMessage } from "~/providers/message";
import { useUser } from "~/providers/user";
import { styles } from ".";

interface NavbarModalProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const NavbarModal = ({ open, setOpen }: NavbarModalProps) => {
  const { user, updateUser, logout } = useUser();
  const { showMessage } = useMessage();

  return (
    user && (
      <Modal title="Profile Editor" onClose={() => setOpen(false)} open={open}>
        <div className={styles.heading}>
          <AvatarUser name={user.name} profile={user.profile} />
          <h3>{user.name}</h3>
        </div>

        <ProfileForm
          onFinish={async (data) => await updateUser(data)}
          defaultValues={user}
          onLogout={() => {
            logout();
            showMessage("You successfully logged out of your account", "success");
          }}
        />
      </Modal>
    )
  );
};
