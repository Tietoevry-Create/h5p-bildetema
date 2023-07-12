import React from "react";

import { ComponentMeta } from "@storybook/react";
import { Checkbox } from "./Checkbox";

export default {
  title: "Components/Checkbox",
  component: Checkbox,
} as ComponentMeta<typeof Checkbox>;

const Template = (disabled: boolean): JSX.Element => {
  const [checked, setChecked] = React.useState(false);

  const handleChange = (value: boolean): void => {
    setChecked(value);
  };

  return (
    <Checkbox
      id="small"
      checked={checked}
      disabled={disabled}
      handleChange={handleChange}
      label="Checkbox label"
    />
  );
};

export const Default = (): JSX.Element => {
  return Template(false);
};
