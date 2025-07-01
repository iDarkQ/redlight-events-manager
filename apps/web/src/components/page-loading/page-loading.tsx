import { LoadingIndicator } from "~/components/loading-indicator";
import { styles } from ".";

interface PageLoadingProps {
  loading?: boolean;
}

export const PageLoading = ({ loading = false }: PageLoadingProps) => {
  if (!loading) return null;

  return (
    <div className={styles.loading}>
      <LoadingIndicator />
    </div>
  );
};
