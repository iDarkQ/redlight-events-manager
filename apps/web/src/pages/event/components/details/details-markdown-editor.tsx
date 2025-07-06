import { ScrollSync, ScrollSyncPane } from "react-scroll-sync";
import ReactMarkdown from "react-markdown";
import { styles } from ".";

interface DetailsMarkdownEditorProps {
  value: string;
  onChange: (value: string) => void;
}

export const DetailsMarkdownEditor = ({ value, onChange }: DetailsMarkdownEditorProps) => (
  <>
    <ScrollSync>
      <div className={styles.description}>
        <div className={styles.preview}>
          <h3 className={styles.subTitle}>Editor</h3>
          <ScrollSyncPane>
            <textarea
              className={styles.editor}
              value={value}
              onChange={(e) => onChange(e.target.value)}
            />
          </ScrollSyncPane>
        </div>

        <div className={styles.preview}>
          <h3 className={styles.subTitle}>Preview</h3>
          <ScrollSyncPane>
            <div className={styles.markdown}>
              <ReactMarkdown>{value}</ReactMarkdown>
            </div>
          </ScrollSyncPane>
        </div>
      </div>
    </ScrollSync>
  </>
);
