import { CheckedIcon, UncheckedIcon } from "common/components/Icons/Icons";
import { FC, useState } from "react";
import ReactToggle from "react-toggle";
import "./ReactToggle.scss";
import styles from "./Toggle.module.scss";

type ToggleProps = {
  handleChange: (checked: boolean) => void;
  checked: boolean;
  label: string;
  id: string;
};
export const Toggle: FC<ToggleProps> = ({
  handleChange,
  checked,
  label,
  id,
}) => {
  // Show focus when tab/keyboard is used, not on click
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
      <ReactToggle
        id={id}
        checked={checked}
        onChange={e => handleChange(e.target.checked)}
        onKeyUp={() => handleOnFocus(true)}
        onBlur={() => handleOnFocus(false)}
        icons={{ checked: <CheckedIcon />, unchecked: <UncheckedIcon /> }}
      />
    </label>
  );
};
