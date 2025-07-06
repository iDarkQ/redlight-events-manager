import { styles } from ".";

export const HeroHeader = () => (
  <div className={styles.header}>
    <h1 className={styles.title}>
      <strong>Participants</strong>
    </h1>
    <p className={styles.description}>
      Here you can manage all participants, their roles and account status
    </p>
  </div>
);
