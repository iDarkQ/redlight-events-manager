import { styles } from ".";
import { FaGithub } from "react-icons/fa";
import { Icon } from "~/components/icon";
import { Link } from "~/components/link";

export const LayoutFooter = () => (
  <footer className={styles.footer}>
    <Link isExternalLink={true} link="https://github.com/iDarkQ/redlight-events-manager/">
      <Icon>
        <FaGithub color="white" className={styles.button} />
      </Icon>
    </Link>
  </footer>
);
