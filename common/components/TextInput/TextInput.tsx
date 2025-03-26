import { JSX, useEffect, useRef } from "react";
import styles from "./TextInput.module.scss";

export type TextInputProps = {
  handleChange: (value: string) => void;
  label: string;
  value: string;
  placeholder?: string;
  handleEnter?: () => void;
};

const TextInput = ({
  label,
  placeholder,
  value,
  handleChange,
  handleEnter,
}: TextInputProps): JSX.Element => {
  const ref = useRef<HTMLInputElement>(null);

  useEffect(() => {
    ref.current?.focus();
  }, []);

  const handleEnterPress = (): void => {
    if (handleEnter !== undefined) {
      handleEnter();
    }
  };

  return (
    <label htmlFor={styles.TextInput}>
      <span className={styles.label}>{label}</span>
      <input
        ref={ref}
        id={styles.TextInput}
        placeholder={placeholder ?? ""}
        value={value}
        autoComplete="off"
        onChange={e => handleChange(e.target.value)}
        onKeyDown={e => {
          if (e.key === "Enter") {
            e.preventDefault();
            handleEnterPress();
          }
        }}
      />
    </label>
  );
};

export default TextInput;
