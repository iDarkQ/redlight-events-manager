import { IconButton } from "~/components/icon-button";
import { styles } from ".";
import { RxAvatar } from "react-icons/rx";
import { Link } from "~/components/link";
import { useTypewriter } from "~/components/typewriter";
import Logo from "~/assets/images/logo.svg?react";
import { Routes } from "~/utils/routes";
import { useUser } from "~/providers/user";
import { useLocation } from "react-router";
import clsx from "clsx";
import { useState } from "react";
import { Modal } from "~/components/modal";
import { Form } from "~/components/layout/navbar/form";
import { AvatarUser } from "~/components/avatar";
import { NavbarMenuBurger } from "~/components/layout/navbar";

export const LayoutNavbar = () => {
  const typewriter = useTypewriter(
    ["football", "ping pong", "lacrosse", "cheese rolling"],
    150,
    50,
    1000,
  );
  const { user, updateUser } = useUser();
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const [expanded, setExpanded] = useState(false);

  return (
    <>
      {user && (
        <Modal title="Profile Editor" onClose={() => setOpen(false)} open={open}>
          <AvatarUser name={user.name} profile={user.profile} />
          <span>{user.name}</span>

          <Form
            onFinish={async (data) => {
              await updateUser(data);
            }}
            defaultValues={user}
          />
        </Modal>
      )}
      <header className={styles.header}>
        <nav className={clsx(styles.navbar, expanded && styles.fullscreen)}>
          <div className={clsx(styles.main, expanded ? styles.expanded : undefined)}>
            <a className={styles.logo}>
              <Logo className={styles.logoImage} />
              <span>
                <span className={styles.code}>{`<${typewriter}`}</span>
                <span className={styles.cursor} />
                <span className={styles.code}>{">"}</span>
              </span>
            </a>
            <NavbarMenuBurger
              open={expanded}
              onClick={() => setExpanded((prev) => !prev)}
              className={clsx(styles.menu)}
            />
          </div>
          <div className={styles.buttons}>
            <nav>
              <Link link={Routes.HOME} onClick={() => setExpanded(false)}>
                <p
                  className={clsx(styles.link, {
                    [styles.selected]: location.pathname === Routes.HOME,
                  })}
                >
                  Events
                </p>
              </Link>
            </nav>

            <nav>
              <Link link="/about" onClick={() => setExpanded(false)}>
                <p
                  className={clsx(styles.link, {
                    [styles.selected]: location.pathname === "/about",
                  })}
                >
                  About
                </p>
              </Link>
            </nav>

            {!user ? (
              <nav>
                <Link link={Routes.LOGIN} onClick={() => setExpanded(false)}>
                  <p
                    className={clsx(styles.link, {
                      [styles.selected]: location.pathname === Routes.LOGIN,
                    })}
                  >
                    Login
                  </p>
                </Link>
              </nav>
            ) : (
              <IconButton
                onClick={() => {
                  setOpen((prev) => !prev);
                }}
                className={styles.avatar}
              >
                <RxAvatar className={styles.icon} />
              </IconButton>
            )}
          </div>
        </nav>
      </header>
    </>
  );
};
