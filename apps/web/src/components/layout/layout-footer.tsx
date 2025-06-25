import { IconButton } from "~/components/icon-button";
import { styles } from ".";
import { FaGithub } from "react-icons/fa";

export const LayoutFooter = () => (
  <footer className={styles.footer}>
    <IconButton>
      <FaGithub color="white" className={styles.button} />
    </IconButton>
  </footer>
);
