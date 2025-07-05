import { useTypewriter } from "~/components/typewriter";
import { styles } from ".";
import Logo from "~/assets/images/logo.svg?react";

export const NavbarTypewriter = () => {
  const typewriter = useTypewriter(
    ["football", "ping pong", "lacrosse", "cheese rolling"],
    150,
    50,
    1000,
  );

  return (
    <a className={styles.logo}>
      <Logo className={styles.logoImage} />
      <span>
        <span className={styles.code}>{`<${typewriter}`}</span>
        <span className={styles.cursor} />
        <span className={styles.code}>{">"}</span>
      </span>
    </a>
  );
};
