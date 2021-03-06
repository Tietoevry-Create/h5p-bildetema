import React from "react";
import styles from "./Language.module.scss";
import { Language as LanguageType } from "../../../../common/types/types";
import type { LanguageCode } from "../../../../common/types/LanguageCode";

type LanguageProps = {
  language: LanguageType;
  handleChange: (isFavorite: boolean, languageCode: LanguageCode) => void;
};

export const Language: React.FC<LanguageProps> = ({
  language: { label, code, rtl, isFavorite },
  handleChange,
}) => {
  return (
    <div className={`${styles.language}`}>
      <div className={styles.checkboxContainer}>
        <label htmlFor={code} className={styles.checkbox}>
          <input
            className={styles.visuallyHidden}
            type="checkbox"
            checked={isFavorite}
            id={code}
            onChange={e => handleChange(e.target.checked, code)}
          />
          <span className={styles.checkmark} />
        </label>
      </div>
      <button
        type="button"
        className={`${styles.languageLabel} ${rtl ? styles.rtl : ""}`}
      >
        {label}
      </button>
    </div>
  );
};
