import { Dialog as HeadlessDialog } from "@headlessui/react";
import React from "react";
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
        <HeadlessDialog.Panel className={styles.panel}>
          {title && (
            <HeadlessDialog.Title className={styles.title}>
              {title}
            </HeadlessDialog.Title>
          )}
          {description && (
            <HeadlessDialog.Description className={styles.description}>
              {description}
            </HeadlessDialog.Description>
          )}
          {children}
        </HeadlessDialog.Panel>
      </div>
    </HeadlessDialog>
  );
};

export default Dialog;
