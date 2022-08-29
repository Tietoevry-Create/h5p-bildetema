import React from "react";
// eslint-disable-next-line import/no-extraneous-dependencies
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
    />
  );
};

export const Default = (): JSX.Element => {
  return Template(false);
};
