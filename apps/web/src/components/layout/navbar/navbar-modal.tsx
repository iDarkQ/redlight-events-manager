import { AvatarUser } from "~/components/avatar";
import { ProfileForm } from "~/components/layout/navbar/profile-form";
import { Modal } from "~/components/modal";
import { useUser } from "~/providers/user";

interface NavbarModalProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const NavbarModal = ({ open, setOpen }: NavbarModalProps) => {
  const { user, updateUser } = useUser();

  return (
    user && (
      <Modal title="Profile Editor" onClose={() => setOpen(false)} open={open}>
        <AvatarUser name={user.name} profile={user.profile} />
        <span>{user.name}</span>

        <ProfileForm onFinish={async (data) => await updateUser(data)} defaultValues={user} />
      </Modal>
    )
  );
};
