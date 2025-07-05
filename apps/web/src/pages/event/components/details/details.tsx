import { useState, useCallback } from "react";
import { DetailsMarkdownEditor, DetailsMarkdownPreview, DetailsParticipantsList, styles, useDetailsDebouncedSave } from ".";
import { EventProps } from "~/pages/event";
import { useEvent } from "~/providers/event";

export const Details = ({ state }: EventProps) => {
  const { selectedEvent, setSelectedEvent } = useEvent();
  const [description, setDescription] = useState(selectedEvent!.description);

  const handleSave = useCallback((desc: string) => {
    setSelectedEvent((prev) => (prev ? { ...prev, description: desc } : prev));
  }, [setSelectedEvent]);

  useDetailsDebouncedSave(description, handleSave, 500);

  if (!selectedEvent) {
    return null;
  }

  return (
    <div className={styles.wrapper}>
      <section className={styles.section}>
        <DetailsParticipantsList participants={selectedEvent.participants} />
        <h2>Description</h2>
        {state === "view" ? (
          <DetailsMarkdownPreview value={description} />
        ) : (
          <DetailsMarkdownEditor value={description} onChange={setDescription} />
        )}
      </section>
    </div>
  );
};
