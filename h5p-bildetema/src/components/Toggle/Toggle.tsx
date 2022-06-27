import React from "react";
import styles from "./Toggle.module.scss";

type ToggleProps = {
  handleChange: (checked: boolean) => void;
  checked: boolean;
  label?: string;
  id?: string;
};
export const Toggle: React.FC<ToggleProps> = ({
  handleChange,
  checked,
  label,
  id,
}) => {
  return (
    // eslint-disable-next-line jsx-a11y/label-has-associated-control
    <label className={styles.container}>
      {label && <span className={styles.label}>{label}</span>}
      <span className={styles.toggle}>
        <input
          id={id}
          checked={checked}
          type="checkbox"
          onChange={e => handleChange(e.target.checked)}
        />
        <span className={styles.slider} />
      </span>
    </label>
  );
};
