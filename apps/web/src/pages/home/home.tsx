import { FilterProvider } from "~/providers/filter";
import { Events } from "./components/events";
import { Hero } from "./components/hero";

export const Home = () => (
  <FilterProvider>
    <main>
      <Hero />
      <Events />
    </main>
  </FilterProvider>
);
