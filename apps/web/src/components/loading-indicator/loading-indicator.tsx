import { styles } from ".";

export const LoadingIndicator = () => (
  <div className={styles.indicator}>
    <span>{"<"}</span>
    <span className={styles.blink}>{"/"}</span>
    <span>{">"}</span>
  </div>
);
