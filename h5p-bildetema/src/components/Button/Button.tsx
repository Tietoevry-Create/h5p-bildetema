import React from "react";
import styles from "./Button.module.scss";

type variants = "primary" | "secondary" | "underline";

export interface ButtonProps extends React.ComponentProps<"button"> {
  children: React.ReactNode;
  variant: variants;
}

const Button = ({
  children,
  variant = "primary",
  ...props
}: ButtonProps): React.JSX.Element => {
  return (
    // eslint-disable-next-line react/button-has-type, react/jsx-props-no-spreading
    <button
      className={`${styles.button} ${styles[variant]} ${
        props.disabled ? styles.disabled : ""
      }`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
