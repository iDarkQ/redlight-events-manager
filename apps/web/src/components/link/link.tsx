import { ReactNode } from "react";
import { Link as ReactRouterLink } from "react-router";

interface LinkProps {
  link: string;
  isExternalLink?: boolean;
  children: ReactNode;
  className?: string;
  onClick?: () => void;
}

export const Link = ({ children, link, onClick, isExternalLink = false, className }: LinkProps) => {
  return isExternalLink ? (
    <a
      href={link}
      className={className && className}
      onClick={onClick}
      target="_blank"
      rel="noopener noreferrer"
    >
      {children}
    </a>
  ) : (
    <ReactRouterLink to={link} className={className && className} onClick={onClick}>
      {children}
    </ReactRouterLink>
  );
};
