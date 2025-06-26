import { useEvent } from "~/providers/event";

export const HeroTitle = () => {
  const { event } = useEvent();

  return (
    <h1>
      <strong>{event?.title}</strong>
    </h1>
  );
};
