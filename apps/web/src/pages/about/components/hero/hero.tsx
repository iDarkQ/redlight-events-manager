import { styles } from ".";
import ReactMarkdown from "react-markdown";
import markdown from "../../../../../../../README.md";

export const Hero = () => (
  <div className={styles.wrapper}>
    <section className={styles.section}>
      <ReactMarkdown>{markdown}</ReactMarkdown>
    </section>
  </div>
);
