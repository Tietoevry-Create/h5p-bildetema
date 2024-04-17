import { useEffect, useRef } from "react";
import styles from "./TextInput.module.scss";

export type TextInputProps = {
  handleChange: (value: string) => void;
  value: string;
  placeholder?: string;
  handleEnter?: () => void;
};

const TextInput = ({
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
    <input
      ref={ref}
      // TODO needs a label
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
  );
};

export default TextInput;
