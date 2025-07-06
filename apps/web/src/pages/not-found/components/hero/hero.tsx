import { Button } from "~/components/button";
import { styles } from ".";
import { useNavigate } from "react-router";
import { Routes } from "~/utils/routes";

export const Hero = () => {
  const navigate = useNavigate();

  return (
    <section className={styles.section}>
      <h1>
        <strong>Error 404</strong>
      </h1>
      <h2>Page not found</h2>
      <Button onClick={() => navigate(Routes.HOME)} color="white">
        Main page
      </Button>
    </section>
  );
};
