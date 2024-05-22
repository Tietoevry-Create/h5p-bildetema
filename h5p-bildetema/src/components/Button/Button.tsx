/* eslint-disable react/jsx-props-no-spreading */
import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import styles from "./Button.module.scss";

const buttonVariants = {
  variants: {
    variant: {
      default: `${styles.button} ${styles.default}`,
      destructive: `${styles.button}`,
      outline: `${styles.button}`,
      secondary: `${styles.button} ${styles.secondary}`,
      ghost: `${styles.button}`,
      underline: `${styles.button} ${styles.underline}`,
      filter: `${styles.button} ${styles.filter}`,
    },
    size: {
      default: "",
      sm: "",
      lg: "",
      icon: "",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "default",
  },
};

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean;
  variant?: keyof (typeof buttonVariants)["variants"]["variant"];
  size?: keyof (typeof buttonVariants)["variants"]["size"];
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "default",
      size = "default",
      asChild = false,
      ...props
    },
    ref,
  ) => {
    const Comp = asChild ? Slot : "button";

    const variantClass = buttonVariants.variants.variant[variant];
    const sizeClass = buttonVariants.variants.size[size];
    const combinedClassName = `${variantClass} ${sizeClass} ${
      className || ""
    }`.trim();

    return <Comp className={combinedClassName} ref={ref} {...props} />;
  },
);

Button.displayName = "Button";

export default Button;
