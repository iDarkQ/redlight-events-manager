import { useEvent } from "~/providers/event";
import {styles} from ".";

export const HeroTitle = () => {
  const { selectedEvent } = useEvent();

  return (
    <div>
      <h1>
        <strong>{selectedEvent?.title}</strong>
      </h1>
      <h4 className={styles.lName}>
        {selectedEvent?.location}
      </h4>
    </div>
  );
};
