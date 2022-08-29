import React from "react";
import styles from "./Checkbox.module.scss";

type CheckboxProps = {
  id: string;
  handleChange: (checked: boolean) => void;
  checked: boolean;
  disabled: boolean;
};

export const Checkbox: React.FC<CheckboxProps> = ({
  id,
  handleChange,
  checked,
  disabled,
}) => {
  return (
    <label className={styles.container} htmlFor={id}>
      <span className={styles.wrapper}>
        <input
          id={id}
          type="checkbox"
          checked={checked}
          onChange={e => handleChange(e.target.checked)}
          disabled={disabled}
        />
        <span className={styles.star} />
      </span>
    </label>
  );
};
