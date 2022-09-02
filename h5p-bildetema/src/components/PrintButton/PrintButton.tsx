import React from "react";
import { PrintIcon } from "../Icons/Icons";
import { useL10ns } from "../../hooks/useL10n";
import styles from "./PrintButton.module.scss";

export const PrintButton: React.FC = () => {
  const { printLabel } = useL10ns("printLabel");

  return (
    <button
      type="button"
      className={styles.printButton}
      onClick={() => window.print()}
    >
      <span className={styles.printButtonWrapper}>
        {printLabel && <span>{printLabel}</span>}
        <PrintIcon />
      </span>
    </button>
  );
};
