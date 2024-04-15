import { useEffect, useRef } from "react";
import styles from "./TextInput.module.scss";

export type TextInputProps = {
  handleChange: (value: string) => void;
  value: string;
  placeholder?: string;
  handleEnter?: () => void;
};

const TextInput = ({
  // handleChange
  // handleSearch,
  // search,
  placeholder,
  value,
  handleChange,
  handleEnter
  // rlt,
}: TextInputProps): JSX.Element => {
  const ref = useRef<HTMLInputElement>(null);

  useEffect(() => {
    ref.current?.focus();
  }, []);

  const handleEnterPress = (): void => {
    // ref.current?.blur();
    if (handleEnter !== undefined) {
      handleEnter();
    }
  };

  return (
    // <div className={`${styles.TextInputWrapper}`}>
      <input
        ref={ref}
        // TODO needs a label
        id={styles.TextInput}
        // className={`${rlt ? styles.rtl : ""}`}
        placeholder={placeholder ?? ""}
        value={value}
        autoComplete="off"
        onChange={e => handleChange(e.target.value)}
        onKeyDown={e => {
          if(e.key === "Enter") {
            e.preventDefault();
            handleEnterPress()
          }
        }}
      />
    // </div>
  );
};

export default TextInput;
