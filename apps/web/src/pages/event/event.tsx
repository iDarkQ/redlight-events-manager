import { PageLoading } from "~/components/page-loading";
import { Details } from "./components/details";
import { Hero } from "./components/hero";
import { useEvent } from ".";

export interface EventProps {
  state: "edit" | "create" | "view";
}

export const Event = ({ state }: EventProps) => {
  const { isLoading, selectedEvent } = useEvent({ state });

  return (
    <main>
      <PageLoading loading={isLoading} />
      <Hero state={state} />
      {selectedEvent && <Details state={state} />}
    </main>
  );
};
