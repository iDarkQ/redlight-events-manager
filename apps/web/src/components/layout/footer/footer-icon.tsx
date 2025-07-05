import { Icon } from "~/components/icon";
import { Link } from "~/components/link";
import { ReactNode } from "react";

interface FooterIconProps {
  link: string;
  icon: ReactNode;
}

export const FooterIcon = ({ link, icon }: FooterIconProps) => (
  <Link isExternalLink={true} link={link}>
    <Icon>{icon}</Icon>
  </Link>
);
