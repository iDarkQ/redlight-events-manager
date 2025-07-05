import { Link, useLocation } from "react-router";
import { styles } from ".";
import clsx from "clsx";

interface NavbarLinkProps {
  onClick?: () => void;
  link: string;
  title: string;
}

export const NavbarLink = ({ onClick, link, title }: NavbarLinkProps) => {
  const location = useLocation();

  return (
    <nav>
      <Link to={link} onClick={onClick}>
        <p
          className={clsx(styles.link, {
            [styles.selected]: location.pathname === link,
          })}
        >
          {title}
        </p>
      </Link>
    </nav>
  );
};
