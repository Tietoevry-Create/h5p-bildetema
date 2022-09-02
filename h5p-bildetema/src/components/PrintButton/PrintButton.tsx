import React from "react";
import { PrintIcon } from "../Icons/Icons";
import styles from "./PrintButton.module.scss";

type PrintButtonProps = {
  label: string;
};

export const PrintButton: React.FC<PrintButtonProps> = ({ label }) => {
  return (
    <button
      type="button"
      className={styles.printButton}
      onClick={() => window.print()}
    >
      <span className={styles.printButtonWrapper}>
        {label && <span>{label}</span>}
        <PrintIcon />
      </span>
    </button>
  );
};
