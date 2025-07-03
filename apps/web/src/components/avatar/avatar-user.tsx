import { Avatar, styles } from ".";
import { RxAvatar } from "react-icons/rx";
import { baseUrl } from "~/utils/url";

interface AvatarUserProps {
  name: string;
  profile: string | null;
}

export const AvatarUser = ({ name, profile }: AvatarUserProps) => (
  <Avatar title={name} size="large">
    {profile ? (
      <img src={baseUrl + "/" + profile} alt={name} className={styles.avatar} />
    ) : (
      <RxAvatar className={styles.avatar} />
    )}
  </Avatar>
);
