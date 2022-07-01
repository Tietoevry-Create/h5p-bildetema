import React from "react";
import styles from "./Button.module.scss";

type ButtonProps = {
  id: string;
  label: string;
  isActive: boolean;
  color?: string;
  clickHandler: (id: string) => void;
};

export const Button: React.FC<ButtonProps> = ({
  id,
  label,
  clickHandler,
  color,
  isActive,
}) => {
  return (
    <button
      type="button"
      onClick={() => {
        clickHandler(id);
      }}
      className={`${styles.button} ${isActive && styles.isActive}`}
      style={{ backgroundColor: color }}
    >
      {label}
    </button>
  );
};
