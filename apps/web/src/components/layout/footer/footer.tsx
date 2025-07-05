import { FooterIcon } from "~/components/layout/footer";
import { styles } from ".";
import { FaGithub } from "react-icons/fa6";

export const Footer = () => (
  <footer className={styles.footer}>
    <FooterIcon
      link="https://github.com/iDarkQ/redlight-events-manager/"
      icon={<FaGithub color="white" className={styles.icon} />}
    />
  </footer>
);
