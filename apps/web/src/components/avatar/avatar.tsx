import { ReactNode } from "react";
import { styles } from ".";
import { Icon } from "~/components/icon";
import { Tooltip } from "~/components/tooltip";
import clsx from "clsx";

interface AvatarProps {
  title: string;
  children: ReactNode;
  size?: "small" | "medium" | "large";
}

export const Avatar = ({ title, children, size = "medium" }: AvatarProps) => (
  <Tooltip title={title}>
    <Icon>
      <div className={clsx(styles.participant, styles[size])} title={title}>
        {children}
      </div>
    </Icon>
  </Tooltip>
);