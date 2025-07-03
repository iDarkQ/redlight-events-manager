import { useEffect, useRef, useState } from "react";
import { styles } from ".";
import ReactMarkdown from "react-markdown";
import { ScrollSync, ScrollSyncPane } from "react-scroll-sync";
import { EventProps } from "~/pages/event";
import clsx from "clsx";
import { useEvent } from "~/providers/event";
import { AvatarUser } from "~/components/avatar";

export const Details = ({ state }: EventProps) => {
  const { selectedEvent, setSelectedEvent } = useEvent();

  const [value, setValue] = useState(selectedEvent!.description);

  const saveTimeout = useRef<NodeJS.Timeout | null>(null);

  const save = (desc: string) => {
    setSelectedEvent((prev) => (prev ? { ...prev, description: desc } : prev));
  };

  useEffect(() => {
    if (!selectedEvent) return;
    if (state === "view") return;
    if (saveTimeout.current) clearTimeout(saveTimeout.current);
    saveTimeout.current = setTimeout(() => {
      save(value);
    }, 500);
    return () => {
      if (saveTimeout.current) clearTimeout(saveTimeout.current);
    };
  }, [value, state]);

  if (!selectedEvent) return;

  return (
    <div className={styles.wrapper}>
      <section className={styles.section}>
        {selectedEvent?.participants && selectedEvent.participants.length > 0 && (
          <div className={styles.participantsSection}>
            <h2>Participants</h2>
            <div className={styles.participantsList}>
              {selectedEvent.participants.map((participant, idx) => (
                <AvatarUser key={idx} name={participant.name} profile={participant.profile} />
              ))}
            </div>
          </div>
        )}

        <h2>Description</h2>
        {state !== "view" && (
          <div className={styles.header}>
            <h3 className={styles.subTitle}>Editor</h3>
            <h3 className={styles.subTitle}>Preview</h3>
          </div>
        )}
        <ScrollSync>
          <div className={clsx(styles.description, state === "view" && styles.fullscreen)}>
            {state !== "view" && (
              <div className={styles.preview}>
                <ScrollSyncPane>
                  <textarea
                    className={styles.editor}
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                  />
                </ScrollSyncPane>
              </div>
            )}
            <ScrollSyncPane>
              <div className={styles.markdown}>
                <ReactMarkdown>{value}</ReactMarkdown>
              </div>
            </ScrollSyncPane>
          </div>
        </ScrollSync>
      </section>
    </div>
  );
};
