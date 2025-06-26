import { useState } from "react";
import { styles } from ".";
import ReactMarkdown from "react-markdown";
import { ScrollSync, ScrollSyncPane } from "react-scroll-sync";
import { EventProps } from "~/pages/event";
import clsx from "clsx";

export const Details = ({ state }: EventProps) => {
  const [value, setValue] = useState(markdown);

  return (
    <div className={styles.wrapper}>
      <section className={styles.section}>
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

const markdown = `
        
## ⚽ Redlight Dev Football Day @ Alma Coimbra 🏟️

Hey team! 👋

We're organizing a **fun and friendly football match** just for **Redlight Dev employees**! 💻➡️⚽  
Come join us for a great time filled with **sports, laughter, and team spirit**! 🎉

📍 **Location:** Alma Coimbra  
📅 **Date:** [Insert Date Here]  
🕒 **Time:** [Insert Time Here]  

Whether you're a seasoned player or just want to hang out and cheer, there's a spot for you! 🙌  
We'll bring the ball — you bring the energy! 🔥

👟 Casual gear  
🍻 Post-match drinks nearby  
📸 Group photo at the end

Let’s kick it together! 🚀

*Teamwork doesn’t end at the office — see you on the field!*

`;
