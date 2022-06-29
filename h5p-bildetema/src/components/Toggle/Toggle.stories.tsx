import { ComponentMeta } from "@storybook/react";
import * as React from "react";
import { Toggle } from "./Toggle";

export default {
  title: "Components/Toggle",
  component: Toggle,
} as ComponentMeta<typeof Toggle>;

const Template = (size: string, label: string): JSX.Element => {
  const [checked, setChecked] = React.useState(false);

  const handleChange = (value: boolean): void => {
    setChecked(value);
  };

  return (
    <span style={{ fontSize: size }}>
      <Toggle
        label={label}
        id={label}
        checked={checked}
        handleChange={handleChange}
      />
    </span>
  );
};

const small = "1rem";
const medium = "1.2rem";
const large = "1.4rem";

export const LabelSmall = (): JSX.Element => {
  return Template(small, "Small");
};

export const LabelMedium = (): JSX.Element => {
  return Template(medium, "Medium");
};

export const LabelLarge = (): JSX.Element => {
  return Template(large, "Large");
};
