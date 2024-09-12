import { CheckIcon } from "common/components/Icons/Icons";
import { FC } from "react";
import styles from "./FilterCheckbox.module.scss";

type CheckboxProps = {
  id: string;
  handleChange: (checked: boolean) => void;
  checked: boolean;
  disabled?: boolean;
  label: string;
};

export const FilterCheckbox: FC<CheckboxProps> = ({
  id,
  handleChange,
  checked,
  disabled = false,
  label,
}) => {
  return (
    <label className={styles.container} htmlFor={id}>
      <span
        className={`${
          checked
            ? `${styles.wrapper} ${styles.backgroundDarkTeal}`
            : styles.wrapper
        }`}
      >
        <input
          id={id}
          type="checkbox"
          checked={checked}
          onChange={e => handleChange(e.target.checked)}
          disabled={disabled}
        />
        {checked && <CheckIcon />}
      </span>
      <span className={styles.textLabel}>{label}</span>
    </label>
  );
};
