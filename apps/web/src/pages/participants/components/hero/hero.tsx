import { useUser } from "~/providers/user";
import { styles, HeroModal, HeroHeader, useHero } from ".";
import { useState } from "react";
import { AvatarUser } from "~/components/avatar";

export const Hero = () => {
  const { participants } = useUser();
  const { participant, setSelctedParticipant } = useHero({ participants });
  const [open, setOpen] = useState(false);

  return (
    <div className={styles.wrapper}>
      <section className={styles.section}>
        <HeroHeader />
        <div className={styles.list}>
          {participant && (
            <HeroModal participant={participant} onClose={() => setOpen(false)} open={open} />
          )}
          {participants.map((p) => (
            <AvatarUser
              name={p.name}
              profile={p.profile}
              className={styles.avatar}
              onClick={() => {
                setSelctedParticipant(p.id);
                setOpen(true);
              }}
            />
          ))}
        </div>
      </section>
    </div>
  );
};
