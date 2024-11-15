import React from "react";
import {
  Dialog as HeadlessDialog,
  DialogPanel,
  DialogTitle,
  Description,
} from "@headlessui/react";
import styles from "./Dialog.module.scss";

type dialogProps = {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title?: string;
  description?: string;
};

const Dialog = ({
  onClose,
  open,
  title,
  description,
  children,
}: dialogProps): React.JSX.Element => {
  return (
    <HeadlessDialog open={open} onClose={onClose}>
      <div className={styles.backdrop} aria-hidden />
      <div className={styles.panelContainer}>
        <DialogPanel className={styles.panel}>
          {title && <DialogTitle className={styles.title}>{title}</DialogTitle>}
          {description && (
            <Description className={styles.description}>
              {description}
            </Description>
          )}
          {children}
        </DialogPanel>
      </div>
    </HeadlessDialog>
  );
};

export default Dialog;
