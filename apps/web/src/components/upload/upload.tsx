import { Button } from "~/components/button";
import { Input } from "~/components/input";
import { MdFileUpload } from "react-icons/md";
import { styles } from ".";
import { useRef } from "react";
import { GrClear } from "react-icons/gr";
import { Tooltip } from "~/components/tooltip";

interface UploadProps {
  placeholder?: string;
  value?: string;
  onChange?: (file?: File) => Promise<void>;
}

export const Upload = ({ placeholder, value, onChange }: UploadProps) => {
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <div className={styles.upload}>
      <Tooltip title="Upload">
        <Button type="button" color="red" onClick={() => inputRef.current?.click()}>
          <MdFileUpload className={styles.icon} />
        </Button>
      </Tooltip>
      <Tooltip title="Clear">
        <Button
        type="button"
          color="red"
          onClick={() => {
            onChange?.();
          }}
        >
          <GrClear className={styles.icon} />
        </Button>
      </Tooltip>
      <div className={styles.file}>{value ?? placeholder ?? ""}</div>
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
            console.log({ file });
            onChange?.(file);
          }
        }}
      />
    </div>
  );
};
