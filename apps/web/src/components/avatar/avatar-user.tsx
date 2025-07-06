import { Avatar, styles } from ".";
import { RxAvatar } from "react-icons/rx";
import { baseUrl } from "~/utils/url";

interface AvatarUserProps {
  name: string;
  profile: string | null;
  className?: string;
  onClick?: () => void;
}

export const AvatarUser = ({ name, profile, className, onClick }: AvatarUserProps) => (
  <Avatar title={name} size="large" onClick={onClick} className={className}>
    {profile ? (
      <img src={baseUrl + "/" + profile} alt={name} className={styles.avatar} />
    ) : (
      <RxAvatar className={styles.avatar} />
    )}
  </Avatar>
);
