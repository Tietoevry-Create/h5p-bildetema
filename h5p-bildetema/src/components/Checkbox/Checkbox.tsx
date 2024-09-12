import { StarFilledIcon, StarOutlineIcon } from "common/components/Icons/Icons";
import { FC } from "react";
import styles from "./Checkbox.module.scss";

type CheckboxProps = {
  id: string;
  handleChange: (checked: boolean) => void;
  checked: boolean;
  disabled: boolean;
  label: string;
};

export const Checkbox: FC<CheckboxProps> = ({
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
        />
        <span className={styles.starIcon} aria-hidden="true">
          {checked ? <StarFilledIcon /> : <StarOutlineIcon />}
        </span>
      </span>
      <span className={styles.visuallyHidden}>{label}</span>
    </label>
  );
};
