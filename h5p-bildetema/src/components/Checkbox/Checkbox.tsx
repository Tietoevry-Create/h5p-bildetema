import React from "react";
import { StarFilledIcon, StarOutlineIcon } from "../Icons/Icons";
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
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === "Enter") {
      handleChange(!!checked);
    }
  };

  return (
    <label className={styles.container} htmlFor={id}>
      <span className={styles.wrapper}>
        <input
          id={id}
          type="checkbox"
          checked={checked}
          onChange={e => handleChange(e.target.checked)}
          onKeyDown={e => handleKeyDown(e)}
          disabled={disabled}
        />
        {checked ? <StarFilledIcon /> : <StarOutlineIcon />}
      </span>
    </label>
  );
};
