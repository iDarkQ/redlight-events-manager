import { Layout } from "~/components/layout";
import { Hero } from "./components/hero";
import { styles } from ".";

export const About = () => (
  <Layout className={styles.layout}>
    <main>
      <Hero />
    </main>
  </Layout>
);
