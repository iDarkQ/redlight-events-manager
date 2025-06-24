import { IconButton } from "~/components/icon-button";
import { styles } from ".";
import { RxAvatar } from "react-icons/rx";
import { Link } from "~/components/link";
import { useTypewriter } from "~/components/typewriter";
import Logo from "~/assets/images/logo.svg?react";

export const LayoutNavbar = () => {
  const typewriter = useTypewriter(
    ["football", "ping pong", "lacrosse", "cheese rolling"],
    400,
    100,
    1000,
  );
  return (
    <header className={styles.header}>
      <nav className={styles.navbar}>
        <a className={styles.logo}>
          <Logo />
          <span className={styles.code}>
            <span>{`<${typewriter}`}</span>
            <span className={styles.cursor} />
            <span>{">"}</span>
          </span>
        </a>
        <div className={styles.buttons}>
          <nav>
            <Link link="/">
              <p className={styles.link}>Events</p>
            </Link>
          </nav>

          <nav>
            <Link link="/">
              <p className={styles.link}>About</p>
            </Link>
          </nav>

          <nav>
            <Link link="/">
              <p className={styles.link}>Login</p>
            </Link>
          </nav>

          <IconButton className={styles.avatar}>
            <RxAvatar className={styles.icon} />
          </IconButton>
        </div>
      </nav>
    </header>
  );
};
