import React from "react";
import { Color } from "../../../../common/enums/Color";
import styles from "./ColorButton.module.scss";

export type ColorButtonProps = {
  color: Color;
  selected: boolean;
  handleClick: (color: Color) => void;
};

export const ColorButton: React.FC<ColorButtonProps> = ({
  color,
  selected,
  handleClick,
}) => {
  return (
    <button
      onClick={() => handleClick(color)}
      className={`${styles.button} ${styles[color]} ${
        selected ? styles.selected : ""
      }`}
      type="button"
    >
      {}
    </button>
  );
};
