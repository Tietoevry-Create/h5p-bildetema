import React, { useState } from "react";
import styles from "./Toggle.module.scss";

type ToggleProps = {
  handleChange: (checked: boolean) => void;
  checked: boolean;
  label: string;
  id: string;
};
export const Toggle: React.FC<ToggleProps> = ({
  handleChange,
  checked,
  label,
  id,
}) => {
  // Show orange focus when tab/keyboard is used, not on click
  const [isFocused, setIsFocused] = useState(false);
  const handleOnFocus = (showFocus: boolean): void => {
    if (showFocus && !isFocused) {
      setIsFocused(true);
    }
    if (!showFocus && isFocused) {
      setIsFocused(false);
    }
  };

  return (
    <label
      className={isFocused ? styles.containerFocused : styles.container}
      htmlFor={id}
    >
      {label && <span className={styles.label}>{label}</span>}
      <span className={styles.toggle}>
        <input
          id={id}
          checked={checked}
          type="checkbox"
          onChange={e => handleChange(e.target.checked)}
          onKeyUp={() => handleOnFocus(true)}
          onBlur={() => handleOnFocus(false)}
        />
        <span className={styles.slider} />
      </span>
    </label>
  );
};
