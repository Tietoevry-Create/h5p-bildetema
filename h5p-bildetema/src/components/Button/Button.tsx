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
    <button
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...props}
      // eslint-disable-next-line react/button-has-type
      type={props.type}
      className={`${styles.button} ${styles[variant]} ${
        props.disabled ? styles.disabled : ""
      } ${props.className}`}
    >
      {children}
    </button>
  );
};

export default Button;
