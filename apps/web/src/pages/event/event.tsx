import { Details } from "~/pages/event/components/details";
import { Hero } from "~/pages/event/components/hero";

export interface EventProps {
  state: "edit" | "create" | "view";
}

export const Event = () => {
  return (
    <main>
      <Hero state="create" />
      <Details state="create" />
    </main>
  );
};
