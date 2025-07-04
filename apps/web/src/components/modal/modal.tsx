import { ReactNode } from "react";
import { styles } from ".";
import clsx from "clsx";
import { IoMdClose } from "react-icons/io";
import { IconButton } from "~/components/icon-button";

interface ModalProps {
  open: boolean;
  title?: string;
  onClose?: () => void;
  children?: ReactNode;
}

export const Modal = ({ children, title = "Modal", open, onClose }: ModalProps) => (
  <div className={clsx(styles.wrapper, !open && styles.closed)} onClick={onClose}>
    <div className={styles.modal}>
      <div className={styles.content} onClick={(e) => e.stopPropagation()}>
        <div className={styles.header}>
          <h3>{title}</h3>
          <IconButton onClick={onClose}>
            <IoMdClose className={styles.icon} />
          </IconButton>
        </div>
        {children}
      </div>
    </div>
  </div>
);
