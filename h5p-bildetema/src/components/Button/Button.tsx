/* eslint-disable react/jsx-props-no-spreading */
// import React from "react";
// import styles from "./Button.module.scss";

// type variants = "primary" | "secondary" | "underline" | "filter";

// export interface ButtonProps extends React.ComponentProps<"button"> {
//   children: React.ReactNode;
//   variant: variants;
// }

// const Button = ({
//   children,
//   variant = "primary",
//   ...props
// }: ButtonProps): React.JSX.Element => {
//   return (
//     <button
//       // eslint-disable-next-line react/jsx-props-no-spreading
//       {...props}
//       // eslint-disable-next-line react/button-has-type
//       type={props.type}
//       className={`${styles.button} ${styles[variant]} ${
//         props.disabled ? styles.disabled : ""
//       } ${props.className}`}
//     >
//       {children}
//     </button>
//   );
// };

// export default Button;
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
      link: `${styles.button} ${styles.link}`,
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
    const role = variant === "link" ? "link" : "button";

    return (
      <Comp className={combinedClassName} role={role} ref={ref} {...props} />
    );
  },
);

Button.displayName = "Button";

export default Button;
