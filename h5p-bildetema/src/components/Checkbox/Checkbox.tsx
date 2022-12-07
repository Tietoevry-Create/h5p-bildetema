import React from "react";
import { StarFilledIcon, StarOutlineIcon } from "../Icons/Icons";
import styles from "./Checkbox.module.scss";

type CheckboxProps = {
  id: string;
  handleChange: (checked: boolean) => void;
  checked: boolean;
  disabled: boolean;
  label: string;
};

export const Checkbox: React.FC<CheckboxProps> = ({
  id,
  handleChange,
  checked,
  disabled,
  label,
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
          aria-label={label}
        />
        {checked ? (
          <span className={styles.starIcon} aria-hidden="true">
            <StarFilledIcon />
          </span>
        ) : (
          <span className={styles.starIcon} aria-hidden="true">
            <StarOutlineIcon />
          </span>
        )}
      </span>
    </label>
  );
};
