import { Dialog as HeadlessDialog } from "@headlessui/react";
import React from "react";
import styles from "./Dialog.module.scss";

type dialogProps = {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
};

const Dialog = ({
  onClose,
  open,
  children,
}: dialogProps): React.JSX.Element => {
  return (
    <HeadlessDialog open={open} onClose={onClose}>
      <div className={styles.backdrop} aria-hidden />
      <div className={styles.panelContainer}>
        <HeadlessDialog.Panel className={styles.panel}>
          <HeadlessDialog.Title className={styles.title}><b>Slett en samling</b></HeadlessDialog.Title>
          <HeadlessDialog.Description>
            Er du sikker på at du vil slette samlingen?
          </HeadlessDialog.Description>
          {children}
        </HeadlessDialog.Panel>
        {/* <HeadlessDialog.Panel>
          <HeadlessDialog.Title>Deactivate account</HeadlessDialog.Title>
          <HeadlessDialog.Description>
            This will permanently deactivate your account
          </HeadlessDialog.Description>

          <p>
            Are you sure you want to deactivate your account? All of your data
            will be permanently removed. This action cannot be undone.
          </p>

          <button type="button" onClick={() => setIsOpen(false)}>
            Deactivate
          </button>
          <button type="button" onClick={() => setIsOpen(false)}>
            Cancel
          </button>
        </HeadlessDialog.Panel> */}
      </div>
    </HeadlessDialog>
  );
};

export default Dialog;
