import { FC } from "react";
import styles from "./Button.module.scss";

type ButtonProps = {
  id: string;
  label: string;
  isActive: boolean;
  isFinished: boolean;
  clickHandler: (id: string) => void;
};

export const Button: FC<ButtonProps> = ({
  id,
  label,
  clickHandler,
  isFinished,
  isActive,
}) => {
  return (
    <button
      type="button"
      onClick={() => {
        clickHandler(id);
      }}
      className={`${styles.button} ${isActive && styles.isActive} ${
        isFinished && styles.isFinished
      }`}
    >
      {label}
    </button>
  );
};
