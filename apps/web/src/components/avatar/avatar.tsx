import { ReactNode } from "react";
import { styles } from ".";
import { Icon } from "~/components/icon";
import { Tooltip } from "~/components/tooltip";
import clsx from "clsx";

interface AvatarProps {
  title: string;
  children: ReactNode;
  size?: "small" | "medium" | "large";
  onClick?: () => void;
  className?: string;
}

export const Avatar = ({ title, children, onClick, className, size = "medium" }: AvatarProps) => (
  <Tooltip title={title} className={className}>
    <Icon onClick={onClick}>
      <div
        className={clsx(styles.participant, onClick && styles.clickable, styles[size])}
        title={title}
      >
        {children}
      </div>
    </Icon>
  </Tooltip>
);
