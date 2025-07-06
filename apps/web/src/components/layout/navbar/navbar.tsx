import { IconButton } from "~/components/icon-button";
import { styles, NavbarLink, NavbarModal, NavbarTypewriter } from ".";
import { RxAvatar } from "react-icons/rx";

import { Routes } from "~/utils/routes";
import { useUser } from "~/providers/user";
import clsx from "clsx";
import { useState } from "react";
import { MenuBurger } from "./menu-burger";

interface NavbarProps {
  className?: string;
}

export const Navbar = ({ className }: NavbarProps) => {
  const { user } = useUser();
  const [open, setOpen] = useState(false);
  const [expanded, setExpanded] = useState(false);

  return (
    <>
      <NavbarModal open={open} setOpen={setOpen} />
      <header className={clsx(styles.header, className)}>
        <nav className={clsx(styles.navbar, expanded && styles.fullscreen)}>
          <div className={clsx(styles.main, expanded ? styles.expanded : undefined)}>
            <NavbarTypewriter />
            <MenuBurger
              open={expanded}
              onClick={() => setExpanded((prev) => !prev)}
              className={clsx(styles.menu)}
            />
          </div>
          <div className={styles.buttons}>
            <NavbarLink link={Routes.HOME} title="Events" onClick={() => setExpanded(false)} />
            <NavbarLink link={Routes.ABOUT} title="About" onClick={() => setExpanded(false)} />
            {(user && user.role) === "ADMIN" && (
              <NavbarLink
                link={Routes.PARTICIPANTS}
                title="Participants"
                onClick={() => setExpanded(false)}
              />
            )}
            {!user ? (
              <NavbarLink link={Routes.LOGIN} title="Login" onClick={() => setExpanded(false)} />
            ) : (
              <IconButton onClick={() => setOpen((prev) => !prev)} className={styles.avatar}>
                <RxAvatar className={styles.icon} />
              </IconButton>
            )}
          </div>
        </nav>
      </header>
    </>
  );
};
