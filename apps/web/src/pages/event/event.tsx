import { PageLoading } from "~/components/page-loading";
import { Details } from "./components/details";
import { Hero } from "./components/hero";
import { useEvent } from ".";
import { useUser } from "~/providers/user";
import { useMessage } from "~/providers/message";
import { Navigate } from "react-router";
import { Routes } from "~/utils/routes";

export interface EventProps {
  state: "edit" | "create" | "view";
}

export const Event = ({ state }: EventProps) => {
  const { user } = useUser();
  const {showMessage} = useMessage();
  const { isLoading, selectedEvent } = useEvent({ state });

  if (!user && state !== "view") {
    showMessage("You need to be logged in to do that", "error");
    return <Navigate to={Routes.HOME} />;
  }

  return (
    <main>
      <PageLoading loading={isLoading} />
      <Hero state={state} />
      {selectedEvent && <Details state={state} />}
    </main>
  );
};
