import React from "react";
import styles from "./Language.module.scss";
import { Language as LanguageType } from "../../../../common/types/types";

type SelectProps = {
  language: LanguageType;
};

export const Language: React.FC<SelectProps> = ({
  language: { label, code },
}) => {
  return (
    <div className={styles.language}>
      <div>
        <label htmlFor={code} className={styles.input_container}>
          <input type="checkbox" id={code} />
          <span className={styles.checkmark} />
        </label>
      </div>
      <button type="button" className={styles.language_label}>
        {label}
      </button>
    </div>
  );
};
