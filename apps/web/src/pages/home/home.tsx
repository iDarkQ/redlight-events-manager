import { FilterProvider } from "~/providers/filter";
import { Events } from "./components/events";
import { Hero } from "./components/hero";
import { Layout } from "~/components/layout";

export const Home = () => (
  <Layout>
    <FilterProvider>
      <main>
        <Hero />
        <Events />
      </main>
    </FilterProvider>
  </Layout>
);
