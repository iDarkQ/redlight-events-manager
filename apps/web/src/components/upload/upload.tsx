import { Input } from "~/components/input";
import { styles } from ".";
import { useRef } from "react";
import { GrClear } from "react-icons/gr";
import { Tooltip } from "~/components/tooltip";
import { IconButton } from "~/components/icon-button";

interface UploadProps {
  placeholder?: string;
  value?: string;
  onChange?: (file?: File) => Promise<void>;
}

export const Upload = ({ placeholder, value, onChange }: UploadProps) => {
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <div className={styles.upload}>
      <div className={styles.file} onClick={() => inputRef.current?.click()}>
        <span className={styles.value}>{!value || value === "" ? placeholder : value}</span>
        <Tooltip title="Clear">
          <IconButton
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onChange?.();
            }}
          >
            <GrClear className={styles.icon} />
          </IconButton>
        </Tooltip>
      </div>
      <Input
        type="file"
        id="avatar"
        name="avatar"
        accept=".png, .jpg, .jpeg, .gif"
        ref={inputRef}
        rootClassName={styles.input}
        onChange={(event) => {
          const file = event.target.files && event.target.files[0];
          if (file) {
            onChange?.(file);
          }
        }}
      />
    </div>
  );
};
