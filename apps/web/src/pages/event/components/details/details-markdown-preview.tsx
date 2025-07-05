import ReactMarkdown from "react-markdown";
import { styles } from ".";
import clsx from "clsx";

interface DetailsMarkdownPreviewProps {
  value: string;
}

export const DetailsMarkdownPreview = ({ value }: DetailsMarkdownPreviewProps) => (
  <div className={clsx(styles.description, styles.fullscreen)}>
    <div className={styles.markdown}>
      <ReactMarkdown>{value}</ReactMarkdown>
    </div>
  </div>
);